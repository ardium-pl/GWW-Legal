import { Component, input } from '@angular/core';
import { coerceBooleanProperty } from '@ardium-ui/devkit';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './message-bubble.component.html',
  styleUrl: './message-bubble.component.scss',
})
export class MessageBubbleComponent {
  readonly content = input.required<string>();
  readonly isError = input.required<boolean>();
  
  readonly left = input<boolean, any>(false, { transform: v => coerceBooleanProperty(v) });
}
