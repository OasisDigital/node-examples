export interface Message {
  key?: number;
  text: string;
}

export const OK = null;

export function languageCheck(text: string): string | typeof OK {
  if (text.toLowerCase().indexOf('cat') >= 0) {
    return 'Cats may not be discussed.';
  }
  return OK;
}
