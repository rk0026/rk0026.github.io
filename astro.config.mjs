import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rk0026.github.io',
  trailingSlash: 'always',
  markdown: { shikiConfig: { theme: 'github-dark' } },
  // English moved from /en/ to the root; keep old links working.
  redirects: Object.fromEntries(
    ['', 'about/', 'stack/', 'projects/', 'wispo/', 'contact/', 'notes/'].map((p) => [`/en/${p}`, `/${p}`]),
  ),
});
