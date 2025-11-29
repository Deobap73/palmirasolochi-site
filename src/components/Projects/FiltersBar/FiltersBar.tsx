// src/components/Projects/FiltersBar/FiltersBar.tsx
'use strict';

import React, { useId } from 'react';
import './FiltersBar.scss';
import { useTranslation } from 'react-i18next';

export type SortOption = 'newest' | 'oldest' | 'az' | 'za';

export interface FiltersBarProps {
  search: string;
  onSearch: (value: string) => void;
  sort: SortOption;
  onSort: (value: SortOption) => void;
  tags?: string[];
  activeTags?: string[];
  onToggleTag?: (tag: string) => void;
  compact?: boolean;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  search,
  onSearch,
  sort,
  onSort,
  tags = [],
  activeTags = [],
  onToggleTag,
  compact = false,
}) => {
  const { t } = useTranslation('projects');
  const formId = useId();
  const legendId = `${formId}-legend`;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOption;
    onSort(value);
  };

  return (
    <section className={`filters ${compact ? 'filters--compact' : ''}`} aria-labelledby={legendId}>
      <form className='filters__form' role='search' onSubmit={(e) => e.preventDefault()}>
        <fieldset className='filters__set'>
          <legend id={legendId} className='filters__legend'>
            {t('filters.legend')}
          </legend>

          <div className='filters__row'>
            <label htmlFor={`${formId}-q`} className='filters__label'>
              {t('filters.searchLabel')}
            </label>
            <div className='filters__searchWrap'>
              <input
                id={`${formId}-q`}
                className='filters__search'
                type='search'
                inputMode='search'
                placeholder={t('filters.searchPlaceholder')}
                value={search}
                onChange={handleSearchChange}
                aria-describedby={`${formId}-q-hint`}
              />
              {search.length > 0 && (
                <button
                  type='button'
                  className='filters__clear'
                  aria-label={t('filters.clear')}
                  onClick={() => onSearch('')}>
                  ×
                </button>
              )}
            </div>
            <small id={`${formId}-q-hint`} className='filters__hint'>
              {t('filters.hint')}
            </small>
          </div>

          <div className='filters__row'>
            <label htmlFor={`${formId}-sort`} className='filters__label'>
              {t('filters.sortLabel')}
            </label>
            <select
              id={`${formId}-sort`}
              className='filters__select'
              value={sort}
              onChange={handleSortChange}>
              <option value='newest'>{t('filters.sortNewest')}</option>
              <option value='oldest'>{t('filters.sortOldest')}</option>
              <option value='az'>{t('filters.sortAz')}</option>
              <option value='za'>{t('filters.sortZa')}</option>
            </select>
          </div>

          {tags.length > 0 && (
            <div className='filters__row'>
              <span className='filters__label'>{t('filters.tagsLabel')}</span>
              <div className='filters__tags' role='group' aria-label={t('filters.tagsGroup')}>
                {tags.map((tag) => {
                  const active = activeTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type='button'
                      className={`filters__tag ${active ? 'filters__tag--active' : ''}`}
                      aria-pressed={active}
                      onClick={() => onToggleTag?.(tag)}>
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </fieldset>
      </form>
    </section>
  );
};

export default FiltersBar;
