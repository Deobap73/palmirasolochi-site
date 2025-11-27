// src/components/about/HeroAbout/HeroAbout.tsx
'use strict';

import React from 'react';
import './HeroAbout.scss';
import Button from '../../common/Button/Button';

// Definição para um botão de CTA
interface CtaButton {
  label: string;
  href: string;
}

export interface HeroAboutProps {
  title: string;
  subtitle?: string;
  text?: string;
  imageSrc: string;
  imageAlt: string;
  inverted?: boolean;
  // PROPRIEDADES DE CTA INCLUÍDAS
  ctaPrimary: CtaButton;
  ctaSecondary?: CtaButton; // Agora opcional, como é usado no AboutPage
}

const HeroAbout: React.FC<HeroAboutProps> = ({
  title,
  subtitle = '',
  text = '',
  imageSrc,
  imageAlt,
  inverted = false,
  // DESESTRUTURAR as props ctaPrimary e ctaSecondary
  ctaPrimary,
  ctaSecondary,
}) => {
  // REMOVIDO: CTAs fixos, que ignoravam props externas.

  return (
    <section
      className={`about-hero ${inverted ? 'about-hero--inverted' : ''}`}
      aria-labelledby='about-hero-title'>
      <div className='about-hero__card' role='group' aria-label='Destaque sobre mim'>
        <h1 id='about-hero-title' className='about-hero__title'>
          {title}
        </h1>

        {subtitle && <p className='about-hero__subtitle'>{subtitle}</p>}
        {text && <p className='about-hero__text'>{text}</p>}

        <div className='about-hero__actions'>
          <Button href={ctaPrimary.href} variant='primary' size='lg'>
            {ctaPrimary.label}
          </Button>
          {/* Renderizar ctaSecondary apenas se for fornecido */}
          {ctaSecondary && (
            <Button href={ctaSecondary.href} variant='secondary' size='lg'>
              {ctaSecondary.label}
            </Button>
          )}
        </div>
      </div>

      <div className='about-hero__stage' aria-hidden='true'>
        <div className='about-hero__media'>
          <img className='about-hero__img' src={imageSrc} alt={imageAlt} />
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
