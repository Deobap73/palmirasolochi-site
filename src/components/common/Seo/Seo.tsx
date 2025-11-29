// src/components/common/Seo/Seo.tsx
'use strict';

import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { Lang } from '../../../utils/routePaths';
import { BASE_URL, getSeoEntry, type PageKey } from '../../../utils/seoConfig';

interface SeoProps {
  page: PageKey;
  lang: Lang;
  slug?: string;
  overrideTitle?: string;
  overrideDescription?: string;
}

const Seo: React.FC<SeoProps> = ({ page, lang, slug, overrideTitle, overrideDescription }) => {
  const otherLang: Lang = lang === 'en' ? 'pt' : 'en';

  const current = getSeoEntry(page, lang);
  const alt = getSeoEntry(page, otherLang);
  const xDefault = getSeoEntry(page, 'pt');

  const currentPath = page === 'projectDetail' && slug ? `${current.path}/${slug}` : current.path;
  const altPath = page === 'projectDetail' && slug ? `${alt.path}/${slug}` : alt.path;

  const canonicalUrl = `${BASE_URL}${currentPath}`;
  const altUrl = `${BASE_URL}${altPath}`;
  const xDefaultUrl = `${BASE_URL}${xDefault.path}`;

  const title = overrideTitle || current.title;
  const description = overrideDescription || current.description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />

      {/* Canonical */}
      <link rel='canonical' href={canonicalUrl} />

      {/* Hreflang */}
      <link rel='alternate' hrefLang='pt' href={`${BASE_URL}${getSeoEntry(page, 'pt').path}`} />
      <link rel='alternate' hrefLang='en' href={`${BASE_URL}${getSeoEntry(page, 'en').path}`} />
      <link rel='alternate' hrefLang='x-default' href={xDefaultUrl} />

      {/* Open Graph básico */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={canonicalUrl} />
      <meta property='og:type' content='website' />
    </Helmet>
  );
};

export default Seo;
