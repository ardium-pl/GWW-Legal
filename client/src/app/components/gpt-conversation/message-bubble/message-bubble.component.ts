import { Component, input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@ardium-ui/devkit';
import { MarkdownModule } from 'ngx-markdown';
import { ThreeDotsLoaderComponent } from "../../three-dots-loader/three-dots-loader.component";

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [MarkdownModule, ThreeDotsLoaderComponent],
  templateUrl: './message-bubble.component.html',
  styleUrl: './message-bubble.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MessageBubbleComponent {
  readonly content = input.required<string>();
  readonly isError = input.required<boolean>();
  readonly isLoading = input.required<boolean>();
  
  readonly left = input<boolean, any>(false, { transform: v => coerceBooleanProperty(v) });
}
