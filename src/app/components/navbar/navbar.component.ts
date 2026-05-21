import { Component, ChangeDetectionStrategy, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly isScrolled = signal(false);
  protected readonly isMobileMenuOpen = signal(false);

  readonly currentLanguage$;

  constructor(private readonly languageService: LanguageService) {
    this.currentLanguage$ = this.languageService.currentLanguage$;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  protected scrollToSection(sectionId: string): void {
    this.isMobileMenuOpen.set(false);
    const element = document.getElementById(sectionId);

    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: 'smooth' });
  }

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  protected toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
}
