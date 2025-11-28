// src/components/layouts/Header/Header.tsx
'use strict';

import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.scss';

//  Import image.
import LogoWebP from '../../../assets/Logo.webp';
// -----------------------------------------------------------------

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const { pathname } = useLocation();

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

      // Se clicou dentro da nav, não faz nada
      if (navRef.current && navRef.current.contains(target)) {
        return;
      }

      // Se clicou no botão do menu, não faz nada
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

  return (
    <header className='header' role='banner'>
      <div className='header__inner'>
        <Link to='/' className='header__brand' aria-label='Palmira Solochi - Home'>
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
          <NavLink to='/about' className='header__link'>
            Sobre
          </NavLink>
          <NavLink to='/projects' className='header__link'>
            Projetos
          </NavLink>
          <NavLink to='/contact' className='header__link header__link--cta'>
            Contacto
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
