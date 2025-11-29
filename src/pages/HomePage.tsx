// src/pages/HomePage.tsx
'use strict';

import React from 'react';
import '../pages/styles/Pages.scss';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Lang, buildPath } from '../utils/routePaths';

// Components
import Hero from '../components/Home/Hero/Hero';
import IntroBanner from '../components/Home/IntroBanner/IntroBanner';
import DomainSkills from '../components/Home/DomainSkills/DomainSkills';
import PhrasesBanner from '../components/Home/PhrasesBanner/PhrasesBanner';
import ProjectTeaser from '../components/Home/ProjectTeaser/ProjectTeaser';
import Seo from '../components/common/Seo/Seo';

// Import image.
import hero1 from '../../src/assets/hero-1.webp';
import skillsImg from '../../src/assets/DomainTech.webp';
import teaserImg from '../../src/assets/teaserImg.webp';

// -----------------------------------------------------------------

const HomePage: React.FC = () => {
  const { t } = useTranslation('home');
  const { lang } = useParams<{ lang: Lang }>();
  const currentLang: Lang = lang === 'en' ? 'en' : 'pt';

  return (
    <>
      <Seo page='home' lang={currentLang} />
      <section aria-labelledby='home-title' className='pagesGeneral'>
        <Hero
          title={t('heroTitle')}
          subtitle={t('heroSubtitle')}
          text={t('heroText')}
          ctaPrimary={{
            label: t('heroCtaPrimary'),
            href: buildPath('projects', currentLang),
          }}
          ctaSecondary={{
            label: t('heroCtaSecondary'),
            href: buildPath('about', currentLang),
          }}
          imageSrc={hero1}
          imageAlt={t('heroImageAlt')}
        />

        <IntroBanner text={t('intro.text')} align='center' />

        <DomainSkills imageSrc={skillsImg} imageAlt='Profissional a trabalhar com portátil' />

        <PhrasesBanner />

        <ProjectTeaser
          imageSrc={teaserImg}
          imageAlt='Pessoa a trabalhar ao portátil'
          title={t('projectsTeaser.title')}
          text={t('projectsTeaser.text')}
          ctaLabel={t('projectsTeaser.ctaLabel')}
          ctaHref={buildPath('projects', currentLang)}
        />
      </section>
    </>
  );
};

export default HomePage;
