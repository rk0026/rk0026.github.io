# Portfolio — design spec (v2, Cohesion style)

Site: `https://rk0026.github.io` · Astro (static) · GitHub Pages via Actions · zh-TW (default, `/`) + en (`/en/`).
Direction: modelled on the Framer template Cohesion (`https://cohesion.framer.ai`), chosen by the owner on 2026-11-07. It replaces the v1 tasteskill direction; the tasteskill house rules and `inspect.mjs` no longer apply. Pill navigation, soft shadows, rounded cards and the serif italic name are intended.
Multi-page, not one-pager.

## Look

- White ground, ink `#0b0b0f`, muted `#5b5b66`, surface `#f4f4f7`, accent orange `#ff4f00` (active nav pill, primary buttons, small highlights only).
- Type: Public Sans (UI and body, weights 400–900) + PT Serif bold italic for the name accent (`.serif`). CJK: Noto Sans TC. Headlines medium weight, tight tracking.
- Cards: white, `--radius-card` 28px, `--shadow-card` (soft lavender halo). Buttons: pills. `.btn` = orange; `.btn--ghost` = big white pill with halo.
- Nav: `SiteNav.astro`, a floating centred pill fixed at the top (bottom on phones ≤760px), active page = orange pill; language switch is a separate small pill.
- Motion: gentle. `data-reveal` entrances (Base observes them), hover lift on cards/buttons, the hero marquee, the three.js shapes. Respect `prefers-reduced-motion`.
- Proof is never invented: no testimonials, client logos or fake numbers. Only facts from the résumé (all already in `src/i18n`).

## Tokens and shared pieces (do not fork)

`src/styles/global.css`: tokens above plus `--step-small/body/lead/head/display`, `--margin`, `--section-gap`, `--content` (1160px), `.container`, `.page-head` (centred title block for inner pages, clears the fixed nav), `.card`, `.btn`, `.btn--ghost`, `.serif`, `.visually-hidden`.
`src/layouts/Base.astro`: `<Base lang current title?>` renders SiteNav, the page slot, and `Footer`. Pages never render their own nav or footer.
Copy: `src/i18n/{index,zh,en}.ts`. Components never hard-code visible text. Locale links: `href(lang, path)`.

## Pages

| Route | View | Content |
|---|---|---|
| `/` | `src/views/Home.astro` | Hero: “{greeting} *{name}*!” (name in `.serif`), role line, giant black `marquee` text (`HSUAN-TE LIN`, Public Sans 900) scrolling horizontally behind a rounded portrait card; three.js glossy shapes floating around; `.btn--ghost` CTA (mailto). Below: three facts, then four tiles linking to About / Stack / Projects / Notes. |
| `/about/` | `src/views/About.astro` | `.page-head`, paragraphs as stacked tilted-slightly cards (Cohesion “About Me”), timeline, award, education. |
| `/stack/` | `src/views/Stack.astro` | `.page-head`, 8 groups as cards with pill chips. |
| `/projects/` | `src/views/Projects.astro` | `.page-head`, the interactive pipeline slip (existing `Pipeline.astro`, restyled light), the `15` stat, the work index (existing `Work.astro`, restyled light, horizontal chips). |
| `/notes/…` | existing Notes components | Restyled light; use Base's nav (drop `NotesHeader`). |
| `/contact/` | `src/views/Contact.astro` | `.page-head`, contact rows as large links in a card, mailto CTA, résumé download. |

Portrait: `public/img/me.jpg` (4:5) will be supplied later. Until it exists, Home renders a placeholder card of the same size (check with `fs.existsSync` at build time); dropping the file in replaces it with no code change.

## Hero three.js shapes

`src/components/HeroShapes.astro`, mounted inside the home hero as `#hero-three` (absolute, `inset:0`, `pointer-events:none`, behind the text and portrait).
Six glossy primitives like Cohesion (pyramid/tetrahedron, star or torus-knot-lite, sphere, rounded cube, cylinder, icosahedron) in orange `#ff7a2f`, cyan `#5fd4e0`, violet `#a98bff`, lime `#c6e85a`, blue `#4d8dff`, amber `#ffc23d`; `MeshPhysicalMaterial` with clearcoat, soft hemisphere + directional light, no postprocessing.
Each shape bobs and rotates slowly; subtle parallax toward the pointer on desktop.
Rules: three@0.187 vanilla `WebGLRenderer` (skills in `.claude/skills/threejs-*`); dynamic `import('three')` after first paint; DPR ≤ 2; pause when the hero is off-screen or the tab hidden; `prefers-reduced-motion` → render one frame only; phones (<760px) render fewer, smaller shapes kept away from the text; dispose on page hide. No layout shift if WebGL is unavailable (the hero still looks complete).

## Knowledge base

Collection `notes` (`src/content.config.ts`, glob `src/content/notes/**/*.md`): `title`, `category: dsa|troubleshooting|patterns`, `summary`, `date`, `tags[]`, `lang: zh|en`. Routes `/notes/`, `/notes/<category>/`, `/notes/<category>/<slug>/` in both locales.
