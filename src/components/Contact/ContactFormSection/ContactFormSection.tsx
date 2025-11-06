// src/components/Contact/ContactFormSection/ContactFormSection.tsx
'use strict';

import React from 'react';
import '../../common/Container/Container.scss';
import './ContactFormSection.scss';
import Container from '../../common/Container/Container';
import { SectionTitle } from '../../common/SectionTitle/SectionTitle';
import ContactForm from '../ContactForm/ContactForm';

const ContactFormSection: React.FC = () => {
  return (
    <section id='contact-section' className='contactSection' aria-labelledby='contact-title'>
      <Container>
        <SectionTitle id='contact-title' title='Contato' />
        <div className='contactSection__grid'>
          <ContactForm />
          <aside className='contactSection__note' aria-label='Nota informativa'>
            <p>
              Estou aqui para ajudar a transformar as suas ideias em realidade. Preencha o
              formulário e darei uma resposta personalizada no prazo de 24 horas. <br />
              <strong> Vamos criar algo extraordinário juntos!</strong>
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
};

export default ContactFormSection;
