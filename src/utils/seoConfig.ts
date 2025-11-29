// src/utils/seoConfig.ts
'use strict';

import type { Lang } from './routePaths';

type PageKey =
  | 'home'
  | 'about'
  | 'projects'
  | 'projectDetail'
  | 'contact'
  | 'curriculum'
  | 'certificates';

interface SeoEntry {
  path: string;
  title: string;
  description: string;
}

type SeoConfig = Record<PageKey, Record<Lang, SeoEntry>>;

export const BASE_URL = 'https://palmirasolochi.com';

export const seoConfig: SeoConfig = {
  home: {
    pt: {
      path: '/pt',
      title: 'Palmira Solochi | Especialista em Mainframe, Testes e Desenvolvimento',
      description:
        'Palmira Solochi, profissional de TI com foco em Mainframe COBOL, JCL, DB2, testes automatizados e desenvolvimento moderno em Java e ASP.NET Core. Portfólio de projetos reais e experiência em ambientes complexos.',
    },
    en: {
      path: '/en',
      title: 'Palmira Solochi | Mainframe, Testing and Software Development Specialist',
      description:
        'Palmira Solochi, IT professional focused on Mainframe COBOL, JCL, DB2, automated testing and modern development with Java and ASP.NET Core. Portfolio of real projects and experience in complex environments.',
    },
  },

  about: {
    pt: {
      path: '/pt/sobre',
      title: 'Sobre Palmira Solochi | Carreira em Mainframe, Testes e Desenvolvimento',
      description:
        'Conheça a trajetória de Palmira Solochi, desde o mundo do mainframe até a automação de testes e o desenvolvimento moderno, unindo rigor técnico e foco em qualidade.',
    },
    en: {
      path: '/en/about',
      title: 'About Palmira Solochi | Mainframe, Testing and Development Journey',
      description:
        'Discover the professional journey of Palmira Solochi, from mainframe environments to automated testing and modern development, combining technical rigor and quality focus.',
    },
  },

  projects: {
    pt: {
      path: '/pt/projetos',
      title: 'Projetos de Palmira Solochi | Portfólio Técnico',
      description:
        'Veja os projetos técnicos de Palmira Solochi em mainframe, automação de testes e desenvolvimento moderno, com foco em qualidade, manutenibilidade e boas práticas.',
    },
    en: {
      path: '/en/projects',
      title: 'Projects by Palmira Solochi | Technical Portfolio',
      description:
        'Explore the technical portfolio of Palmira Solochi across mainframe, test automation and modern development, with a focus on quality, maintainability and best practices.',
    },
  },

  projectDetail: {
    pt: {
      path: '/pt/projetos', // slug será acrescentado no componente Seo
      title: 'Projeto | Palmira Solochi',
      description:
        'Detalhes de um projeto desenvolvido por Palmira Solochi, incluindo contexto, stack tecnológica e resultados alcançados.',
    },
    en: {
      path: '/en/projects',
      title: 'Project | Palmira Solochi',
      description:
        'Details of a project developed by Palmira Solochi, including context, tech stack and outcomes.',
    },
  },

  contact: {
    pt: {
      path: '/pt/contacto',
      title: 'Contacto | Palmira Solochi',
      description:
        'Entre em contacto com Palmira Solochi para falar sobre oportunidades em mainframe, automação de testes ou desenvolvimento de software.',
    },
    en: {
      path: '/en/contact',
      title: 'Contact | Palmira Solochi',
      description:
        'Get in touch with Palmira Solochi to discuss opportunities in mainframe, test automation or software development.',
    },
  },

  curriculum: {
    pt: {
      path: '/pt/curriculo',
      title: 'Currículo de Palmira Solochi | Experiência e Competências',
      description:
        'Veja o currículo detalhado de Palmira Solochi, com experiência em mainframe, automação de testes e desenvolvimento de software.',
    },
    en: {
      path: '/en/resume',
      title: 'Palmira Solochi Resume | Experience and Skills',
      description:
        'View the detailed resume of Palmira Solochi, with experience in mainframe, test automation and software development.',
    },
  },

  certificates: {
    pt: {
      path: '/pt/certificados',
      title: 'Certificados de Palmira Solochi | Formação e Especialização',
      description:
        'Explore os certificados de formação e especialização de Palmira Solochi em testes, desenvolvimento e tecnologias de TI.',
    },
    en: {
      path: '/en/certificates',
      title: 'Certificates of Palmira Solochi | Training and Specialisation',
      description:
        'Explore the training and specialisation certificates of Palmira Solochi in testing, development and IT technologies.',
    },
  },
};

export function getSeoEntry(page: PageKey, lang: Lang): SeoEntry {
  const byLang = seoConfig[page];
  return byLang[lang] || byLang.pt;
}

export type { PageKey };
