// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Placeholder. The real custom domain (illegalfun.net) is configured in a later
	// step, together with the GitHub Pages workflow and public/CNAME.
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			// Headings. Weight 400 does most of the work — see CLAUDE.md > Typography.
			provider: fontProviders.google(),
			name: 'Playfair Display',
			cssVariable: '--font-heading',
			fallbacks: ['Georgia', 'serif'],
			weights: [400, 700],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
		},
		{
			// Body copy.
			provider: fontProviders.google(),
			name: 'Lora',
			cssVariable: '--font-body',
			fallbacks: ['Georgia', 'serif'],
			weights: [400, 500, 700],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
		},
	],
});
