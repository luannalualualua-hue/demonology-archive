import { Injectable } from '@angular/core';

import { GALLERY_IMAGES } from '../data/gallery.data';
import { GalleryImage } from '../models/gallery-image.model';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private readonly images = GALLERY_IMAGES;

  getAll(): GalleryImage[] {
    return [...this.images];
  }

  getCategories(): string[] {
    return this.unique(
      this.images.map((image) => image.category),
    );
  }

  getCultures(): string[] {
    return this.unique(
      this.images.map((image) => image.culture),
    );
  }

  private unique(values: string[]): string[] {
    return [...new Set(values)].sort((first, second) =>
      first.localeCompare(second, 'ru'),
    );
  }
}