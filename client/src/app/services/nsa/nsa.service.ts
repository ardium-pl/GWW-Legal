import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { NsaFormPart2, RulingErrorCode, rulingErrorToText } from './nsa.utils';
import { RequestState } from '../types';
import { catchError } from 'rxjs';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root',
})
export class NsaService {
  private readonly http = inject(HttpClient);

  //! court ruling
  private readonly _rulingRequestState = signal<RequestState>(
    RequestState.Undefined,
  );
  public readonly rulingRequestState = this._rulingRequestState.asReadonly();
  public readonly isRulingLoading = computed(
    () => this._rulingRequestState() === RequestState.Pending,
  );

  private readonly _rulingResponse = signal<string[] | null>(null);
  public readonly rulingResponse = this._rulingResponse.asReadonly();

  private readonly _rulingError = signal<string[] | null>(null);
  public readonly rulingError = this._rulingError.asReadonly();

  public fetchCourtRuling(caseSignature: string): void {
    this._rulingRequestState.set(RequestState.Pending);
    const sub = this.http
      .post(apiUrl('/nsa/query'), { caseSignature })
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
  public readonly gptAnswersProgress = this._gptAnswersProgress.asReadonly();

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
  public readonly gptAnswersResponse = this._gptAnswersResponse.asReadonly();

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
      this.http.post(apiUrl('/nsa/question'), {
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
  public readonly isAdditionalAnswerLoading = this._isAdditionalAnswerLoading.asReadonly();

  private readonly _additionalAnswerResponse = signal<string | null>(null);
  public readonly additionalAnswerResponse = this._additionalAnswerResponse.asReadonly();

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
      .post(apiUrl('/nsa/question'), {
        courtRuling: this.getCleanCourtRuling(),
        systemMessage,
        userMessage,
      })
      .subscribe((res) => {
        this._additionalAnswerResponse.set(res as string);
        this._isAdditionalAnswerLoading.set(false);
      });
  }

  //! resetting
  public resetData() {
    this._rulingRequestState.set(RequestState.Undefined);
    this._rulingResponse.set(null);
    this._rulingError.set(null);

    this._gptAnswersProgress.set([]);
    this._gptAnswersResponse.set(null);

    this._isAdditionalAnswerLoading.set(false);
    this._additionalAnswerResponse.set(null);
  }
}
