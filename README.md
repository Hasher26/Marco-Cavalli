# Marco Cavalli – Webseite

Webseite des Herrenausstatters **Marco Cavalli** (Malik Moden GmbH) in Dreieich-Sprendlingen.
Gebaut mit [Astro](https://astro.build) als statische Seite. Inhalte werden im eigenen Admin-Bereich unter **`/admin`** gepflegt ([Sveltia CMS](https://sveltiacms.app), kostenlos, Open Source).

## Was wo liegt

| Ordner / Datei | Inhalt |
|---|---|
| `content/produkte/` | Produkte (Foto, Name, Kategorie, Farbe, Herren/Kinder, Übergröße, Preis) |
| `content/kategorien/` | Hauptkategorien (Anzüge, Mäntel, …) inkl. Texten und Filtern |
| `content/unterkategorien/` | Unterkategorien je Kategorie (z. B. Smoking, Doppelreiher) – werden automatisch zu Filtern |
| `content/farben/` | Farben mit Farbcode für die Farbfilter |
| `content/einstellungen.yml` | Öffnungszeiten, verkaufsoffene Sonntage, Filialen, Anfahrt, Social Media, Impressum |
| `public/uploads/` | Hochgeladene Fotos |
| `public/admin/config.yml` | Was im Admin-Bereich bearbeitet werden kann |
| `src/` | Code der Seiten (Startseite mit Animation, Kategorieseiten, Merkliste, Impressum …) |

## Live gehen (einmalig)

1. **Hosting bei Netlify (kostenlos):** Auf [netlify.com](https://www.netlify.com) mit GitHub anmelden → „Add new site“ → „Import an existing project“ → dieses Repo wählen. Build-Einstellungen kommen automatisch aus `netlify.toml`. Danach wird die Seite bei jeder Änderung automatisch neu gebaut.
2. **Domain:** z. B. `marco-cavalli.de` kaufen und in Netlify unter „Domain management“ verbinden. Dann die Domain in `astro.config.mjs` (`site`) und `public/robots.txt` eintragen.
3. **Admin-Bereich einrichten (einmalig, ca. 10 Min.):**
   1. Auf GitHub unter *Settings → Developer settings → OAuth Apps → New OAuth App* eine App anlegen:
      - Application name: `Marco Cavalli Admin`
      - Homepage URL: die Netlify-Adresse (später die Domain)
      - Authorization callback URL: `https://api.netlify.com/auth/done`
   2. „Generate a new client secret“ klicken, Client ID und Client Secret notieren.
   3. In Netlify: *Project configuration → Access & security → OAuth → Install provider* → GitHub, Client ID und Secret eintragen.
   4. Fertig: `https://<eure-seite>/admin` öffnen → „Sign In with GitHub“.
4. **Zugang für den Vater:** Er legt sich ein kostenloses GitHub-Konto an. Im Repo unter *Settings → Collaborators → Add people* einladen (Schreibrechte). Danach meldet er sich unter `/admin` mit „Sign In with GitHub“ an – auch am Handy.
5. **Vor dem Livegang:** Beispielprodukte (`content/produkte/beispiel-*.yml`) löschen bzw. durch echte ersetzen, Geschäftsanschrift + USt-ID im Admin unter „Öffnungszeiten & Kontakt → Impressum“ eintragen, Datenschutzerklärung ergänzen.

## Im Admin-Bereich (für die Pflege)

- **Anmelden:** `https://<eure-seite>/admin` → „Sign In with GitHub“.
- **Produkte:** „Produkte → Neu“: Name, Foto (direkt vom Handy), Kategorie, Unterkategorie, Farbe, Herren/Kinder, Übergröße, optional Preis. Speichern – nach ca. 1–2 Minuten ist es online.
- **Neue Unterkategorie** (z. B. bei Hemden „Smokinghemd“): „Unterkategorien → Neu“, Kategorie auswählen. Sobald ein Produkt sie nutzt, erscheint sie als Filter.
- **Neue Farbe:** „Farben → Neu“ mit Name und Farbcode (z. B. `#1F2A44`).
- **Öffnungszeiten / verkaufsoffene Sonntage:** „Öffnungszeiten & Kontakt“. Eingetragene Sonntage werden im „Jetzt geöffnet“-Status berücksichtigt.
- **Produkt ausblenden statt löschen:** Haken „Auf der Webseite anzeigen“ entfernen.

## Entwickeln

```bash
npm install
npm run dev      # lokale Vorschau auf http://localhost:4321
npm run build    # fertige Seite in dist/
```

Schriften werden lokal ausgeliefert (`@fontsource`), nicht von Google-Servern (DSGVO). Das Admin-Programm (`@sveltia/cms`) wird beim Bauen aus `node_modules` nach `public/admin/` kopiert (`scripts/copy-cms.mjs`).
