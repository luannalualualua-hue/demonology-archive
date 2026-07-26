import {
  Component,
  HostListener,
  computed,
  input,
  output,
} from '@angular/core';

import { GalleryImage } from '../../../core/models/gallery-image.model';

@Component({
  selector: 'app-gallery-lightbox',
  standalone: true,
  templateUrl: './gallery-lightbox.html',
  styleUrl: './gallery-lightbox.scss',
})
export class GalleryLightbox {
  readonly images = input.required<GalleryImage[]>();
  readonly selectedIndex = input.required<number>();

  readonly closed = output<void>();
  readonly indexChanged = output<number>();

  readonly selectedImage = computed(() => {
    return this.images()[this.selectedIndex()];
  });

  readonly counter = computed(() => {
    return `${this.selectedIndex() + 1} / ${this.images().length}`;
  });

  close(): void {
    this.closed.emit();
  }

  showPrevious(): void {
    const images = this.images();

    if (images.length === 0) {
      return;
    }

    const nextIndex =
      this.selectedIndex() <= 0
        ? images.length - 1
        : this.selectedIndex() - 1;

    this.indexChanged.emit(nextIndex);
  }

  showNext(): void {
    const images = this.images();

    if (images.length === 0) {
      return;
    }

    const nextIndex =
      this.selectedIndex() >= images.length - 1
        ? 0
        : this.selectedIndex() + 1;

    this.indexChanged.emit(nextIndex);
  }

  preventClose(event: MouseEvent): void {
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    this.showPrevious();
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    this.showNext();
  }
}