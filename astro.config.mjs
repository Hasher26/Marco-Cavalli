import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Adresse der Seite: Netlify setzt beim Bauen automatisch URL (z. B. https://marco-cavalli.netlify.app,
// später die eigene Domain, sobald sie in Netlify als Hauptdomain eingetragen ist).
export default defineConfig({
  site: process.env.URL || 'https://marco-cavalli.netlify.app',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !/\/(merkliste|impressum|datenschutz)\/?$/.test(page) })],
});
