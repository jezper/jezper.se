import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { rssDescription, entryUrl } from '@lib/rss';

export async function GET(context: APIContext) {
  const site = context.site!;
  const articles = (await getCollection('writing', ({ data }) => !data.draft))
    .sort((a, b) => +b.data.date - +a.data.date)
    .map(entry => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: rssDescription(entry),
      link: entryUrl(entry, site),
      categories: entry.data.tags,
    }));

  return rss({
    title: 'Jezper Lorné — writing',
    description: 'Long-form posts.',
    site,
    items: articles,
    customData: '<language>en</language>',
  });
}
