// src/components/Home/Hero/Hero.tsx
'use strict';

import React from 'react';
import { gtmEvent } from '../../../utils/gtm';
import Button from '../../common/Button/Button';
import './Hero.scss';

export interface HeroCTA {
  label: string;
  href: string;
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  text?: string;
  ctaPrimary?: HeroCTA;
  ctaSecondary?: HeroCTA;
  imageSrc: string;
  imageAlt: string;
  /** Inverte os lados no desktop: imagem à direita, card à esquerda */
  inverse?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle = '',
  text = '',
  ctaPrimary = { label: 'Ver Projetos', href: 'projects' },
  ctaSecondary = { label: 'Sobre Mim', href: 'about' },
  imageSrc,
  imageAlt,
  inverse = false,
}) => {
  const handlePrimaryClick = () => {
    gtmEvent('hero_cta_click', {
      type: 'primary',
      label: ctaPrimary.label,
      href: ctaPrimary.href,
      location: 'home_hero',
    });
  };

  const handleSecondaryClick = () => {
    gtmEvent('hero_cta_click', {
      type: 'secondary',
      label: ctaSecondary.label,
      href: ctaSecondary.href,
      location: 'home_hero',
    });
  };

  return (
    <section className={`hero ${inverse ? 'hero--inverse' : ''}`} aria-labelledby='home-hero-title'>
      <div className='hero__stage' aria-hidden='true'>
        <div className='hero__media'>
          <img className='hero__img' src={imageSrc} alt={imageAlt} />
        </div>
      </div>

      <div className='hero__card' role='group' aria-label='Destaque inicial'>
        <h1 id='home-hero-title' className='hero__title'>
          {title}
        </h1>
        {subtitle && <p className='hero__subtitle'>{subtitle}</p>}
        {text && <p className='hero__text'>{text}</p>}
        <div className='hero__actions'>
          {ctaPrimary && (
            <Button href={ctaPrimary.href} variant='primary' size='lg' onClick={handlePrimaryClick}>
              {ctaPrimary.label}
            </Button>
          )}
          {ctaSecondary && (
            <Button
              href={ctaSecondary.href}
              variant='secondary'
              size='lg'
              onClick={handleSecondaryClick}>
              {ctaSecondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
