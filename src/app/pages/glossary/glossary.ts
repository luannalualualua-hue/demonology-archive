import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  GlossaryCategory,
  GlossaryTerm,
} from '../../core/models/glossary-term.model';
import { GlossaryService } from '../../core/services/glossary.service';

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './glossary.html',
  styleUrl: './glossary.scss',
})
export class Glossary {
  private readonly glossaryService = inject(GlossaryService);

  readonly terms = this.glossaryService.getAll();
  readonly letters = this.glossaryService.getLetters();
  readonly categories = this.glossaryService.getCategories();

  readonly searchQuery = signal('');
  readonly selectedLetter = signal('');
  readonly selectedCategory = signal<GlossaryCategory | ''>('');
  readonly openedTermId = signal<number | null>(null);

  readonly filteredTerms = computed(() => {
    const query = this.normalize(this.searchQuery());
    const letter = this.selectedLetter();
    const category = this.selectedCategory();

    return this.terms.filter((term) => {
      const searchableText = this.normalize(
        [
          term.term,
          term.shortDefinition,
          term.fullDefinition,
          term.category,
        ].join(' '),
      );

      const matchesQuery =
        query.length === 0 || searchableText.includes(query);

      const matchesLetter =
        letter.length === 0 || term.letter === letter;

      const matchesCategory =
        category.length === 0 || term.category === category;

      return matchesQuery && matchesLetter && matchesCategory;
    });
  });

  readonly groupedTerms = computed(() => {
    const groups = new Map<string, typeof this.terms>();

    for (const term of this.filteredTerms()) {
      const currentTerms = groups.get(term.letter) ?? [];
      currentTerms.push(term);
      groups.set(term.letter, currentTerms);
    }

    return Array.from(groups.entries()).map(([letter, terms]) => ({
      letter,
      terms,
    }));
  });

  readonly hasFilters = computed(() => {
    return (
      this.searchQuery().length > 0 ||
      this.selectedLetter().length > 0 ||
      this.selectedCategory().length > 0
    );
  });

  updateSearch(value: string): void {
    this.searchQuery.set(value);
    this.openedTermId.set(null);
  }

  selectLetter(letter: string): void {
    this.selectedLetter.set(
      this.selectedLetter() === letter ? '' : letter,
    );

    this.openedTermId.set(null);
  }

  selectCategory(category: GlossaryCategory | ''): void {
    this.selectedCategory.set(category);
    this.openedTermId.set(null);
  }

  toggleTerm(id: number): void {
    this.openedTermId.update((currentId) =>
      currentId === id ? null : id,
    );
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedLetter.set('');
    this.selectedCategory.set('');
    this.openedTermId.set(null);
  }

  getTermIllustration(term: GlossaryTerm): string {
    const illustrations: Record<number, string> = {
      1: 'assets/decor/sigil.svg',
      2: 'assets/editorial/archive-guide.webp',
      3: 'assets/editorial/glossary-codex-collage.webp',
      4: 'assets/creatures/baba-yaga-main.jpg',
      5: 'assets/creatures/oni-main.png',
      6: 'assets/creatures/leshy-main.jpg',
      7: 'assets/creatures/yuki-onna-main.png',
      8: 'assets/editorial/about-method-collage.webp',
      9: 'assets/editorial/forest-remember.webp',
      10: 'assets/editorial/about-grimoire.webp',
      11: 'assets/creatures/puca-main.png',
      12: 'assets/creatures/djinn-main.png',
      13: 'assets/creatures/banshee-main.jpg',
      14: 'assets/creatures/la-llorona-main.jpg',
      15: 'assets/editorial/glossary-witch.webp',
      16: 'assets/editorial/glossary-nature.webp',
      17: 'assets/creatures/upyr-main.png',
      18: 'assets/creatures/draugr-main.png',
      19: 'assets/editorial/water-border.webp',
      20: 'assets/creatures/ifrit-main.png',
    };

    return illustrations[term.id] ?? 'assets/editorial/glossary-demon.webp';
  }


  isContainedIllustration(term: GlossaryTerm): boolean {
    return term.id === 1 || term.id === 3 || term.id === 8 || term.id === 10;
  }

  private normalize(value: string): string {
    return value.trim().toLocaleLowerCase('ru');
  }
}
