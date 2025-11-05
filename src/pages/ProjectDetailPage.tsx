// src/pages/ProjectDetailPage.tsx
'use strict';

import React from 'react';
import './styles/ProjectDetailPage.scss';
import Button from '../components/common/Button/Button';
import { Project } from '../types/project';

// Imagens mock (substitui pelas reais)
import heroDetail from '../assets/mock1.webp';

const MOCK_PROJECT: Project = {
  id: 'p-001',
  slug: 'sistema-gestao-testes',
  title: 'Sistema de Gestão de Testes',
  subtitle: 'QA Automation • Selenium • Cucumber (BDD)',
  excerpt:
    'Framework de automação de testes com foco em legibilidade (Gherkin), reporting e integração CI.',
  description:
    'Este projeto demonstra a implementação de testes funcionais com Selenium e Cucumber, adotando BDD para alinhar negócio e QA. Inclui estrutura modular, Page Objects, reutilização de steps e relatórios agregados.',
  tags: ['QA', 'Selenium', 'Cucumber', 'TypeScript'],
  category: 'qa',
  status: 'completed',
  media: { imageSrc: heroDetail, imageAlt: 'Cenário de testes automatizados' },
  links: { live: '#', repo: 'https://github.com/', details: '/projects/sistema-gestao-testes' },
  createdAt: '2024-09-10T12:00:00.000Z',
  updatedAt: '2025-01-15T09:15:00.000Z',
};

const formatDate = (iso?: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('pt-PT', { year: 'numeric', month: 'short', day: '2-digit' });
};

const ProjectDetailPage: React.FC<{ project?: Project }> = ({ project = MOCK_PROJECT }) => {
  const {
    title,
    subtitle,
    description,
    media,
    links,
    tags = [],
    createdAt,
    updatedAt,
    excerpt,
  } = project;

  return (
    <main className='projDetail' aria-labelledby='projDetail-title'>
      {/* HERO 16:9 */}
      <header className='projDetail__hero' aria-label='Imagem do projeto'>
        <figure className='projDetail__media'>
          <img
            className='projDetail__img'
            src={media?.imageSrc}
            alt={media?.imageAlt || title}
            loading='eager'
          />
        </figure>

        <div className='projDetail__head'>
          <h1 id='projDetail-title' className='projDetail__title'>
            {title}
          </h1>
          {subtitle && <p className='projDetail__subtitle'>{subtitle}</p>}
          {excerpt && <p className='projDetail__excerpt'>{excerpt}</p>}

          {(links?.live || links?.repo) && (
            <div className='projDetail__actions' role='group' aria-label='Ações do projeto'>
              {links?.live && (
                <Button href={links.live} variant='primary' size='md' aria-Label='Abrir demo'>
                  Live
                </Button>
              )}
              {links?.repo && (
                <Button href={links.repo} variant='secondary' size='md' aria-Label='Abrir GitHub'>
                  GitHub
                </Button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* META BAR */}
      <section className='projDetail__meta' aria-label='Metadados'>
        <ul className='projDetail__tags' aria-label='Tecnologias'>
          {tags.map((t) => (
            <li key={t} className='projDetail__tag'>
              {t}
            </li>
          ))}
        </ul>
        <div className='projDetail__dates'>
          {createdAt && (
            <span className='projDetail__date' title={createdAt}>
              Criado: {formatDate(createdAt)}
            </span>
          )}
          {updatedAt && (
            <span className='projDetail__date' title={updatedAt}>
              Atualizado: {formatDate(updatedAt)}
            </span>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <article className='projDetail__content' aria-label='Conteúdo do projeto'>
        <h2 className='projDetail__h2'>Descrição</h2>
        <p className='projDetail__p'>{description}</p>

        <h3 className='projDetail__h3'>Principais objetivos</h3>
        <ul className='projDetail__list'>
          <li>Estratégia BDD com Gherkin para cenários legíveis por negócio.</li>
          <li>Arquitetura Page Object para reduzir duplicações.</li>
          <li>Execução paralela e reports agregados no CI.</li>
        </ul>

        <h3 className='projDetail__h3'>Exemplo de Step (pseudo)</h3>
        <pre className='projDetail__code' aria-label='Exemplo de código'>
          {`Given("user is on the login page")
When("user submits valid credentials")
Then("user should see the dashboard")`}
        </pre>
      </article>
    </main>
  );
};

export default ProjectDetailPage;
