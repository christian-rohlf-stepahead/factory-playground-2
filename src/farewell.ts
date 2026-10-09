export type FarewellLang = 'en' | 'fr' | 'pl' | 'es';

export interface FarewellOptions {
  lang?: FarewellLang;
}

// TODO(I-4/W1): 'es' is a type-only stub for the acceptance tests; the wording is not yet implemented.
const GREETINGS: Record<FarewellLang, string> = {
  en: 'Goodbye',
  fr: 'Au revoir',
  pl: 'Do widzenia',
  es: 'TODO-ES-NOT-IMPLEMENTED',
};

/** The farewell for `name`. */
export function farewell(name: string, options: FarewellOptions = {}): string {
  const { lang = 'en' } = options;
  return `${GREETINGS[lang]}, ${name}!`;
}
