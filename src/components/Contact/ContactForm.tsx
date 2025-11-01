// src/components/Contact/ContactForm.tsx
'use strict';

import React, { useMemo, useState } from 'react';
import './ContactForm.scss';
import Button from '../common/Button/Button';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  consent: false,
};

const emailRegex =
  // Simple, readable pattern adequate for client-side checks
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ContactForm: React.FC = () => {
  const [data, setData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const isValid = useMemo(() => {
    const e: Errors = {};
    if (!data.name.trim()) e.name = 'Por favor, introduza o seu nome.';
    if (!emailRegex.test(data.email)) e.email = 'Introduza um email válido.';
    if (!data.subject.trim()) e.subject = 'Indique um assunto.';
    if (data.message.trim().length < 10)
      e.message = 'A mensagem deve ter pelo menos 10 caracteres.';
    if (!data.consent) e.consent = 'É necessário aceitar a política de privacidade.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [data]);

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    try {
      // Placeholder: aqui ligarias ao teu backend (fetch/POST)
      await new Promise((res) => setTimeout(res, 800));
      setSent(true);
      setData(initialState);
    } catch {
      // Poderias mostrar um toast de erro aqui
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className='contactForm' aria-labelledby='contact-form-title'>
      <div className='contactForm__grid'>
        {/* Coluna esquerda: Formulário */}
        <div className='contactForm__col contactForm__col--form'>
          <h1 id='contact-form-title' className='contactForm__title'>
            Vamos conversar
          </h1>
          <p className='contactForm__subtitle'>Respondo normalmente em 24–48h úteis.</p>

          <form className='contactForm__form' onSubmit={handleSubmit} noValidate>
            <div className='contactForm__row'>
              <label htmlFor='cf-name' className='contactForm__label'>
                Nome
              </label>
              <input
                id='cf-name'
                name='name'
                className='contactForm__input'
                type='text'
                autoComplete='name'
                value={data.name}
                onChange={(e) => handleChange('name', e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'cf-name-err' : undefined}
                required
              />
              {errors.name && (
                <span id='cf-name-err' className='contactForm__error'>
                  {errors.name}
                </span>
              )}
            </div>

            <div className='contactForm__row'>
              <label htmlFor='cf-email' className='contactForm__label'>
                Email
              </label>
              <input
                id='cf-email'
                name='email'
                className='contactForm__input'
                type='email'
                autoComplete='email'
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'cf-email-err' : undefined}
                required
              />
              {errors.email && (
                <span id='cf-email-err' className='contactForm__error'>
                  {errors.email}
                </span>
              )}
            </div>

            <div className='contactForm__row'>
              <label htmlFor='cf-subject' className='contactForm__label'>
                Assunto
              </label>
              <input
                id='cf-subject'
                name='subject'
                className='contactForm__input'
                type='text'
                value={data.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'cf-subject-err' : undefined}
                required
              />
              {errors.subject && (
                <span id='cf-subject-err' className='contactForm__error'>
                  {errors.subject}
                </span>
              )}
            </div>

            <div className='contactForm__row'>
              <label htmlFor='cf-message' className='contactForm__label'>
                Mensagem
              </label>
              <textarea
                id='cf-message'
                name='message'
                className='contactForm__textarea'
                rows={6}
                value={data.message}
                onChange={(e) => handleChange('message', e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'cf-message-err' : undefined}
                required
              />
              {errors.message && (
                <span id='cf-message-err' className='contactForm__error'>
                  {errors.message}
                </span>
              )}
            </div>

            <div className='contactForm__consent'>
              <input
                id='cf-consent'
                name='consent'
                className='contactForm__checkbox'
                type='checkbox'
                checked={data.consent}
                onChange={(e) => handleChange('consent', e.target.checked)}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? 'cf-consent-err' : undefined}
                required
              />
              <label htmlFor='cf-consent' className='contactForm__consentLabel'>
                Concordo com a{' '}
                <a href='#' className='contactForm__link'>
                  política de privacidade
                </a>
                .
              </label>
            </div>
            {errors.consent && (
              <span id='cf-consent-err' className='contactForm__error'>
                {errors.consent}
              </span>
            )}

            <div className='contactForm__actions'>
              <Button
                variant='primary'
                size='lg'
                type='submit'
                disabled={submitting}
                loading={submitting}
                title='Enviar mensagem'>
                Enviar
              </Button>
              <span className='contactForm__status' role='status' aria-live='polite'>
                {sent ? 'Mensagem enviada com sucesso.' : ''}
              </span>
            </div>
          </form>
        </div>

        {/* Coluna direita: Texto auxiliar / informação */}
        <aside
          className='contactForm__col contactForm__col--info'
          aria-label='Informação de contacto'>
          <div className='contactForm__infoCard'>
            <h2 className='contactForm__infoTitle'>Preferes email direto?</h2>
            <p className='contactForm__infoText'>
              Escreve para{' '}
              <a className='contactForm__link' href='mailto:hello@example.com'>
                hello@example.com
              </a>
            </p>
            <div className='contactForm__divider' aria-hidden='true' />
            <h3 className='contactForm__infoSubtitle'>Disponibilidade</h3>
            <p className='contactForm__infoText'>Dias úteis · 10h–18h CET</p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ContactForm;
