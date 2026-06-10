# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal documentation library site powered by **GitHub Pages**. The site is built with **pure static HTML, CSS, and vanilla JavaScript** — no frameworks, no build tools, no package manager, no CI/CD pipeline. It is deployed automatically by GitHub Pages from the `main` branch.

## Commands

There is no build step, test suite, or linter. To preview locally:

```bash
# Serve from repo root (any static file server works)
npx serve .
# or
python -m http.server 8080
```

The site expects to be served from the repository root so that relative paths (`css/style.css`, `js/docs.js`, `docs/...`) resolve correctly.

## Architecture

### URL structure & routing

Every page is a standalone `.html` file. The site uses no routing framework — navigation relies entirely on relative `<a href>` links:

| URL | Content |
|-----|---------|
| `/index.html` | Home page: hero, category cards, recent updates, search bar |
| `/docs/notes/index.html` | Listing page for notes category |
| `/docs/notes/<slug>.html` | Individual note article |
| `/docs/guides/index.html` | Listing page for guides category |
| `/docs/guides/<slug>.html` | Individual guide article |
| `/docs/projects/index.html` | Listing page for projects category |
| `/docs/projects/<slug>.html` | Individual project article |

### Shared chrome (header / sidebar / footer)

Each `.html` file duplicates the full `<header>`, `<aside class="sidebar">`, and `<footer>` markup. There is no templating or server-side includes. When adding a new page, copy the structure from an existing page and edit only the `<main class="main-content">` section and the `<title>`.

The sidebar is manually maintained — link lists appear in every page and must be kept in sync across all files. Categories are: 笔记 (notes), 教程 (guides), 项目 (projects).

### CSS (`css/style.css`)

Single CSS file. Uses CSS custom properties defined in `:root` for all colors, spacing, and typography (see `--color-*`, `--sidebar-width`, `--header-height`, `--font-sans`, `--font-mono`). The CSS follows these conventions:

- **Layout**: Flexbox-based sticky header + sidebar + content area (`display: flex` on `.site-wrapper`)
- **Sidebar**: Sticky positioning (`position: sticky; top: var(--header-height)`), 260px wide
- **Responsive**: At ≤768px, the sidebar slides off-screen and a hamburger menu toggle appears
- **Article content**: `.article-content` class provides typography for prose (headings, code blocks with dark background, tables, blockquotes)

### JavaScript (`js/docs.js`)

Minimal vanilla JS (IIFE pattern), handles three things:

1. **Sidebar toggle** — `.menu-toggle` button opens/closes the sidebar on mobile by toggling `.open` class
2. **Active link highlight** — Compares current `window.location.pathname` against sidebar link `href` and adds `.active` class to the matching link
3. **Document list filtering** — Listens for input on `.search-bar input` and hides/shows `.doc-list li` and `.category-card` elements whose text doesn't match the query

### Adding a new document

1. Copy an existing article page (e.g., `docs/notes/git-cheatsheet.html`) into the appropriate category folder
2. Update the `<title>`, breadcrumb trail, page header (`h1`), and page-meta tags
3. Write content inside `<div class="article-content">`
4. If the document has sections, add a `<div class="toc-box">` with anchor links
5. Add the new page's link to the sidebar in **every** HTML file (or at minimum the files within the same category)
6. Update the corresponding category index page's `<ul class="doc-list">`
7. Optionally add it to the "最近更新" list on `index.html`
