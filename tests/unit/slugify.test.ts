import { describe, it, expect } from 'vitest';
import { slugify } from '@lib/slugify';

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('In Praise of Falun Red')).toBe('in-praise-of-falun-red');
  });
  it('strips punctuation', () => {
    expect(slugify('Why product roadmaps are a lie!')).toBe('why-product-roadmaps-are-a-lie');
  });
  it('handles Swedish characters', () => {
    expect(slugify('Höstens läsning')).toBe('hostens-lasning');
    expect(slugify('Ångest & Ära')).toBe('angest-ara');
  });
  it('collapses multiple spaces', () => {
    expect(slugify('a   b   c')).toBe('a-b-c');
  });
});
