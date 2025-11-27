// src/services/contact.ts
'use strict';

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

/**
 * sendContact
 * Sends contact form to Express backend using Resend.
 */
export async function sendContact(payload: ContactPayload): Promise<void> {
  const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!rawBaseUrl) {
    throw new Error('VITE_API_BASE_URL não definido');
  }

  // Remove trailing slashes to avoid "//"
  const baseUrl = rawBaseUrl.replace(/\/+$/, '');

  const res = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Falha ao enviar o email.');
  }
}
