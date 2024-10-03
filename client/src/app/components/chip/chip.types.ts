
export const ChipColor = {
  None: 'none',
  Green: 'green',
  Orange: 'orange',
  Red: 'red',
} as const;
export type ChipColor = typeof ChipColor[keyof typeof ChipColor];