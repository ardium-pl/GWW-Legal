import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';
@Component({
  selector: 'app-error-snackbar',
  standalone: true,
  imports: [MatSnackBarLabel],
  templateUrl: './error-snackbar.component.html',
  styleUrl: './error-snackbar.component.scss',
})
export class ErrorSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
}
