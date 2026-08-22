import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { sitePath } from '../lib/site';

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (left, right) =>
      right.data.published.getTime() - left.data.published.getTime(),
  );

  return rss({
    title: 'Yifu Zhang — Blog',
    description:
      'Notes on numerical analysis, randomized numerical linear algebra, approximation theory, operator learning and related mathematics.',
    site: new URL(sitePath('/'), context.site),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: sitePath(`/blog/${post.id}/`),
      categories: post.data.tags,
    })),
    customData: '<language>en-gb</language>',
  });
};
