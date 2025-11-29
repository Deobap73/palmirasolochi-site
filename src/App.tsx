// src/App.tsx
'use strict';

import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ContactPage from './pages/ContactPage';
import CurriculumPage from './pages/CurriculumPage';
import CertificatesPage from './pages/CertificatesPage';

import i18n from './i18n/index';
import { Lang } from './utils/routePaths';

// Layout por língua: sincroniza i18n e delega no MainLayout (que usa <Outlet />)
const LangLayout: React.FC = () => {
  const { lang } = useParams<{ lang: Lang }>();

  useEffect(() => {
    if (lang && (lang === 'pt' || lang === 'en')) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return <MainLayout />;
};

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Redireciona / para /pt */}
        <Route path='/' element={<Navigate to='/pt' replace />} />

        {/* Rotas por idioma, com MainLayout + Outlet */}
        <Route path='/:lang' element={<LangLayout />}>
          {/* Home: /pt e /en */}
          <Route index element={<HomePage />} />

          {/* About: /pt/sobre e /en/about */}
          <Route path='sobre' element={<AboutPage />} />
          <Route path='about' element={<AboutPage />} />

          {/* Projects list: /pt/projetos e /en/projects */}
          <Route path='projetos' element={<ProjectsPage />} />
          <Route path='projects' element={<ProjectsPage />} />

          {/* Project detail: /pt/projetos/:slug e /en/projects/:slug */}
          <Route path='projetos/:slug' element={<ProjectDetailPage />} />
          <Route path='projects/:slug' element={<ProjectDetailPage />} />

          {/* Contact: /pt/contacto e /en/contact */}
          <Route path='contacto' element={<ContactPage />} />
          <Route path='contact' element={<ContactPage />} />

          {/* Curriculum: /pt/curriculo e /en/resume */}
          <Route path='curriculo' element={<CurriculumPage />} />
          <Route path='resume' element={<CurriculumPage />} />

          {/* Certificates: /pt/certificados e /en/certificates */}
          <Route path='certificados' element={<CertificatesPage />} />
          <Route path='certificates' element={<CertificatesPage />} />
        </Route>

        {/* Qualquer outra rota cai em /pt */}
        <Route path='*' element={<Navigate to='/pt' replace />} />
      </Routes>
    </>
  );
};

export default App;
