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
    this.http.post('/nsa/query', { caseSignature }).subscribe((res) => {
      this._rulingResponse.set(res as string[]);
      this._isRulingLoading.set(false);
    });
    setTimeout(() => {
      this._isRulingLoading.set(false);
    }, 20000);
  }

  //! gpt answers to user messages
  private readonly _gptAnswersProgress = signal<boolean[]>([]);
  public readonly gptAnswersProgress = computed(() =>
    this._gptAnswersProgress(),
  );
  public readonly areGptAnswersReady = computed(() =>
    this._gptAnswersProgress().every((v) => v === true),
  );

  private readonly _gptAnswersResponse = signal<
    { question: string; response: string | null }[] | null
  >(null);
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
    await Promise.all([
      new Promise<void>((res) =>
        setTimeout(
          () => {
            this._gptAnswersProgress.update((v) => [true, v[1], v[2]]);
            res();
          },
          Math.random() * 2000 + 1000,
        ),
      ),
      new Promise<void>((res) =>
        setTimeout(
          () => {
            this._gptAnswersProgress.update((v) => [v[0], true, v[2]]);
            res();
          },
          Math.random() * 2000 + 1500,
        ),
      ),
      new Promise<void>((res) =>
        setTimeout(
          () => {
            this._gptAnswersProgress.update((v) => [v[0], v[1], true]);
            res();
          },
          Math.random() * 3000 + 500,
        ),
      ),
    ]);
    this._gptAnswersResponse.set([
      { question: 'foo', response: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
      { question: 'bar', response: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
      { question: 'baz', response: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
    ]);
  }

  //! additional answer
  private readonly _isAdditionalAnswerLoading = signal(false);
  public readonly isAdditionalAnswerLoading = computed(() => this._isAdditionalAnswerLoading());

  private readonly _additionalAnswerResponse = signal<string | null>(null);
  public readonly additionalAnswerResponse = computed(() => this._additionalAnswerResponse());

  private resetAdditionalAnswer(): void {
    this._isAdditionalAnswerLoading.set(false);
    this._additionalAnswerResponse.set(null);
  }

  public fetchAdditionalAnswer(systemMessage: string, userMessage: string): void {
    this._isAdditionalAnswerLoading.set(true);
    this.http.post('/nsa/additional_question', { systemMessage, userMessage }).subscribe((res) => {
      this._additionalAnswerResponse.set(res as string);
      this._isAdditionalAnswerLoading.set(false);
    });
    setTimeout(() => {
      this._isAdditionalAnswerLoading.set(false);
      //this._additionalAnswerResponse.set('Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore placeat repellat, dolor maiores nostrum incidunt deserunt provident, cum quidem cupiditate nisi beatae exercitationem, commodi numquam illo nam excepturi doloremque tempora.');
    }, 20000);
  }
}
