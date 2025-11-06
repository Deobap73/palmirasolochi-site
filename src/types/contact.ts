// src/types/contact.ts
'use strict';

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot anti-spam; must be empty */
  company?: string;
}
