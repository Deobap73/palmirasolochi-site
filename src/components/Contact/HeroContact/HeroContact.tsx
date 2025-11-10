// src/components/Contact/HeroContact/HeroContact.tsx
'use strict';

import React from 'react';
import '../../common/Container/Container.scss';
import './HeroContact.scss';
import Container from '../../common/Container/Container';
import Button from '../../common/Button/Button';

export interface HeroContactProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  text: string | React.ReactNode;
  ctaLabel: string;
  onCtaClick?: () => void;
  className?: string;
}

const HeroContact: React.FC<HeroContactProps> = ({
  imageSrc,
  imageAlt = '',
  title,
  text,
  ctaLabel,
  onCtaClick,
  className = '',
}) => {
  const rootCls = ['heroContact', className].filter(Boolean).join(' ');

  return (
    <section className={rootCls} aria-labelledby='hero-contact-title'>
      <Container>
        <div className='heroContact__grid'>
          <figure className='heroContact__figure'>
            <img className='heroContact__image' src={imageSrc} alt={imageAlt} />
          </figure>

          <div className='heroContact__card' role='region' aria-label='Contact quick card'>
            <h2 id='hero-contact-title' className='heroContact__title'>
              {title}
            </h2>
            <p className='heroContact__text'>{text}</p>
            <Button
              className='heroContact__btn'
              aria-label={ctaLabel}
              onClick={onCtaClick}
              variant='primary'>
              {ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroContact;
