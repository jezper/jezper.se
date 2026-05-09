import { describe, it, expect } from 'vitest';
import { z } from 'zod';

const note = z.object({
  date: z.coerce.date(),
  type: z.literal('note'),
  title: z.string().optional(),
  externalUrl: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

describe('note schema', () => {
  it('accepts a minimal note', () => {
    const r = note.parse({ date: '2026-05-09', type: 'note' });
    expect(r.tags).toEqual([]);
    expect(r.draft).toBe(false);
  });

  it('rejects bad externalUrl', () => {
    expect(() => note.parse({ date: '2026-05-09', type: 'note', externalUrl: 'not a url' })).toThrow();
  });

  it('coerces ISO date strings', () => {
    const r = note.parse({ date: '2026-05-09T22:00:00+02:00', type: 'note' });
    expect(r.date).toBeInstanceOf(Date);
  });
});
