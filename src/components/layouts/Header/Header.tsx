// src/components/layouts/Header/Header.tsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

// Passo 1: Import image.
import LogoWebP from '../../../assets/Logo.webp';
// -----------------------------------------------------------------

const Header: React.FC = () => {
  return (
    <header className='header' role='banner'>
      <div className='header__inner'>
        <Link to='/' className='header__brand' aria-label='Palmira Solochi - Home'>
          <img className='header__logo' src={LogoWebP} alt='Logótipo Palmira Solochi' />
        </Link>

        <nav className='header__nav' aria-label='Main'>
          <NavLink to='/about' className='header__link'>
            Sobre
          </NavLink>
          <NavLink to='/projects' className='header__link'>
            Projetos
          </NavLink>
          <NavLink to='/contact' className='header__link header__link--primary'>
            Contacto
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
