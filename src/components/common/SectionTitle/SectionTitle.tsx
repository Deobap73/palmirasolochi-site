// src/components/common/SectionTitle/SectionTitle.tsx
'use strict';

import React from 'react';
import './SectionTitle.scss';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  id?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * SectionTitle
 * - Common section heading used across pages.
 * - Supports subtitle and alignment options.
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  id,
  align = 'center',
  className = '',
}) => {
  const rootCls = ['sectionTitle', `sectionTitle--${align}`, className].filter(Boolean).join(' ');

  return (
    <header id={id} className={rootCls}>
      <h2 className='sectionTitle__title'>{title}</h2>
      {subtitle && <p className='sectionTitle__subtitle'>{subtitle}</p>}
    </header>
  );
};
