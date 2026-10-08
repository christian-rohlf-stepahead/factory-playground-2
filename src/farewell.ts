export type FarewellLang = 'en' | 'fr' | 'pl';

export interface FarewellOptions {
  lang?: FarewellLang;
}

const GREETINGS: Record<FarewellLang, string> = {
  en: 'Goodbye',
  fr: 'Au revoir',
  pl: 'Do widzenia',
};

/** The farewell for `name`. */
export function farewell(name: string, options: FarewellOptions = {}): string {
  const { lang = 'en' } = options;
  return `${GREETINGS[lang]}, ${name}!`;
}
