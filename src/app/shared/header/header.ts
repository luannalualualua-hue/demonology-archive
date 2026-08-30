import {
  Component,
  HostListener,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { CreaturesService } from '../../core/services/creatures.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly creaturesService = inject(CreaturesService);
  private randomTimer?: number;

  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  readonly randomizing = signal(false);
  readonly randomCreatureName = signal('');
  readonly randomArchiveNumber = signal('');

  toggleMenu(): void {
    this.setMenuState(!this.menuOpen());
  }

  closeMenu(): void {
    this.setMenuState(false);
  }

  openRandomArchive(): void {
    if (this.randomizing()) {
      return;
    }

    const creatures = this.creaturesService.getAll();

    if (creatures.length === 0) {
      return;
    }

    const selected = creatures[Math.floor(Math.random() * creatures.length)];

    this.closeMenu();
    this.randomCreatureName.set(selected.name);
    this.randomArchiveNumber.set(selected.archiveNumber);
    this.randomizing.set(true);
    this.document.body.classList.add('archive-selection-open');

    this.randomTimer = window.setTimeout(() => {
      void this.router.navigate(['/encyclopedia', selected.slug]).finally(() => {
        window.setTimeout(() => {
          this.randomizing.set(false);
          this.document.body.classList.remove('archive-selection-open');
        }, 220);
      });
    }, 1050);
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(
      'mobile-menu-open',
      'archive-selection-open',
    );

    if (this.randomTimer) {
      window.clearTimeout(this.randomTimer);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 54);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 900) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  private setMenuState(open: boolean): void {
    this.menuOpen.set(open);
    this.document.body.classList.toggle('mobile-menu-open', open);
  }
}
