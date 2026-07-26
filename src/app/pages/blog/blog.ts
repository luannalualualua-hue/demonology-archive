import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { ArticleCategory } from '../../core/models/article.model';
import { ArticlesService } from '../../core/services/articles.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
  private readonly articlesService = inject(ArticlesService);

  readonly articles = this.articlesService.getAll();
  readonly categories = this.articlesService.getCategories();

  readonly selectedCategory = signal<ArticleCategory | ''>('');

  readonly filteredArticles = computed(() => {
    const category = this.selectedCategory();

    if (!category) {
      return this.articles;
    }

    return this.articles.filter(
      (article) => article.category === category,
    );
  });

  readonly featuredArticle = computed(() => {
    return this.filteredArticles()[0];
  });

  readonly remainingArticles = computed(() => {
    return this.filteredArticles().slice(1);
  });

  selectCategory(category: ArticleCategory | ''): void {
    this.selectedCategory.set(category);
  }
}