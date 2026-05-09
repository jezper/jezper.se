import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { rssDescription, entryUrl } from '@lib/rss';

export async function GET(context: APIContext) {
  const site = context.site!;
  const notes    = await getCollection('notes',   ({ data }) => !data.draft);
  const articles = await getCollection('writing', ({ data }) => !data.draft);
  const items = [...notes, ...articles]
    .sort((a, b) => +b.data.date - +a.data.date)
    .map(entry => ({
      title: entry.data.title ?? `Note · ${entry.data.date.toISOString().slice(0, 10)}`,
      pubDate: entry.data.date,
      description: rssDescription(entry),
      link: entryUrl(entry, site),
      categories: entry.data.tags,
    }));

  return rss({
    title: 'Jezper Lorné',
    description: 'Personal site of Jezper Lorné — writing, notes, music.',
    site,
    items,
    customData: '<language>en</language>',
  });
}
