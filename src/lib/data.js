// Liest die Inhalte aus /content (werden im Admin-Bereich gepflegt) und bereitet sie für die Seiten auf.
import yaml from 'js-yaml';

const load = (files) =>
  Object.entries(files).map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.ya?ml$/, '');
    return { slug, ...(yaml.load(raw) || {}) };
  });

// Verweise speichert der Admin-Bereich als Dateipfad, z. B. "content/kategorien/anzuege.yml"
export const ref = (value) => (value ? String(value).split('/').pop().replace(/\.ya?ml$/, '') : '');

const bySort = (a, b) => (a.reihenfolge ?? 99) - (b.reihenfolge ?? 99) || String(a.name).localeCompare(String(b.name), 'de');

export const settings = yaml.load(
  Object.values(import.meta.glob('/content/einstellungen.yml', { query: '?raw', import: 'default', eager: true }))[0]
);

export const farben = load(import.meta.glob('/content/farben/*.yml', { query: '?raw', import: 'default', eager: true }));
export const farbe = (slug) => farben.find((f) => f.slug === slug) || { slug, name: slug, farbcode: '#888888' };

export const kategorien = load(import.meta.glob('/content/kategorien/*.yml', { query: '?raw', import: 'default', eager: true }))
  .filter((k) => k.sichtbar !== false)
  .sort(bySort);

export const unterkategorien = load(import.meta.glob('/content/unterkategorien/*.yml', { query: '?raw', import: 'default', eager: true }))
  .map((u) => ({ ...u, kategorie: ref(u.kategorie) }))
  .sort(bySort);

export const produkte = load(import.meta.glob('/content/produkte/*.yml', { query: '?raw', import: 'default', eager: true }))
  .filter((p) => p.sichtbar !== false && p.name)
  .map((p) => ({ ...p, kategorie: ref(p.kategorie), unterkategorie: ref(p.unterkategorie), farbe: ref(p.farbe), fuer: p.fuer || 'herren' }))
  .sort((a, b) => String(a.slug).localeCompare(String(b.slug)));

export const produkteVon = (kat) => produkte.filter((p) => p.kategorie === kat);
export const unterVon = (kat) => unterkategorien.filter((u) => u.kategorie === kat);

// Telefonnummer für tel:- und wa.me-Links
export const telLink = (t) => 'tel:' + String(t).replace(/[^\d+]/g, '');
export const waLink = (t) => 'https://wa.me/' + String(t).replace(/\D/g, '');
export const routeLink = (f) => 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(`${f.strasse}, ${f.ort}`);
