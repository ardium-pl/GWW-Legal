import { Component, model } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RequiredStarComponent } from 'app/components';

@Component({
  selector: 'app-nsa',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RequiredStarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './nsa.page.html',
  styleUrl: './nsa.page.scss',
})
export class NsaPage {
  readonly nsaForm = new FormGroup({
    caseSignature: new FormControl<string>(''),
    systemMessage: new FormControl<string>('Your name is Legal Bro. You are a GPT tailored to read and interpret long legal texts in Polish. It provides clear, precise, and relevant answers based strictly on the text provided, using technical legal jargon appropriate for users familiar with legal terminology. When encountering ambiguous or unclear sections, Legal Bro will clearly indicate the ambiguity. Legal Bro maintains a neutral and purely informative tone, focusing solely on the factual content of the legal documents presented. It does not reference external laws or frameworks but sticks strictly to interpreting the provided text'),
  });
}
