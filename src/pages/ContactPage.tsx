// src/pages/ContactPage.tsx
'use strict';

import React from 'react';
import './styles/ContactPage.scss';

import HeroContact from '../components/Contact/HeroContact/HeroContact';
import QuoteContact from '../components/Contact/QuoteContact/QuoteContact';
import ContactFormSection from '../components/Contact/ContactFormSection/ContactFormSection';
import { ContactMap } from '../components/Contact/ContactMap/ContactMap';

import hero4 from '../assets/hero-4.webp';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Lang } from '../utils/routePaths';
import Seo from '../components/common/Seo/Seo';

const ContactPage: React.FC = () => {
  const { t } = useTranslation('contact');
  const { lang } = useParams<{ lang: Lang }>();
  const currentLang: Lang = lang === 'en' ? 'en' : 'pt';

  const heroParagraphs = t('hero.paragraphs', {
    returnObjects: true,
  }) as string[];

  return (
    <>
      <Seo page='contact' lang={currentLang} />

      <main>
        <div className='contactPage' role='main'>
          <HeroContact
            imageSrc={hero4}
            imageAlt={t('hero.imageAlt')}
            title={t('hero.title')}
            text={
              <>
                {heroParagraphs.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </>
            }
            ctaLabel={t('hero.ctaLabel')}
            onCtaClick={() => {
              const section = document.getElementById('contact-section');
              if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          />

          <QuoteContact aria-label={t('quote.ariaLabel')}>{t('quote.text')}</QuoteContact>

          <ContactFormSection />
          <ContactMap />
        </div>
      </main>
    </>
  );
};

export default ContactPage;
