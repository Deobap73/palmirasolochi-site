// src/components/specific/Projects/HeroProjects.tsx
'use strict';

import React from 'react';
import './HeroProjects.scss';
import Button from '../../common/Button/Button';

export interface ProjectsHeroCTA {
  label: string;
  href: string;
}

export interface HeroProjectsProps {
  title: string;
  subtitle?: string;
  text?: string;
  ctaPrimary?: ProjectsHeroCTA;
  ctaSecondary?: ProjectsHeroCTA;
  imageSrc: string;
  imageAlt: string;
}

const HeroProjects: React.FC<HeroProjectsProps> = ({
  title,
  subtitle = '',
  text = '',
  ctaPrimary = { label: 'Ver Repositórios', href: '/projects' },
  ctaSecondary = { label: 'Ver Online', href: '/' },
  imageSrc,
  imageAlt,
}) => {
  return (
    <section className='projects-hero' aria-labelledby='projects-hero-title'>
      <div className='projects-hero__stage' aria-hidden='true'>
        <div className='projects-hero__media'>
          <img className='projects-hero__img' src={imageSrc} alt={imageAlt} />
        </div>
      </div>

      <div className='projects-hero__card' role='group' aria-label='Destaque dos projetos'>
        <h1 id='projects-hero-title' className='projects-hero__title'>
          {title}
        </h1>
        {subtitle && <p className='projects-hero__subtitle'>{subtitle}</p>}
        {text && <p className='projects-hero__text'>{text}</p>}

        <div className='projects-hero__actions'>
          {ctaPrimary && (
            <Button href={ctaPrimary.href} variant='primary' size='lg'>
              {ctaPrimary.label}
            </Button>
          )}
          {ctaSecondary && (
            <Button href={ctaSecondary.href} variant='secondary' size='lg'>
              {ctaSecondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroProjects;
