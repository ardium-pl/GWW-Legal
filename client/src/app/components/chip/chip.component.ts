import { Component, input } from '@angular/core';
import { ChipColor } from './chip.types';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  readonly color = input<ChipColor>(ChipColor.None);
}
