import { Injectable } from '@angular/core';

import { GLOSSARY_TERMS } from '../data/glossary.data';
import {
  GlossaryCategory,
  GlossaryTerm,
} from '../models/glossary-term.model';

@Injectable({
  providedIn: 'root',
})
export class GlossaryService {
  private readonly terms = GLOSSARY_TERMS;

  getAll(): GlossaryTerm[] {
    return [...this.terms].sort((first, second) =>
      first.term.localeCompare(second.term, 'ru'),
    );
  }

  getCategories(): GlossaryCategory[] {
    return [...new Set(this.terms.map((term) => term.category))].sort(
      (first, second) => first.localeCompare(second, 'ru'),
    );
  }

  getLetters(): string[] {
    return [...new Set(this.terms.map((term) => term.letter))].sort(
      (first, second) => first.localeCompare(second, 'ru'),
    );
  }
}