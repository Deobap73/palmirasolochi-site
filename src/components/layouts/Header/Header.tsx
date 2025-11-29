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
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const langSwitcherRef = useRef<HTMLDivElement | null>(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: Lang }>();
  const { t } = useTranslation('common');

  const currentLang: Lang = lang === 'en' ? 'en' : 'pt';

  // Fecha menus ao navegar
  useEffect(() => {
    setOpen(false);
    setLangMenuOpen(false);
  }, [pathname]);

  // Fecha o menu principal ao clicar fora
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

  // Fecha o menu de idiomas ao clicar fora
  useEffect(() => {
    if (!langMenuOpen) return;

    function onClickOutside(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!target) return;

      if (langSwitcherRef.current && langSwitcherRef.current.contains(target)) {
        return;
      }

      setLangMenuOpen(false);
    }

    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [langMenuOpen]);

  // Fecha menus com Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (open) setOpen(false);
        if (langMenuOpen) setLangMenuOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, langMenuOpen]);

  function navigateToLang(nextLang: Lang) {
    if (nextLang === currentLang) return;

    const match = pathname.match(/^\/(pt|en)(\/.*)?$/);
    if (match) {
      const rest = match[2] || '';
      const targetPath = `/${nextLang}${rest}`;
      navigate(targetPath);
    } else {
      navigate(nextLang === 'pt' ? '/pt' : '/en');
    }
  }

  const handleLanguageSelect = (nextLang: Lang) => {
    setLangMenuOpen(false);
    navigateToLang(nextLang);
  };

  const handleLanguageButtonClick = () => {
    setLangMenuOpen((prev) => !prev);
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

          {/* Switch de idioma com dropdown */}
          <div className='header__lang-switch' ref={langSwitcherRef}>
            <button
              type='button'
              className='header__lang-btn'
              onClick={handleLanguageButtonClick}
              aria-haspopup='menu'
              aria-expanded={langMenuOpen}
              aria-label={currentLang === 'pt' ? 'Switch to English' : 'Mudar para Português'}>
              <span className='header__lang-current'>{currentLang.toUpperCase()}</span>
              <span className='header__lang-caret' aria-hidden='true'>
                ▾
              </span>
            </button>

            {langMenuOpen && (
              <div className='header__lang-menu' role='menu'>
                {(['pt', 'en'] as Lang[]).map((code) => (
                  <button
                    key={code}
                    type='button'
                    role='menuitem'
                    className={`header__lang-option ${
                      code === currentLang ? 'header__lang-option--active' : ''
                    }`}
                    onClick={() => handleLanguageSelect(code)}>
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
