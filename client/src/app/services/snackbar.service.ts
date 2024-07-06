import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from 'app/components/error-snackbar/error-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorSnackbarService {
  private readonly snackBar = inject(MatSnackBar);

  public open(content: string): void {
    this.snackBar.openFromComponent(ErrorSnackbarComponent, {
      data: content,
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
