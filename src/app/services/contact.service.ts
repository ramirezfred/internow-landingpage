import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly translate = inject(TranslateService);
  private readonly whatsappNumber = '527971325701';

  /**
   * Generates a pre-filled WhatsApp message based on contact form details
   * and opens the WhatsApp API in a new browser tab.
   */
  sendToWhatsApp(data: ContactFormData): void {
    const serviceKeyMap: Record<string, string> = {
      brand: 'CONTACT.SERVICE_OPT1',
      motors: 'CONTACT.SERVICE_OPT2',
      china: 'CONTACT.SERVICE_OPT3',
      apps: 'CONTACT.SERVICE_OPT4',
      consulting: 'CONTACT.SERVICE_OPT5',
      other: 'CONTACT.SERVICE_OPT6',
    };

    const serviceKey = serviceKeyMap[data.service] || 'CONTACT.SERVICE_OPT6';
    const translatedService = this.translate.instant(serviceKey);

    const isEn = this.translate.currentLang === 'en';

    let text = '';
    if (isEn) {
      text = `Hello InterNow, I would like to get in touch. Here are my details:

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone}
*Service of interest:* ${translatedService}

*Message:*
${data.message}`;
    } else {
      text = `Hola InterNow, me gustaría ponerme en contacto. Aquí están mis detalles:

*Nombre:* ${data.name}
*Correo:* ${data.email}
*Teléfono:* ${data.phone}
*Servicio de interés:* ${translatedService}

*Mensaje:*
${data.message}`;
    }

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }
}
