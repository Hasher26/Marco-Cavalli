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
| `netlify/functions/admin-login.mjs` | Passwort-Login für den Admin-Bereich |
| `src/` | Code der Seiten (Startseite mit Animation, Kategorieseiten, Merkliste, Impressum …) |

## Live gehen (einmalig)

1. **Hosting bei Netlify (kostenlos):** Auf [netlify.com](https://www.netlify.com) mit GitHub anmelden → „Add new site“ → „Import an existing project“ → dieses Repo wählen. Build-Einstellungen kommen automatisch aus `netlify.toml`. Danach wird die Seite bei jeder Änderung automatisch neu gebaut.
2. **Domain:** z. B. `marco-cavalli.de` kaufen und in Netlify unter „Domain management“ verbinden und als *Primary domain* setzen. Sitemap, robots.txt und die Google-Adressen der Seiten passen sich beim nächsten Build automatisch an (Netlify liefert die Adresse als `URL`). Im Admin unter `public/admin/config.yml` ggf. `site_url` anpassen.
3. **Admin-Login einrichten (einmalig, ca. 10 Min.):**
   1. **GitHub-Schlüssel erstellen:** github.com → Profilbild → *Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token*. Name: `Marco Cavalli Admin`, Ablaufdatum möglichst lang, *Repository access: Only select repositories → Marco-Cavalli*, *Permissions → Contents: Read and write*. Erstellen und den Schlüssel kopieren.
   2. **In Netlify eintragen:** *Project configuration → Environment variables → Add a variable*:
      - `GITHUB_TOKEN` = der kopierte Schlüssel
      - `ADMIN_PASSWORD` = euer Admin-Passwort (lang und nicht erratbar)
   3. *Deploys → Trigger deploy* klicken, damit die Werte aktiv werden.
   4. Fertig: Unten auf der Webseite auf **„Admin“** klicken (oder `/admin` öffnen) → **„Mit Passwort anmelden“**.
4. **Zugang für den Vater:** Er braucht nur das Passwort – kein Konto.
   - **Passwort ändern:** In Netlify `ADMIN_PASSWORD` ändern → *Trigger deploy*.
   - **Schlüssel abgelaufen?** Neuen GitHub-Schlüssel erstellen (wie oben) und `GITHUB_TOKEN` ersetzen → *Trigger deploy*.
5. **Vor dem Livegang:** Beispielprodukte (`content/produkte/beispiel-*.yml`) löschen bzw. durch echte ersetzen, Geschäftsanschrift + USt-ID im Admin unter „Öffnungszeiten & Kontakt → Impressum“ eintragen, Datenschutzerklärung ergänzen.

## Im Admin-Bereich (für die Pflege)

- **Anmelden:** Unten auf der Webseite auf „Admin“ klicken → „Mit Passwort anmelden“.
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
