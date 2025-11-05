// src/components/Contact/ContactForm/ContactForm.tsx
'use strict';

import React, { useState } from 'react';
import './ContactForm.scss';
import Button from '../../common/Button/Button';

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Props {
  onSubmit?: (values: ContactFormValues) => Promise<void> | void;
  className?: string;
}

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const ContactForm: React.FC<Props> = ({ onSubmit, className = '' }) => {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const rootCls = ['contactForm', className].filter(Boolean).join(' ');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (sending) return;

    // Simple required validation
    if (!values.name || !values.email || !values.message) {
      alert('Por favor preencha Nome, Email e Mensagem.');
      return;
    }

    try {
      setSending(true);
      await onSubmit?.(values);
      setSent(true);
      setValues(initialValues);
    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro ao enviar. Tenta novamente.');
    } finally {
      setSending(false);
    }
  }

  return (
    <form className={rootCls} onSubmit={handleSubmit} noValidate aria-live='polite'>
      <div className='contactForm__row'>
        <label className='contactForm__label' htmlFor='name'>
          Nome
        </label>
        <input
          className='contactForm__input'
          id='name'
          name='name'
          type='text'
          autoComplete='name'
          placeholder='O seu nome'
          value={values.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className='contactForm__row'>
        <label className='contactForm__label' htmlFor='email'>
          Email
        </label>
        <input
          className='contactForm__input'
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          placeholder='nome@exemplo.com'
          value={values.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className='contactForm__row'>
        <label className='contactForm__label' htmlFor='subject'>
          Assunto
        </label>
        <input
          className='contactForm__input'
          id='subject'
          name='subject'
          type='text'
          placeholder='Assunto'
          value={values.subject}
          onChange={handleChange}
        />
      </div>

      <div className='contactForm__row'>
        <label className='contactForm__label' htmlFor='message'>
          Mensagem
        </label>
        <textarea
          className='contactForm__textarea'
          id='message'
          name='message'
          placeholder='Escreva a sua mensagem...'
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
          aria-Label={sending ? 'A enviar…' : 'Enviar mensagem'}>
          {sending ? 'A enviar…' : 'Enviar'}
        </Button>

        {sent && (
          <span className='contactForm__feedback' role='status'>
            Obrigado! A tua mensagem foi enviada.
          </span>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
