import type { CollectionEntry } from 'astro:content';

export function rssDescription(entry: CollectionEntry<'notes' | 'writing'>): string {
  if (entry.data.description) return entry.data.description;
  const firstPara = entry.body.split('\n\n').find(p => p.trim().length > 0) ?? '';
  return firstPara.slice(0, 280);
}

export function entryUrl(entry: CollectionEntry<'notes'> | CollectionEntry<'writing'>, site: URL): string {
  const path = entry.collection === 'notes' ? `/notes/${entry.slug}/` : `/writing/${entry.slug}/`;
  return new URL(path, site).toString();
}
