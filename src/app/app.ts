import {
  AfterViewInit,
  Component,
  DestroyRef,
  NgZone,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  private revealObserver?: IntersectionObserver;
  private scrollFrame = 0;
  private pointerFrame = 0;
  private pointerX = 0;
  private pointerY = 0;

  readonly routeChanging = signal(false);
  readonly scrollProgress = signal(0);
  readonly showBackToTop = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationStart | NavigationEnd =>
            event instanceof NavigationStart || event instanceof NavigationEnd,
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (!('startViewTransition' in this.document)) {
            this.routeChanging.set(true);
          }
          return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

        window.requestAnimationFrame(() => {
          this.routeChanging.set(false);
          window.setTimeout(() => this.prepareRevealAnimations(), 30);
        });
      });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.updateScrollProgress();
      this.prepareRevealAnimations();

      window.addEventListener('scroll', this.handleScroll, {
        passive: true,
      });
      window.addEventListener('resize', this.handleResize, {
        passive: true,
      });
      window.addEventListener('pointermove', this.handlePointerMove, {
        passive: true,
      });
    });

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('pointermove', this.handlePointerMove);
      window.cancelAnimationFrame(this.scrollFrame);
      window.cancelAnimationFrame(this.pointerFrame);
      this.revealObserver?.disconnect();
    });
  }

  private readonly handleScroll = (): void => {
    if (this.scrollFrame) {
      return;
    }

    this.scrollFrame = window.requestAnimationFrame(() => {
      this.scrollFrame = 0;
      this.updateScrollProgress();
    });
  };

  private readonly handleResize = (): void => {
    this.updateScrollProgress();
  };

  private readonly handlePointerMove = (event: PointerEvent): void => {
    this.pointerX = event.clientX;
    this.pointerY = event.clientY;

    if (this.pointerFrame) {
      return;
    }

    this.pointerFrame = window.requestAnimationFrame(() => {
      this.pointerFrame = 0;
      this.document.documentElement.style.setProperty(
        '--pointer-x',
        `${this.pointerX}px`,
      );
      this.document.documentElement.style.setProperty(
        '--pointer-y',
        `${this.pointerY}px`,
      );
    });
  };

  scrollToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  private updateScrollProgress(): void {
    const root = this.document.documentElement;
    const maxScroll = root.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

    this.zone.run(() => {
      this.scrollProgress.set(Math.min(1, Math.max(0, progress)));
      this.showBackToTop.set(window.scrollY > 720);
    });
  }

  private prepareRevealAnimations(): void {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    this.revealObserver?.disconnect();

    const selector = [
      '.section',
      '.catalog',
      '.gallery-section',
      '.glossary-section',
      '.blog-section',
      '.archive-content',
      '.article-body',
      '.project-intro',
      '.mission',
      '.principles',
      '.classification',
      '.audience',
      '.methodology',
      '.creature-card',
      '.card',
      '.gallery-item',
      '.article-card',
      '.term-card',
      '.principle-card',
      '.audience-item',
      '.stage-card',
      '.fear-item',
      '.related-card',
      '.visual-card',
      '.research-sidebar__item',
      '.hero-research-strip a',
      '.hero-archive-grid a',
      '.glossary-visual-card',
      '.about-visual-strip',
      '.blog-visual-banner',
      '.article-visual-dossier',
      '.culture-atlas',
      '.atlas-node',
      '.atlas-dossier__creatures a',
      '.lightbox__filmstrip button',
    ].join(',');

    const elements = Array.from(
      this.document.querySelectorAll<HTMLElement>(selector),
    );

    elements.forEach((element, index) => {
      if (element.dataset['revealReady'] === 'true') {
        return;
      }

      element.dataset['revealReady'] = 'true';
      element.classList.add('reveal-item');
      element.style.setProperty(
        '--reveal-delay',
        `${Math.min(index % 6, 5) * 55}ms`,
      );

      if (prefersReducedMotion) {
        element.classList.add('is-visible');
      }
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    this.revealObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -7% 0px',
      },
    );

    elements
      .filter((element) => !element.classList.contains('is-visible'))
      .forEach((element) => this.revealObserver?.observe(element));
  }
}
