import { Component, ChangeDetectionStrategy, AfterViewInit, OnInit, ElementRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('aboutSection', { static: true }) aboutSection!: ElementRef<HTMLElement>;

  stat1Display = '0';
  stat2Display = '0';
  stat3Display = '0';
  
  private animated = false;
  private langSub!: Subscription;

  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Escuchar cambios de idioma para actualizar los números si ya fueron animados
    this.langSub = this.translate.onLangChange.subscribe(() => {
      if (this.animated) {
        this.translate.get(['ABOUT.STAT1_NUMBER', 'ABOUT.STAT2_NUMBER', 'ABOUT.STAT3_NUMBER']).subscribe(res => {
          this.stat1Display = res['ABOUT.STAT1_NUMBER'];
          this.stat2Display = res['ABOUT.STAT2_NUMBER'];
          this.stat3Display = res['ABOUT.STAT3_NUMBER'];
          this.cdr.detectChanges();
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.initScrollReveal();
  }

  ngOnDestroy(): void {
    if (this.langSub) this.langSub.unsubscribe();
  }

  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Disparar animación de números cuando la sección entra en vista
            if (!this.animated && entry.target === this.aboutSection.nativeElement) {
              this.animated = true;
              this.animateStats();
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    // Observar la sección completa para disparar los números
    observer.observe(this.aboutSection.nativeElement);

    const revealElements = this.aboutSection.nativeElement.querySelectorAll('.reveal');
    revealElements.forEach((element) => observer.observe(element));
  }

  private animateStats(): void {
    this.translate.get(['ABOUT.STAT1_NUMBER', 'ABOUT.STAT2_NUMBER', 'ABOUT.STAT3_NUMBER']).subscribe(res => {
      this.animateValue(res['ABOUT.STAT1_NUMBER'], (val) => { this.stat1Display = val; this.cdr.detectChanges(); });
      this.animateValue(res['ABOUT.STAT2_NUMBER'], (val) => { this.stat2Display = val; this.cdr.detectChanges(); });
      this.animateValue(res['ABOUT.STAT3_NUMBER'], (val) => { this.stat3Display = val; this.cdr.detectChanges(); });
    });
  }

  private animateValue(targetString: string, updateFn: (val: string) => void): void {
    if (!targetString) return;
    
    // Extraer número y partes de texto (ej: "+10" o "15M")
    const numMatch = targetString.match(/[\d,.]+/);
    if (!numMatch) {
      updateFn(targetString);
      return;
    }
    
    const numStr = numMatch[0].replace(/,/g, '');
    const isFloat = numStr.includes('.');
    const targetNum = parseFloat(numStr);
    
    const prefix = targetString.substring(0, numMatch.index);
    const suffix = targetString.substring(numMatch.index! + numMatch[0].length);
    
    const duration = 4000; // 4 segundos de animación
    const start = performance.now();
    
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentNum = targetNum * easeProgress;
      
      const currentString = isFloat 
        ? currentNum.toFixed(1) 
        : Math.floor(currentNum).toString();
        
      updateFn(`${prefix}${currentString}${suffix}`);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        updateFn(targetString); // Asegurar el valor exacto final
      }
    };
    
    requestAnimationFrame(step);
  }
}
