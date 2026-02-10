---
lang: en
---

## Project Overview

Static website for ITS (hilfe.its-wn.de) built with Eleventy 3, Tailwind CSS 4, and daisyUI 5.
Content is managed inside the project's files.

## Development Commands

- `pnpm run dev` — Start development server (localhost:8080)
- `pnpm run build` — Production build (must complete without errors)
- `pnpm run lint` — Run ESLint (must pass before finishing work)

## Architecture

### Templates & Content
- Nunjucks layouts in `src/_includes/layouts/`
- Markdown content pages in `src/`
- Site data in `src/_data/`

### Styling
- Tailwind CSS 4 with custom theme in `src/assets/css/globals.css`
- Custom fonts: Inter Variable (sans-serif)
- Use `clsx` for conditional class composition

### Text Colors
Use semantic text color classes for consistency:
- `text-body` — Primary body text
- `text-muted` — Secondary/supporting text like descriptions, roles, bylines

Do NOT use raw color classes like `text-zinc-800` for body text. Use the semantic classes instead.

## Code Style

- Two spaces for indentation
- No semicolons (Prettier config)
- Single quotes for strings
- ESLint & Prettier enforce consistent style
- Do not use third-party API services without asking first
- All clickable or interactive elements must have `cursor-pointer`
- Links to external URLs (or likely external) must have `rel="noopener noreferrer nofollow"`

## Version Control

- The project uses git.
- Do not add `Co-Authored-By` lines.
- Follow (Conventional Commits)[https://www.conventionalcommits.org/en/v1.0.0/] when writing commit messages.
