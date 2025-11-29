// src/components/Home/DomainSkills/DomainSkills.tsx
'use strict';

import React from 'react';
import './DomainSkills.scss';
import { useTranslation } from 'react-i18next';

export interface DomainSkillsProps {
  imageSrc: string;
  imageAlt: string;
}

const DomainSkills: React.FC<DomainSkillsProps> = ({ imageSrc, imageAlt }) => {
  const { t } = useTranslation('home');

  return (
    <section className='domainSkills' aria-labelledby='domain-skills-title'>
      <div className='domainSkills__grid'>
        {/* Painel de texto (esquerda) */}
        <article className='domainSkills__panel'>
          <div className='domainSkills__tag'>{t('domainSkills.tag')}</div>

          <h2 id='domain-skills-title' className='domainSkills__title'>
            {t('domainSkills.mainframe.title')}
          </h2>
          <p className='domainSkills__list'>{t('domainSkills.mainframe.list')}</p>

          <h3 className='domainSkills__title domainSkills__title--mid'>
            {t('domainSkills.qa.title')}
          </h3>
          <p className='domainSkills__list--mid'>{t('domainSkills.qa.list')}</p>

          <h3 className='domainSkills__title'>{t('domainSkills.web.title')}</h3>
          <p className='domainSkills__list'>{t('domainSkills.web.list')}</p>
        </article>

        {/* Imagem (direita) */}
        <div className='domainSkills__media'>
          <img className='domainSkills__img' src={imageSrc} alt={imageAlt} />
        </div>
      </div>
    </section>
  );
};

export default DomainSkills;
