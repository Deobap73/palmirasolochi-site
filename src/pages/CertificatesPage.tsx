// src/pages/CertificatesPage.tsx
'use strict';

import React from 'react';
import './styles/CertificatesPage.scss';
import PdfViewer from '../components/common/PdfViewer/PdfViewer';
import Button from '../components/common/Button/Button';
import { useSearchParams } from 'react-router-dom';

type CertificateItem = {
  id: string;
  title: string;
  src: string;
};

type CertificatesIndex = {
  version: number;
  items: CertificateItem[];
};

function isValidIndex(data: unknown): data is CertificatesIndex {
  if (!data || typeof data !== 'object') return false;
  const d = data as CertificatesIndex;
  if (!Array.isArray(d.items)) return false;
  return d.items.every(
    (it) =>
      it &&
      typeof it === 'object' &&
      typeof (it as CertificateItem).id === 'string' &&
      typeof (it as CertificateItem).title === 'string' &&
      typeof (it as CertificateItem).src === 'string'
  );
}

const JSON_URL = '/certificates/index.json';

const CertificatesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = React.useState<CertificateItem[]>([]);
  const [current, setCurrent] = React.useState<CertificateItem | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(JSON_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as unknown;

        if (!isValidIndex(data)) throw new Error('Invalid certificates index format');

        const list = data.items;
        if (cancelled) return;
        setItems(list);

        const q = searchParams.get('doc');
        const initial = list.find((i) => i.id === q) || list[0] || null;
        setCurrent(initial || null);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Unknown error';
        if (!cancelled) setError(`Falha ao carregar certificados: ${msg}`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const id = e.target.value;
    const next = items.find((i) => i.id === id) || null;
    setCurrent(next);
    if (next) setSearchParams({ doc: next.id });
  }

  return (
    <main className='certificatesPage' id='main-content'>
      <header className='certificatesPage__header'>
        <h1 className='certificatesPage__title'>Certificados</h1>
        <p className='certificatesPage__subtitle'>
          Visualização em modo leitura. Escolhe um certificado.
        </p>

        {!loading && !error && items.length > 0 && current && (
          <div
            className='certificatesPage__controls'
            role='group'
            aria-label='Selecionar certificado'>
            {/* <label htmlFor='cert-select' className='certificatesPage__label'>
              Certificado
            </label> */}
            <select
              id='cert-select'
              className='certificatesPage__select'
              value={current.id}
              onChange={handleChange}>
              {items.map((cert) => (
                <option key={cert.id} value={cert.id}>
                  {cert.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading && <p className='certificatesPage__status'>A carregar…</p>}
        {!loading && error && <p className='certificatesPage__error'>{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className='certificatesPage__status'>Nenhum certificado disponível.</p>
        )}

        {/* Botão voltar para /about */}

        <Button
          className='certificatesPage__actions'
          href='/about'
          variant='secondary'
          size='md'
          aria-label='Voltar à página Sobre'>
          Voltar a Sobre
        </Button>
      </header>

      {!loading && !error && current && (
        <div className='certificatesPage__viewer'>
          <PdfViewer
            src={current.src}
            title={`Certificado - ${current.title}`}
            showHeading={false}
          />
        </div>
      )}
    </main>
  );
};

export default CertificatesPage;
