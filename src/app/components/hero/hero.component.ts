import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroComponent {
  protected scrollToContact(): void {
    const contactSection = document.getElementById('contact');

    if (!contactSection) {
      return;
    }

    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}
