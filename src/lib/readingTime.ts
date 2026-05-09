const WORDS_PER_MINUTE = 200;

export function readingTime(text: string): number {
  const stripped = text
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[#*_>`~-]+/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  const words = stripped.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
