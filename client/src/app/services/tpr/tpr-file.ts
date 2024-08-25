import { signal } from '@angular/core';

export const TprFileState = {
  NoFile: 'no_file',
  Loading: 'loading',
  OK: 'ok',
  Error: 'error',
  Warning: 'warning',
} as const;
export type TprFileState = (typeof TprFileState)[keyof typeof TprFileState];

export const TprFileType = {
  XML: 'xml',
} as const;
export type TprFileType = (typeof TprFileType)[keyof typeof TprFileType];

export class TprFile {
  constructor(public readonly fileType: TprFileType, public readonly fileDisplayName: string) {}

  readonly state = signal<TprFileState>(TprFileState.NoFile);

  readonly fileName = signal<string | null>(null);
  readonly fileSize = signal<number | null>(null);
  readonly fileContent = signal<string | null>(null);

  readonly validationData = signal<[string, string] | false | null>(null);
}