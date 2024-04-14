import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { NsaFormPart2 } from './nsa.types';

@Injectable({
  providedIn: 'root',
})
export class NsaService {
  private readonly http = inject(HttpClient);

  //! court ruling
  private readonly _isRulingLoading = signal(false);
  public readonly isRulingLoading = computed(() => this._isRulingLoading());

  private readonly _rulingResponse = signal<string[] | null>(null);
  public readonly rulingResponse = computed(() => this._rulingResponse());

  public fetchCourtRuling(caseSignature: string): void {
    this._isRulingLoading.set(true);
    // this.http.post('/api/nsa/query', { caseSignature }).subscribe((res) => {
    //   this._rulingResponse.set(res as string[]);
    //   this._isRulingLoading.set(false);
    // });
    //TODO remove when api is finished
    setTimeout(() => {
      this._isRulingLoading.set(false);
      this._rulingResponse.set([
        '<p>Naczelny Sąd Administracyjny w składzie: Przewodniczący: Sędzia NSA Krzysztof Winiarski, Sędzia NSA Dominik Gajewski, Sędzia WSA (del.) Wojciech Stachurski (sprawozdawca), po rozpoznaniu w dniu 25 sierpnia 2021 r. na posiedzeniu niejawnym w Izbie Finansowej skargi kasacyjnej M.O. od wyroku Wojewódzkiego Sądu Administracyjnego w Łodzi z dnia 17 grudnia 2020 r. sygn. akt I SA/Łd 350/20 w sprawie ze skargi M.O. na decyzję Dyrektora Izby Administracji Skarbowej w Łodzi z dnia 27 maja 2020 r. nr [...] w przedmiocie odpowiedzialności podatkowej osób trzecich uchyla zaskarżony wyrok w całości i przekazuje sprawę do ponownego rozpoznania Wojewódzkiemu Sądowi Administracyjnemu w Łodzi. </p>',
        '<p>1. Wyrok sądu pierwszej instancji.</p><p>Wyrokiem z 17 grudnia 2020 r., I SA/Łd 350/20, Wojewódzki Sąd Administracyjny w Łodzi oddalił skargę M. O. (dalej jako: "Skarżąca") na decyzję Dyrektora Izby Administracji Skarbowej w Łodzi z 27 maja 2020 r., nr [...], w przedmiocie orzeczenia o solidarnej odpowiedzialności za zaległości podatkowe spółki z o.o. E. (dalej "Spółka") w podatku od towarów i usług za sierpień i wrzesień 2014 r. wraz z odsetkami za zwłokę.</p><p>Sąd uznał, że zaskarżona decyzja nie zawiera wad, skutkujących koniecznością wyeliminowania jej z obrotu prawnego. Wskazał, że w dacie powstania nienależnych zwrotów podatku (30 grudnia 2014 r.) Skarżąca pełniła funkcję członka zarządu Spółki, co uprawniło organy do prowadzenia postępowania w przedmiocie przeniesienia odpowiedzialności. Bezskuteczność egzekucji przedmiotowych zaległości z majątku podatnika została stwierdzona postanowieniem Naczelnika Urzędu Skarbowego w Z. z 4 września 2019 r., wobec czego nie podlega dalszemu dowodzeniu w przedmiotowej sprawie. W czasie pełnienia przez Skarżącą funkcji członka zarządu była podstawa do zgłoszenia wniosku o upadłość Spółki, gdyż ta nie wykonywała swoich wymagalnych zobowiązań pieniężnych. Skarżąca nie wskazała mienia, z którego egzekucja umożliwi zaspokojenie zaległości podatkowych spółki co najmniej w znacznej części. Za chybioną uznał argumentację pełnomocnika strony odnoszącą się do doręczenia w trybie art. 70c ustawy z dnia 29 sierpnia 1997 r. – Ordynacja podatkowa (Dz. U. z 2020 r. poz. 1325 z późn. zm., dalej jako: "o.p.") zawiadomienia Naczelnika Urzędu Skarbowego w Z. o zawieszeniu z dniem 28 listopada 2019 r. biegu terminu przedawnienia zobowiązań podatkowych spółki w podatku od towarów i usług za VIII-IX 2014 r. oraz II 2015 r. na skutek wystąpienia przesłanki z art. 70 § 6 pkt 1 o.p.</p><p>Wyrok wraz z uzasadnieniem dostępny jest w Centralnej Bazie Orzeczeń Sądów Administracyjnych (http://orzeczenia.nsa.gov.pl).</p><p>2. Skarga kasacyjna.</p><p>Skargę kasacyjną od wyroku sądu pierwszej instancji złożył pełnomocnik Skarżącej. Zaskarżonemu w całości wyrokowi zarzucił:</p><p>- naruszenie przepisów postępowania, które mogło mieć istotny wpływ na wynik sprawy, a mianowicie art. 141 § 4 ustawy z dnia 30 sierpnia 2002 r. - Prawo o postępowaniu przed sądami administracyjnymi (Dz. U. z 2019 r., poz. 2325 z późn. zm., dalej jako: "p.p.s.a."), poprzez nieodniesienie się w uzasadnieniu zaskarżonego wyroku do wszystkich zarzutów Skarżącej, co uniemożliwia kontrolę instancyjną orzeczenia;</p><p>- naruszenie prawa materialnego, a mianowicie art. 145 § 1 pkt 1 lit. a p.p.s.a. w zw. z art. 70 § 6 pkt 1 w zw. z art. 70 § 1 o.p., przez błędną wykładnię, a w konsekwencji niewłaściwe zastosowanie polegające na przyjęciu, że zobowiązanie podatkowe Spółki nie uległo przedawnieniu, mimo że zawiadomienie o zawieszeniu biegu terminu przedawnienia zobowiązania podatkowego, o którym mowa w art. 70c o.p., nie wywołało skutku prawnego.</p><p>W związku z powyższym pełnomocnik Skarżącej wniósł o uchylenie wyroku w całości i przekazanie sprawy do ponownego rozpoznania WSA w Łodzi oraz przyznanie kosztów nieopłaconej pomocy prawnej udzielonej Skarżącej z urzędu.</p><p>W odpowiedzi na skargę kasacyjną organ wniósł o jej oddalenie oraz zasądzenie kosztów postępowania na rzecz organu.</p><p>3. Naczelny Sąd Administracyjny zważył, co następuje:</p><p>Skarga kasacyjna zasługuje na uwzględnienie.</p><p>W pełni uzasadniony okazał się zarzut naruszenia art. 141 § 4 p.p.s.a. W orzecznictwie przyjmuje się, że przepis ten może być podstawą uwzględnienia skargi kasacyjnej, gdy uzasadnienie orzeczenia nie pozwala jednoznacznie ustalić przesłanek, jakimi kierował się wojewódzki sąd administracyjny, podejmując zaskarżone orzeczenie, a wada ta nie pozwala na kontrolę instancyjną orzeczenia, lub brak jest uzasadnienia któregokolwiek z rozstrzygnięć sądu albo gdy uzasadnienie obejmuje rozstrzygnięcie, którego nie ma w sentencji orzeczenia (zob. wyrok NSA z 5 maja 2021 r., III FSK 90/21; CBOSA).</p><p>Taka sytuacja zachodzi w niniejszej sprawie, bowiem w uzasadnieniu zaskarżonego wyroku zabrakło jakichkolwiek rozważań dotyczących skuteczności zawieszenia biegu terminu przedawnienia zobowiązania podatkowego Spółki w kontekście zarzutu dotyczącego instrumentalnego wszczęcia postępowania karnego skarbowego.</p><p>Należy zwrócić uwagę, że skargę, będącą przedmiotem rozpoznania przez sąd pierwszej instancji, sporządziła samodzielnie Skarżąca, podnosząc w niej zarzuty naruszenia przepisów Kodeksu postępowania administracyjnego, które to przepisy nie miały zastosowania w tej sprawie. W toku postępowania sąd przyznał Skarżącej prawo pomocy, w ramach którego z urzędu ustanowiony został pełnomocnik Skarżącej. W piśmie z 26 września 2020 r. (k. 29 i nast. akt sądowych) sformułował on szereg zarzutów pod adresem organów podatkowych, spośród których sąd odniósł się jedynie do kwestii skutecznego doręczenia w trybie art. 70c o.p. zawiadomienia o zawieszeniu z dniem 28 listopada 2019 r. biegu terminu przedawnienia zobowiązań podatkowych Spółki (s. 8-9 uzasadnienia wyroku). W żaden sposób sąd nie odniósł się natomiast do zarzutu instrumentalnego wszczęcia postępowania karnego skarbowego, co nie pozwala na ustalenie przesłanek, jakimi kierował się, podejmując zaskarżone orzeczenie.</p><p>Kwestia ta ma istotne znaczenie w tej sprawie, bowiem zgodnie z uchwałą NSA z 24 maja 2021 r., I FPS 1/21 (CBOSA), w świetle art. 1 ustawy z dnia 25 lipca 2002 r. - Prawo o ustroju sądów administracyjnych oraz art. 1-3 i art. 134 § 1 p.p.s.a. ocena przesłanek zastosowania przez organy podatkowe przy wydawaniu decyzji podatkowej art. 70 § 6 pkt 1 w zw. z art. 70c o.p. mieści się w granicach sprawy sądowej kontroli legalności tej decyzji. W uzasadnieniu tej uchwały NSA wskazał, że (cyt.): "Analiza dokonywana w ramach rozpatrywania sprawy sądowoadministracyjnej powinna w pierwszym rzędzie koncentrować się na zbadaniu kwestii formalnych związanych z wydaniem we właściwym czasie przez odpowiedni organ postępowania przygotowawczego postanowienia na podstawie art. 303 k.p.k w zw. z art. 113 § 1 k.k.s. o treści, z której wynika związek podejrzenia popełnienia przestępstwa lub wykroczenia z niewykonaniem zobowiązania podatkowego. Nie można jednak w jej ramach pomijać zagadnienia merytorycznego - czy na tle okoliczności danej sprawy podatkowej, związanych z bytem zobowiązania podatkowego, wszczęcie postępowania w sprawie o przestępstwo skarbowe lub wykroczenie skarbowe nie miało pozorowanego charakteru i nie służyło jedynie wstrzymaniu biegu terminu przedawnienia zobowiązania podatkowego. Dokonanie takiej oceny powinno być wcześniej przeprowadzone przez organ podatkowy, stosujący art. 70 § 6 pkt 1 w zw. z art. 70c Ordynacji podatkowej przy rozpatrywaniu sprawy podatkowej. W przypadkach wątpliwych, w szczególności wówczas gdy moment wszczęcia postępowania w sprawie o przestępstwo skarbowe lub wykroczenie skarbowe, jest bliski dacie przedawnienia zobowiązania podatkowego, wyjaśnienie tej kwestii powinno znaleźć odzwierciedlenie w uzasadnieniu decyzji podatkowej, stosownie do art. 210 § 4 Ordynacji podatkowej. Taka informacja jest konieczna aby z jednej strony zagwarantować podatnikowi, że postępowanie podatkowe jest prowadzone w sposób budzący zaufanie do organów podatkowych, zgodnie z art. 121 § 1 tej ustawy. Z drugiej zaś jej zamieszczenie umożliwi następnie dokonanie oceny prawidłowości zastosowania tej instytucji przez sąd administracyjny kontrolujący akt wydany przez organ podatkowy. Sądy administracyjne pierwszej instancji w ramach zakreślonych przez art. 134 § 1 P.p.s.a. mają obowiązek badać czy proceduralna czynność wszczęcia postępowania karnego skarbowego w sprawie o przestępstwo skarbowe lub wykroczenie skarbowe nie została wykorzystana tylko w celu nierozpoczęcia lub zawieszenia biegu terminu przedawnienia. Przeprowadzenie takiego badania jest w istocie możliwe na gruncie sprawy podatkowej. Dopiero bowiem w świetle wszechstronnej analizy okoliczności konkretnej sprawy podatkowej, związanych najczęściej ze zbliżającym się upływem terminu przedawnienia zobowiązania podatkowego, podejmowanymi wcześniej w postępowaniu podatkowym czynnościami dowodowymi i aktywnością prowadzącego je organu podatkowego, można ustalić czy instytucji wszczęcia postępowania w sprawie o przestępstwo skarbowe lub wykroczenie skarbowe nie wykorzystano jedynie do instrumentalnego wywołania skutku w postaci nierozpoczęcia lub zawieszenia biegu terminu przedawnienia zobowiązania podatkowego. (...) W przypadku pogłębionej oceny stosowania art. 70 § 6 pkt 1 w zw. z art. 70c Ordynacji podatkowej sąd administracyjny badałby tylko czy nie doszło do instrumentalnego zastosowania prawa z punktu widzenia nierozpoczęcia lub zawieszenia biegu terminu przedawnienia zobowiązania podatkowego. Nie oceniałby wprost ani czasu, ani zasadności wszczęcia postępowania karnego skarbowego z punktu widzenia sprawy karnej skarbowej."</p><p>Sąd pierwszej instancji podobnej analizy nie dokonał. Z uzasadnienia wyroku nie wynika, by poddał ocenie takie okoliczności jak zbliżający się termin upływu zobowiązania podatkowego, podejmowane przez organ podatkowy czynności dowodowe czy ogólną aktywność organu w prowadzonym postępowaniu, które to mogłyby pomóc w ustaleniu realnych intencji przyświecających wszczęciu postępowania karnego skarbowego. Tym samym w sprawie doszło do naruszenia art. 141 § 4 p.p.s.a., dającego podstawę do uchylenia zaskarżonego wyroku.</p><p>Przedwczesne jest natomiast wypowiadanie się w kwestii naruszenia art. 70 § 6 pkt 1 w zw. z art. 70 § 1 o.p., przez błędną wykładnię, a w konsekwencji niewłaściwe zastosowanie tych przepisów, polegające na przyjęciu, że zobowiązanie podatkowe Spółki nie uległo przedawnieniu. Ocena tego zarzutu wymaga uprzedniej wypowiedzi sądu pierwszej instancji w kwestii ewentualnego instrumentalnego wszczęcia postępowania karnego skarbowego i jego wpływu na bieg terminu przedawnienia zobowiązania podatkowego.</p><p>Z tych względów Naczelny Sąd Administracyjny na podstawie art. 185 § 1 p.p.s.a. orzekł o uchyleniu zaskarżonego wyroku w całości i przekazaniu sprawy do ponownego rozpatrzenia sądowi pierwszej instancji.</p><p>Zgodnie z art. 254 § 1 p.p.a.s., sąd pierwszej instancji rozpozna też wniosek pełnomocnika Skarżącej o przyznanie kosztów nieopłaconej pomocy prawnej udzielonej z urzędu.</p><p>s. Wojciech Stachurski s. Krzysztof Winiarski s. Dominik Gajewski </p>',
      ]);
    }, 2000);
  }

  //! gpt answers to user messages
  private readonly _gptAnswersProgress = signal<boolean[]>([]);
  public readonly gptAnswersProgress = computed(() =>
    this._gptAnswersProgress(),
  );
  public readonly areGptAnswersReady = computed(() =>
    this._gptAnswersProgress().every((v) => v === true),
  );

  private readonly _gptAnswersResponse = signal<
    { question: string; response: string | null }[] | null
  >(null);
  public readonly gptAnswersResponse = computed(() =>
    this._gptAnswersResponse(),
  );

  private getCleanCourtRuling(): string | undefined {
    return this.rulingResponse()
      ?.map((v) => v.replace(/<\/?p>/g, ''))
      .join('\n');
  }

  public async fetchGptAnswers(formOutput: NsaFormPart2) {
    this.resetAdditionalAnswer();

    this._gptAnswersProgress.set([false, false, false]);
    await Promise.all([
      new Promise<void>((res) =>
        setTimeout(
          () => {
            this._gptAnswersProgress.update((v) => [true, v[1], v[2]]);
            res();
          },
          Math.random() * 2000 + 1000,
        ),
      ),
      new Promise<void>((res) =>
        setTimeout(
          () => {
            this._gptAnswersProgress.update((v) => [v[0], true, v[2]]);
            res();
          },
          Math.random() * 2000 + 1500,
        ),
      ),
      new Promise<void>((res) =>
        setTimeout(
          () => {
            this._gptAnswersProgress.update((v) => [v[0], v[1], true]);
            res();
          },
          Math.random() * 3000 + 500,
        ),
      ),
    ]);
    this._gptAnswersResponse.set([
      { question: 'foo', response: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
      { question: 'bar', response: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
      { question: 'baz', response: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
    ]);
  }

  //! additional answer
  private readonly _isAdditionalAnswerLoading = signal(false);
  public readonly isAdditionalAnswerLoading = computed(() => this._isAdditionalAnswerLoading());

  private readonly _additionalAnswerResponse = signal<string | null>(null);
  public readonly additionalAnswerResponse = computed(() => this._additionalAnswerResponse());

  private resetAdditionalAnswer(): void {
    this._isAdditionalAnswerLoading.set(false);
    this._additionalAnswerResponse.set(null);
  }

  public fetchAdditionalAnswer(systemMessage: string, userMessage: string): void {
    this._isAdditionalAnswerLoading.set(true);
    // this.http.post('/api/nsa/additional_question', { systemMessage, userMessage }).subscribe((res) => {
    //   this._additionalAnswerResponse.set(res as string);
    //   this._isAdditionalAnswerLoading.set(false);
    // });
    //TODO remove when api is finished
    setTimeout(() => {
      this._isAdditionalAnswerLoading.set(false);
      this._additionalAnswerResponse.set('Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore placeat repellat, dolor maiores nostrum incidunt deserunt provident, cum quidem cupiditate nisi beatae exercitationem, commodi numquam illo nam excepturi doloremque tempora.');
    }, 2000);
  }
}
