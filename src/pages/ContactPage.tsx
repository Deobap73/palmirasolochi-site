// src/pages/ContactPage.tsx
'use strict';

import React from 'react';
import '../styles/Pages.scss';
import './styles/ContactPage.scss';

import HeroContact from '../components/Contact/HeroContact/HeroContact';
import QuoteContact from '../components/Contact/QuoteContact/QuoteContact';
import ContactFormSection from '../components/Contact/ContactFormSection/ContactFormSection';

// Assets (usa uma imagem existente do teu /src/assets)
import hero3 from '../assets/hero-3.webp';

const ContactPage: React.FC = () => {
  return (
    <main>
      <div className='contactPage' role='main'>
        <HeroContact
          imageSrc={hero3}
          imageAlt='Palmira Solochi'
          title='Vamos conversar'
          text='Estou disponível para colaborar em projetos onde criatividade, simplicidade e detalhe fazem a diferença.'
          ctaLabel='Vamos falar'
          onCtaClick={() => {
            const section = document.getElementById('contact-section');
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />

        <QuoteContact>
          Recolher as suas ideias é um passo importante para o seu crescimento tanto profissional
          como espiritual. Elas podem ser usadas em seu benefício.
        </QuoteContact>

        <ContactFormSection />
      </div>
    </main>
  );
};

export default ContactPage;
