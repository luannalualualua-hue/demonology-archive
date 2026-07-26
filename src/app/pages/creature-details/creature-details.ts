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

import { Creature } from '../../core/models/creature.model';
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
}