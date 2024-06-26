export type NsaFormPart2 = {
  systemMessage: string | null;
  userMessage1: string | null;
  userMessage2: string | null;
  userMessage3: string | null;
};

export const RulingErrorCode = {
  NOT_FOUND_ERR: 'NOT_FOUND_ERR',
  NO_TEXT_ERR: 'NO_TEXT_ERR',
} as const;
export type RulingErrorCode =
  (typeof RulingErrorCode)[keyof typeof RulingErrorCode];

const RULING_ERROR_CODE_MAP = {
  [RulingErrorCode.NOT_FOUND_ERR]: [
    'Nie znaleziono orzeczenia o podanej sygnaturze.',
    'Wyszukaj orzeczenie własnoręcznie i wpisz poniżej:',
  ],
  [RulingErrorCode.NO_TEXT_ERR]: [
    'Znaleziono orzeczenie, ale nie udało się odczytać jego treści.',
    'Spróbuj wyszukać orzeczenie własnoręcznie i wpisać poniżej:',
  ],
};
const DEFAULT_RULING_ERROR_TEXT = [
  'Wystąpił nieznany błąd.',
  'Spróbuj wyszukać orzeczenie własnoręcznie i wpisać poniżej:',
];

export function rulingErrorToText(error: RulingErrorCode): string[] {
  return RULING_ERROR_CODE_MAP[error] || DEFAULT_RULING_ERROR_TEXT;
}
