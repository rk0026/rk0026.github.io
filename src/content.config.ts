import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['dsa', 'troubleshooting', 'patterns']),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['zh', 'en']).default('zh'),
  }),
});

export const collections = { notes };
