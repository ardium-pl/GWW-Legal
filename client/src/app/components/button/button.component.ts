import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@ardium-ui/devkit';
import { ButtonAppearance } from './button.types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  readonly disabled = input<boolean, any>(false, {
    transform: v => coerceBooleanProperty(v),
  });

  readonly htmlId = input<string | null | undefined>(null);

  readonly appearance = input<ButtonAppearance>(ButtonAppearance.Raised);

  readonly classes = computed<string>(() => {
    return [`appearance-${this.appearance()}`].join(' ');
  });
}
