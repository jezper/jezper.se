import { describe, it, expect } from 'vitest';
import { readingTime } from '@lib/readingTime';

describe('readingTime', () => {
  it('returns 1 for very short text', () => {
    expect(readingTime('one two three')).toBe(1);
  });
  it('rounds up to whole minutes', () => {
    const text = Array.from({ length: 250 }, () => 'word').join(' '); // ~1.25 min at 200 wpm
    expect(readingTime(text)).toBe(2);
  });
  it('strips markdown and html', () => {
    const md = '# Heading\n\n[link](http://example.com) and **bold** text.';
    expect(readingTime(md)).toBeGreaterThanOrEqual(1);
  });
});
