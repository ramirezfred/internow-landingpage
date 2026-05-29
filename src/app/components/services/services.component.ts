import { Component, ChangeDetectionStrategy, AfterViewInit, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent, SocialLink } from '../service-card/service-card.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule, ServiceCardComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServicesComponent implements AfterViewInit {
  @ViewChild('servicesSection', { static: true }) servicesSection!: ElementRef<HTMLElement>;

  // Icon for Mezcal (Brand)
  readonly mezcalIcon = `<div style="font-size: 3rem; text-shadow: 0 0 20px rgba(0,212,255,0.5);">🥃</div>`;
  
  // Icon for Motors (Import)
  readonly motorsIcon = `<div style="font-size: 3rem; text-shadow: 0 0 20px rgba(0,212,255,0.5);">🚘</div>`;
  
  // Icon for China DDP (Logistics)
  readonly chinaIcon = `<div style="font-size: 3rem; text-shadow: 0 0 20px rgba(0,212,255,0.5);">🚢</div>`;
  
  // Icon for Apps (Tech)
  readonly appsIcon = `<div style="font-size: 3rem; text-shadow: 0 0 20px rgba(0,212,255,0.5);">📱</div>`;
  
  // Icon for Consulting (Tech)
  readonly consultingIcon = `<div style="font-size: 3rem; text-shadow: 0 0 20px rgba(0,212,255,0.5);">🤝</div>`;

  // Social Links
  readonly fbIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`;
  readonly igIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`;

  readonly mezcalLinks: SocialLink[] = [
    { platform: 'Facebook', url: 'https://www.facebook.com/creatumezcal', icon: this.fbIcon },
    { platform: 'Instagram', url: 'https://www.instagram.com/creatumezcal?igsh=dzZ6eHczbnF6N2Fr', icon: this.igIcon }
  ];

  readonly tequilaLinks: SocialLink[] = [
    { platform: 'Facebook', url: 'https://www.facebook.com/share/1E3rs564s9/', icon: this.fbIcon },
    { platform: 'Instagram', url: 'https://www.instagram.com/creatutequila?igsh=MTQ5bnZ3cHNqeXRyNg==', icon: this.igIcon }
  ];

  readonly motorsLinks: SocialLink[] = [
    { platform: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61576521206113', icon: this.fbIcon }
  ];

  readonly chinaLinks: SocialLink[] = [
    { platform: 'Facebook', url: 'https://www.facebook.com/share/1EpcD1o3QV/', icon: this.fbIcon }
  ];

  readonly consultingLinks: SocialLink[] = [
    { platform: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100092537898574', icon: this.fbIcon },
    { platform: 'Instagram', url: 'https://www.instagram.com/internowmex?igsh=MXU3amU4cHR2YWJ0NA==', icon: this.igIcon }
  ];

  readonly playStoreIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V3l14 9-14 9z"/><path d="M5 3l9 9-9 9"/><path d="M19 12H5"/></svg>`;
  readonly appleIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.64.74-1.2 1.88-1.05 3 .12.09.24.14.36.14.88 0 2.02-.6 2.64-1.59z"/></svg>`;

  readonly appLinks: SocialLink[] = [
    { platform: 'Google Play', url: 'https://play.google.com/store/apps/dev?id=5638693745199999314', icon: this.playStoreIcon },
    { platform: 'App Store', url: 'https://apps.apple.com/mx/developer/internow-corp-sa-de-cv/id1629327171', icon: this.appleIcon }
  ];

  ngAfterViewInit(): void {
    this.initScrollReveal();
  }

  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = this.servicesSection.nativeElement.querySelectorAll('.reveal');
    revealElements.forEach((element) => observer.observe(element));
  }
}
