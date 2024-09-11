import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface UserQuestionDialogData {
  editedMessageId: number | null;
  shortMessage: string | null;
  message: string | null;
}

@Component({
  selector: 'app-user-question-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user-question-dialog.component.html',
  styleUrl: './user-question-dialog.component.scss',
})
export class UserQuestionDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UserQuestionDialogComponent>);
  readonly dialogData = inject<UserQuestionDialogData>(MAT_DIALOG_DATA);

  readonly form = new FormGroup({
    shortMessage: new FormControl<string | null>(this.dialogData.shortMessage, [Validators.required]),
    message: new FormControl<string | null>(this.dialogData.message, [Validators.required]),
  });

  onSubmit() {
    if (!this.form.valid) return;
    this.dialogRef.close(this.form.value);
  }
}
