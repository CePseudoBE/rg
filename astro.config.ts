// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import { SITE_URL } from './src/data/business';

// https://astro.build/config
export default defineConfig({
	// ⚠️ Reemplazá por el dominio real cuando esté publicado (afecta canonical, sitemap y datos estructurados).
	site: SITE_URL,
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
