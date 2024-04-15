import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { NsaFormPart2 } from './nsa.types';

@Injectable({
  providedIn: 'root',
})
export class NsaService {
  private readonly http = inject(HttpClient);

  //! court ruling
  private readonly _isRulingLoading = signal(false);
  public readonly isRulingLoading = computed(() => this._isRulingLoading());

  private readonly _rulingResponse = signal<string[] | null>(null);
  public readonly rulingResponse = computed(() => this._rulingResponse());

  public fetchCourtRuling(caseSignature: string): void {
    this._isRulingLoading.set(true);
    this.http.post('/api/nsa/query', { caseSignature }).subscribe((res) => {
      this._rulingResponse.set(res as string[]);
      this._isRulingLoading.set(false);
    });
  }

  //! gpt answers to user messages
  private readonly _gptAnswersProgress = signal<boolean[]>([]);
  public readonly gptAnswersProgress = computed(() =>
    this._gptAnswersProgress(),
  );
  public readonly areGptAnswersReady = computed(() =>
    this._gptAnswersProgress().every((v) => v === true),
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

    this._gptAnswersProgress.set([false, false, false]);
    this._gptAnswersResponse.set([]);

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

    streams.forEach((stream, i) => {
      stream.subscribe((response) => {
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
