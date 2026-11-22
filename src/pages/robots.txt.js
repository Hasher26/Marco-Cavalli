// robots.txt mit der aktuellen Adresse der Seite (Sitemap-Link passt sich der Domain an)
export function GET({ site }) {
  const body = `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
