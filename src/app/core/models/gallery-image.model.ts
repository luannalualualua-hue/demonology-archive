export interface GalleryImage {
  id: number;
  slug: string;

  title: string;
  creatureName: string;

  culture: string;
  region: string;
  category: string;

  image: string;
  thumbnail: string;

  description: string;
  archiveNumber: string;

  author?: string;
  year?: string;
  source?: string;
  license?: string;
}