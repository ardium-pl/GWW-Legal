import { signal } from '@angular/core';

export class GptConversation {
  readonly items!: (GptConversationItem | GptConversationResponse)[];

  constructor(public readonly systemMessage: string, userMessage1: string, response: string) {
    this.items = [
      new GptConversationItem(
        GptConversationItemType.SystemMessage,
        systemMessage,
      ),
      new GptConversationItem(
        GptConversationItemType.UserMessage,
        userMessage1,
      ),
      new GptConversationResponse().setContent(response, false),
    ];
  }

  addUserMessage(userMessage: string): void {
    this.items.push(
      new GptConversationItem(GptConversationItemType.UserMessage, userMessage),
    );
  }
  addEmptyResponse(): void {
    this.items.push(
      new GptConversationResponse(),
    );
  }
  setLatestResponseContent(content: string, isError: boolean): void {
    const res = this.items.last(1, (el) =>
      isGptConversationResponse(el),
    ) as GptConversationResponse;
    
    res.setContent(content, isError);
  }
}

export const GptConversationItemType = {
  SystemMessage: 'system-message',
  UserMessage: 'user-message',
  Response: 'response',
  ResponseError: 'response-error'
} as const;
export type GptConversationItemType =
  (typeof GptConversationItemType)[keyof typeof GptConversationItemType];

export class GptConversationItem {
  constructor(
    public readonly type: GptConversationItemType,
    public readonly content: string,
  ) {}
}

export class GptConversationResponse extends GptConversationItem {
  public override content!: string;

  constructor() {
    super(GptConversationItemType.Response, '');
  }

  private readonly _isLoading = signal<boolean>(true);
  public readonly isLoading = this._isLoading.asReadonly();

  private readonly _isError = signal<boolean>(false);
  public readonly isError = this._isError.asReadonly();

  setContent(content: string, isError: boolean): GptConversationResponse {
    this.content = content;
    this._isLoading.set(false);
    this._isError.set(isError);
    return this;
  }
}

export function isGptConversationResponse(
  cls: GptConversationItem,
): cls is GptConversationResponse {
  return cls instanceof GptConversationResponse;
}
