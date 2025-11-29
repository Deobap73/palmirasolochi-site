// src/pages/ProjectDetailPage.tsx
'use strict';

import React from 'react';
import './styles/ProjectDetailPage.scss';
import Button from '../components/common/Button/Button';
import type { Project } from '../types/project';
import { getProjectBySlug } from '../services/projects';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lang, buildPath } from '../utils/routePaths';
import Seo from '../components/common/Seo/Seo';

function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

const FALLBACK_HERO = withBase('projectsImages/mock1.webp');

const formatDate = (iso: string | undefined, lang: Lang): string => {
  if (!iso) return '';
  const d = new Date(iso);
  const locale = lang === 'en' ? 'en-GB' : 'pt-PT';
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: '2-digit' });
};

const ProjectDetailPage: React.FC = () => {
  const { slug, lang } = useParams<{ slug: string; lang: Lang }>();
  const currentLang: Lang = lang === 'en' ? 'en' : 'pt';
  const { t } = useTranslation('projectDetail');

  const [project, setProject] = React.useState<Project | null>(null);
  const [notFound, setNotFound] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    async function load(): Promise<void> {
      setLoading(true);
      setNotFound(false);
      try {
        if (!slug) {
          setNotFound(true);
          setProject(null);
          return;
        }
        const found = await getProjectBySlug(slug);
        if (!alive) return;
        if (found) {
          setProject(found);
          setNotFound(false);
        } else {
          setProject(null);
          setNotFound(true);
        }
      } finally {
        if (alive) setLoading(false);
      }
    }
    void load();
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <>
        <Seo page='projectDetail' lang={currentLang} slug={slug} />

        <main className='projDetail' role='status' aria-live='polite'>
          <p>{t('loading')}</p>
        </main>
      </>
    );
  }

  if (notFound || !project) {
    return (
      <>
        <Seo
          page='projectDetail'
          lang={currentLang}
          slug={slug}
          overrideTitle={t('notFoundTitle')}
          overrideDescription={t('notFoundExcerpt')}
        />

        <main className='projDetail' role='status' aria-live='polite'>
          <header className='projDetail__head'>
            <h1 className='projDetail__title'>{t('notFoundTitle')}</h1>
            <p className='projDetail__excerpt'>{t('notFoundExcerpt')}</p>
          </header>
          <Button
            className='projDetail__action'
            href={buildPath('projects', currentLang)}
            variant='secondary'
            size='md'
            aria-label={t('backAria')}>
            {t('backLabel')}
          </Button>
        </main>
      </>
    );
  }

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

  const descriptionHtml = (project as unknown as { descriptionHtml?: string })?.descriptionHtml;

  const seoDescription =
    excerpt ||
    (typeof description === 'string' && description.length > 0
      ? description
      : t('descriptionFallback'));

  return (
    <>
      <Seo
        page='projectDetail'
        lang={currentLang}
        slug={slug}
        overrideTitle={`${title} | Palmira Solochi`}
        overrideDescription={seoDescription}
      />

      <main className='projDetail' aria-labelledby='projDetail-title'>
        <header className='projDetail__hero' aria-label={t('heroAria')}>
          <figure className='projDetail__media'>
            <img
              className='projDetail__img'
              src={media?.imageSrc || FALLBACK_HERO}
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
              <div className='projDetail__actions' role='group' aria-label={t('actionsAria')}>
                {links?.live && (
                  <Button href={links.live} variant='primary' size='md' aria-label={t('liveAria')}>
                    {t('liveLabel')}
                  </Button>
                )}
                {links?.repo && (
                  <Button
                    href={links.repo}
                    variant='secondary'
                    size='md'
                    aria-label={t('repoAria')}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {t('repoLabel')}
                  </Button>
                )}
              </div>
            )}
          </div>
        </header>

        <section className='projDetail__meta' aria-label={t('metaAria')}>
          <ul className='projDetail__tags' aria-label={t('metaTechnologiesLabel')}>
            {tags.map((tTag) => (
              <li key={tTag} className='projDetail__tag'>
                {tTag}
              </li>
            ))}
          </ul>
          <div className='projDetail__dates'>
            {createdAt && (
              <span className='projDetail__date' title={createdAt}>
                {t('createdLabel')} {formatDate(createdAt, currentLang)}
              </span>
            )}
            {updatedAt && (
              <span className='projDetail__date' title={updatedAt}>
                {t('updatedLabel')} {formatDate(updatedAt, currentLang)}
              </span>
            )}
          </div>
        </section>

        <article className='projDetail__content' aria-label={t('contentAria')}>
          <h2 className='projDetail__h2'>{t('descriptionHeading')}</h2>

          {descriptionHtml ? (
            <div
              className='projDetail__rich'
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          ) : (
            <p className='projDetail__p'>{description || t('descriptionFallback')}</p>
          )}
        </article>

        <Button
          className='projDetail__action'
          href={buildPath('projects', currentLang)}
          variant='secondary'
          size='md'
          aria-label={t('backAria')}>
          {t('backLabel')}
        </Button>
      </main>
    </>
  );
};

export default ProjectDetailPage;
