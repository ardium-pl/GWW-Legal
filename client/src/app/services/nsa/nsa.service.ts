import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Observable, Subject, catchError, takeUntil } from 'rxjs';
import { apiUrl } from '../apiUrl';
import { RequestState } from '../types';
import { GptConversation, GptConversationItemType } from './gpt-conversation';
import {
  GptAnwserData,
  NsaFormPart2,
  RulingErrorCode,
  SignatureBrowserData,
  SignatureExtendedData,
  UserMessageData,
  UserMessageDialogFormData,
  rulingErrorToText,
} from './nsa.utils';

@Injectable({
  providedIn: 'root',
})
export class NsaService implements OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly titleService = inject(Title);
  private readonly snackBar = inject(MatSnackBar);

  //! court ruling
  private readonly _rulingRequestState = signal<RequestState>(RequestState.Undefined);
  public readonly rulingRequestState = this._rulingRequestState.asReadonly();
  public readonly isRulingLoading = computed(() => this._rulingRequestState() === RequestState.Pending);

  private readonly _rulingResponse = signal<string[] | null>(null);
  public readonly rulingResponse = this._rulingResponse.asReadonly();

  private readonly _rulingError = signal<string[] | null>(null);
  public readonly rulingError = this._rulingError.asReadonly();

  private _caseSignature: string = '';

  public async fetchCourtRuling(caseSignature: string): Promise<boolean> {
    return new Promise(resolve => {
      this._rulingRequestState.set(RequestState.Pending);
      const oldTitle = this.titleService.getTitle();
      
      this.titleService.setTitle(`${oldTitle} - Wyszukiwanie...`);

      this._caseSignature = caseSignature;
      const sub = this.http
        .post<string[]>(apiUrl('/nsa/query'), { caseSignature })
        .pipe(
          takeUntil(this.cancel$),
          catchError((err, caught) => {
            this._rulingRequestState.set(RequestState.Error);
            const errorCode = (err.error as { code: RulingErrorCode }).code;

            if (errorCode in RulingErrorCode) {
              this._rulingError.set(rulingErrorToText(errorCode));
            }
            sub.unsubscribe();
            this.titleService.setTitle(oldTitle);
            resolve(false);
            return caught;
          })
        )
        .subscribe(res => {
          this._rulingResponse.set(res);
          this._rulingRequestState.set(RequestState.Success);
          this.titleService.setTitle(oldTitle);
          resolve(true);
        });
    });
  }
  public setManualCourtRuling(rulingText: string): void {
    this._rulingResponse.set([rulingText]);
  }

  //! user messages
  private readonly _areUserMessagesLoading = signal<boolean>(false);
  public readonly areUserMessagesLoading = this._areUserMessagesLoading.asReadonly();

  private readonly _userMessagesResponse = signal<UserMessageData[] | null>(null);
  public readonly userMessagesResponse = this._userMessagesResponse.asReadonly();

  public readonly isUserMessageSelected = signal<Record<number, number>>({});

  private readonly _loadingSingleUserMessage = signal<number | null>(null);
  public readonly loadingSingleUserMessage = this._loadingSingleUserMessage.asReadonly();

  private readonly _userMessageControlsChangedSinceLastRequest = signal<Set<number>>(new Set());

  markUserMessageControlAsChanged(index: number) {
    this._userMessageControlsChangedSinceLastRequest.update(v => {
      const newSet = new Set<number>(v.values());
      newSet.add(index);
      return newSet;
    });
  }

  public readonly userMessagesById = computed(() => {
    const v = this.userMessagesResponse();
    if (!v) return {};
    return v.reduce(
      (acc, el) => {
        acc[el.id] = el;
        return acc;
      },
      {} as Record<number, UserMessageData>
    );
  });

  public async fetchUserMessages() {
    this._areUserMessagesLoading.set(true);

    const sub = this.http
      .get<UserMessageData[]>(apiUrl('/nsa/questions'))
      .pipe(takeUntil(this.cancel$))
      .subscribe({
        next: res => {
          this._userMessagesResponse.set(res);
          this.isUserMessageSelected.set({});
        },
        error: err => {
          sub.unsubscribe();
        },
        complete: () => {
          this._areUserMessagesLoading.set(false);
        },
      });
  }

  public manuallyAddUserMessage(data: UserMessageData) {
    this._userMessagesResponse.update(v => {
      if (!v) return [data];
      return [...v, data];
    });
  }
  public manuallyUpdateUserMessage(data: UserMessageData) {
    this._userMessagesResponse.update(v => {
      if (!v) return v;
      const itemIndex = v.findIndex(el => el.id === data.id);
      v.splice(itemIndex, 1, data);
      return v;
    });
  }

  private readonly _isCreateUserMessageLoading = signal<boolean>(false);
  public readonly isCreateUserMessageLoading = this._isCreateUserMessageLoading.asReadonly();

  public async createUserMessage(formData: UserMessageDialogFormData, next: (data: { id: number | null }) => void) {
    this._loadingSingleUserMessage.set(-1);

    const sub = this.http
      .post<{ id: number }>(apiUrl('/nsa/create-question'), formData)
      .pipe(takeUntil(this.cancel$))
      .subscribe({
        next: next,
        error: () => {
          sub.unsubscribe();
          next({ id: null });
          this.snackBar.open('Nie udało się utworzyć pytania');
        },
        complete: () => {
          this._loadingSingleUserMessage.set(null);
        },
      });
  }

  private readonly _isUpdateUserMessageLoading = signal<boolean>(false);
  public readonly isUpdateUserMessageLoading = this._isUpdateUserMessageLoading.asReadonly();

  public async updateUserMessage(formData: UserMessageDialogFormData, id: number): Promise<boolean> {
    this._loadingSingleUserMessage.set(id);

    return new Promise<boolean>(resolve => {
      const sub = this.http
        .put(apiUrl('/nsa/update-question'), { ...formData, id })
        .pipe(takeUntil(this.cancel$))
        .subscribe({
          next: () => {
            resolve(true);
          },
          error: () => {
            sub.unsubscribe();
            resolve(false);
            this.snackBar.open('Nie udało się edytować pytania');
          },
          complete: () => {
            this._loadingSingleUserMessage.set(null);
          },
        });
    });
  }

  //! gpt answers to user messages
  private readonly _gptAnswersProgress = signal<(boolean | 'ERROR')[]>([]);
  public readonly gptAnswersProgress = this._gptAnswersProgress.asReadonly();

  public readonly areGptAnswersReady = computed(() => this._gptAnswersProgress().every(v => v !== false));
  public readonly areGptAnswersError = computed(() => this._gptAnswersProgress().every(v => v === 'ERROR'));
  public readonly isAtLeastOneGptAnswerReady = computed(
    () => this._gptAnswersProgress().some(v => v !== false) || this._gptAnswersProgress().length === 0
  );

  private readonly _gptAnswersResponse = signal<GptAnwserData[] | null>(null);
  public readonly gptAnswersResponse = this._gptAnswersResponse.asReadonly();

  public getCleanCourtRuling(): string | undefined {
    return this.rulingResponse()
      ?.map(v =>
        v
          .replace(/<\/p>/g, '\n\n')
          .replace(/<p[^>]*?>/g, '')
          .trim()
      )
      .join('\n\n');
  }

  public async fetchGptAnswers(formOutput: NsaFormPart2) {
    const courtRuling = this.getCleanCourtRuling();
    const caseSignature = this._caseSignature;

    const changed = new Set(this._userMessageControlsChangedSinceLastRequest().values());
    this._userMessageControlsChangedSinceLastRequest.set(new Set());

    const streamsMissing = formOutput.userMessages.length - this._gptAnswersProgress().length;
    if (streamsMissing > 0) {
      this._gptAnswersProgress.update(arr => [...arr, ...new Array(streamsMissing).fill(false)]);
      this._gptAnswersResponse.update(arr => [...(arr ?? []), ...new Array(streamsMissing).fill('')]);
      this._conversations.update(arr => [...(arr ?? []), ...new Array(streamsMissing)]);
    }

    this._gptAnswersProgress.update(arr => {
      for (const index of changed) {
        arr[index] = false;
      }
      return [...arr];
    });
    this._gptAnswersResponse.update(arr => {
      for (const index of changed) {
        arr![index] = { id: -1, answer: '' };
      }
      return [...arr!];
    });

    const streams = formOutput.userMessages
      .map((v, i) => [v, i])
      .filter(([, i]) => changed.has(i))
      .map(([userMessageId, i]) => {
        return [
          this.http.post<GptAnwserData>(apiUrl('/nsa/question'), {
            caseSignature,
            courtRuling,
            systemMessage: formOutput.systemMessage,
            userMessageId,
          }),
          i,
        ] as [Observable<GptAnwserData>, number];
      });

    streams.forEach(([stream, i]) => {
      const messageData = this.userMessagesById()[formOutput.userMessages[i]];
      const sub = stream
        .pipe(
          takeUntil(this.cancel$),
          catchError((err, caught) => {
            this._gptAnswersProgress.update(v => {
              const newProgress = [...v];
              newProgress[i] = 'ERROR';
              return newProgress;
            });
            this._gptAnswersResponse.update(v => {
              const newArr = v ? [...v] : [];
              newArr[i] = typeof err.error === 'string' ? err.error : 'Error: ' + err.status + ' ' + err.statusText;
              return newArr;
            });
            sub.unsubscribe();
            return caught;
          })
        )
        .subscribe(response => {
          this._gptAnswersProgress.update(v => {
            const newProgress = [...v];
            newProgress[i] = true;
            return newProgress;
          });
          this._gptAnswersResponse.update(v => {
            const newArr = v ? [...v] : [];
            newArr[i] = response;
            return newArr;
          });
          this.createConversation(i, formOutput.systemMessage!, messageData.message, response.answer);
        });
    });
  }

  //! conversations
  private readonly _conversations = signal<GptConversation[]>([]);
  public readonly conversations = this._conversations.asReadonly();

  private readonly _conversationLoadingStates = signal<boolean[]>([]);
  public readonly conversationLoadingStates = this._conversationLoadingStates.asReadonly();

  private readonly cancelConversation$ = new Subject<void>();

  createConversation(index: number, systemMessage: string, userMessage: string, response: string) {
    this._conversations.update(arr => {
      const newArr = [...arr];
      newArr[index] = new GptConversation(systemMessage, userMessage, response);
      return newArr;
    });
    this._conversationLoadingStates.update(arr => {
      return [...arr, false];
    });
  }
  fetchConversationHistory(index: number, gptQueryId: number): void {
    const convo = this.conversations()[index];

    this._conversationLoadingStates.update(arr => {
      arr[index] = true;
      return [...arr];
    });

    const sub = this.http
      .get<{ message: string; answer: string }[]>(apiUrl('/nsa/conversation'), {
        params: {
          gptQueryId,
        },
      })
      .pipe(takeUntil(this.cancel$))
      .subscribe({
        next: response => {
          for (const pair of response) {
            convo.addUserMessage(pair.message);
            convo.addEmptyResponse();
            convo.setLatestResponseContent(pair.answer, false);
          }
        },
        error: err => {
          sub.unsubscribe();
          convo.addEmptyResponse();
          convo.setLatestResponseContent(
            `Nie udało się załadować historii konwersacji. Kod błędu: ${err?.error?.code}`,
            true
          );
        },
        complete: () => {
          this._conversationLoadingStates.update(arr => {
            arr[index] = false;
            return [...arr];
          });
        },
      });
  }
  fetchConversationAnswer(index: number, gptQueryId: number, userMessage: string): void {
    const convo = this.conversations()[index];

    convo.addUserMessage(userMessage);

    const messageHistory = convo.items
      .filter(
        (v, index, arr) =>
          v.type !== GptConversationItemType.ResponseError &&
          v.type !== GptConversationItemType.ResponseCanceled &&
          arr[index + 1]?.type !== GptConversationItemType.ResponseError &&
          arr[index + 1]?.type !== GptConversationItemType.ResponseCanceled
      )
      .map(v => ({
        content: v.content(),
        type: v.type,
      }));

    convo.addEmptyResponse();

    const sub = this.http
      .post<{ chatResponse: string }>(apiUrl('/nsa/conversation'), {
        courtRuling: this.getCleanCourtRuling(),
        messageHistory,
        gptQueryId: gptQueryId,
      })
      .pipe(
        takeUntil(this.cancel$),
        takeUntil(this.cancelConversation$),
        catchError((err, caught) => {
          this._conversations()[index].setLatestResponseContent(err?.error?.code, true);
          sub.unsubscribe();
          return caught;
        })
      )
      .subscribe(response => {
        convo.setLatestResponseContent(response.chatResponse, false);
      });
  }
  cancelConversationRequest(index: number) {
    const convo = this.conversations()[index];

    convo.cancelLatestResponse();

    this.cancelConversation$.next();
  }

  //! signature browser
  private readonly _signatureBrowserDataLoading = signal<boolean>(false);
  public readonly signatureBrowserDataLoading = this._signatureBrowserDataLoading.asReadonly();

  private readonly _signatureBrowserData = signal<SignatureBrowserData[]>([]);
  public readonly signatureBrowserData = this._signatureBrowserData.asReadonly();

  private readonly _signatureBrowserTotal = signal<number | undefined>(undefined);
  public readonly signatureBrowserTotal = this._signatureBrowserTotal.asReadonly();

  readonly signatureBrowserPageSize = 30;

  public readonly isSignatureBrowserPageAvailable = computed(() => {
    const total = this._signatureBrowserTotal();
    return (page: number) => total && total <= (page - 1) * this.signatureBrowserPageSize;
  });

  public fetchSignatureBrowserData(page: number): void {
    if (page === 1) {
      this._signatureBrowserData.set([]);
    }
    if (this.isSignatureBrowserPageAvailable()(page)) return;

    this._signatureBrowserDataLoading.set(true);

    const sub = this.http
      .get<{ data: SignatureBrowserData[]; total: number }>(apiUrl('/nsa/signatures'), {
        params: { page, pageSize: this.signatureBrowserPageSize },
      })
      .pipe(
        takeUntil(this.cancel$),
        catchError((_, caught) => {
          this._signatureBrowserDataLoading.set(false);
          sub.unsubscribe();
          return caught;
        })
      )
      .subscribe(res => {
        this._signatureBrowserDataLoading.set(false);
        this._signatureBrowserData.update(old => [...old, ...res.data]);
        this._signatureBrowserTotal.set(res.total);
      });
  }

  private readonly _signatureExtendedDataLoading = signal<string | null>(null);
  public readonly signatureExtendedDataLoading = this._signatureExtendedDataLoading.asReadonly();

  public async fetchSignatureExtendedData(signature: string): Promise<SignatureExtendedData> {
    return new Promise(resolve => {
      this._signatureExtendedDataLoading.set(signature);
      const sub = this.http
        .get<SignatureExtendedData>(apiUrl('/nsa/ruling/' + encodeURIComponent(signature)))
        .pipe(
          takeUntil(this.cancel$),
          catchError((_, caught) => {
            this._signatureBrowserDataLoading.set(false);
            sub.unsubscribe();
            return caught;
          })
        )
        .subscribe(res => {
          this._signatureBrowserDataLoading.set(false);
          resolve(res);
        });
    });
  }

  //! resetting
  public resetData() {
    this._rulingRequestState.set(RequestState.Undefined);
    this._rulingResponse.set(null);
    this._rulingError.set(null);

    this._gptAnswersProgress.set([]);
    this._gptAnswersResponse.set(null);

    this._userMessageControlsChangedSinceLastRequest.set(new Set());
    this._isCreateUserMessageLoading.set(false);
    this._isUpdateUserMessageLoading.set(false);
    this._loadingSingleUserMessage.set(null);
    this.isUserMessageSelected.set({});

    this._cancelAllRequests();
  }

  private readonly cancel$ = new Subject<void>();
  private _cancelAllRequests(): void {
    this.cancel$.next();
  }

  ngOnDestroy(): void {
    this._cancelAllRequests();
    this.cancel$.complete();
  }
}
