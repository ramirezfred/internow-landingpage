import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  contactForm: FormGroup;
  status = signal<FormStatus>('idle');

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  sendContactForm(): void {
    // 1. Early Return pattern (Rule 10)
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // 2. Happy path
    this.status.set('loading');
    
    // Simulate API call
    setTimeout(() => {
      // Mock success for now, in the future integrate EmailJS/Formspree/Firebase here
      this.status.set('success');
      this.contactForm.reset();
      
      // Reset status after a few seconds
      setTimeout(() => {
        this.status.set('idle');
      }, 5000);
    }, 1500);
  }
}
