# jezper.se

Personal site of Jezper Lorné. Static site, no backend, Markdown-based, hosted on Cloudflare Pages.

## What this is

- Astro 4 + Markdown content collections
- Two content types: **notes** (short) and **writing** (long-form)
- Curatorial pages for **music**, **projects**, **elsewhere**, **about**, **now**
- Three RSS feeds: combined, notes-only, writing-only
- Light + dark theme, light canonical
- Self-hosted fonts (Migra, Newsreader, JetBrains Mono)
- Obsidian-based publishing workflow

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build
npm run preview
npm test             # vitest unit tests
npm run test:e2e     # playwright smoke tests (requires `npm run test:e2e:install` first)
```

## Publishing workflow (Obsidian)

The repo doubles as an Obsidian vault. To set it up:

1. Clone the repo to your machine.
2. In Obsidian: **Open folder as vault** → choose the cloned repo's root.
3. Install three plugins via **Settings → Community plugins**:
   - **Obsidian Git** — for auto-commit and push
   - **Templater** — for new-note frontmatter templates
   - (Optional) **Linter** — keeps frontmatter tidy
4. Configure **Obsidian Git**:
   - **Vault backup interval (minutes):** `5`
   - **Auto pull on startup:** `on`
   - **Commit message:** `note: {{date}}` or `update`
   - **Sync method:** commit-and-sync
5. Configure **Templater**:
   - Template folder location: `.templates`
   - Map "Cmd+N" or a quick action to insert `new-note.md` or `new-article.md`

### Day-to-day

1. Open Obsidian.
2. Create a new note in `src/content/notes/` (Templater pre-fills frontmatter).
3. Write. Save (Obsidian autosaves).
4. Within ~5 min, Obsidian Git auto-commits and pushes to GitHub.
5. Cloudflare Pages picks up the push and rebuilds. Live at jezper.se in ~30–60 s.

### Long-form

Same flow, but in `src/content/writing/`. The Templater "new article" template defaults to `draft: true` — flip to `draft: false` when ready to publish.

### Wikilinks and embeds

Obsidian's `[[wikilink]]` syntax is supported via `remark-wiki-link`. Resolve note-to-note references naturally — they get rewritten to `/notes/<slug>/` at build time.

## Frontmatter reference

### Note

```yaml
---
title: "Optional title"           # may be omitted for short notes
date: 2026-05-09T20:14:00+02:00   # required
type: note                        # required, must be 'note'
tags: [tag1, tag2]                # optional
externalUrl: https://...          # optional — turns the note into a linkblog post
discussUrl: https://...           # optional — Mastodon thread URL
draft: false                      # default false
description: "..."                # optional, OG/RSS
ogImage: /path-or-url             # optional override
syndicate: true                   # default true (reserved for future automation)
mastodonStatusId: ""              # populated by future syndicator
lang: en                          # 'en' or 'sv'
---
```

### Article

```yaml
---
title: "Required title"           # required
subtitle: "Optional subtitle"     # optional
date: 2026-05-09T12:00:00+02:00   # required
type: article                     # required, must be 'article'
tags: [...]                       # optional
description: "Two-sentence dek for index + OG"  # recommended
draft: true                       # default true via template
updated: 2026-06-01               # optional — shows "edited" marker
discussUrl: https://...           # optional
ogImage: /path-or-url             # optional override
syndicate: true
lang: en
---
```

## Deployment (Cloudflare Pages)

1. Create the GitHub repo and push (see below).
2. Cloudflare dashboard → **Pages** → **Connect to Git** → select the repo.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Node version:** `20`
4. Custom domain: add `jezper.se` and `www.jezper.se`.
5. Push to `main` to deploy. Branch pushes get preview URLs.

## What's not here (yet)

- Comments (use Mastodon)
- Search (revisit at ~150 entries — Pagefind)
- Auto-syndication to Mastodon (schema-ready, not built)
- Auto-generated per-post OG images
- Analytics

## Repository layout

See `docs/superpowers/plans/2026-05-09-jezper-se-v1.md` for the implementation plan and detailed file structure.
