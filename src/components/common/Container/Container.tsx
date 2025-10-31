// src/components/common/Container/Container.tsx
import React, { PropsWithChildren } from 'react';
import './Container.scss';

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className='container'>{children}</div>;
};

export default Container;
