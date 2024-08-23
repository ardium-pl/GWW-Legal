import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NsaService } from 'app/services';
import { GptConversationComponent } from '../gpt-conversation/gpt-conversation.component';

export interface GptConversationDialogData {
  readonly conversationIndex: number;
  readonly nsaServiceInstance: NsaService;
}

@Component({
  selector: 'app-gpt-conversation-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatIconModule, GptConversationComponent],
  templateUrl: './gpt-conversation-dialog.component.html',
  styleUrl: './gpt-conversation-dialog.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class GptConversationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<GptConversationDialogComponent>);
  readonly dialogData = inject<GptConversationDialogData>(MAT_DIALOG_DATA);

  readonly conversation = this.dialogData.nsaServiceInstance.conversations()[this.dialogData.conversationIndex];

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onMessageSend(message: string) {
    this.dialogData.nsaServiceInstance.fetchConversationAnswer(this.dialogData.conversationIndex, message);
  }
  onLoadingCancel() {
    this.dialogData.nsaServiceInstance.cancelConversationRequest(this.dialogData.conversationIndex);
  }
}
