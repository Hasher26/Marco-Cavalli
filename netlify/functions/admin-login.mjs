// Passwort-Login für den Admin-Bereich (/admin).
// Der Admin-Bereich (Sveltia CMS) öffnet dieses Fenster beim Anmelden. Ist das Passwort richtig,
// bekommt er einen GitHub-Zugangsschlüssel, mit dem Änderungen im Repo gespeichert werden.
//
// Benötigte Umgebungsvariablen in Netlify (Project configuration → Environment variables):
//   ADMIN_PASSWORD – das Admin-Passwort (jederzeit änderbar, danach „Trigger deploy“)
//   GITHUB_TOKEN   – Fine-grained Token mit Schreibrecht nur auf dieses Repo (Contents: Read and write)
import { timingSafeEqual, createHash } from 'node:crypto';

const page = (body) =>
  new Response(
    `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Admin-Login – Marco Cavalli</title>
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0E0E0E;color:#F2EDE4;font:16px/1.5 system-ui,sans-serif}
form,.box{width:min(90vw,360px);display:flex;flex-direction:column;gap:14px}
h1{margin:0;font:600 28px/1.1 Georgia,serif;color:#C9A24B;letter-spacing:.04em}
label{font-size:14px;color:#B9B1A4}
input{font:inherit;font-size:16px;padding:12px;border:1px solid #5A5040;background:#121211;color:#F2EDE4}
input:focus{outline:2px solid #C9A24B;outline-offset:1px}
button{font:inherit;font-weight:600;min-height:48px;border:0;background:#C9A24B;color:#0E0E0E;cursor:pointer}
.err{color:#E3A3A3;font-size:14px;margin:0}
</style></head><body>${body}</body></html>`,
    { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } }
  );

const form = (error = '') => page(`<form method="post">
  <h1>MARCO CAVALLI</h1>
  <label for="pw">Admin-Passwort</label>
  <input id="pw" name="password" type="password" autocomplete="current-password" required autofocus>
  ${error ? `<p class="err" role="alert">${error}</p>` : ''}
  <button type="submit">Anmelden</button>
</form>`);

// Gleich lange Hashes vergleichen, damit die Prüfzeit nichts über das Passwort verrät
const same = (a, b) => timingSafeEqual(createHash('sha256').update(String(a)).digest(), createHash('sha256').update(String(b)).digest());

export default async (req) => {
  const password = process.env.ADMIN_PASSWORD;
  const token = process.env.GITHUB_TOKEN;
  if (!password || !token) {
    return page('<div class="box"><h1>MARCO CAVALLI</h1><p class="err">Der Admin-Login ist noch nicht eingerichtet (ADMIN_PASSWORD und GITHUB_TOKEN in Netlify fehlen).</p></div>');
  }
  if (req.method !== 'POST') return form();

  const data = await req.formData().catch(() => null);
  const given = data?.get('password') ?? '';
  if (!same(given, password)) {
    await new Promise((r) => setTimeout(r, 1500)); // bremst automatisches Ausprobieren
    return form('Das Passwort stimmt nicht.');
  }

  // Übergabe an den Admin-Bereich (Protokoll der Decap/Sveltia-OAuth-Anmeldung)
  const msg = 'authorization:github:success:' + JSON.stringify({ token, provider: 'github' });
  return page(`<div class="box"><h1>MARCO CAVALLI</h1><p>Angemeldet – einen Moment …</p></div>
<script>
(() => {
  const msg = ${JSON.stringify(msg)};
  if (!window.opener) { document.querySelector('p').textContent = 'Bitte über /admin anmelden.'; return; }
  window.addEventListener('message', (e) => {
    if (e.origin !== location.origin) return;
    window.opener.postMessage(msg, e.origin);
    setTimeout(() => window.close(), 300);
  });
  window.opener.postMessage('authorizing:github', location.origin);
})();
</script>`);
};

export const config = { path: '/api/admin-login' };
