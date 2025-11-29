// src/components/Contact/ContactForm/ContactForm.tsx
'use strict';

import React, { useState } from 'react';
import './ContactForm.scss';
import Button from '../../common/Button/Button';
import type { ContactFormValues } from '../../../types/contact';
import { sendContact } from '../../../services/contact';
import { useTranslation } from 'react-i18next';
import { gtmEvent } from '../../../utils/gtm';

interface Props {
  className?: string;
}

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  company: '', // honeypot
};

const ContactForm: React.FC<Props> = ({ className = '' }) => {
  const { t } = useTranslation('contact');

  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const rootCls = ['contactForm', className].filter(Boolean).join(' ');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (sending) return;

    if (!values.name || !values.email || !values.message) {
      setError(t('form.errorMissingFields'));
      return;
    }

    try {
      setError('');
      setSending(true);

      await sendContact({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });

      // evento GTM depois do envio com sucesso
      gtmEvent('contact_form_submit', {
        method: 'internal_form',
        has_subject: Boolean(values.subject),
      });

      setSent(true);
      setValues(initialValues);
      window.setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error(err);
      setError(t('form.errorSend'));
    } finally {
      setSending(false);
    }
  }

  return (
    <form className={rootCls} onSubmit={handleSubmit} noValidate aria-live='polite'>
      {/* Honeypot anti spam */}
      <div className='contactForm__honeypot' aria-hidden='true'>
        <label htmlFor='company'>{t('form.honeypotLabel')}</label>
        <input
          id='company'
          name='company'
          type='text'
          autoComplete='off'
          tabIndex={-1}
          value={values.company}
          onChange={handleChange}
        />
      </div>

      <div className='contactForm__row'>
        <label className='contactForm__label' htmlFor='name'>
          {t('form.nameLabel')}
        </label>
        <input
          className='contactForm__input'
          id='name'
          name='name'
          type='text'
          autoComplete='name'
          placeholder={t('form.namePlaceholder')}
          value={values.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className='contactForm__row'>
        <label className='contactForm__label' htmlFor='email'>
          {t('form.emailLabel')}
        </label>
        <input
          className='contactForm__input'
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          placeholder={t('form.emailPlaceholder')}
          value={values.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className='contactForm__row'>
        <label className='contactForm__label' htmlFor='subject'>
          {t('form.subjectLabel')}
        </label>
        <input
          className='contactForm__input'
          id='subject'
          name='subject'
          type='text'
          placeholder={t('form.subjectPlaceholder')}
          value={values.subject}
          onChange={handleChange}
        />
      </div>

      <div className='contactForm__row'>
        <label className='contactForm__label' htmlFor='message'>
          {t('form.messageLabel')}
        </label>
        <textarea
          className='contactForm__textarea'
          id='message'
          name='message'
          placeholder={t('form.messagePlaceholder')}
          rows={6}
          value={values.message}
          onChange={handleChange}
          required
        />
      </div>

      <div className='contactForm__actions'>
        <Button
          type='submit'
          disabled={sending}
          aria-label={sending ? t('form.submitting') : t('form.submit')}>
          {sending ? t('form.submitting') : t('form.submit')}
        </Button>

        {sent && (
          <span className='contactForm__feedback' role='status'>
            {t('form.success')}
          </span>
        )}

        {error && (
          <span className='contactForm__error' role='alert'>
            {error}
          </span>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
