import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './services/language.service';
import { SeoService } from './services/seo.service';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ValuePropositionComponent } from './components/value-proposition/value-proposition.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ValuePropositionComponent,
    ServicesComponent,
    ContactFormComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  constructor(
    private readonly languageService: LanguageService,
    private readonly seoService: SeoService
  ) {}

  ngOnInit(): void {
    // Initialize default language and SEO tracking
    this.languageService.initializeLanguage();
    this.seoService.initializeSeoTracking();
  }
}
