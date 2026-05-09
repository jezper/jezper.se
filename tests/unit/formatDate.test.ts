import { describe, it, expect } from 'vitest';
import { formatDate, formatDateShort, formatIsoDate } from '@lib/formatDate';

describe('formatDate', () => {
  it('formats long form', () => {
    expect(formatDate(new Date('2026-05-09T12:00:00Z'))).toBe('May 9, 2026');
  });
  it('formats short form', () => {
    expect(formatDateShort(new Date('2026-05-09T12:00:00Z'))).toBe('2026-05-09');
  });
  it('formats ISO datetime attribute', () => {
    const d = new Date('2026-05-09T12:00:00Z');
    expect(formatIsoDate(d)).toBe(d.toISOString());
  });
});
