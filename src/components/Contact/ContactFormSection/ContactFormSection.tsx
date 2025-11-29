// src/components/Contact/ContactFormSection/ContactFormSection.tsx
'use strict';

import React from 'react';
import { FiPhone, FiMail, FiGlobe, FiMapPin } from 'react-icons/fi';
import '../../common/Container/Container.scss';
import './ContactFormSection.scss';
import Container from '../../common/Container/Container';
import ContactForm from '../ContactForm/ContactForm';
import { useTranslation } from 'react-i18next';

const ContactFormSection: React.FC = () => {
  const { t } = useTranslation('contact');

  return (
    <section id='contact-section' className='contactSection' aria-labelledby='contact-title'>
      <Container>
        <div className='contactSection__grid'>
          <aside className='contactSection__info' aria-label={t('formSection.infoAria')}>
            <h3 className='contactSection__info__subtitle'>{t('formSection.subtitle')}</h3>
            <h2 id='contact-title' className='contactSection__info__title'>
              {t('formSection.title')}
            </h2>
            <p className='contactSection__info__descs'>
              {t('formSection.desc')} <br />
              <strong>{t('formSection.highlight')}</strong>
            </p>
            <div className='contactSection__info__grids'>
              <div className='contactSection__info__grids__item'>
                <FiPhone className='contactSection__info__grids__item__icon' />
                <div>
                  <div className='contactSection__info__grids__item__label'>
                    {t('formSection.phoneLabel')}
                  </div>
                  <div className='contactSection__info__grids__item__value'>
                    {t('formSection.phoneValue')}
                  </div>
                </div>
              </div>
              <div className='contactSection__info__grids__item'>
                <FiMail className='contactSection__info__grids__item__icon' />
                <div>
                  <div className='contactSection__info__grids__item__label'>
                    {t('formSection.emailLabel')}
                  </div>
                  <div className='contactSection__info__grids__item__value'>
                    {t('formSection.emailValue')}
                  </div>
                </div>
              </div>
              <div className='contactSection__info__grids__item'>
                <FiGlobe className='contactSection__info__grids__item__icon' />
                <div>
                  <div className='contactSection__info__grids__item__label'>
                    {t('formSection.sitesLabel')}
                  </div>
                  <div className='contactSection__info__grids__item__value'>
                    {t('formSection.siteValue')}
                  </div>
                </div>
              </div>
              <div className='contactSection__info__grids__item'>
                <FiMapPin className='contactSection__info__grids__item__icon' />
                <div>
                  <div className='contactSection__info__grids__item__label'>
                    {t('formSection.addressLabel')}
                  </div>
                  <div className='contactSection__info__grids__item__value'>
                    {t('formSection.addressValue')}
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
};

export default ContactFormSection;
