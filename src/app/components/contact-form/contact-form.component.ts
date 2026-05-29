import { Component, ChangeDetectionStrategy, signal, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContactService } from '../../services/contact.service';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent implements AfterViewInit {
  contactForm: FormGroup;
  status = signal<FormStatus>('idle');
  private readonly contactService = inject(ContactService);

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef<HTMLElement>;

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

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

    if (this.contactSection?.nativeElement) {
      const revealElements = this.contactSection.nativeElement.querySelectorAll('.reveal');
      revealElements.forEach((element) => observer.observe(element));
    }
  }

  sendContactForm(): void {
    // 1. Early Return pattern (Rule 10)
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // 2. Happy path
    this.status.set('loading');
    
    try {
      this.contactService.sendToWhatsApp(this.contactForm.value);
      this.status.set('success');
      this.contactForm.reset();
    } catch (e) {
      this.status.set('error');
    }
    
    // Reset status after a few seconds
    setTimeout(() => {
      this.status.set('idle');
    }, 5000);
  }
}
