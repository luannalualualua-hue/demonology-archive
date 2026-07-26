export interface GlossaryTerm {
  id: number;
  term: string;
  letter: string;
  category: GlossaryCategory;
  shortDefinition: string;
  fullDefinition: string;
  relatedCreatures: GlossaryRelatedCreature[];
}

export type GlossaryCategory =
  | 'Существо'
  | 'Фольклор'
  | 'Ритуал'
  | 'Символ'
  | 'Исследование';

export interface GlossaryRelatedCreature {
  name: string;
  slug: string;
}