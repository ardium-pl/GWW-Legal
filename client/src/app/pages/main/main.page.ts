import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from 'app/components/card/card.component';
import { TprCompanyDataService } from 'app/services/tpr/tpr-company-data.service';

@Component({
  selector: '_main-page',
  standalone: true,
  imports: [RouterModule, CardComponent],
  templateUrl: './main.page.html',
  styleUrl: './main.page.scss',
})
export class MainPage {
  showTprOptions = false;
  readonly tprCompanyDataService = inject(TprCompanyDataService);
}
