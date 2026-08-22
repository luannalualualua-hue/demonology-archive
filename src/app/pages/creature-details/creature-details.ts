import {
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  Creature,
  CreatureGalleryImage,
} from '../../core/models/creature.model';
import { CreaturesService } from '../../core/services/creatures.service';

@Component({
  selector: 'app-creature-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './creature-details.html',
  styleUrl: './creature-details.scss',
})
export class CreatureDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly creaturesService = inject(CreaturesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly creatures = this.creaturesService.getAll();
  readonly creature = signal<Creature | undefined>(undefined);
  readonly loading = signal(true);

  readonly currentIndex = computed(() => {
    const currentCreature = this.creature();

    if (!currentCreature) {
      return -1;
    }

    return this.creatures.findIndex(
      (creature) => creature.slug === currentCreature.slug,
    );
  });

  readonly previousCreature = computed(() => {
    const index = this.currentIndex();

    if (index <= 0) {
      return this.creatures[this.creatures.length - 1];
    }

    return this.creatures[index - 1];
  });

  readonly nextCreature = computed(() => {
    const index = this.currentIndex();

    if (index === -1 || index >= this.creatures.length - 1) {
      return this.creatures[0];
    }

    return this.creatures[index + 1];
  });

  readonly visualGallery = computed<CreatureGalleryImage[]>(() => {
    const item = this.creature();

    if (!item) {
      return [];
    }

    const visuals: CreatureGalleryImage[] = [
      {
        src: item.mainImage,
        alt: item.name,
        caption: `Архивный образ: ${item.name}`,
      },
    ];

    if (item.gallery.length > 0) {
      visuals.push(...item.gallery.slice(0, 2));
    } else {
      visuals.push(this.getHabitatVisual(item));
      visuals.push({
        src: 'assets/editorial/about-grimoire.webp',
        alt: 'Архивные материалы и гримуар',
        caption: 'Материальный контекст: архив, легенды и визуальная память',
      });
    }

    return visuals.slice(0, 3);
  });

  readonly relatedArchive = computed(() => {
    const item = this.creature();

    if (!item) {
      return [];
    }

    return this.creatures
      .filter((candidate) => candidate.slug !== item.slug)
      .filter(
        (candidate) =>
          candidate.culture === item.culture ||
          candidate.fears.some((fear) => item.fears.includes(fear)),
      )
      .slice(0, 3);
  });

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const slug = params.get('slug') ?? '';
        const creature = this.creaturesService.getBySlug(slug);

        this.creature.set(creature);
        this.loading.set(false);

        if (creature) {
          this.titleService.setTitle(
            `${creature.name} — энциклопедия | Демонология`,
          );
        } else {
          this.titleService.setTitle(
            'Материал не найден | Демонология',
          );
        }

        window.scrollTo({
          top: 0,
          behavior: 'instant',
        });
      });
  }

  private getHabitatVisual(item: Creature): CreatureGalleryImage {
    const habitat = item.habitat.toLocaleLowerCase('ru');

    if (habitat.includes('вод') || habitat.includes('болот')) {
      return {
        src: 'assets/editorial/water-border.webp',
        alt: 'Водная граница',
        caption: 'Среда обитания: вода как граница между мирами',
      };
    }

    if (habitat.includes('лес')) {
      return {
        src: 'assets/editorial/forest-remember.webp',
        alt: 'Лесной пейзаж',
        caption: 'Среда обитания: лес как пространство потери ориентации',
      };
    }

    if (
      habitat.includes('снег') ||
      habitat.includes('гор') ||
      habitat.includes('холод')
    ) {
      return {
        src: 'assets/editorial/about-mountains.webp',
        alt: 'Горный зимний ландшафт',
        caption: 'Среда обитания: холод, высота и уязвимость человека',
      };
    }

    return {
      src: 'assets/editorial/archive-guide.webp',
      alt: 'Архивный путеводитель',
      caption: 'Контекст образа: путь, порог и пограничное пространство',
    };
  }
}
