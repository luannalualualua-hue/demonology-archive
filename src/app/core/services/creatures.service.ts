import { Injectable } from '@angular/core';

import { CREATURES } from '../data/creatures.data';
import { Creature } from '../models/creature.model';

@Injectable({
  providedIn: 'root',
})
export class CreaturesService {
  private readonly creatures = CREATURES;

  getAll(): Creature[] {
    return [...this.creatures];
  }

  getBySlug(slug: string): Creature | undefined {
    return this.creatures.find((creature) => creature.slug === slug);
  }

  getCultures(): string[] {
    return this.getUniqueValues(
      this.creatures.map((creature) => creature.culture),
    );
  }

  getTypes(): string[] {
    return this.getUniqueValues(
      this.creatures.map((creature) => creature.type),
    );
  }

  getHabitats(): string[] {
    return this.getUniqueValues(
      this.creatures.map((creature) => creature.habitat),
    );
  }

  getFears(): string[] {
    return this.getUniqueValues(
      this.creatures.flatMap((creature) => creature.fears),
    );
  }

  private getUniqueValues(values: string[]): string[] {
    return [...new Set(values)].sort((first, second) =>
      first.localeCompare(second, 'ru'),
    );
  }
}