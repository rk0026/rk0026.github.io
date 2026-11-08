import zh from './zh';
import en from './en';

export type Lang = 'zh' | 'en';
export type Discipline = 'fe' | 'be' | 'infra' | 'ai' | 'sec';
export type Category = 'dsa' | 'troubleshooting' | 'patterns';
export type Row = { stage: string; value: string };

export type Dict = {
  htmlLang: string;
  meta: { title: string; description: string };
  nav: { home: string; overview: string; about: string; stack: string; projects: string; wispo: string; notes: string; contact: string; menu: string; switchLabel: string };
  top: { location: string; clockLabel: string; themeLabel: string };
  home: {
    name: string;
    role: string;
    now: string;
    photoAlt: string;
    cv: string;
    touch: string;
    overviewLabel: string;
    factsLabel: string;
    facts: Array<{ value: string; label: string }>;
    sideLabel: string;
    side: { title: string; text: string; shotAlt: string };
    pagesLabel: string;
    tiles: Array<{ page: 'about' | 'stack' | 'projects' | 'notes'; title: string; text: string }>;
  };
  aboutPage: {
    title: string;
    intro: string;
    paragraphs: string[];
    timelineHeading: string;
    timeline: Array<{ period: string; org: string; role: string; points: string[]; place: string }>;
    awardHeading: string;
    award: string;
    educationHeading: string;
    education: string;
  };
  stackPage: { title: string; intro: string; groups: Array<{ name: string; items: string[] }> };
  projectsPage: { title: string; intro: string };
  wispoPage: {
    label: string;
    title: string;
    intro: string;
    visit: string;
    shotAlt: string;
    featuresLabel: string;
    features: Array<{ name: string; items: string }>;
    buildLabel: string;
    buildFacts: Array<{ value: string; label: string }>;
    buildPoints: string[];
    stackLabel: string;
    stack: string[];
    storyLabel: string;
    storyTitle: string;
    storyText: string;
    storyVisit: string;
    storyAlt: string;
  };
  landing: {
    title: string;
    lead: string;
    hint: string;
    modulesLabel: string;
    modules: Array<{ id: string; label: string; title: string; scope: string; points: string[]; link: { text: string; path: string } }>;
  };
  contactPage: { title: string; intro: string };
  hero: { word: string; cta: string; ctaHref: string };
  pipeline: {
    heading: string;
    intro: string;
    pickLabel: string;
    projects: Array<{ id: string; name: string; groups: Array<{ name: string; rows: Row[] }>; result: Row }>;
  };
  stats: { heading: string; figure: string; caption: string };
  work: {
    heading: string;
    note: string;
    disciplines: Record<Discipline, string>;
    items: Array<{ name: string; disc: Discipline; detail: string }>;
  };
  knowledge: { heading: string; empty: string; count: (n: number) => string; items: Array<{ slug: Category; label: string }> };
  notes: {
    title: string;
    intro: string;
    descriptions: Record<Category, string>;
    empty: string;
    back: string;
    backHome: string;
    published: string;
  };
  contact: { heading: string; greeting: string; mailSubject: string; rows: Array<{ label: string; text: string; href?: string }> };
  footer: { rights: string };
  /** Alt text for the illustrative Unsplash photos in public/img/{key}.jpg. */
  images: { about: string; stack: string; projects: string; notes: string; clusters: string; built: string };
};

export const dicts: Record<Lang, Dict> = { zh, en };
export const t = (lang: Lang) => dicts[lang];
/** Prefix a site path with the locale: `/notes/` → `/zh/notes/` for zh (en is the default at `/`). */
export const href = (lang: Lang, path: string) => (lang === 'zh' ? `/zh${path}` : path);
