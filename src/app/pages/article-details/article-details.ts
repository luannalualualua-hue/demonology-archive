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
  private sectionObserver?: IntersectionObserver;

  readonly articles = this.articlesService.getAll();
  readonly article = signal<Article | undefined>(undefined);
  readonly loading = signal(true);
  readonly activeSection = signal('');

  readonly readingProgress = computed(() => {
    const sections = this.article()?.sections ?? [];
    const index = sections.findIndex((section) => section.id === this.activeSection());
    return sections.length <= 1 || index <= 0 ? 0 : index / (sections.length - 1);
  });

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
    this.destroyRef.onDestroy(() => this.sectionObserver?.disconnect());

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

        window.setTimeout(() => this.initializeSectionObserver(), 60);
      });
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  private initializeSectionObserver(): void {
    this.sectionObserver?.disconnect();

    const sections = (this.article()?.sections ?? [])
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!('IntersectionObserver' in window) || sections.length === 0) {
      return;
    }

    if (!this.activeSection()) {
      this.activeSection.set(sections[0].id);
    }

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          this.activeSection.set(visible.target.id);
        }
      },
      {
        rootMargin: '-24% 0px -58% 0px',
        threshold: [0.05, 0.2, 0.45],
      },
    );

    sections.forEach((section) => this.sectionObserver?.observe(section));
  }
}