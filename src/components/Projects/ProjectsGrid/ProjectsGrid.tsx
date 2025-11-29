// src/components/Projects/ProjectsGrid/ProjectsGrid.tsx
'use strict';

import React from 'react';
import './ProjectsGrid.scss';
import ProjectCard, { ProjectCardProps } from '../ProjectCard/ProjectCard';
import { useTranslation } from 'react-i18next';

export interface ProjectGridItem extends Omit<ProjectCardProps, 'className'> {
  id: string;
}

export interface ProjectsGridProps {
  items: ProjectGridItem[];
  emptyText?: string;
  compact?: boolean;
  className?: string;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  items,
  emptyText,
  compact = false,
  className = '',
}) => {
  const { t } = useTranslation('projects');
  const rootCls = ['projGrid', compact ? 'projGrid--compact' : '', className]
    .filter(Boolean)
    .join(' ');

  const message = emptyText || t('grid.emptyDefault');

  if (!items || items.length === 0) {
    return (
      <section className={rootCls} aria-live='polite'>
        <div className='projGrid__empty' role='status'>
          <p className='projGrid__emptyText'>{message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={rootCls} aria-label={t('grid.ariaLabel')}>
      <div className='projGrid__grid'>
        {items.map(({ id, ...card }) => (
          <div key={id} className='projGrid__cell'>
            <ProjectCard {...card} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;
