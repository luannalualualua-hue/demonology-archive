import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CreaturesService } from '../../core/services/creatures.service';
import { CreatureCard } from '../../shared/components/creature-card/creature-card';

@Component({
  selector: 'app-encyclopedia',
  standalone: true,
  imports: [FormsModule, CreatureCard],
  templateUrl: './encyclopedia.html',
  styleUrl: './encyclopedia.scss',
})
export class Encyclopedia {
  private readonly creaturesService = inject(CreaturesService);

  readonly creatures = this.creaturesService.getAll();

  readonly cultures = this.creaturesService.getCultures();
  readonly types = this.creaturesService.getTypes();
  readonly habitats = this.creaturesService.getHabitats();
  readonly fears = this.creaturesService.getFears();

  readonly searchQuery = signal('');
  readonly selectedCulture = signal('');
  readonly selectedType = signal('');
  readonly selectedHabitat = signal('');
  readonly selectedFear = signal('');

  readonly mobileFiltersOpen = signal(false);

  readonly filteredCreatures = computed(() => {
    const query = this.normalize(this.searchQuery());
    const culture = this.selectedCulture();
    const type = this.selectedType();
    const habitat = this.selectedHabitat();
    const fear = this.selectedFear();

    return this.creatures.filter((creature) => {
      const searchableText = this.normalize(
        [
          creature.name,
          creature.originalName ?? '',
          creature.culture,
          creature.region,
          creature.type,
          creature.habitat,
          creature.shortDescription,
          ...creature.fears,
        ].join(' '),
      );

      const matchesSearch =
        query.length === 0 || searchableText.includes(query);

      const matchesCulture =
        culture.length === 0 || creature.culture === culture;

      const matchesType =
        type.length === 0 || creature.type === type;

      const matchesHabitat =
        habitat.length === 0 || creature.habitat === habitat;

      const matchesFear =
        fear.length === 0 || creature.fears.includes(fear);

      return (
        matchesSearch &&
        matchesCulture &&
        matchesType &&
        matchesHabitat &&
        matchesFear
      );
    });
  });

  readonly activeFiltersCount = computed(() => {
    return [
      this.selectedCulture(),
      this.selectedType(),
      this.selectedHabitat(),
      this.selectedFear(),
    ].filter(Boolean).length;
  });

  updateSearch(value: string): void {
    this.searchQuery.set(value);
  }

  updateCulture(value: string): void {
    this.selectedCulture.set(value);
  }

  updateType(value: string): void {
    this.selectedType.set(value);
  }

  updateHabitat(value: string): void {
    this.selectedHabitat.set(value);
  }

  updateFear(value: string): void {
    this.selectedFear.set(value);
  }

  toggleMobileFilters(): void {
    this.mobileFiltersOpen.update((value) => !value);
  }

  closeMobileFilters(): void {
    this.mobileFiltersOpen.set(false);
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedCulture.set('');
    this.selectedType.set('');
    this.selectedHabitat.set('');
    this.selectedFear.set('');
  }

  private normalize(value: string): string {
    return value.trim().toLocaleLowerCase('ru');
  }
}