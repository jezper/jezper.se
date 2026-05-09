import { defineCollection, z } from 'astro:content';

const sharedFrontmatter = {
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  description: z.string().optional(),
  ogImage: z.string().optional(),
  discussUrl: z.string().url().optional(),
  syndicate: z.boolean().default(true),
  mastodonStatusId: z.string().optional(),
  lang: z.enum(['en', 'sv']).default('en'),
};

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    ...sharedFrontmatter,
    title: z.string().optional(),
    externalUrl: z.string().url().optional(),
    type: z.literal('note'),
  }),
});

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    ...sharedFrontmatter,
    title: z.string(),
    subtitle: z.string().optional(),
    type: z.literal('article'),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { notes, writing, pages };
