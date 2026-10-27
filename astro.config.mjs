import { defineConfig } from 'astro/config';

// Local only for now. When hosting, set `site` (and `base` if it lives under a path, e.g. '/ShorttyLanding').
export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
});
