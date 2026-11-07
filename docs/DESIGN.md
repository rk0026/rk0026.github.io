# Portfolio — design spec

Site: `https://rk0026.github.io` · Astro (static) · GitHub Pages via Actions · zh-TW (default, `/`) + en (`/en/`).
Art direction: tasteskill v2, sheet in `.taste-skill/direction.json` (seed 65363622, reprint: `node C:/Users/abc75/.agents/skills/design-taste-frontend/scripts/draw.mjs --show`).
Redraw: palette, once — the dealt white palette contradicted the owner's choice of a dark, engineering look.

## Idea

> On this page, **the CI/CD run that carries one commit to 15 production clusters** becomes **a printed itinerary slip (a build receipt)**.

Live thing: on the slip, the visitor picks one project (LMS app / Social platform / ACES anomaly pipeline). The slip reprints that project's real run: build → ship → operate. Works without JS (first project printed by default; the picker is real `<button>`s that swap `hidden`).

## Tokens (`src/styles/global.css`)

```css
:root {
  --bg: #0d060b; --surface: #1b0e17; --ink: #ffffff; --muted: #9a8f97;
  --accent: #ff488b; --accent-ink: #0d060b;
  --field-1: #470c35; --field-1-ink: #ffffff;
  --field-2: #ffffff; --field-2-ink: #101421;
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
  --margin: clamp(16px, 2vw, 28px);
  --font: "Sentient", "Noto Serif TC", serif;
}
```

Fonts: Sentient 300/400/500 (Fontshare) + Noto Serif TC 300/400/500 (Google Fonts) for CJK fallback. One family visually.
Accent (pink) only on: primary action, active spine, hover on poster lines. Never a section fill.
Fields: plum `--field-1` for the stats screen; white `--field-2` for the slip paper and the knowledge poster section.

## House rules (all workers)

No eyebrows, no monospace outside `<pre><code>`, no 01/02/03 numbering, no hairline rules or 1px boxes, no gradients, no shadows at rest, no glass/blur, no icon cards, no emoji, no styled accent word in headlines, headlines ≤ 2 lines at every width, body ≥ 16px, equal outer margins (`--margin`), one `h1` per page, every section has a heading (visually hidden `h2` allowed where the blueprint says "no heading"). Buttons: one shape — fully round. Motion: transform/opacity only, `prefers-reduced-motion` fallback.

## Page argument (home)

| Section | Claim | Proof |
|---|---|---|
| Hero | Hsuan-Te Lin is a full-cycle engineer | Name cropped huge + one line: builds, ships, runs |
| About | Eight years across every layer | Story with highlighted facts |
| Pipeline (how-it-works) | One person owns the whole path | The slip: real run per project (live thing) |
| Stats | It runs at real scale | `15` clusters, caption |
| Work | The full index of work | 24 book spines, filtered by discipline |
| Knowledge | He writes down what he learns | Poster lines → DSA / Troubleshooting / Design patterns |
| Contact | Reach him | Display rows: email, phone, LinkedIn, GitHub, Taiwan |

All copy lives in `src/i18n/zh.ts` and `src/i18n/en.ts` (same shape, typed by `src/i18n/index.ts`). Components never hard-code visible text.

## Sections — geometry

1. **Hero — one word, cropped.** Word `Hsuan-Te` (aria-hidden), Sentient 300, `clamp(360px, 46vw, 760px)`, line-height .8, nowrap, shifted −8vw left, baseline 6% below the bottom edge, section `overflow:hidden`, height 100svh. Top 30% on `--margin`: wordmark top-left (16px), links top-right (關於 / 作品 / 知識庫 + language switch). `h1` at `--step-head`: name + role. Supporting sentence bottom-left at 20–24px, primary action bottom-right (round, accent): download résumé PDF (`/cv.pdf`). Phone: word `writing-mode: vertical-rl` at 62vw down the right edge; left 45% holds wordmark, sentence, action; links fold behind a menu word.
2. **About — two columns, highlighted words.** 110–160 words at `clamp(22px,2.1vw,32px)`, leading 1.18, `columns:2; column-gap:32px`, justified, hyphens auto. Six highlights (`background-color` + `box-decoration-break:clone`, padding .1em) in accent / field-1 / field-2 (dark ink on white). Final sentence highlighted in accent, links to `#contact`. Visually hidden `h2`. Phone: 1 column, 20px, left-aligned.
3. **Pipeline — itinerary on a slip.** Ground `--surface`. Heading (2–4 words, `clamp(40px,4.4vw,68px)`) + 30ch paragraph + project picker in columns 1–5; slip 420–480px wide in columns 7–11, paper `--field-2`, zigzag bottom via `clip-path`. Rows: stage left, value right (tabular figures), dotted leader of 4px round dots (radial-gradient dots are banned → use `border-bottom: 4px dotted` is a rule → use a flex filler with `background-image` is a gradient → **use repeated `·` characters in a flex `overflow:hidden` filler**). Groups: Build / Ship / Operate. Final row inverted (white on `--field-2-ink` bar). Phone: stacked, slip full width.
4. **Stats — one figure owns the screen.** Field `--field-1`, min-height 90svh. Claim top-left at 36–44px (the `h2`). Figure `15` bottom-left `clamp(180px,23vw,380px)`, leading .8. Caption 3 lines, 32ch, 16–17px. Right half: the photo `1940s-n935-telephone-exchange.jpg`, full height of the field, square corners, grayscale (this replaces the "empty right half" — house rule: no void).
5. **Work — book-spine index.** Heading 28px + 15px note on the same baseline. 24 spines, `writing-mode: vertical-rl`, 30–34px wide, 420px tall, gap 6px, name 18px, discipline tag on its colour after 12px. Disciplines → colours: Frontend/Mobile `--accent` (dark ink), Backend `--field-2` (dark ink), Infra/SRE `--field-1`, AI `--surface` + ink, Security `--muted` bg + `--bg` ink. Hover/focus: active spine full ink + accent tag; others go `--muted` (not opacity). Each spine is a `<button>`; selecting it prints its one-line detail below the shelf (aria-live). Phone: no rotation, inline wrap of names + tags. Under the shelf, full-bleed photo `kate-shelley-high-bridge-construction-center-facing.jpg` (16:7 crop).
6. **Knowledge — one item per poster line.** Field `--field-2`, ink `--field-2-ink`. Three lines at `clamp(64px,10vw,150px)`, lowercase, leading .92: `algorithms` / `troubleshooting` / `patterns` (zh: `演算法` / `除錯實錄` / `設計模式`). Right-aligned detail 18–20px tabular: entry count, or 「整理中」/ "In progress" when 0. Each line links to `/notes/<category>/`. Hover: ink → accent. Visually hidden `h2`. Beside the list on desktop ≥1200px: `wac-telephone-switchboard-operators.jpg` in a 4:5 crop at the right margin, behind nothing (never overlapping text).
7. **Contact — address in display rows.** Rows at `clamp(44px,6vw,88px)`, ~150px tall, text in lower third, alternating `--bg` / `--surface` bands: `abc751202@gmail.com` (mailto), `+886 983-526-503` (tel), `linkedin.com/in/hsuante-lin`, `github.com/rk0026`, `Taiwan · 台灣`. Sixth row: greeting (`你好` / `Hello`) + round accent button with arrow → mailto with subject. Visually hidden `h2`. Then footer: name at full width (reprise of hero word, scale motion), picture credits (from `docs/credits.json`), © year.

Fourth picture: `marine-field-telephone-switchboard-operator-guadalcanal-circ.jpg` on the knowledge index page header.

## Knowledge base

Collection `notes` (`src/content.config.ts`, glob loader `src/content/notes/**/*.md`):
`title: string`, `category: 'dsa' | 'troubleshooting' | 'patterns'`, `summary: string`, `date: date`, `tags: string[] = []`, `lang: 'zh' | 'en' = 'zh'`.
Routes (both locales; entries are shown in both, with their own language): `/notes/` (three categories), `/notes/<category>/` (list, newest first, empty state copy), `/notes/<category>/<slug>/` (article; prose styles for headings, lists, tables, `pre code` with a dark theme via Astro's built-in Shiki `github-dark`).
No sample articles. Empty state must still look designed.

## Motion (integration step, after sections)

Signature: footer wordmark scales .94 → 1 as it enters (CSS `animation-timeline: view()`, static fallback). Section entrances: heading → text → picture, 60–90ms stagger, 16–32px rise, IntersectionObserver adds `.in`; content visible without JS. Controls: hover/press/focus states. One moving picture: slow scale on the stats photo.

## Done when

`npm run build` passes; `inspect.mjs` 0 FAIL at 1440/768/390 for `/` and `/en/`; lint clean; deployed and live at `https://rk0026.github.io`.
