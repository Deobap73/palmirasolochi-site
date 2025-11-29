// src/components/layouts/Footer/Footer.tsx
'use strict';

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Footer.scss';

import LogoWebP from '../../../assets/Logo.webp';
import LogoLegal from '../../../assets/logo_theHumanTechDigitals.svg';
import { buildPath, Lang } from '../../../utils/routePaths';
import { useTranslation } from 'react-i18next';
import { gtmEvent } from '../../../utils/gtm';
// -----------------------------------------------------------------

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { lang } = useParams<{ lang: Lang }>();
  const currentLang: Lang = lang === 'en' ? 'en' : 'pt';

  const { t } = useTranslation('common');

  const handleLinkedinClick = () => {
    gtmEvent('linkedin_click', {
      location: 'footer',
    });
  };

  const handleGithubClick = () => {
    gtmEvent('github_click', {
      location: 'footer',
    });
  };

  return (
    <footer className='footer' role='contentinfo'>
      <div className='footer__top'>
        <Link
          to={buildPath('home', currentLang)}
          className='footer__brand'
          aria-label='Palmira Solochi - Home'>
          <img src={LogoWebP} alt='Logótipo Palmira Solochi' />
        </Link>

        <nav className='footer__cols' aria-label={t('footer.menuAria')}>
          <div className='footer__col'>
            <h3 className='footer__heading'>{t('footer.site')}</h3>
            <ul className='footer__list'>
              <li>
                <Link className='footer__link' to={buildPath('about', currentLang)}>
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link className='footer__link' to={buildPath('projects', currentLang)}>
                  {t('footer.projects')}
                </Link>
              </li>
              <li>
                <Link className='footer__link' to={buildPath('contact', currentLang)}>
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div className='footer__col'>
            <h3 className='footer__heading'>{t('footer.social')}</h3>
            <ul className='footer__list'>
              <li>
                <a
                  className='footer__link'
                  href='https://www.linkedin.com/in/palmira-solochi-79a1a3317/'
                  aria-label='LinkedIn'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={handleLinkedinClick}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className='footer__link'
                  href='https://github.com/Pssolochi82'
                  aria-label='GitHub'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={handleGithubClick}>
                  GitHub
                </a>
              </li>
              <li>
                <a className='footer__link' href='mailto:contact@palmirasolochi.com'>
                  Email
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className='footer__bottom'>
        <small className='footer__legal'>
          © {year} {t('footer.rights')}&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;
          <a
            className='footer__link--legal'
            href='https://thehumantechblog.com/about'
            target='_blank'
            rel='noopener noreferrer'
            onClick={() =>
              gtmEvent('external_brand_click', {
                brand: 'thehumantechblog',
                location: 'footer',
              })
            }>
            <img
              src={LogoLegal}
              alt='Logótipo The Human Tech Blog'
              className='footer__logo--legal'
            />
          </a>
        </small>
      </div>
    </footer>
  );
};

export default Footer;
