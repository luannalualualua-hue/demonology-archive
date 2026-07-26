import { Injectable } from '@angular/core';

import { ARTICLES } from '../data/articles.data';
import {
  Article,
  ArticleCategory,
} from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly articles = ARTICLES;

  getAll(): Article[] {
    return [...this.articles];
  }

  getBySlug(slug: string): Article | undefined {
    return this.articles.find((article) => article.slug === slug);
  }

  getCategories(): ArticleCategory[] {
    return [
      ...new Set(
        this.articles.map((article) => article.category),
      ),
    ].sort((first, second) =>
      first.localeCompare(second, 'ru'),
    );
  }
}