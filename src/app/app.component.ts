import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, HostListener } from '@angular/core';
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
export class App implements OnInit, AfterViewInit {
  constructor(
    private readonly languageService: LanguageService,
    private readonly seoService: SeoService
  ) {}

  ngOnInit(): void {
    // Initialize default language and SEO tracking
    this.languageService.initializeLanguage();
    this.seoService.initializeSeoTracking();
  }

  ngAfterViewInit(): void {
    this.initGlobalReveal();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (window.innerWidth > 768) {
      // Parallax for desktop
      const x = (e.clientX * -1) / 100;
      const y = (e.clientY * -1) / 100;
      
      document.querySelectorAll('.parallax-layer').forEach((layer: any) => {
        const speed = layer.getAttribute('data-speed') || 0.05;
        const xMove = x * speed * 100;
        const yMove = y * speed * 100;
        layer.style.transform = `translate(${xMove}px, ${yMove}px)`;
      });
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    // Scroll parallax fallback for mobile
    if (window.innerWidth <= 768) {
      const scrollY = window.scrollY;
      document.querySelectorAll('.parallax-layer').forEach((layer: any) => {
        const speed = layer.getAttribute('data-speed') || 0.05;
        const yMove = scrollY * speed * -1;
        layer.style.transform = `translateY(${yMove}px)`;
      });
    }
  }

  private initGlobalReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
