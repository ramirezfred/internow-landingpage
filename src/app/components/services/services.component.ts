import { Component, ChangeDetectionStrategy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
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

  readonly motorsLinks: SocialLink[] = [
    { platform: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61576521206113', icon: this.fbIcon }
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
