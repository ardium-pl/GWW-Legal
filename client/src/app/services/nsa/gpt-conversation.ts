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
      new GptConversationResponse().setContent(response),
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
  setLatestResponseContent(content: string): void {
    const res = this.items.last(1, (el) =>
      isGptConversationResponse(el),
    ) as GptConversationResponse;
    
    res.setContent(content);
  }
}

export const GptConversationItemType = {
  SystemMessage: 'system-message',
  UserMessage: 'user-message',
  Response: 'response',
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

  setContent(content: string): GptConversationResponse {
    this.content = content;
    this._isLoading.set(false);
    return this;
  }
}

export function isGptConversationResponse(
  cls: GptConversationItem,
): cls is GptConversationResponse {
  return cls instanceof GptConversationResponse;
}
