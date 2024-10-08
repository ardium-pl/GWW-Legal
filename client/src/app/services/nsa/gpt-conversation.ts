import { signal } from '@angular/core';

export class GptConversation {
  items!: (GptConversationItem | GptConversationResponse)[];

  wasTouched: boolean = false;

  constructor(
    public readonly systemMessage: string,
    userMessage1: string,
    response: string
  ) {
    this.items = [
      new GptConversationItem(GptConversationItemType.SystemMessage, systemMessage),
      new GptConversationItem(GptConversationItemType.UserMessage, userMessage1),
      new GptConversationResponse().setContent(response, false),
    ];
  }

  addUserMessage(userMessage: string): void {
    this.wasTouched = true;
    this.items = [...this.items, new GptConversationItem(GptConversationItemType.UserMessage, userMessage)];
  }
  addResponse(content: string, isError: boolean): void {
    const res = new GptConversationResponse();
    res.setContent(content, isError);

    this.items = [...this.items, res];
  }
  addEmptyResponse(): void {
    this.wasTouched = true;
    this.items = [...this.items, new GptConversationResponse()];
  }
  setLatestResponseContent(content: string, isError: boolean): void {
    this.items.pop();
    this.addResponse(content, isError);
  }
  cancelLatestResponse(): void {
    this.items.pop();

    this.items = [...this.items, new GptConversationResponse().setCanceled()];
  }
}

export const GptConversationItemType = {
  SystemMessage: 'system-message',
  UserMessage: 'user-message',
  Response: 'response',
  ResponseError: 'response-error',
  ResponseCanceled: 'response-canceled',
} as const;
export type GptConversationItemType = (typeof GptConversationItemType)[keyof typeof GptConversationItemType];

export class GptConversationItem {
  protected readonly _content = signal<string>('');
  public readonly content = this._content.asReadonly();
  constructor(
    protected _type: GptConversationItemType,
    content: string
  ) {
    this._content.set(content);
  }
  public get type() {
    return this._type;
  }
  protected set type(v: GptConversationItemType) {
    this._type = v;
  }
}

export class GptConversationResponse extends GptConversationItem {
  constructor() {
    super(GptConversationItemType.Response, '');
  }

  private readonly _isLoading = signal<boolean>(true);
  public readonly isLoading = this._isLoading.asReadonly();

  private readonly _isError = signal<boolean>(false);
  public readonly isError = this._isError.asReadonly();

  private readonly _isCanceled = signal<boolean>(false);
  public readonly isCanceled = this._isCanceled.asReadonly();

  setContent(content: string, isError: boolean): GptConversationResponse {
    this._content.set(content);
    this._isLoading.set(false);
    this._isError.set(isError);
    if (isError) this._type = GptConversationItemType.ResponseError;
    return this;
  }
  setCanceled(): GptConversationResponse {
    this._isLoading.set(false);
    this._isCanceled.set(true);
    this._type = GptConversationItemType.ResponseCanceled;
    return this;
  }
}

export function isGptConversationResponse(cls: GptConversationItem): cls is GptConversationResponse {
  return cls instanceof GptConversationResponse;
}
