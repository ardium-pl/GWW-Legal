import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-error-snackbar',
  standalone: true,
  imports: [MatSnackBarLabel],
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss'],
})
export class ErrorSnackbarComponent {
  data: string = inject(MAT_SNACK_BAR_DATA);

  constructor() {}
}
