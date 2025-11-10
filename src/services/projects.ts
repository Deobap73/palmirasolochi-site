// src/services/projects.ts
'use strict';

import type { Project } from '../types/project';
import rawJson from '../data/projects.json?raw';

/** Build details route */
export function detailsPath(slug: string): string {
  return `/projects/${slug}`;
}

/** Resolve image filename to final URL using Vite. Base: src/assets/projects/ */
function resolveImageSrc(fileName?: string): string | undefined {
  if (!fileName) return undefined;
  try {
    return new URL('../assets/projects/' + fileName, import.meta.url).href;
  } catch {
    return undefined;
  }
}

/** Remove BOM, comentários // e /* *\/, e controla whitespace */
function preprocessJson(s: string): string {
  let out = s.replace(/^\uFEFF/, '');
  // remove /* block comments */
  out = out.replace(/\/\*[\s\S]*?\*\//g, '');
  // remove // line comments
  out = out.replace(/(^|\s)\/\/.*$/gm, '');
  return out.trim();
}

function normalizeRaw(input: unknown): Project[] {
  if (typeof input === 'string') {
    try {
      const clean = preprocessJson(input);
      const parsed = JSON.parse(clean);
      if (Array.isArray(parsed)) {
        console.debug('[projects] parsed array length:', parsed.length);
        return parsed as Project[];
      }
      console.warn('[projects] JSON não é um array.');
      return [];
    } catch (e) {
      console.error('[projects] Falha ao fazer parse do projects.json:', e);
      return [];
    }
  }
  const candidate = (input as any)?.default ?? input;
  return Array.isArray(candidate) ? (candidate as Project[]) : [];
}

/** Enriquecimento */
function hydrate(items: Project[]): Project[] {
  return items.map((p) => {
    const imageFile = (p.media as any)?.imageFile as string | undefined;
    const imageSrc = p.media?.imageSrc || resolveImageSrc(imageFile);
    const details = p.links?.details || (p.slug ? detailsPath(p.slug) : undefined);
    return {
      ...p,
      media: { ...p.media, imageSrc },
      links: { ...p.links, details },
    };
  });
}

/** Cache */
let _cache: Project[] | null = null;

function loadAll(): Project[] {
  if (_cache) return _cache;
  const base = normalizeRaw(rawJson);
  _cache = hydrate(base);
  console.debug('[projects] hydrated length:', _cache.length);
  // @ts-expect-error debug window hook
  if (typeof window !== 'undefined') window.__PROJECTS__ = _cache;
  return _cache;
}

export function listProjects(): Project[] {
  return [...loadAll()];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return loadAll().find((p) => p.slug === slug);
}
