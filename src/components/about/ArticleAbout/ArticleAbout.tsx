// src/components/about/ArticleAbout/ArticleAbout.tsx
'use strict';

import React from 'react';
import './ArticleAbout.scss';

export interface ArticleAboutProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  paragraphs: string[];
}

const ArticleAbout: React.FC<ArticleAboutProps> = ({
  imageSrc,
  imageAlt,
  title = 'A minha história',
  paragraphs,
}) => {
  return (
    <section className='aboutArticle' aria-labelledby='about-article-title'>
      <div className='aboutArticle__inner'>
        {imageSrc && (
          <div className='aboutArticle__media'>
            <img src={imageSrc} alt={imageAlt || ''} className='aboutArticle__img' />
          </div>
        )}

        <h2 id='about-article-title' className='aboutArticle__title'>
          {title}
        </h2>

        <div className='aboutArticle__content'>
          {paragraphs.map((p, i) => (
            <p key={i} className='aboutArticle__paragraph'>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleAbout;
