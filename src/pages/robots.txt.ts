import type { APIRoute } from 'astro';

// Genera /robots.txt usando la URL configurada en `site` (astro.config.ts),
// de modo que el enlace al sitemap apunte siempre al dominio correcto.
export const GET: APIRoute = ({ site }) => {
	const sitemapUrl = new URL('sitemap-index.xml', site ?? 'https://rg-d5v.pages.dev').href;
	const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
