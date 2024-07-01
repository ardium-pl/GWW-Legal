import { Component, OnInit, inject } from '@angular/core';
import { ClipboardService } from 'app/services/clipboard.service';

@Component({
  selector: 'tpr-nsa',
  standalone: true,
  imports: [],
  providers: [ClipboardService],
  templateUrl: './tpr.page.html',
  styleUrl: './tpr.page.scss',
})
export class TprPage implements OnInit {
  readonly clipboardService = inject(ClipboardService);

  ngOnInit(): void {
    this.clipboardService.readClipboard();
  }
}
