import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Fictional narrative posts. Everything under `src/content/posts/` is speculative
 * fiction — see CLAUDE.md > Non-negotiables before adding an entry.
 */
const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			/** One or two sentences. Used for cards, <meta description>, and RSS. */
			description: z.string(),
			/** Publication date. `2026-03-14` in front matter is coerced to a Date. */
			date: z.coerce.date(),
			/** Optional revision date, rendered beneath the publication date. */
			updated: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
			heroImage: image().optional(),
			/**
			 * Alt text for the hero image. Decorative heroes may pass an empty string;
			 * anything that carries meaning must describe it. See CLAUDE.md > Accessibility.
			 */
			heroAlt: z.string().default(''),
			/** Hide from listings, RSS, and sitemap without deleting the file. */
			draft: z.boolean().default(false),
		}),
});

export const collections = { posts };
