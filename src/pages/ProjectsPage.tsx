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

// Services
import { listProjects } from '../services/projects';

// Hero intacto
import hero3 from '../assets/hero-3.webp';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Lang, buildPath } from '../utils/routePaths';

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation('projects');
  const { lang } = useParams<{ lang: Lang }>();
  const currentLang: Lang = lang === 'en' ? 'en' : 'pt';

  const introText = t('intro.html');

  // estado
  const [q, setQ] = React.useState('');
  const [sort, setSort] = React.useState<SortOption>('newest');
  const [activeTags, setActiveTags] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 3;

  const [projects, setProjects] = React.useState<ProjectGridItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  // tags fixas por agora (names neutros)
  const tags = ['Python', 'PHP', 'C++', 'C#', 'QA', 'COBOL', 'Java'];

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  // carregar projetos
  React.useEffect(() => {
    let alive = true;
    async function load(): Promise<void> {
      setLoading(true);
      setError('');
      try {
        const src = await listProjects();
        if (!alive) return;
        const items: ProjectGridItem[] = src.map((p) => ({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle,
          excerpt: p.excerpt,
          imageSrc: p.media?.imageSrc,
          imageAlt: p.media?.imageAlt || p.title,
          tags: p.tags,
          links: p.links,
        }));
        setProjects(items);
      } catch (e) {
        if (!alive) return;
        setError(t('list.error'));
      } finally {
        if (alive) setLoading(false);
      }
    }
    void load();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // filtros
  const filtered = React.useMemo(() => {
    const query = q.toLowerCase();
    return projects.filter((p) => {
      const matchQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.subtitle?.toLowerCase().includes(query) ||
        p.excerpt?.toLowerCase().includes(query);
      const matchTags = activeTags.length === 0 || activeTags.some((tag) => p.tags?.includes(tag));
      return matchQuery && matchTags;
    });
  }, [projects, q, activeTags]);

  // ordenar
  const sorted = React.useMemo(() => {
    const arr = [...filtered];
    if (sort === 'az') return arr.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'za') return arr.sort((a, b) => b.title.localeCompare(a.title));
    return arr.sort((a, b) =>
      sort === 'newest' ? Number(b.id) - Number(a.id) : Number(a.id) - Number(b.id)
    );
  }, [filtered, sort]);

  // paginação
  const totalPages = Math.ceil(sorted.length / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const pageItems = sorted.slice(startIndex, startIndex + itemsPerPage);

  React.useEffect(() => {
    setPage(1);
  }, [q, sort, activeTags]);

  return (
    <main aria-labelledby='projects-hero-title' className='pagesGeneral'>
      <HeroProjects
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        text={t('hero.text')}
        imageSrc={hero3}
        imageAlt={t('hero.imageAlt')}
        ctaPrimary={{
          label: t('hero.ctaPrimaryLabel'),
          href: 'https://github.com/Pssolochi82?tab=repositories',
          target: '_blank',
        }}
        ctaSecondary={{
          label: t('hero.ctaSecondaryLabel'),
          href: 'https://github.com/Pssolochi82',
          target: '_blank',
        }}
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

      {loading && <p role='status'>{t('list.loading')}</p>}
      {!loading && error && <p role='alert'>{error}</p>}
      {!loading && !error && <ProjectsGrid items={pageItems} emptyText={t('grid.emptyText')} />}

      {!loading && !error && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          ariaLabel={t('pagination.ariaLabel')}
        />
      )}

      <CtaBand
        title={t('ctaBand.title')}
        text={t('ctaBand.text')}
        primary={{
          label: t('ctaBand.primaryLabel'),
          href: buildPath('contact', currentLang),
        }}
        secondary={{
          label: t('ctaBand.secondaryLabel'),
          href: 'https://www.linkedin.com/in/palmirasolochi/',
          target: '_blank',
        }}
        align='center'
        tone='accent'
        ariaLabel={t('ctaBand.ariaLabel')}
      />
    </main>
  );
};

export default ProjectsPage;
