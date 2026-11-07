# Portfolio — design spec (v3, Unti style)

Site: `https://rk0026.github.io` · Astro (static) · GitHub Pages via Actions · zh-TW (default, `/`) + en (`/en/`).
Direction: modelled on the Framer template Unti (`https://unti.framer.website`), chosen by the owner on 2026-11-07, replacing v2 (Cohesion). Multi-page is kept (owner preference); every page is Unti's single centred column of stacked cards. Light and dark themes.
Name on the site: “Jimmy” (zh `Jimmy 林軒德`, en `Jimmy Lin`).

## Look

- One column, `--content` 760px, cards stacked with `--gap` 10px on a grey ground (`--bg`).
- Section card `.card` (radius 24, padding 14) opens with a grey `.label` pill (“概覽 / Overview”, “作品 / Projects” …). Items inside are `.inner` cards (white/raised, 1px `--line` border, radius 18).
- Type: Geist (light 300 for big names, 400 body, 500 labels) + Noto Sans TC. Sizes small and calm: name `--step-display`, item titles `--step-head`, body 16px, meta 14px muted.
- Monochrome: `--accent` is ink. The only colour: the green status dot `--ok`, coloured monogram tiles for organisations, tool icons.
- Buttons `.btn`: outline, radius 12, with a 16px icon. Square `.icon-btn` (32px, `--surface`) holds the → on clickable rows.
- Meta rows (date, place) use 14px line icons (calendar, pin) in muted.

## Themes

`<html data-theme="light|dark">`, set before paint by the inline script in `Base.astro` (saved `localStorage.theme`, else `prefers-color-scheme`). Toggle: sun/moon button in the top bar. All colours come from tokens in `src/styles/global.css`; never hard-code colours (exception: brand/monogram tiles and tool icons, which must stay legible on both themes).

## Shared pieces (do not fork)

- `Base.astro`: `<Base lang current title?>` → `.stack-col` containing `TopBar`, the page slot, `Footer`.
- `TopBar.astro`: location “台灣/Taiwan”, live Asia/Taipei clock, language switch, theme toggle, and a row of page chips (active = inverted).
- `Footer.astro`: Unti closing: contact rows card (label left, value right, → icon button) + picture credits + `© year`.
- Copy in `src/i18n/{index,zh,en}.ts`; components never hard-code visible text. Locale links via `href(lang, path)`.

## Pages

| Route | View | Cards |
|---|---|---|
| `/wispo/` | `views/Wispo.astro` | Side project Wispo: intro + live screenshot (`public/img/wispo-home.jpg`) · features · engineering facts + architecture chips · Wispo Story with screenshot (`wispo-story.jpg`). Screenshots are captures of www.wispo.cc / story.wispo.cc; recapture when those sites change |
| `/` | `views/Home.astro` | Profile (square portrait `public/img/me.jpg`, name, role, `.btn` Download CV + Get in touch) · Overview (`aboutPage.paragraphs`) · In numbers (`home.facts`) · Explore (`home.tiles` as 2×2 image cards like Unti's Projects, image + title + text + →) |
| `/about/` | `views/About.astro` | Experience (`aboutPage.timeline`: monogram tile, org, role, points, period with calendar icon) · Education · Award |
| `/stack/` | `views/Stack.astro` | One card per `stackPage.groups`, items as tool tiles (icon + name) like Unti's Tools |
| `/projects/` | `views/Projects.astro` | Pipeline slip card · 15-clusters stat card · work index card |
| `/notes/…` | Notes components | Category cards, entry cards, article in a card |
| `/contact/` | `views/Contact.astro` | Intro card + the same contact rows + mail button |

## Knowledge base

Collection `notes` (`src/content.config.ts`, glob `src/content/notes/**/*.md`): `title`, `category: dsa|troubleshooting|patterns`, `summary`, `date`, `tags[]`, `lang: zh|en`. Routes `/notes/`, `/notes/<category>/`, `/notes/<category>/<slug>/` in both locales.
