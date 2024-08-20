import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  GptConversationItem,
  GptConversationItemType,
  GptConversationResponse,
  isGptConversationResponse,
} from 'app/services/nsa/gpt-conversation';
import { provideMarkdown } from 'ngx-markdown';
import { ThreeDotsLoaderComponent } from '../three-dots-loader/three-dots-loader.component';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';

@Component({
  selector: 'app-gpt-conversation',
  standalone: true,
  imports: [
    MessageBubbleComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    ThreeDotsLoaderComponent,
  ],
  providers: [provideMarkdown()],
  templateUrl: './gpt-conversation.component.html',
  styleUrl: './gpt-conversation.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GptConversationComponent {
  readonly items = input.required<(GptConversationItem | GptConversationResponse)[]>();

  readonly itemsWithoutSystemMessage = computed(() =>
    this.items().filter(v => v.type !== GptConversationItemType.SystemMessage)
  );

  constructor() {
    effect(() => {
      this.items();

      const el = this.messagesContainer()?.nativeElement;
      if (!el) return;
      setTimeout(() => el.scrollTo({ top: el.scrollHeight }), 0);
    });
  }

  readonly message = signal<string>('');

  readonly sendMessage = output<string>();

  public isGptConversationResponse(
    item: GptConversationItem | GptConversationResponse
  ): item is GptConversationResponse {
    return isGptConversationResponse(item);
  }

  readonly messagesContainer = viewChild<ElementRef<HTMLElement>>('messages');
  readonly inputEl = viewChild<ElementRef<HTMLTextAreaElement>>('input');

  executeSendMessage(): void {
    if (!this.message()) {
      return;
    }
    this.sendMessage.emit(this.message());
    this.message.set('');
  }

  handleEnterKeyPress(event: KeyboardEvent): void {
    if (event.key !== 'Enter') return;

    if (event.shiftKey) return;

    event.preventDefault();
    this.executeSendMessage();
  }
}
