

export const RequestState = {
  Undefined: 'undefined',
  Success: 'success',
  Pending: 'pending',
  Error: 'error',
} as const;
export type RequestState = typeof RequestState[keyof typeof RequestState];