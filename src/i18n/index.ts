import zh from './zh';
import en from './en';

export type Lang = 'zh' | 'en';
export type Tone = 'accent' | 'plum' | 'paper';
export type Discipline = 'fe' | 'be' | 'infra' | 'ai' | 'sec';
export type Category = 'dsa' | 'troubleshooting' | 'patterns';
export type Row = { stage: string; value: string };

export type Dict = {
  htmlLang: string;
  meta: { title: string; description: string };
  nav: { about: string; work: string; notes: string; menu: string; switchLabel: string; switchHref: string };
  hero: { word: string; h1: string; sentence: string; cta: string; ctaHref: string };
  about: { heading: string; parts: Array<string | { text: string; tone: Tone }>; closing: string };
  pipeline: {
    heading: string;
    intro: string;
    pickLabel: string;
    projects: Array<{ id: string; name: string; groups: Array<{ name: string; rows: Row[] }>; result: Row }>;
  };
  stats: { heading: string; figure: string; caption: string; photoAlt: string };
  work: {
    heading: string;
    note: string;
    disciplines: Record<Discipline, string>;
    items: Array<{ name: string; disc: Discipline; detail: string }>;
  };
  knowledge: { heading: string; empty: string; count: (n: number) => string; items: Array<{ slug: Category; label: string }>; photoAlt: string };
  notes: {
    title: string;
    intro: string;
    descriptions: Record<Category, string>;
    empty: string;
    back: string;
    backHome: string;
    published: string;
    photoAlt: string;
  };
  contact: { heading: string; greeting: string; mailSubject: string; rows: Array<{ text: string; href?: string }> };
  footer: { creditsLabel: string; rights: string };
};

export const dicts: Record<Lang, Dict> = { zh, en };
export const t = (lang: Lang) => dicts[lang];
/** Prefix a site path with the locale: `/notes/` → `/en/notes/` for en. */
export const href = (lang: Lang, path: string) => (lang === 'en' ? `/en${path}` : path);
