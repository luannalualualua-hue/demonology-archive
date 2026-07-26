import {
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Article } from '../../core/models/article.model';
import { ArticlesService } from '../../core/services/articles.service';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-details.html',
  styleUrl: './article-details.scss',
})
export class ArticleDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly titleService = inject(Title);
  private readonly articlesService = inject(ArticlesService);

  readonly articles = this.articlesService.getAll();
  readonly article = signal<Article | undefined>(undefined);
  readonly loading = signal(true);

  readonly currentIndex = computed(() => {
    const currentArticle = this.article();

    if (!currentArticle) {
      return -1;
    }

    return this.articles.findIndex(
      (article) => article.slug === currentArticle.slug,
    );
  });

  readonly previousArticle = computed(() => {
    const index = this.currentIndex();

    if (index <= 0) {
      return this.articles[this.articles.length - 1];
    }

    return this.articles[index - 1];
  });

  readonly nextArticle = computed(() => {
    const index = this.currentIndex();

    if (index === -1 || index >= this.articles.length - 1) {
      return this.articles[0];
    }

    return this.articles[index + 1];
  });

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const slug = params.get('slug') ?? '';
        const article = this.articlesService.getBySlug(slug);

        this.article.set(article);
        this.loading.set(false);

        if (article) {
          this.titleService.setTitle(
            `${article.title} | Демонология`,
          );
        } else {
          this.titleService.setTitle(
            'Статья не найдена | Демонология',
          );
        }

        window.scrollTo(0, 0);
      });
  }
}