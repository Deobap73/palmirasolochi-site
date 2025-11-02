// src/pages/AboutPage.tsx
import React from 'react';
import HeroAbout from '../components/about/HeroAbout/HeroAbout';
import IntroBannerAbout from '../components/about/IntroBannerAbout/IntroBannerAbout';
import ArticleAbout from '../components/about/ArticleAbout/ArticleAbout';

// Import image.
import hero2 from '../../src/assets/hero-2.webp';

const aboutParagraphs = [
  'Sou Palmira Solochi, uma mulher movida pela fé em Deus, pela determinação e pela vontade constante de evoluir.',
  'Acredito que o verdadeiro sucesso nasce quando unimos competência técnica, rigor analítico e valores humanos.',
  'Após uma sólida experiência no Direito e no Secretariado Executivo, decidi fazer uma transição de carreira para a área da Tecnologia, unindo a minha capacidade de análise rigorosa, clareza de comunicação e foco na qualidade.',
  'Concluí formação em Quality Assurance (QA), com experiência em testes manuais e automatizados (Selenium, Cypress, Cucumber, BDD).',
  'Atualmente, frequento o Curso Técnico de Programação, aprofundando conhecimentos em COBOL, Mainframe, Java e Segurança.',
  'Nem sempre o caminho foi fácil. Sou mãe de três filhos e, mesmo nos momentos mais desafiantes, nunca baixei os braços.',
  'Enquanto trabalhava como motorista de Uber, muitas vezes entre 10 e 15 horas por dia, mantive-me firme nos estudos e na fé. A minha crença em Deus foi e continua a ser o combustível que me impulsiona a seguir em frente, com coragem e propósito.',
  'Hoje, vejo na tecnologia um espaço onde posso unir a lógica e a empatia, a disciplina técnica e a sensibilidade humana. Acredito que a tecnologia também é lugar de mulheres fortes, persistentes, cheias de coragem e fé, capazes de inovar e transformar o mundo à sua volta.',
  '“Com fé em Deus e coragem no coração, uma mulher é capaz de transformar qualquer dor em recomeço.”',
  '\u00A0\u00A0A minha mensagem é simples:',
  '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0• Nunca é tarde para recomeçar.',
  '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0• Não deixes que o medo ou a opinião dos outros te impeçam de ser quem és.',
  '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0• Com garra, fé em Deus e determinação, o impossível transforma-se em conquista.',
];

const AboutPage: React.FC = () => {
  return (
    <main id='main' className='aboutPage' aria-labelledby='about-title'>
      {/* HERO invertido — imagem à direita, card à esquerda */}
      <HeroAbout
        inverted
        title='Sou Palmira Solochi!'
        text='De Direito ao QA (Selenium, BDD) e Programação (COBOL, Java). Uma história de transição de carreira, fé e determinação, provando que nunca é tarde para recomeçar.'
        imageSrc={hero2}
        imageAlt='Retrato profissional'
        ctaPrimary={{ label: 'Vamos falar', href: '/contact' }}
        ctaSecondary={undefined}
      />

      <IntroBannerAbout
        quotes={[
          'Se é feito com atenção, não é por acaso.',
          'Trabalho com foco, clareza e a mesma energia.',
        ]}
      />

      <ArticleAbout imageAlt='Palmira Solochi apresentação' paragraphs={aboutParagraphs} />
    </main>
  );
};

export default AboutPage;
