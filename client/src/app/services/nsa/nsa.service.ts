import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { NsaFormPart2, RulingErrorCode, rulingErrorToText } from './nsa.utils';
import { RequestState } from '../types';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NsaService {
  private readonly http = inject(HttpClient);

  //! court ruling
  private readonly _rulingRequestState = signal<RequestState>(
    RequestState.Undefined,
  );
  public readonly rulingRequestState = computed(() =>
    this._rulingRequestState(),
  );
  public readonly isRulingLoading = computed(
    () => this._rulingRequestState() === RequestState.Pending,
  );

  private readonly _rulingResponse = signal<string[] | null>(null);
  public readonly rulingResponse = computed(() => this._rulingResponse());

  private readonly _rulingError = signal<string[] | null>(null);
  public readonly rulingError = computed(() => this._rulingError());

  public fetchCourtRuling(caseSignature: string): void {
    this._rulingRequestState.set(RequestState.Pending);
    const sub = this.http
      .post('/api/nsa/query', { caseSignature })
      .pipe(
        catchError((err, caught) => {
          this._rulingRequestState.set(RequestState.Error);
          const errorCode = (err.error as { code: RulingErrorCode }).code;

          if (errorCode in RulingErrorCode) {
            this._rulingError.set(rulingErrorToText(errorCode));
          }
          sub.unsubscribe();
          return caught;
        }),
      )
      .subscribe((res) => {
        this._rulingResponse.set(res as string[]);
        this._rulingRequestState.set(RequestState.Success);
      });
  }
  public setManualCourtRuling(rulingText: string): void {
    this._rulingResponse.set([rulingText]); 
  }

  //! gpt answers to user messages
  private readonly _gptAnswersProgress = signal<(boolean | 'ERROR')[]>([]);
  public readonly gptAnswersProgress = computed(() =>
    this._gptAnswersProgress(),
  );
  public readonly areGptAnswersReady = computed(() =>
    this._gptAnswersProgress().every((v) => v !== false),
  );
  public readonly areGptAnswersError = computed(() =>
    this._gptAnswersProgress().every((v) => v === 'ERROR'),
  );
  public readonly isAtLeastOneGptAnswerReady = computed(() =>
    this._gptAnswersProgress().some((v) => v !== false) || this._gptAnswersProgress().length === 0,
  );

  private readonly _gptAnswersResponse = signal<string[] | null>(null);
  public readonly gptAnswersResponse = computed(() =>
    this._gptAnswersResponse(),
  );

  private getCleanCourtRuling(): string | undefined {
    return this.rulingResponse()
      ?.map((v) => v.replace(/<\/?p>/g, ''))
      .join('\n');
  }

  public async fetchGptAnswers(formOutput: NsaFormPart2) {
    this.resetAdditionalAnswer();

    const courtRuling = this.getCleanCourtRuling();

    const streams = [
      formOutput.userMessage1,
      formOutput.userMessage2,
      formOutput.userMessage3,
    ].map((userMessage) =>
      this.http.post('/api/nsa/question', {
        courtRuling,
        systemMessage: formOutput.systemMessage,
        userMessage,
      }),
    );

    this._gptAnswersProgress.set(new Array(streams.length).fill(false));
    this._gptAnswersResponse.set(new Array(streams.length).fill(''));

    streams.forEach((stream, i) => {
      const sub = stream
        .pipe(
          catchError((err, caught) => {
            this._gptAnswersProgress.update((v) => {
              const newProgress = [...v];
              newProgress[i] = 'ERROR';
              return newProgress;
            });
            this._gptAnswersResponse.update((v) => {
              const newArr = v ? [...v] : [];
              newArr[i] =
                typeof err.error === 'string'
                  ? err.error
                  : 'Error: ' + err.status + ' ' + err.statusText;
              return newArr;
            });
            sub.unsubscribe();
            return caught;
          }),
        )
        .subscribe((response) => {
          this._gptAnswersProgress.update((v) => {
            const newProgress = [...v];
            newProgress[i] = true;
            return newProgress;
          });
          this._gptAnswersResponse.update((v) => {
            const newArr = v ? [...v] : [];
            newArr[i] = response as string;
            return newArr;
          });
        });
    });
  }

  //! additional answer
  private readonly _isAdditionalAnswerLoading = signal(false);
  public readonly isAdditionalAnswerLoading = computed(() =>
    this._isAdditionalAnswerLoading(),
  );

  private readonly _additionalAnswerResponse = signal<string | null>(null);
  public readonly additionalAnswerResponse = computed(() =>
    this._additionalAnswerResponse(),
  );

  private resetAdditionalAnswer(): void {
    this._isAdditionalAnswerLoading.set(false);
    this._additionalAnswerResponse.set(null);
  }

  public fetchAdditionalAnswer(
    systemMessage: string,
    userMessage: string,
  ): void {
    this._isAdditionalAnswerLoading.set(true);
    this.http
      .post('/api/nsa/question', {
        courtRuling: this.getCleanCourtRuling(),
        systemMessage,
        userMessage,
      })
      .subscribe((res) => {
        this._additionalAnswerResponse.set(res as string);
        this._isAdditionalAnswerLoading.set(false);
      });
  }
}
