import { test, expect } from '@playwright/test';

test('homepage renders core sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Jezper Lorné', level: 1 })).toBeVisible();
  await expect(page.getByText('Now', { exact: true })).toBeVisible();
  await expect(page.getByText('Latest', { exact: true })).toBeVisible();
});

test('navigation links resolve', async ({ page }) => {
  for (const path of ['/about/', '/now/', '/notes/', '/writing/', '/projects/', '/music/', '/contact/']) {
    const res = await page.goto(path);
    expect(res?.status(), `Expected 200 for ${path}`).toBe(200);
  }
});

test('article permalink works', async ({ page }) => {
  await page.goto('/writing/2026-05-09-roadmaps/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('note permalink works', async ({ page }) => {
  await page.goto('/notes/2026-05-09-falun-red/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('linkblog note exposes external link', async ({ page }) => {
  await page.goto('/notes/2026-05-08-listening-khotin/');
  await expect(page.getByRole('link', { name: /khotin\.bandcamp\.com/i })).toBeVisible();
});

test('RSS feeds return XML', async ({ request }) => {
  for (const path of ['/rss.xml', '/notes.xml', '/writing.xml']) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    expect(res.headers()['content-type'], path).toMatch(/xml/);
    const body = await res.text();
    expect(body, path).toContain('<rss');
  }
});

test('theme toggle persists', async ({ page }) => {
  await page.goto('/');
  const initial = await page.locator('html').getAttribute('data-theme');
  await page.locator('#theme-toggle').click();
  const next = await page.locator('html').getAttribute('data-theme');
  expect(next).not.toBe(initial);
  await page.reload();
  expect(await page.locator('html').getAttribute('data-theme')).toBe(next);
});

test('404 page renders', async ({ page }) => {
  const res = await page.goto('/this-does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.getByText(/not here/i)).toBeVisible();
});
