import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RequiredStarComponent } from 'app/components';
import { NsaService } from 'app/services';

const DEFAULT_SYSTEM_MESSAGE =
  'Your name is Legal Bro. You are a GPT tailored to read and interpret long legal texts in Polish. It provides clear, precise, and relevant answers based strictly on the text provided, using technical legal jargon appropriate for users familiar with legal terminology. When encountering ambiguous or unclear sections, Legal Bro will clearly indicate the ambiguity. Legal Bro maintains a neutral and purely informative tone, focusing solely on the factual content of the legal documents presented. It does not reference external laws or frameworks but sticks strictly to interpreting the provided text';

const DEFAULT_USER_MESSAGES = [
  'Czy mógłbyś proszę powiedzieć na podstawie poniższego orzeczenia czy Naczelny Sąd Administracyjny (NSA) oddalił sprawę do dalszego zbadania czy sam rozstrzygnął jej wynik?\n\nPodaj pełną odpowiedź a 2 linijki pod nią podsumuj w jednym zdaniu czy NSA merytorycznie rozstrzygnął sprawę?\n\nOrzeczenie:',
  'Na podstawie poniższego orzeczenia NSA napisz proszę harmonogram zdarzeń. Harmonogram musi zaczynać się od wszczęcia kontroli skarbowej. Harmonogram musi uwzględnić datę zawieszenia terminu przedawnienia zobowiązania podatkowego.\n\nOrzeczenie:',
  'Na podstawie poniższego orzeczenia Naczelnego Sądu Administracyjnego napisz proszę jakie zarzuty wniósł skarżący w sprawie rozpatrywanej przez NSA.\n\nOrzeczenie:',
];

@Component({
  selector: 'app-nsa',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RequiredStarComponent,
    ReactiveFormsModule,
  ],
  providers: [NsaService],
  templateUrl: './nsa.page.html',
  styleUrl: './nsa.page.scss',
})
export class NsaPage {

  readonly nsaService = inject(NsaService);

  readonly nsaForm = new FormGroup({
    caseSignature: new FormControl<string>('', [
      Validators.required,
    ]),
    systemMessage: new FormControl<string>(DEFAULT_SYSTEM_MESSAGE),
    userMessage1: new FormControl<string>(DEFAULT_USER_MESSAGES[0]),
    userMessage2: new FormControl<string>(DEFAULT_USER_MESSAGES[1]),
    userMessage3: new FormControl<string>(DEFAULT_USER_MESSAGES[2]),
  });

  get isResetButtonActiveSystem(): boolean {
    return this.nsaForm.controls.systemMessage.value !== DEFAULT_SYSTEM_MESSAGE;
  }
  get isResetButtonActiveUser(): boolean {
    return (
      this.nsaForm.controls.userMessage1.value !== DEFAULT_USER_MESSAGES[0] ||
      this.nsaForm.controls.userMessage2.value !== DEFAULT_USER_MESSAGES[1] ||
      this.nsaForm.controls.userMessage3.value !== DEFAULT_USER_MESSAGES[2]
    );
  }

  getCourtRuling(): void {
    if (!this.nsaForm.controls.caseSignature.valid) {
      return;
    }
    this.nsaService.fetchCourtRuling(
      this.nsaForm.controls.caseSignature.value!
    );
  }
}
