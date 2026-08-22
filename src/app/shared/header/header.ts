import {
  Component,
  HostListener,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnDestroy {
  private readonly document = inject(DOCUMENT);

  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.setMenuState(!this.menuOpen());
  }

  closeMenu(): void {
    this.setMenuState(false);
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('mobile-menu-open');
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
