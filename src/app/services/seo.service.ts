import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

interface SeoData {
  title: string;
  description: string;
  keywords: string;
}

/**
 * Wrapper service over Angular's Title and Meta services.
 * Dynamically updates SEO meta tags when the language changes (RNF-03).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly translateService: TranslateService
  ) {}

  /** Subscribe to language changes and update all meta tags */
  initializeSeoTracking(): void {
    this.translateService.onLangChange.subscribe(() => {
      this.updateAllMetaTags();
    });
  }

  private updateAllMetaTags(): void {
    this.translateService
      .get(['SEO.TITLE', 'SEO.DESCRIPTION', 'SEO.KEYWORDS'])
      .subscribe((translations) => {
        const seoData: SeoData = {
          title: translations['SEO.TITLE'],
          description: translations['SEO.DESCRIPTION'],
          keywords: translations['SEO.KEYWORDS'],
        };

        this.applyMetaTags(seoData);
      });
  }

  private applyMetaTags(seoData: SeoData): void {
    this.titleService.setTitle(seoData.title);

    this.metaService.updateTag({ name: 'description', content: seoData.description });
    this.metaService.updateTag({ name: 'keywords', content: seoData.keywords });

    /* Open Graph tags */
    this.metaService.updateTag({ property: 'og:title', content: seoData.title });
    this.metaService.updateTag({ property: 'og:description', content: seoData.description });

    const currentLang = this.translateService.currentLang;
    const ogLocale = currentLang === 'en' ? 'en_US' : 'es_MX';
    this.metaService.updateTag({ property: 'og:locale', content: ogLocale });
  }
}
