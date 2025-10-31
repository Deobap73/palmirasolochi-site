// src/components/layouts/Footer/Footer.tsx
import React from 'react';
import './Footer.scss';

// Passo 1: Import image.
import LogoWebP from '../../../assets/Logo.webp';
// -----------------------------------------------------------------

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='footer' role='contentinfo'>
      <div className='footer__top'>
        <div className='footer__brand'>
          <img src={LogoWebP} alt='Logótipo Palmira Solochi' />
        </div>

        <div className='footer__cols'>
          <div className='footer__col'>
            <h3 className='footer__heading'>Site Menu</h3>
            <ul className='footer__list'>
              <li>
                <a className='footer__link' href='/about'>
                  Sobre
                </a>
              </li>
              <li>
                <a className='footer__link' href='/projects'>
                  Projetos
                </a>
              </li>
              <li>
                <a className='footer__link' href='/contact'>
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div className='footer__col'>
            <h3 className='footer__heading'>Redes Sociais</h3>
            <ul className='footer__list'>
              <li>
                <a className='footer__link' href='#' aria-label='LinkedIn'>
                  LinkedIn
                </a>
              </li>
              <li>
                <a className='footer__link' href='#' aria-label='GitHub'>
                  GitHub
                </a>
              </li>
              <li>
                <a className='footer__link' href='#' aria-label='Contacto'>
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='footer__bottom'>
        <small className='footer__legal'>
          © {year} Todos os direitos reservados. Desenvolvido por{' '}
          <a className='footer__link' href='#'>
            Deolindo Baptista
          </a>
          .
        </small>
      </div>
    </footer>
  );
};

export default Footer;
