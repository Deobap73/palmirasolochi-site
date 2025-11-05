// src/types/project.ts
'use strict';

/**
 * Core link set for a project.
 * - All fields are optional; validate upstream when rendering CTAs.
 */
export interface ProjectLinks {
  live?: string; // public demo URL
  repo?: string; // Git repository URL
  details?: string; // internal route (/projects/:slug)
}

/**
 * Visual/media data for a project.
 * - 16:9 is the default expected ratio on cards/pages.
 */
export interface ProjectMedia {
  imageSrc?: string;
  imageAlt?: string;
  /** Optional array of gallery images for future use */
  gallery?: Array<{ src: string; alt?: string }>;
}

/**
 * Allowed project categories — extend as needed.
 */
export type ProjectCategory =
  | 'frontend'
  | 'fullstack'
  | 'qa'
  | 'automation'
  | 'mainframe'
  | 'data'
  | 'experiment';

/**
 * Project status lifecycle.
 */
export type ProjectStatus = 'draft' | 'in-progress' | 'completed' | 'archived';

/**
 * Core Project entity used across grid, filters and details.
 */
export interface Project {
  id: string; // stable id (uuid/slugish)
  slug?: string; // optional route-friendly slug
  title: string; // required title
  subtitle?: string; // short line under title
  excerpt?: string; // short description for cards
  description?: string; // rich text/markdown for details
  category?: ProjectCategory; // classification for filters
  tags?: string[]; // free-form technology tags
  status?: ProjectStatus; // lifecycle status

  /** Media block (16:9 primary image expected for cards) */
  media?: ProjectMedia;

  /** Links block (live/repo/details) */
  links?: ProjectLinks;

  /** Timestamps for sorting or audit (optional) */
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
}

/**
 * Utility for sorting projects by a simple key.
 * - Fallbacks: id is used when dates are missing.
 */
export type ProjectSort = 'newest' | 'oldest' | 'az' | 'za';

export function sortProjects(items: Project[], order: ProjectSort): Project[] {
  const byTitleAsc = (a: Project, b: Project) => a.title.localeCompare(b.title);
  const byTitleDesc = (a: Project, b: Project) => b.title.localeCompare(a.title);
  const toEpoch = (iso?: string) => (iso ? Date.parse(iso) : 0);

  const byNewest = (a: Project, b: Project) => {
    const da = toEpoch(a.updatedAt || a.createdAt) || Number(a.id);
    const db = toEpoch(b.updatedAt || b.createdAt) || Number(b.id);
    return db - da;
  };

  const byOldest = (a: Project, b: Project) => -byNewest(a, b);

  switch (order) {
    case 'az':
      return [...items].sort(byTitleAsc);
    case 'za':
      return [...items].sort(byTitleDesc);
    case 'oldest':
      return [...items].sort(byOldest);
    case 'newest':
    default:
      return [...items].sort(byNewest);
  }
}

/**
 * Basic filter helpers to reuse in pages/services.
 */
export interface ProjectFilter {
  q?: string; // free-text query
  tags?: string[]; // active tags
  category?: ProjectCategory;
}

export function filterProjects(items: Project[], filter: ProjectFilter): Project[] {
  const q = (filter.q || '').trim().toLowerCase();
  const tags = filter.tags || [];
  const cat = filter.category;

  return items.filter((p) => {
    const hay =
      (p.title || '').toLowerCase() +
      ' ' +
      (p.subtitle || '').toLowerCase() +
      ' ' +
      (p.excerpt || '').toLowerCase();

    const matchQ = q === '' || hay.includes(q);
    const matchTags = tags.length === 0 || (p.tags || []).some((t) => tags.includes(t));
    const matchCat = !cat || p.category === cat;

    return matchQ && matchTags && matchCat;
  });
}
