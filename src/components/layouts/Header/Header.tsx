// src/components/layouts/Header/Header.tsx
'use strict';

import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import './Header.scss';

import LogoWebP from '../../../assets/Logo.webp';
import { buildPath, Lang } from '../../../utils/routePaths';
import { useTranslation } from 'react-i18next';
// -----------------------------------------------------------------

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: Lang }>();
  const { t } = useTranslation('common');

  const currentLang: Lang = lang === 'en' ? 'en' : 'pt';

  // Fecha o menu ao navegar
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!open) return;

      const target = e.target as Node | null;
      if (!target) return;

      if (navRef.current && navRef.current.contains(target)) {
        return;
      }

      if (toggleRef.current && toggleRef.current.contains(target)) {
        return;
      }

      setOpen(false);
    }

    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [open]);

  // Fecha com tecla Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const handleLanguageSwitch = () => {
    const nextLang: Lang = currentLang === 'pt' ? 'en' : 'pt';

    // troca apenas o prefixo /pt ou /en mantendo o resto
    const match = pathname.match(/^\/(pt|en)(\/.*)?$/);
    if (match) {
      const rest = match[2] || '';
      const targetPath = `/${nextLang}${rest}`;
      navigate(targetPath);
    } else {
      // fallback caso alguém vá a uma rota sem prefixo
      navigate(nextLang === 'pt' ? '/pt' : '/en');
    }
  };

  return (
    <header className='header' role='banner'>
      <div className='header__inner'>
        <Link
          to={buildPath('home', currentLang)}
          className='header__brand'
          aria-label='Palmira Solochi - Home'>
          <img className='header__logo' src={LogoWebP} alt='Logótipo Palmira Solochi' />
        </Link>

        {/* Botão mobile */}
        <button
          ref={toggleRef}
          className={`header__toggle ${open ? 'header__toggle--open' : ''}`}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls='primary-nav'
          type='button'
          onClick={() => setOpen((v) => !v)}>
          <span className='header__bar' aria-hidden='true' />
          <span className='header__bar' aria-hidden='true' />
          <span className='header__bar' aria-hidden='true' />
        </button>

        <div
          id='primary-nav'
          ref={navRef}
          className={`header__nav ${open ? 'header__nav--open' : ''}`}
          role='navigation'
          aria-label='Menu principal'>
          <NavLink to={buildPath('about', currentLang)} className='header__link'>
            {t('menu.about')}
          </NavLink>

          <NavLink to={buildPath('projects', currentLang)} className='header__link'>
            {t('menu.projects')}
          </NavLink>

          <NavLink
            to={buildPath('contact', currentLang)}
            className='header__link header__link--cta'>
            {t('menu.contact')}
          </NavLink>

          <button
            type='button'
            className='header__lang-switch'
            onClick={handleLanguageSwitch}
            aria-label={currentLang === 'pt' ? 'Switch to English' : 'Mudar para Português'}>
            <span className={`header__lang ${currentLang === 'pt' ? 'header__lang--active' : ''}`}>
              PT
            </span>
            <span className='header__lang-separator'>|</span>
            <span className={`header__lang ${currentLang === 'en' ? 'header__lang--active' : ''}`}>
              EN
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
