// src/components/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Container from '../common/Container/Container';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main role='main'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
