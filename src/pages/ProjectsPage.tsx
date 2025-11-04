// src/pages/ProjectsPage.tsx
'use strict';

import React from 'react';

// Components
import HeroProjects from '../components/Projects/HeroProjects/HeroProjects';
import IntroBannerProjects from '../components/Projects/IntroBannerProjects/IntroBannerProjects';
import FiltersBar, { SortOption } from '../components/Projects/FiltersBar/FiltersBar';
import ProjectsGrid, { ProjectGridItem } from '../components/Projects/ProjectsGrid/ProjectsGrid';
import Pagination from '../components/Projects/Pagination/Pagination';
import CtaBand from '../components/Projects/CtaBand/CtaBand';

// Image
import hero3 from '../assets/hero-3.webp';
import mock1 from '../assets/mock1.webp';
import mock2 from '../assets/mock2.webp';
import mock3 from '../assets/mock3.webp';
import mock4 from '../assets/mock4.webp';
import mock5 from '../assets/mock5.webp';
import mock6 from '../assets/mock6.webp';

const ProjectsPage: React.FC = () => {
  const introText = `
<p>Uma seleção de projetos de Desenvolvimento de Software que reflete a minha evolução como Programadora e Especialista em QA (Garantia de Qualidade), demonstrando o meu compromisso com a qualidade, aprendizagem contínua e inovação ao longo do meu percurso académico e profissional.</p>

<p>Cada projeto representa uma etapa crucial da minha jornada, desde as primeiras experiências em Testes de Software até ao Desenvolvimento de Aplicações robustas nas seguintes tecnologias e linguagens: <strong>COBOL, Mainframe, Java, C, C++, PHP, C#, ASP Net Core e Python</strong>.</p>

<p>Aqui encontrará um Portefólio de Projetos que inclui trabalhos académicos, projetos pessoais e exercícios técnicos que solidificam as minhas competências em:</p>

<ul>
  <li>Programação Backend</li>
  <li>Bases de Dados</li>
  <li>Automação de Testes</li>
  <li>Desenvolvimento Web</li>
</ul>

<p>“Cada linha de código é uma oportunidade para aprender, melhorar e criar algo que faça a diferença.”</p>
`;

  // ======= STATE =======
  const [q, setQ] = React.useState('');
  const [sort, setSort] = React.useState<SortOption>('newest');
  const [activeTags, setActiveTags] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 3;

  const tags = ['Python', 'PHP', 'C++', 'C#', 'QA', 'COBOL', 'Java'];

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  // ======= MOCK DATA =======
  const allProjects: ProjectGridItem[] = [
    {
      id: '1',
      title: 'Sistema de Gestão de Testes',
      subtitle: 'QA Automation (Selenium, Cucumber)',
      excerpt: 'Framework de automação BDD com Selenium, Cucumber e relatórios detalhados.',
      imageSrc: mock1,
      imageAlt: 'Projeto QA',
      tags: ['QA', 'Selenium', 'Cucumber'],
      links: { repo: 'https://github.com/', live: '#' },
    },
    {
      id: '2',
      title: 'App de Agendamento',
      subtitle: 'Frontend React + Node API',
      excerpt: 'Aplicação completa para gestão de reservas com API em Node.js e interface React.',
      imageSrc: mock2,
      imageAlt: 'App de Agendamento',
      tags: ['React', 'Node', 'TypeScript'],
      links: { repo: 'https://github.com/', live: '#' },
    },
    {
      id: '3',
      title: 'Sistema Bancário COBOL',
      subtitle: 'Mainframe / COBOL',
      excerpt:
        'Programa de simulação de operações bancárias implementado em COBOL com base de dados DB2.',
      imageSrc: mock3,
      imageAlt: 'Projeto COBOL',
      tags: ['COBOL', 'Mainframe', 'DB2'],
      links: { repo: 'https://github.com/', live: '#' },
    },
    {
      id: '4',
      title: 'Gestão de Cursos em Java',
      subtitle: 'Spring Boot + MySQL',
      excerpt: 'CRUD completo para administração de cursos e alunos com Spring Boot.',
      imageSrc: mock4,
      imageAlt: 'Projeto Java',
      tags: ['Java', 'Spring', 'MySQL'],
      links: { repo: 'https://github.com/', live: '#' },
    },
    {
      id: '5',
      title: 'Portal QA Tester',
      subtitle: 'Manual & Automated Testing',
      excerpt:
        'Simulação de testes manuais e automáticos com relatórios de regressão e cenários de login.',
      imageSrc: mock5,
      imageAlt: 'Projeto QA Portal',
      tags: ['QA', 'Python', 'Pytest'],
      links: { repo: 'https://github.com/', live: '#' },
    },
    {
      id: '6',
      title: 'Dashboard Financeiro',
      subtitle: 'React + API REST',
      excerpt:
        'Visualização de dados financeiros com gráficos dinâmicos, filtros e autenticação JWT.',
      imageSrc: mock6,
      imageAlt: 'Dashboard Financeiro',
      tags: ['React', 'API', 'JWT'],
      links: { repo: 'https://github.com/', live: '#' },
    },
  ];

  // ======= FILTROS =======
  const filtered = allProjects.filter((p) => {
    const query = q.toLowerCase();
    const matchQuery =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.subtitle?.toLowerCase().includes(query) ||
      p.excerpt?.toLowerCase().includes(query);
    const matchTags = activeTags.length === 0 || activeTags.some((tag) => p.tags?.includes(tag));
    return matchQuery && matchTags;
  });

  // ======= ORDENAR =======
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'az') return a.title.localeCompare(b.title);
    if (sort === 'za') return b.title.localeCompare(a.title);
    // newest/oldest simulados via ID (mock)
    return sort === 'newest' ? Number(b.id) - Number(a.id) : Number(a.id) - Number(b.id);
  });

  // ======= PAGINAÇÃO =======
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const pageItems = sorted.slice(startIndex, startIndex + itemsPerPage);

  React.useEffect(() => {
    // Resetar para página 1 quando filtros mudam
    setPage(1);
  }, [q, sort, activeTags]);

  // ======= RENDER =======
  return (
    <main aria-labelledby='ProjectsPage-title' className='pagesGeneral'>
      <HeroProjects
        title='Portfólio de Projetos'
        subtitle='UI, Frontend e Prototipagem'
        text='Seleção de trabalhos com foco em acessibilidade, performance e detalhe visual.'
        imageSrc={hero3}
        imageAlt='Preview de projetos'
        ctaPrimary={{ label: 'Ver todos', href: 'https://github.com/Pssolochi82?tab=repositories' }}
        ctaSecondary={{ label: 'GitHub', href: 'https://github.com/Pssolochi82', target: '_blank' }}
      />

      <IntroBannerProjects text={introText} align='center' />

      <FiltersBar
        search={q}
        onSearch={setQ}
        sort={sort}
        onSort={setSort}
        tags={tags}
        activeTags={activeTags}
        onToggleTag={toggleTag}
      />

      <ProjectsGrid items={pageItems} emptyText='Nenhum projeto encontrado.' />

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <CtaBand
        title='Tem um projeto em mente?'
        text='Fale comigo para desenharmos juntos a melhor solução — com qualidade, acessibilidade e foco no detalhe.'
        primary={{ label: 'Contactar', href: '/contact' }}
        secondary={{
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/palmirasolochi/',
          target: '_blank',
        }}
        align='center'
        tone='accent'
      />
    </main>
  );
};

export default ProjectsPage;
