import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  safeIcon?: SafeHtml;
}

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServiceCardComponent implements OnChanges, OnInit {
  @Input() iconSvg?: string;
  @Input({ required: true }) titleKey!: string;
  @Input({ required: true }) descriptionKey!: string;
  @Input() moreKey?: string;
  @Input() socialLinks: SocialLink[] = [];

  safeIconSvg!: SafeHtml;
  isExpanded = false;

  private readonly sanitizer = inject(DomSanitizer);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.updateIcons();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateIcons();
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
    this.changeDetectorRef.markForCheck();
  }

  private updateIcons(): void {
    if (this.iconSvg) {
      this.safeIconSvg = this.sanitizer.bypassSecurityTrustHtml(this.iconSvg);
    }
    
    if (this.socialLinks && this.socialLinks.length > 0) {
      // Create a new array with safeIcon properties
      this.socialLinks = this.socialLinks.map(link => {
        return link.safeIcon ? link : {
          ...link,
          safeIcon: this.sanitizer.bypassSecurityTrustHtml(link.icon)
        };
      });
    }
  }
}
