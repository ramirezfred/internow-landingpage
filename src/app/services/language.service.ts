import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

type SupportedLanguage = 'es' | 'en';

const LANGUAGE_STORAGE_KEY = 'internow-lang';
const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['es', 'en'];
const DEFAULT_LANGUAGE: SupportedLanguage = 'es';

/**
 * Wrapper service over @ngx-translate that handles:
 * - Browser language detection
 * - localStorage persistence (RF-05)
 * - Reactive language switching (RF-02)
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly currentLanguageSubject = new BehaviorSubject<SupportedLanguage>(DEFAULT_LANGUAGE);
  readonly currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(private readonly translateService: TranslateService) {
    this.translateService.addLangs(SUPPORTED_LANGUAGES);
    this.translateService.setDefaultLang(DEFAULT_LANGUAGE);
  }

  /**
   * Initializes language on app bootstrap:
   * 1. Check localStorage for saved preference
   * 2. If none, detect browser language
   * 3. Fall back to Spanish
   */
  initializeLanguage(): void {
    const storedLanguage = this.getStoredLanguage();

    if (storedLanguage) {
      this.applyLanguage(storedLanguage);
      return;
    }

    const browserLanguage = this.detectBrowserLanguage();
    this.applyLanguage(browserLanguage);
  }

  /** Toggle between ES and EN */
  switchLanguage(language: SupportedLanguage): void {
    this.persistLanguage(language);
    this.applyLanguage(language);
  }

  /** Get the current active language synchronously */
  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguageSubject.value;
  }

  /** Toggle to the opposite language */
  toggleLanguage(): void {
    const next: SupportedLanguage = this.getCurrentLanguage() === 'es' ? 'en' : 'es';
    this.switchLanguage(next);
  }

  private applyLanguage(language: SupportedLanguage): void {
    this.translateService.use(language);
    this.currentLanguageSubject.next(language);
    document.documentElement.lang = language;
  }

  private detectBrowserLanguage(): SupportedLanguage {
    const browserLang = navigator.language?.substring(0, 2)?.toLowerCase();
    return browserLang === 'en' ? 'en' : DEFAULT_LANGUAGE;
  }

  private getStoredLanguage(): SupportedLanguage | null {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (!stored) {
      return null;
    }

    return SUPPORTED_LANGUAGES.includes(stored as SupportedLanguage)
      ? (stored as SupportedLanguage)
      : null;
  }

  private persistLanguage(language: SupportedLanguage): void {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
}
