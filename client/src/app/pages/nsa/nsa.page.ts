import {
  Component,
  ElementRef,
  OnInit,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipModule,
} from '@angular/material/tooltip';
import { IconComponent, RequiredStarComponent } from 'app/components';
import { SearchFabComponent } from 'app/components/search-fab/search-fab.component';
import { NsaService } from 'app/services';
import { NsaFormPart2 } from 'app/services/nsa/nsa.utils';
import { SearchService } from 'app/services/search/search.service';
import { RequestState } from 'app/services/types';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';

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
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    IconComponent,
    MatTooltipModule,
    MarkdownModule,
    MatCheckboxModule,
    SearchFabComponent,
  ],
  providers: [
    NsaService,
    SearchService,
    provideMarkdown(),
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { showDelay: 600 } },
  ],
  templateUrl: './nsa.page.html',
  styleUrl: './nsa.page.scss',
})
export class NsaPage implements OnInit {
  readonly nsaService = inject(NsaService);
  readonly searchService = inject(SearchService);

  readonly nsaFormPart1 = new FormGroup({
    caseSignature: new FormControl<string>('', [Validators.required]),
    rulingText: new FormControl<string>(''),
  });
  readonly nsaFormPart2 = new FormGroup({
    systemMessage: new FormControl<string>(DEFAULT_SYSTEM_MESSAGE, [
      Validators.required,
    ]),
    userMessage1: new FormControl<string>(DEFAULT_USER_MESSAGES[0], [
      Validators.required,
    ]),
    userMessage2: new FormControl<string>(DEFAULT_USER_MESSAGES[1], [
      Validators.required,
    ]),
    userMessage3: new FormControl<string>(DEFAULT_USER_MESSAGES[2], [
      Validators.required,
    ]),
  });
  readonly nsaFormPart3 = new FormGroup({
    additionalQuestion: new FormControl<string | null>(null, [
      Validators.required,
    ]),
  });

  ngOnInit(): void {
    this.nsaFormPart2.markAsDirty();
    this.showGptResultsImmediately.set(
      localStorage.getItem('showGptResultsImmediately') === 'true',
    );
  }

  readonly additionalQuestions = [
    {
      value:
        'Na podstawie poniższego orzeczenia Naczelnego Sądu Administracyjnego napisz proszę jak NSA uargumentował swoją decyzję.\n\nOrzeczenie:',
      label: 'swoją decyzję',
    },
    {
      value:
        'Na podstawie poniższego orzeczenia Naczelnego Sądu Administracyjnego napisz proszę jak NSA uargumentował oddalenie sprawy do dalszego rozpatrzenia.\n\nOrzeczenie:',
      label: 'oddalenie sprawy do dalszego rozpatrzenia',
    },
  ];

  get isResetButtonActiveSystem(): boolean {
    return (
      this.nsaFormPart2.controls.systemMessage.value !== DEFAULT_SYSTEM_MESSAGE
    );
  }
  get isResetButtonActiveUser(): boolean {
    return (
      this.nsaFormPart2.controls.userMessage1.value !==
        DEFAULT_USER_MESSAGES[0] ||
      this.nsaFormPart2.controls.userMessage2.value !==
        DEFAULT_USER_MESSAGES[1] ||
      this.nsaFormPart2.controls.userMessage3.value !== DEFAULT_USER_MESSAGES[2]
    );
  }

  getCourtRuling(): void {
    if (!this.nsaFormPart1.controls.caseSignature.valid) {
      return;
    }
    this.nsaService.fetchCourtRuling(
      this.nsaFormPart1.controls.caseSignature.value!,
    );
    this.nsaFormPart1.markAsPristine();
  }

  fetchGptAnswers(): void {
    if (this.disabledNextPage()) return;

    const values = this.nsaFormPart2.value;
    if (this.nsaFormPart2.dirty) {
      this.nsaService.fetchGptAnswers(values as NsaFormPart2);
      this.nsaFormPart3.reset();
    }
    this.nsaFormPart2.markAsPristine();
    this.nextPage();
  }

  fetchAdditionalAnswer(): void {
    if (!this.nsaFormPart3.valid) return;

    this.nsaFormPart3.markAsPristine();

    this.nsaService.fetchAdditionalAnswer(
      this.nsaFormPart2.controls.systemMessage.value!,
      this.nsaFormPart3.value.additionalQuestion!,
    );
  }

  constructor() {
    effect(() => {
      // case signature
      if (
        this.nsaService.isRulingLoading() ||
        this.nsaService.rulingRequestState() === RequestState.Error
      ) {
        this.nsaFormPart1.controls.caseSignature.disable();
      } else {
        this.nsaFormPart1.controls.caseSignature.enable();
      }
    });
    effect(() => {
      // additional question
      if (this.nsaService.isAdditionalAnswerLoading()) {
        this.nsaFormPart3.controls.additionalQuestion.disable();
      } else {
        this.nsaFormPart3.controls.additionalQuestion.enable();
      }
    });
    //store last value of showGptResultsImmediately in localStorage
    effect(() => {
      localStorage.setItem(
        'showGptResultsImmediately',
        this.showGptResultsImmediately().toString(),
      );
    });
    //reset wasShowGptResultsImmediatelyChangedDuringPending when results are loaded
    effect(
      () => {
        if (
          this.wasShowGptResultsImmediatelyChangedDuringPending() &&
          this.nsaService.areGptAnswersReady()
        ) {
          this.wasShowGptResultsImmediatelyChangedDuringPending.set(false);
        }
      },
      { allowSignalWrites: true },
    );
    //   disable wasShowGptResultsImmediatelyChangedDuringPending when:
    // - showGptResultsImmediately is turned on and
    // - at least one answer is already loaded
    effect(
      () => {
        if (
          this.showGptResultsImmediately() &&
          this.nsaService.isAtLeastOneGptAnswerReady()
        ) {
          this.wasShowGptResultsImmediatelyChangedDuringPending.set(true);
        }
      },
      { allowSignalWrites: true },
    );
    //copy ruling into search service
    effect(
      () => {
        this.searchService.searchText.set(
          this.nsaService.rulingResponse() ?? '',
        );
      },
      { allowSignalWrites: true },
    );
    //scroll to highlighted part
    effect(() => {
      //for detecting changes to highlighted text
      this.searchService.highlightedText();

      setTimeout(() => {
        this._scrollToCurrentMark();
      }, 0);
    });
  }

  private _scrollToCurrentMark(): void {
    this.rulingTextEl()
      ?.nativeElement.querySelector('mark.current')
      ?.scrollIntoView();
  }

  //! search
  readonly rulingTextEl = viewChild<ElementRef<HTMLElement>>('rulingTextEl');

  onSearchChange(phrase: string): void {
    this.searchService.searchPhrase.set(phrase);

    setTimeout(() => {
      if (this.searchService.total() && this.currentPagerPage() !== 0) {
        this.searchService.next();
        this.currentPagerPage.set(0);
        this._scrollToCurrentMark();
      }
    }, 0);
  }

  //! show immediately checkbox
  readonly showGptResultsImmediately = signal<boolean>(false);
  readonly wasShowGptResultsImmediatelyChangedDuringPending =
    signal<boolean>(false);

  onShowImmediatelyChange(value: boolean): void {
    if (value || this.nsaService.isAtLeastOneGptAnswerReady()) {
      this.showGptResultsImmediately.set(value);
    }
    if (value) {
      this.wasShowGptResultsImmediatelyChangedDuringPending.set(
        this.nsaService.isAtLeastOneGptAnswerReady(),
      );
    }
  }

  //! button tooltips
  getCourtRulingButtonTooltip(): string {
    if (this.nsaService.isRulingLoading()) return 'Wyszukiwanie...';
    if (!this.nsaFormPart1.valid) return 'Najpierw podaj sygnaturę sprawy';
    if (!this.nsaFormPart1.dirty)
      return 'Zmień sygnaturę sprawy, aby wyszukać ponownie';
    return '';
  }
  getAdditionalAnswerButtonTooltip(): string {
    if (!this.nsaFormPart3.valid) return 'Najpierw wybierz rodzaj pytania';
    if (!this.nsaFormPart3.dirty)
      return 'Zmień rodzaj pytania, aby zapytać ponownie';
    return '';
  }

  //! pager
  readonly currentPagerPage = signal<number>(0);

  disabledNextPage() {
    const page = this.currentPagerPage();
    switch (page) {
      case 0:
        return (
          this.nsaService.rulingRequestState() !== RequestState.Success &&
          !this.nsaFormPart1.controls.rulingText.value
        );
      case 1:
        return !this.nsaFormPart2.valid;
      case 2:
        return true;
    }
    console.warn('Encountered page that has no disabled condition defined.');
    return false;
  }

  part1NextPage(): void {
    if (this.nsaService.rulingRequestState() === 'error') {
      this.nsaService.setManualCourtRuling(
        this.nsaFormPart1.controls.rulingText.value!,
      );
    }
    this.nextPage();
  }

  nextPage(): void {
    this.currentPagerPage.update((v) => v + 1);
  }
  prevPage(): void {
    this.currentPagerPage.update((v) => v - 1);
  }
}
