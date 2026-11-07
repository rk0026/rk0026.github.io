import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rk0026.github.io',
  trailingSlash: 'always',
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
