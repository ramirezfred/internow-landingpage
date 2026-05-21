import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  @Input({ required: true }) iconSvg!: string;
  @Input({ required: true }) titleKey!: string;
  @Input({ required: true }) descriptionKey!: string;
  @Input() socialLinks: SocialLink[] = [];
}
