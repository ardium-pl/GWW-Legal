import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TableComponent } from 'app/components/table/table.component';
import { ClipboardService } from 'app/services/clipboard.service';

@Component({
  selector: 'tpr-nsa',
  standalone: true,
  imports: [TableComponent, MatCardModule],
  providers: [ClipboardService],
  templateUrl: './tpr.page.html',
  styleUrl: './tpr.page.scss',
})
export class TprPage implements OnInit {
  // readonly clipboardService = inject(ClipboardService);

  ngOnInit(): void {
    // this.clipboardService.readClipboard();
  }
}
