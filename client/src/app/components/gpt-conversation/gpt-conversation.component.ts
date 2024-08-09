import {
  Component,
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
import {
  GptConversationItem,
  GptConversationResponse,
  isGptConversationResponse,
} from 'app/services/nsa/gpt-conversation';
import { provideMarkdown } from 'ngx-markdown';
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
  ],
  providers: [provideMarkdown()],
  templateUrl: './gpt-conversation.component.html',
  styleUrl: './gpt-conversation.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GptConversationComponent {
  readonly items =
    input.required<(GptConversationItem | GptConversationResponse)[]>();

  readonly message = signal<string>('');

  readonly sendMessage = output<string>();

  public isGptConversationResponse(
    item: GptConversationItem | GptConversationResponse,
  ): item is GptConversationResponse {
    return isGptConversationResponse(item);
  }

  readonly messagesContainer = viewChild<ElementRef<HTMLElement>>('messages');

  executeSendMessage(): void {
    if (!this.message()) {
      return;
    }
    this.sendMessage.emit(this.message());
    this.message.set('');
    const el = this.messagesContainer()?.nativeElement;
    if (!el) return;

    setTimeout(() => el.scrollTo({ top: el.scrollHeight }), 0);
  }
}
