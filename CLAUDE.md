# Projekt: Marco Cavalli Webseite

- Astro (statisch), Inhalte als YAML in `content/`, gepflegt über Pages CMS (`.pages.yml`). Daten werden in `src/lib/data.js` per `import.meta.glob` geladen; Verweise sind Dateipfade (`content/kategorien/anzuege.yml`) und werden mit `ref()` auf den Slug gekürzt.
- Gestaltung: Schwarz + Gold (#C9A24B), Cormorant Garamond (Überschriften) + Manrope (Text), alle Styles in `src/styles/global.css`.
- Startseite: gepinnte Scroll-Animation (Logo → Smoking → Zerlegung in Kategorie-Spalten). SVG in `src/components/hero-svg.html.txt`, Logik in `src/components/hero.js.txt`. Spalten = Kategorien mit `zeichnung` (anzug, mantel, hemd, fliege, schuhe).
- Kein Online-Shop, keine Produktanfragen: Besucher können Produkte nur „merken“ (localStorage, `window.MC_FAV` in `src/layouts/Base.astro`).
- Sprache der Seite und der Admin-Felder: Deutsch. Keine erfundenen Fakten (Preise, Bewertungen) einbauen.
- Vor Änderungen `npm run build` ausführen; keine Schriften/Skripte von Fremdservern einbinden.
