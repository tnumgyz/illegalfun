import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { FICTION_NOTICE_SHORT, SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context: APIContext) {
	const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		// The disclaimer rides along in the feed too — readers may never see the site.
		description: `${SITE_DESCRIPTION} ${FICTION_NOTICE_SHORT}`,
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			categories: post.data.tags,
			link: `/posts/${post.id}/`,
		})),
	});
}
