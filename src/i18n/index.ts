import { en, type Messages } from './en';

// Add new locales here, e.g. `es`, and list them in `astro.config.mjs` (i18n.locales).
const messages: Record<string, Messages> = { en };

export const defaultLocale = 'en';

export function useTranslations(locale: string | undefined): Messages {
  return messages[locale ?? defaultLocale] ?? messages[defaultLocale];
}
