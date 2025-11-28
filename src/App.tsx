// src/App.tsx
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CurriculumPage from './pages/CurriculumPage';
import CertificatesPage from './pages/CertificatesPage';

import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/projects/:slug' element={<ProjectDetailPage />} />
          <Route path='/contact' element={<ContactPage />} />
          {/* rotas para PDFs embutidos */}
          <Route path='/curriculum' element={<CurriculumPage />} />
          <Route path='/certificados' element={<CertificatesPage />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
};

export default App;
