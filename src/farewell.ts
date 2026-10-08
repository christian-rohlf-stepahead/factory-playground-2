export type FarewellLang = 'en' | 'fr';

export interface FarewellOptions {
  lang?: FarewellLang;
}

/** The farewell for `name`. */
export function farewell(name: string, options: FarewellOptions = {}): string {
  return `Goodbye, ${name}!`;
}
