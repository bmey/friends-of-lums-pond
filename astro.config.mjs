import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://bmey.github.io',
	base: '/friends-of-lums-pond',
	integrations: [mdx(), sitemap()],
	vite: {
		ssr: {
			noExternal: ['normalize.css'],
		}
	}
});
