import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Platzhalter-Domain – nach dem Kauf der Domain hier anpassen
export default defineConfig({
  site: 'https://marco-cavalli.de',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !/\/(merkliste|impressum|datenschutz)\/?$/.test(page) })],
});
