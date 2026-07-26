export interface Article {
  id: number;
  slug: string;
  archiveNumber: string;

  title: string;
  subtitle: string;
  category: ArticleCategory;

  author: string;
  publishedAt: string;
  readingTime: number;

  coverImage: string;
  preview: string;
  introduction: string;

  sections: ArticleSection[];
  relatedCreatures: ArticleRelatedCreature[];
  sources: ArticleSource[];
}

export type ArticleCategory =
  | 'Исследование'
  | 'Визуальная культура'
  | 'Гейм-дизайн'
  | 'Фольклор';

export interface ArticleSection {
  id: string;
  number: string;
  label: string;
  title: string;
  paragraphs: string[];
  quote?: string;
  image?: string;
  imageCaption?: string;
}

export interface ArticleRelatedCreature {
  name: string;
  slug: string;
  archiveNumber: string;
}

export interface ArticleSource {
  title: string;
  author?: string;
  year?: string;
  source?: string;
}