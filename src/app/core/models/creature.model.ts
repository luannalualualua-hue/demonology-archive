export interface Creature {
  id: number;
  slug: string;
  archiveNumber: string;

  name: string;
  originalName?: string;

  culture: string;
  region: string;
  type: string;
  habitat: string;

  fears: string[];

  shortDescription: string;

  introduction: string;
  appearance: string;
  behavior: string;
  origin: string;
  symbolism: string;
  creativeUse: string;

  mainImage: string;
  gallery: CreatureGalleryImage[];
  sources: CreatureSource[];
}

export interface CreatureGalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface CreatureSource {
  title: string;
  author?: string;
  year?: string;
  url?: string;
}