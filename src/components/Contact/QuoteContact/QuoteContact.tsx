// src/components/Contact/QuoteContact/QuoteContact.tsx
'use strict';

import React from 'react';
import '../../common/Container/Container.scss';
import './QuoteContact.scss';
import Container from '../../common/Container/Container';

interface Props {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const QuoteContact: React.FC<Props> = ({
  children,
  className = '',
  ariaLabel = 'Frase inspiradora',
}) => {
  const rootCls = ['quoteContact', className].filter(Boolean).join(' ');
  return (
    <section className={rootCls} aria-label={ariaLabel}>
      <Container>
        <blockquote className='quoteContact__text'>
          <p>{children}</p>
        </blockquote>
      </Container>
    </section>
  );
};

export default QuoteContact;
