// Kopiert das Admin-Programm (Sveltia CMS) aus node_modules nach public/admin, damit /admin ohne Fremdserver lädt.
import { copyFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const dist = join(dirname(require.resolve('@sveltia/cms')), '..', 'dist');
mkdirSync('public/admin', { recursive: true });
copyFileSync(join(dist, 'sveltia-cms.js'), 'public/admin/sveltia-cms.js');
console.log('Admin-Bereich: sveltia-cms.js kopiert');
