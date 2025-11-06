// src/services/email/emailjsClient.ts
'use strict';

// Wrapper fino do EmailJS para uso no frontend.
// Usa @emailjs/browser (sem expor credenciais SMTP).
import { init, send } from '@emailjs/browser';
import type { ContactFormValues } from '../../types/contact';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;

// Inicializa EmailJS uma vez (idempotente).
if (PUBLIC_KEY) {
  init(PUBLIC_KEY);
} else {
  // Aviso útil em dev
  // eslint-disable-next-line no-console
  console.warn(
    '[emailjsClient] Missing VITE_EMAILJS_PUBLIC_KEY. Configure .env.local with your EmailJS keys.'
  );
}

/**
 * Envia email de contacto via EmailJS.
 * - Mapeia os campos do formulário para os parâmetros do Template configurado no EmailJS.
 * - Garantir que o Template no EmailJS tem as mesmas chaves (ex.: from_name, from_email, subject, message).
 */
export async function sendContactEmail(values: ContactFormValues): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS keys are not configured. Check your .env.local');
  }

  // Honeypot: se preenchida, aborta silenciosamente (provável bot)
  if (values.company && values.company.trim().length > 0) {
    return;
  }

  const templateParams = {
    from_name: values.name,
    from_email: values.email,
    subject: values.subject || 'Nova mensagem de contacto',
    message: values.message,
  };

  await send(SERVICE_ID, TEMPLATE_ID, templateParams);
}
