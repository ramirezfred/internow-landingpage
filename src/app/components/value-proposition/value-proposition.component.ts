import { Component, ChangeDetectionStrategy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-value-proposition',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './value-proposition.component.html',
  styleUrl: './value-proposition.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValuePropositionComponent implements AfterViewInit {
  @ViewChild('valueSection', { static: true }) valueSection!: ElementRef<HTMLElement>;

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

    const revealElements = this.valueSection.nativeElement.querySelectorAll('.reveal');
    revealElements.forEach((element) => observer.observe(element));
  }
}
