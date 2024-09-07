import { Component, ElementRef, OnDestroy, OnInit, computed, effect, inject, signal, viewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
  IconComponent,
  RequiredStarComponent,
} from 'app/components';
import {
  GptConversationDialogComponent,
  GptConversationDialogData,
} from 'app/components/gpt-conversation-dialog/gpt-conversation-dialog.component';
import { SearchFabComponent } from 'app/components/search-fab/search-fab.component';
import {
  UserQuestionDialogComponent,
  UserQuestionDialogData,
} from 'app/components/user-question-dialog/user-question-dialog.component';
import { NsaService } from 'app/services';
import { MixpanelService } from 'app/services/mixpanel.service';
import { GptConversation } from 'app/services/nsa/gpt-conversation';
import { NsaFormPart2, UserMessageData, UserMessageDialogFormData } from 'app/services/nsa/nsa.utils';
import { SearchService } from 'app/services/search/search.service';
import { RequestState } from 'app/services/types';
import { CustomValidators } from 'app/utils/validators';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { isDefined, isNull } from 'simple-bool';

const DEFAULT_SYSTEM_MESSAGE =
  'Your name is Legal Bro. You are a GPT tailored to read and interpret long legal texts in Polish. It provides clear, precise, and relevant answers based strictly on the text provided, using technical legal jargon appropriate for users familiar with legal terminology. When encountering ambiguous or unclear sections, Legal Bro will clearly indicate the ambiguity. Legal Bro maintains a neutral and purely informative tone, focusing solely on the factual content of the legal documents presented. It does not reference external laws or frameworks but sticks strictly to interpreting the provided text';

@Component({
  selector: 'app-nsa',
  standalone: true,
  providers: [NsaService, provideMarkdown(), { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { showDelay: 600 } }],
  templateUrl: './nsa.page.html',
  styleUrl: './nsa.page.scss',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    RequiredStarComponent,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRadioModule,
    IconComponent,
    MatTooltipModule,
    MarkdownModule,
    MatCheckboxModule,
    SearchFabComponent,
    MatIconModule,
    RouterModule,
  ],
})
export class NsaPage implements OnInit, OnDestroy {
  readonly nsaService = inject(NsaService);
  readonly searchService = inject(SearchService);
  readonly dialog = inject(MatDialog);
  readonly mixpanelService = inject(MixpanelService);

  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);

  readonly nsaFormPart1 = new FormGroup({
    caseSignature: new FormControl<string>('', [Validators.required]),
    rulingText: new FormControl<string>(''),
  });
  readonly nsaFormPart2 = new FormGroup({
    systemMessage: new FormControl<string>(DEFAULT_SYSTEM_MESSAGE, [Validators.required]),
    userMessages: new FormArray<FormControl<number | null>>(
      [],
      [CustomValidators.minChildren(1), CustomValidators.minChildrenFilled(1)]
    ),
  });

  readonly caseSigntaureInput = viewChild<ElementRef<HTMLInputElement>>('caseSigntaureInput');

  get isFindCaseButtonDisabled(): boolean {
    return this.nsaService.isRulingLoading() || !this.nsaFormPart1.valid || !this.nsaFormPart1.dirty;
  }

  ngOnInit() {
    this.showGptResultsImmediately.set(localStorage.getItem('showGptResultsImmediately') === 'true');
    this.isSystemMessagePanelExpanded.set(localStorage.getItem('isSystemMessagePanelExpanded') === 'true');

    this.nsaService.fetchUserMessages();
  }

  readonly isFromBrowser = signal<boolean>(false);

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
    return this.nsaFormPart2.controls.systemMessage.value !== DEFAULT_SYSTEM_MESSAGE;
  }

  getCourtRuling(): void {
    if (!this.nsaFormPart1.controls.caseSignature.valid) {
      return;
    }
    this.router.navigate([], { queryParams: { signature: this.nsaFormPart1.controls.caseSignature.value } });
  }

  fetchGptAnswers(): void {
    if (this.disabledNextPage()) return;

    for (let i = 0; i < this.nsaFormPart2.controls.userMessages.length; i++) {
      const control = this.nsaFormPart2.controls.userMessages.at(i);
      if (control.value) continue;

      this.nsaFormPart2.controls.userMessages.removeAt(i);
      i--;
    }

    this.nsaService.fetchGptAnswers(this.nsaFormPart2.value as NsaFormPart2);
    this.nextPage();
  }

  constructor() {
    effect(() => {
      // case signature
      if (this.nsaService.isRulingLoading() || this.nsaService.rulingRequestState() === RequestState.Error) {
        this.nsaFormPart1.controls.caseSignature.disable();
      } else {
        this.nsaFormPart1.controls.caseSignature.enable();
      }
    });
    //store last value of showGptResultsImmediately in localStorage
    effect(() => {
      localStorage.setItem('showGptResultsImmediately', this.showGptResultsImmediately().toString());
    });
    effect(() => {
      localStorage.setItem('isSystemMessagePanelExpanded', this.isSystemMessagePanelExpanded().toString());
    });
    //reset wasShowGptResultsImmediatelyChangedDuringPending when results are loaded
    effect(
      () => {
        if (this.wasShowGptResultsImmediatelyChangedDuringPending() && this.nsaService.areGptAnswersReady()) {
          this.wasShowGptResultsImmediatelyChangedDuringPending.set(false);
        }
      },
      { allowSignalWrites: true }
    );
    //   disable wasShowGptResultsImmediatelyChangedDuringPending when:
    // - showGptResultsImmediately is turned on and
    // - at least one answer is already loaded
    effect(
      () => {
        if (this.showGptResultsImmediately() && this.nsaService.isAtLeastOneGptAnswerReady()) {
          this.wasShowGptResultsImmediatelyChangedDuringPending.set(true);
        }
      },
      { allowSignalWrites: true }
    );
    //copy ruling into search service
    effect(
      () => {
        this.searchService.searchText.set(this.nsaService.getCleanCourtRuling() ?? '');
      },
      { allowSignalWrites: true }
    );
    //scroll to highlighted part
    effect(() => {
      //for detecting changes to highlighted text
      this.searchService.highlightedText();

      setTimeout(() => {
        this._scrollToCurrentMark();
      }, 0);
    });
    effect(
      () => {
        if (
          this.isFromBrowser() &&
          (this.nsaService.rulingRequestState() == RequestState.Success ||
            this.nsaService.rulingRequestState() == RequestState.Error) &&
          this.nsaService.gptAnswersProgress().length > 0
        ) {
          this.currentPagerPage.set(2);
        }
      },
      { allowSignalWrites: true }
    );
    //subscribe to ctrl+f
    effect(onCleanup => {
      const sub = this.searchService.ctrlFObservable()?.subscribe(() => {
        this.currentPagerPage.set(0);
        this._scrollToCurrentMark();
        if (isNull(this.searchService.current())) {
          this.searchService.current.set(1);
        }
      });
      onCleanup(() => {
        sub?.unsubscribe();
      });
    });

    this.route.queryParams.subscribe(async params => {
      const isFromBrowser = params['isFromBrowser'];
      if (isFromBrowser) {
        this.isFromBrowser.set(true);
        this.router.navigate([], { queryParams: { isFromBrowser: null }, queryParamsHandling: 'merge' });
        return;
      }
      const signature = params['signature'];
      if (!signature) return;

      this.nsaFormPart1.setValue({ caseSignature: signature, rulingText: null });
      this.mixpanelService.track('Orzeczenia');
      this.nsaFormPart1.markAsPristine();
      const isRulingResponseOk = await this.nsaService.fetchCourtRuling(
        this.nsaFormPart1.controls.caseSignature.value!
      );

      if (!this.isFromBrowser() || !isRulingResponseOk) {
        return;
      }

      const { systemMessage, messages } = params;

      this.router.navigate([], { queryParams: { systemMessage: null, messages: null }, queryParamsHandling: 'merge' });
      if (typeof systemMessage !== 'string' || !messages) return null;

      const messagesArr = typeof messages === 'string' ? [messages] : messages;

      this.nsaFormPart2.controls.systemMessage.setValue(systemMessage);

      for (const message of messagesArr) {
        this.addNewQuestion(message);
      }

      this.fetchGptAnswers();
      return;
    });
  }

  private _scrollToCurrentMark(): void {
    this.rulingTextEl()?.nativeElement.querySelector('mark.current')?.scrollIntoView();
  }

  //! questions
  readonly isSystemMessagePanelExpanded = signal<boolean>(false);

  readonly userMessageOptions = this.nsaService.userMessagesResponse;

  readonly openUserMessageSelect = signal<number | null>(null);

  isControlLoading(control: FormControl<number | null>): boolean {
    return !!control.value && this.nsaService.loadingSingleUserMessage() === control.value;
  }

  getOptionsAvailableForSelect(index: number, controlValue: number | null): UserMessageData[] {
    return (
      this.userMessageOptions()?.filter(
        opt => !Object.values(this.nsaService.isUserMessageSelected()).includes(opt.id) || opt.id === controlValue
      ) ?? []
    );
  }
  isNoOptionsAvailable() {
    const opts = this.userMessageOptions()?.length;
    return isDefined(opts) && this.nsaFormPart2.controls.userMessages.length > opts;
  }

  addNewQuestion(defaultValue: number | null = null) {
    const messageData = defaultValue ? (this.userMessageOptions()?.find(v => v.id === defaultValue) ?? null) : null;
    this.nsaFormPart2.controls.userMessages.push(new FormControl<number | null>(messageData?.id ?? null));
  }
  onDeleteQuestionClick(index: number) {
    this.nsaFormPart2.controls.userMessages.removeAt(index);
    this.nsaService.isUserMessageSelected.update(v => {
      delete v[index];
      return { ...v };
    });
  }
  onEditQuestionClick(id: number | null) {
    if (!id) return;

    const userMessage = this.nsaService.userMessagesResponse()!.find(v => v.id === id)!;

    const dialogRef = this.dialog.open<UserQuestionDialogComponent, UserQuestionDialogData, UserMessageDialogFormData>(
      UserQuestionDialogComponent,
      {
        data: {
          editedMessageId: id,
          shortMessage: userMessage.shortMessage,
          message: userMessage.message,
        },
      }
    );
    dialogRef.afterClosed().subscribe(async formData => {
      if (!formData) return;

      const success = await this.nsaService.updateUserMessage(formData, id);
      if (!success) return;

      this.nsaService.manuallyUpdateUserMessage({ ...formData, id });
    });
  }
  updateUserMessageSelectedState(index: number, control: FormControl<number | null>) {
    const value = this.nsaFormPart2.controls.userMessages.at(index).value;
    if (value !== -1) return;

    const dialogRef = this.dialog.open<UserQuestionDialogComponent, UserQuestionDialogData, UserMessageDialogFormData>(
      UserQuestionDialogComponent,
      {
        data: {
          editedMessageId: null,
          shortMessage: null,
          message: null,
        },
      }
    );
    dialogRef.afterClosed().subscribe(formData => {
      if (!formData) {
        setTimeout(() => {
          control.setValue(null);
        }, 0);
        return;
      }

      this.nsaService.createUserMessage(formData, ({ id }) => {
        if (!id) {
          setTimeout(() => {
            control.setValue(null);
          }, 0);
          return;
        }
        const messageData = { ...formData, id };

        this.nsaService.manuallyAddUserMessage(messageData);

        setTimeout(() => {
          control.setValue(id);
        }, 0);
      });
    });
  }
  onUserMessageSelectChange(index: number, value: number) {
    if (value === -1) return;

    this.nsaService.markUserMessageControlAsChanged(index);

    this.nsaService.isUserMessageSelected.update(v => {
      v[index] = value;
      return v;
    });
  }
  // TODO
  // snackbars

  //! search
  readonly rulingTextEl = viewChild<ElementRef<HTMLElement>>('rulingTextEl');
  readonly formPart3El = viewChild<ElementRef<HTMLElement>>('formPart3');

  onSearchChange(phrase: string): void {
    this.searchService.searchPhrase.set(phrase);
    this.searchService.current.set(1);

    setTimeout(() => {
      if (this.searchService.total() && this.currentPagerPage() !== 0) {
        this.searchService.current.set(1);
        this.currentPagerPage.set(0);
        this._scrollToCurrentMark();
      }
    }, 0);
  }

  ngOnDestroy(): void {}

  //! show immediately checkbox
  readonly showGptResultsImmediately = signal<boolean>(false);
  readonly wasShowGptResultsImmediatelyChangedDuringPending = signal<boolean>(false);

  onShowImmediatelyChange(value: boolean): void {
    if (!value) return;

    if (this.nsaService.isAtLeastOneGptAnswerReady()) {
      this.showGptResultsImmediately.set(value);
    }
    this.wasShowGptResultsImmediatelyChangedDuringPending.set(this.nsaService.isAtLeastOneGptAnswerReady());
  }

  //! additional conversation
  readonly currentConversation = signal<GptConversation | undefined>(undefined);
  onClickOpenConversation(index: number) {
    this.currentConversation.set(this.nsaService.conversations().at(index));
    this.dialog.open(GptConversationDialogComponent, {
      autoFocus: '#conversation-dialog-input',
      data: {
        conversationIndex: index,
        nsaServiceInstance: this.nsaService,
      } as GptConversationDialogData,
    });
  }

  //! button tooltips
  getCourtRulingButtonTooltip(): string {
    if (this.nsaService.isRulingLoading()) return 'Wyszukiwanie...';
    if (!this.nsaFormPart1.valid) return 'Najpierw podaj sygnaturę sprawy';
    if (!this.nsaFormPart1.dirty) return 'Zmień sygnaturę sprawy, aby wyszukać ponownie';
    return '';
  }

  //! pager
  readonly currentPagerPage = signal<number>(0);

  readonly visiblePrevPage = computed(() => this.currentPagerPage() > 0);
  readonly visibleNextPage = computed(() => this.currentPagerPage() !== 2);

  disabledNextPage() {
    const page = this.currentPagerPage();
    switch (page) {
      case 0:
        return (
          this.nsaService.rulingRequestState() !== RequestState.Success && !this.nsaFormPart1.controls.rulingText.value
        );
      case 1:
        return !this.nsaFormPart2.valid;
      case 2:
        return true;
    }
    console.warn('Encountered page that has no disabled condition defined.');
    return false;
  }

  nextPage(): void {
    this.currentPagerPage.update(v => v + 1);

    if (this.currentPagerPage() === 0) {
      if (this.nsaService.rulingRequestState() === 'error') {
        this.nsaService.setManualCourtRuling(this.nsaFormPart1.controls.rulingText.value!);
      }
    }
  }
  prevPage(): void {
    this.currentPagerPage.update(v => v - 1);
  }

  part1NextPage(): void {
    if (this.nsaService.rulingRequestState() === 'error') {
      this.nsaService.setManualCourtRuling(this.nsaFormPart1.controls.rulingText.value!);
    }
    this.nextPage();
  }
  part2NextPageTooltip(): string {
    if (!this.nsaFormPart2.controls.systemMessage.valid) {
      return 'System message musi być sprecyzowany!';
    }
    if (
      this.nsaFormPart2.controls.userMessages.length === 0 ||
      (this.nsaFormPart2.controls.userMessages.length === 1 && !this.nsaFormPart2.controls.userMessages.at(0).valid)
    )
      return 'Dodaj przynajmniej jedno pytanie';
    return '';
  }

  //! resetting
  onClickResetButton() {
    if (!this.nsaService.areGptAnswersReady()) {
      this.showResetConfirmDialog();
      return;
    }

    this._resetForm();
  }

  showResetConfirmDialog() {
    const dialogRef = this.dialog.open<ConfirmationDialogComponent, ConfirmationDialogData>(
      ConfirmationDialogComponent,
      {
        data: {
          title: 'rozpocząć od nowa?',
          swapButtonColors: true,
          description:
            'Niektóre odpowiedzi od AI nie zostały jeszcze załadowane. Po rozpoczęciu od nowa wszelkie prośby o odpowiedź zostaną anulowane.',
        },
      }
    );

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;

      this._resetForm();
    });
  }

  private _resetForm() {
    this.nsaService.resetData();

    this.router.navigate([], { queryParams: { signature: null } });

    this.nsaFormPart1.controls.rulingText.reset();
    this.nsaFormPart2.reset({
      systemMessage: DEFAULT_SYSTEM_MESSAGE,
      userMessages: [],
    });

    while (this.nsaFormPart2.controls.userMessages.controls.length) {
      this.nsaFormPart2.controls.userMessages.removeAt(0);
    }

    this.wasShowGptResultsImmediatelyChangedDuringPending.set(false);
    this.currentPagerPage.set(0);

    // execute after all other code has finished executing
    setTimeout(() => {
      this.nsaFormPart1.controls.caseSignature.setErrors(null);
      this.nsaFormPart1.controls.caseSignature.markAsDirty();

      const inputEl = this.caseSigntaureInput()!.nativeElement;
      inputEl.focus();
      inputEl.setSelectionRange(0, inputEl.value.length);
    }, 0);
  }
}
