import {
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

import { GalleryImage } from '../../core/models/gallery-image.model';
import { GalleryService } from '../../core/services/gallery.service';
import { GalleryLightbox } from '../../shared/components/gallery-lightbox/gallery-lightbox';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [GalleryLightbox],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  private readonly galleryService = inject(GalleryService);

  readonly images = this.galleryService.getAll();
  readonly categories = this.galleryService.getCategories();
  readonly cultures = this.galleryService.getCultures();

  readonly selectedCategory = signal('');
  readonly selectedCulture = signal('');

  readonly lightboxOpen = signal(false);
  readonly selectedImageIndex = signal(0);

  readonly filteredImages = computed(() => {
    const category = this.selectedCategory();
    const culture = this.selectedCulture();

    return this.images.filter((image) => {
      const matchesCategory =
        category.length === 0 || image.category === category;

      const matchesCulture =
        culture.length === 0 || image.culture === culture;

      return matchesCategory && matchesCulture;
    });
  });

  readonly hasFilters = computed(() => {
    return (
      this.selectedCategory().length > 0 ||
      this.selectedCulture().length > 0
    );
  });

  constructor() {
    effect(() => {
      const isOpen = this.lightboxOpen();

      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.closeLightbox();
  }

  selectCulture(culture: string): void {
    this.selectedCulture.set(culture);
    this.closeLightbox();
  }

  resetFilters(): void {
    this.selectedCategory.set('');
    this.selectedCulture.set('');
  }

  openLightbox(image: GalleryImage): void {
    const index = this.filteredImages().findIndex(
      (item) => item.id === image.id,
    );

    if (index === -1) {
      return;
    }

    this.selectedImageIndex.set(index);
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  changeLightboxIndex(index: number): void {
    this.selectedImageIndex.set(index);
  }
}