# PROMPT CLAUDE CODE — Migração KWF: Vite/React → Next.js
## SEO + GEO + Tracking Completo

> Cole este prompt inteiro no Claude Code com o projeto aberto localmente.

---

## CONTEXTO

Este projeto é o site institucional da Agência KWF (agenciakwf.com.br). Atualmente é uma SPA React/Vite (construída no Lovable). O site NÃO aparece no Google — zero indexação — porque todo conteúdo é renderizado client-side. Crawlers (Googlebot, GPTBot, PerplexityBot, ClaudeBot) vêem uma página em branco.

**Objetivo:** Migrar para Next.js App Router com Static Site Generation (SSG) mantendo 100% do design visual atual. O site deve ser completamente legível sem JavaScript — todo conteúdo visível no View Source.

**Restrição crítica:** O design visual, a copy, as cores, as animações e a estrutura de componentes NÃO devem mudar. Esta é uma migração de infraestrutura, não um redesign.

---

## ESTRUTURA ATUAL DO SITE (manter exatamente)

O site é uma landing page com as seguintes seções (nesta ordem):

**Nav:** Logo KWF | Como funciona | Resultados | Sobre | Dúvidas | CTA "PRÉ-DIAGNÓSTICO ESTRATÉGICO"

**Seções da homepage (scroll):**
1. **Hero** — Label "EMPRESAS QUE FATURAM +R$150MIL/MÊS" + Headline + Sub + CTA "QUERO UM PRÉ-DIAGNÓSTICO" + Ilustração
2. **Problemas** — "Três problemas que travam o crescimento de 7 em cada 10 empresas" (3 cards: O balde furado, O carro sem painel, O trabalho manual)
3. **Prova social** — "Quem já confiou na Agência KWF" (carrossel de logos de clientes)
4. **AlicIA** — "Você sabe o que acontece na sua empresa enquanto você não está olhando?"
5. **Funil** — "O funil que transforma investimento em receita previsível"
6. **Processo** — "Do Pré-Diagnóstico ao Sistema de Aquisição KWF implementado" (steps: Pré-Diagnóstico, Diagnóstico Raio-X, Aceleração Contínua)
7. **CTA** — "Descubra em 10 minutos onde pode estar vazando dinheiro..." + botão "QUERO FAZER O DIAGNÓSTICO"
8. **FAQ** — "Dúvidas Frequentes" (5 perguntas accordion)
9. **Sobre** — "Conheça a Agência KWF" + stats (+R$19M, +36Mil vendas, +R$/4M) + carrossel de fotos
10. **Footer** — Logo, Navegação, Ação (Pré-Diagnóstico), Legal (Privacidade, Termos)

**Páginas separadas:**
- `/termos-de-uso`
- `/politica-de-privacidade`

---

# PARTE 1 — MIGRAÇÃO DE FRAMEWORK

## 1.1. Setup Next.js

- Inicializar Next.js 15+ com App Router (`/app` directory)
- TypeScript (manter se o projeto atual usa, ou adicionar)
- Tailwind CSS (manter configuração existente — ver seção Design System)
- Remover: `react-router-dom`, `vite`, `vite.config.ts`
- Manter: todos os componentes, estilos, assets, imagens, SVGs

## 1.2. Conversão de rotas

```
src/pages/Index.tsx       → app/page.tsx (homepage)
src/pages/TermosDeUso.tsx → app/termos-de-uso/page.tsx
src/pages/Privacidade.tsx → app/politica-de-privacidade/page.tsx
src/pages/NotFound.tsx    → app/not-found.tsx
```

Criar também:
```
app/sobre/page.tsx        → Página "Sobre" para GEO (ver Parte 3)
```

## 1.3. Layout raiz (`app/layout.tsx`)

- Font Inter via `next/font/google` com `display: 'swap'` (substituir qualquer CDN link)
- `<html lang="pt-BR">`
- Schema Markup global (ver Parte 2)
- GTM script (ver Parte 4)
- Componentes globais (Nav, Footer)
- Noise overlay e ambient glows (manter efeitos visuais)

## 1.4. Componentes

- Mover componentes de `src/components/` para `components/` ou `app/_components/`
- Server Components por padrão
- Adicionar `"use client"` SOMENTE em componentes que usam: useState, useEffect, useRef, event handlers, Intersection Observer, browser APIs
- Componentes puramente visuais/estáticos permanecem Server Components

## 1.5. Assets e Imagens

- Mover `public/` para `public/` do Next.js
- Usar `next/image` com `priority` no hero, `loading="lazy"` no restante
- SVGs da logo: manter inline ou como componentes
- Criar OG image: `public/og-image.jpg` (1200x630px, fundo #0F0F0F, logo KWF, tagline)

## 1.6. Scroll Animations (CRÍTICO)

O site usa Intersection Observer para scroll reveal (fade-in + translateY).

**Regra:** O HTML estático DEVE renderizar todo conteúdo VISÍVEL (opacity: 1). Crawlers precisam ver 100% do texto.

Implementação:
- Criar componente client `"use client"` para scroll reveal
- No HTML estático (SSG), todo conteúdo renderiza com `opacity: 1` e `transform: none`
- Após hydration no client, o JS reseta para `opacity: 0` e anima para `opacity: 1` quando visível
- Adicionar `noscript` styles ou classe `.js` no body para diferenciar
- Respeitar `prefers-reduced-motion`

```css
/* Sem JS: tudo visível */
.scroll-reveal { opacity: 1; transform: none; }

/* Com JS carregado: esconde e anima */
.js .scroll-reveal:not(.is-visible) { opacity: 0; transform: translateY(12px); }
.js .scroll-reveal.is-visible { opacity: 1; transform: translateY(0); transition: all 0.5s ease; }
```

---

# PARTE 2 — SEO TÉCNICO

## 2.1. Meta Tags por Página

### Homepage (`app/page.tsx`)

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agência KWF — Sistemas de Aquisição e Receita Previsível para Empresas de Serviço',
  description: 'Transforme seu marketing em um sistema de aquisição de clientes previsível. Metodologia, processo e inteligência artificial da captação ao fechamento. Diagnóstico em 10 minutos.',
  keywords: [
    'sistema de aquisição de clientes',
    'receita previsível',
    'marketing para empresas de serviço',
    'agência de marketing digital',
    'sistema de receita',
    'funil de vendas previsível',
    'marketing com IA',
    'diagnóstico de marketing',
    'ROI de marketing',
    'marketing para clínicas',
    'marketing para escritórios',
  ],
  authors: [{ name: 'Agência KWF' }],
  creator: 'Agência KWF',
  publisher: 'Agência KWF',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://agenciakwf.com.br',
  },
  openGraph: {
    title: 'Agência KWF — Sistemas de Aquisição e Receita Previsível',
    description: 'Seu marketing gera relatório de likes ou gera clientes? Instalamos sistemas de aquisição com metodologia, processo e IA. Diagnóstico em 10 minutos.',
    url: 'https://agenciakwf.com.br',
    siteName: 'Agência KWF',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://agenciakwf.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Agência KWF — Sistemas de Aquisição e Receita Previsível',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agência KWF — Sistemas de Aquisição e Receita Previsível',
    description: 'Instalamos sistemas de aquisição de clientes em empresas de serviço premium. Diagnóstico em 10 minutos.',
    images: ['https://agenciakwf.com.br/og-image.jpg'],
  },
  other: {
    'geo.region': 'BR-RJ',
    'geo.placename': 'Angra dos Reis',
  },
};
```

### Termos de Uso (`app/termos-de-uso/page.tsx`)

```typescript
export const metadata: Metadata = {
  title: 'Termos de Uso — Agência KWF',
  description: 'Termos e condições de uso do site da Agência KWF.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://agenciakwf.com.br/termos-de-uso' },
};
```

### Política de Privacidade (`app/politica-de-privacidade/page.tsx`)

```typescript
export const metadata: Metadata = {
  title: 'Política de Privacidade — Agência KWF',
  description: 'Política de privacidade e proteção de dados da Agência KWF conforme LGPD.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://agenciakwf.com.br/politica-de-privacidade' },
};
```

### Sobre (`app/sobre/page.tsx`)

```typescript
export const metadata: Metadata = {
  title: 'Sobre a Agência KWF — Quem Somos e Como Trabalhamos',
  description: 'Conheça a Agência KWF: +6 anos de experiência, +R$19M investidos em campanhas, metodologia Sistema KWF (Clareza → Sistema → Aceleração). Angra dos Reis/RJ, atendimento nacional.',
  alternates: { canonical: 'https://agenciakwf.com.br/sobre' },
  openGraph: {
    title: 'Sobre a Agência KWF',
    description: 'Instalamos sistemas de aquisição de clientes em empresas de serviço premium. Conheça nossa metodologia e resultados.',
    url: 'https://agenciakwf.com.br/sobre',
    siteName: 'Agência KWF',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://agenciakwf.com.br/og-image.jpg', width: 1200, height: 630 }],
  },
};
```

## 2.2. HTML Semântico (aplicar em TODAS as páginas)

```html
<html lang="pt-BR">
  <body>
    <header role="banner">
      <nav aria-label="Navegação principal">...</nav>
    </header>

    <main id="conteudo-principal" role="main">
      <section id="hero" aria-label="Apresentação principal">
        <h1>...</h1> <!-- ÚNICO h1 por página -->
      </section>

      <section id="problemas" aria-label="Problemas que resolvemos">
        <h2>...</h2>
        <article><!-- cada card é um article --></article>
      </section>

      <section id="resultados" aria-label="Resultados e clientes">
        <h2>...</h2>
      </section>

      <section id="como-funciona" aria-label="Como funciona o Sistema KWF">
        <h2>...</h2>
        <h3>...</h3> <!-- cada etapa -->
      </section>

      <section id="faq" aria-label="Dúvidas frequentes">
        <h2>...</h2>
      </section>

      <section id="sobre" aria-label="Sobre a Agência KWF">
        <h2>...</h2>
      </section>
    </main>

    <footer role="contentinfo">...</footer>
  </body>
</html>
```

**Regras semânticas:**
- `<h1>` único por página (headline do hero)
- `<h2>` para título de cada seção
- `<h3>` para subtítulos dentro de seções
- `<p>` para parágrafos (nunca texto solto em `<div>`)
- `<article>` para cards de conteúdo independentes
- `<ul>/<ol>` para listas (logos de clientes, features)
- `alt` text descritivo em TODAS as imagens
- `aria-label` em todas as `<section>`
- Links com texto descritivo (nunca "clique aqui" ou "saiba mais")
- CTAs como `<a>` com `role="button"` ou `<button>` conforme contexto

### Heading Hierarchy da Homepage

```
h1: Transforme seu Marketing em um Sistema de Aquisição Previsível...
  h2: Três problemas que travam o crescimento de 7 em cada 10 empresas
    h3: O balde furado
    h3: O carro sem painel
    h3: O trabalho manual
  h2: Quem já confiou na Agência KWF
  h2: Você sabe o que acontece na sua empresa enquanto você não está olhando?
  h2: O funil que transforma investimento em receita previsível
  h2: Do Pré-Diagnóstico ao Sistema de Aquisição KWF implementado
    h3: Pré-Diagnóstico
    h3: Diagnóstico Raio-X
    h3: Aceleração Contínua
  h2: Dúvidas Frequentes
  h2: Conheça a Agência KWF
```

## 2.3. JSON-LD Schema Markup

Criar `components/schema-markup.tsx` e incluir no `layout.tsx`:

```typescript
export function SchemaMarkup() {
  // 1. Organization
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://agenciakwf.com.br/#organization',
    name: 'Agência KWF',
    url: 'https://agenciakwf.com.br',
    logo: {
      '@type': 'ImageObject',
      url: 'https://agenciakwf.com.br/Logo/LOGO_COMPLETA_BRANCA.svg',
    },
    description: 'Instalamos sistemas de aquisição de clientes em empresas de serviço premium. Metodologia, processo e inteligência artificial da captação ao fechamento.',
    foundingDate: '2020',
    areaServed: { '@type': 'Country', name: 'Brasil' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Angra dos Reis',
      addressRegion: 'RJ',
      addressCountry: 'BR',
    },
    sameAs: [
      // URLs do Instagram, LinkedIn, YouTube quando existirem
    ],
    knowsAbout: [
      'Marketing Digital',
      'Sistema de Aquisição de Clientes',
      'Inteligência Artificial aplicada a Marketing',
      'Funil de Vendas',
      'Automação de Marketing',
    ],
  };

  // 2. LocalBusiness
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://agenciakwf.com.br/#business',
    name: 'Agência KWF',
    url: 'https://agenciakwf.com.br',
    description: 'Agência especializada em sistemas de aquisição de clientes e receita previsível para empresas de serviço premium.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Angra dos Reis',
      addressRegion: 'RJ',
      addressCountry: 'BR',
    },
    priceRange: '$$$',
    areaServed: { '@type': 'Country', name: 'Brasil' },
    parentOrganization: { '@id': 'https://agenciakwf.com.br/#organization' },
  };

  // 3. WebSite (com SearchAction para sitelinks)
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://agenciakwf.com.br/#website',
    name: 'Agência KWF',
    url: 'https://agenciakwf.com.br',
    description: 'Sistemas de aquisição e receita previsível para empresas de serviço premium.',
    inLanguage: 'pt-BR',
    publisher: { '@id': 'https://agenciakwf.com.br/#organization' },
  };

  // 4. Service (principal)
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Sistema de Aquisição de Clientes KWF',
    provider: { '@id': 'https://agenciakwf.com.br/#organization' },
    description: 'Sistema completo de aquisição de clientes para empresas de serviço premium — diagnóstico, instalação e operação com metodologia, processo e IA da captação ao fechamento.',
    areaServed: { '@type': 'Country', name: 'Brasil' },
    serviceType: 'Marketing Digital Integrado',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sistemas KWF',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Growth System',
            description: 'Instalação e operação do sistema de aquisição de clientes com metodologia, processo e inteligência em cada etapa.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Starter System',
            description: 'Diagnóstico completo e blueprint estratégico para instalação do sistema de aquisição.',
          },
        },
      ],
    },
  };

  // 5. FAQPage (extrair das perguntas reais do site)
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Já tive agência e não funcionou. Por que seria diferente?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Agências tradicionais entregam peças soltas — posts, anúncios, relatórios. A KWF instala um sistema completo de aquisição de clientes, da captação ao fechamento, com metodologia, processo e inteligência em cada etapa. A diferença é que você VAI saber se funciona, porque cada real é rastreado no dashboard.',
        },
      },
      {
        '@type': 'Question',
        name: 'Preciso entender de marketing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não. Você precisa entender de resultado. O dashboard mostra resultado. Nós cuidamos do marketing. Sua participação se resume a 1 call de 45 minutos por mês e aprovações rápidas.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto tempo pra ver resultado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dashboard configurado em 21 dias. Primeiros leads em 30-45 dias. ROI mensurável em 90 dias. Não é mágica, é sistema.',
        },
      },
      {
        '@type': 'Question',
        name: 'O diagnóstico tem algum custo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O pré-diagnóstico é uma análise inicial de 10 minutos para entender se faz sentido aprofundar. O Diagnóstico Raio-X completo faz parte do processo de onboarding do Growth System.',
        },
      },
      {
        '@type': 'Question',
        name: 'Funciona pra qualquer empresa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para empresas de serviço que faturam acima de R$150 mil por mês e já investem em marketing. O sistema é o mesmo, a estratégia é customizada no diagnóstico para cada setor — clínicas, escritórios, escolas, indústrias.',
        },
      },
    ],
  };

  // 6. BreadcrumbList (para páginas internas)
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agenciakwf.com.br' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
```

**IMPORTANTE:** As respostas do FAQ acima são placeholder baseadas no ICP da KWF. Substituir pelas respostas REAIS do accordion do site atual.

## 2.4. Sitemap dinâmico (`app/sitemap.ts`)

```typescript
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agenciakwf.com.br';
  const now = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/termos-de-uso`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ];
}
```

## 2.5. Robots.txt (`app/robots.ts`)

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
    ],
    sitemap: 'https://agenciakwf.com.br/sitemap.xml',
  };
}
```

---

# PARTE 3 — GEO (Generative Engine Optimization)

## 3.1. llms.txt (`public/llms.txt`)

Criar arquivo estático em `public/llms.txt`:

```markdown
# Agência KWF

> Agência de marketing digital especializada em instalar sistemas de aquisição de clientes e receita previsível para empresas de serviço premium no Brasil. Metodologia própria (Sistema KWF), inteligência artificial aplicada e processo integrado da captação ao fechamento.

## Sobre a empresa

A Agência KWF é uma integradora de sistemas de receita fundada em 2020, com sede em Angra dos Reis/RJ e atendimento nacional. Não é uma agência tradicional que entrega posts e anúncios — instala operações completas de aquisição de clientes em empresas de serviço premium que faturam entre R$150 mil e R$500 mil por mês.

## Metodologia — Sistema KWF

O Sistema KWF é uma metodologia cíclica de 3 pilares:

- **Pilar 1 — Clareza:** Diagnóstico Raio-X com 8 elementos estratégicos. Responde: onde o dinheiro está vazando, para quem vender, o que mudar.
- **Pilar 2 — Sistema:** Funil Previsível de Aquisição em 5 etapas (Aquisição → Aquecimento → Ação → Ativação → Ampliação) + Centro Operacional com IA integrada.
- **Pilar 3 — Aceleração:** Otimização contínua com dados reais, testes A/B semanais, strategy calls mensais, dashboard em tempo real.

O ciclo é contínuo: cada volta, o sistema fica mais inteligente e rentável.

## Serviços oferecidos

- **Starter System** — Diagnóstico completo + Blueprint estratégico (one-time).
- **Growth Lite** — Fundação do sistema de aquisição com operação parcial (retainer mensal).
- **Growth System** — Instalação e operação completa do sistema de aquisição (setup + retainer mensal). Oferta principal.
- **Scale System** — Operação 100% delegada com ferramentas inclusas e consultoria 1-on-1 (done-for-you).

## Público-alvo

Empresas de serviço premium (clínicas médicas, escritórios de advocacia/contabilidade/arquitetura, escolas de ensino premium, indústrias) que faturam R$150k-R$500k/mês, já investem em marketing mas não conseguem conectar esse investimento à geração de clientes.

## Resultados

Mais de R$19 milhões investidos em campanhas, mais de 36 mil vendas realizadas, mais de R$4 milhões em faturamento gerado no digital para clientes.

## Contato

- Site: https://agenciakwf.com.br
- Localização: Angra dos Reis, RJ, Brasil

## Páginas principais

- [Página principal](https://agenciakwf.com.br)
- [Sobre a Agência KWF](https://agenciakwf.com.br/sobre)
```

## 3.2. Página /sobre (`app/sobre/page.tsx`)

Criar uma página "Sobre" com conteúdo textual rico e semântico, usando heading hierarchy e parágrafos que LLMs consigam consumir facilmente.

**Conteúdo obrigatório (em texto corrido, prosa — NÃO bullets):**

1. **O que é a Agência KWF** — integradora de sistemas de receita, não agência tradicional. Fundada em 2020, 6+ anos de experiência.
2. **Localização** — Angra dos Reis, RJ. Atendimento 100% remoto, nacional.
3. **Problema que resolve** — empresas de serviço premium gastam em marketing sem saber se funciona. Marketing fragmentado, sem conexão com receita, sem previsibilidade.
4. **Metodologia** — Sistema KWF: Clareza → Sistema → Aceleração. 3 pilares cíclicos. Explicar cada pilar em 2-3 frases.
5. **Público** — empresas de serviço faturando R$150-500k/mês. Clínicas, escritórios, escolas, indústria. Problem-led, niche-proven.
6. **Diferenciais** — metodologia própria, IA aplicada (não como feature mas como infraestrutura operacional), processo integrado da captação ao fechamento, dashboard com rastreamento de cada real.
7. **Resultados** — +R$19M investidos, +36 mil vendas, +R$4M em faturamento digital.
8. **Produtos** — breve descrição do Starter, Growth Lite, Growth e Scale.

**Design:** seguir Dark Clarity v2. Pode ser uma página simples com heading hierarchy semântica e parágrafos. Incluir as métricas de resultado como destaque visual.

**Incluir na nav e no footer como link "Sobre".**

## 3.3. Conteúdo semântico para crawlers de IA

Em TODAS as seções da homepage, garantir que o conteúdo textual existe no HTML estático de forma clara. Especificamente:

- O **accordion do FAQ** deve renderizar TODAS as respostas no HTML (não esconder com JS). Usar `<details>/<summary>` nativo ou renderizar o conteúdo com `display: none` via CSS (crawlers lêem CSS hidden, mas não JS hidden). A MELHOR opção: renderizar tudo aberto no HTML, e o JS fecha ao montar.
- Os **cards de problema** devem ter o texto completo no HTML, não carregado via JS.
- O **carrossel de logos** deve ter `alt` text com o nome de cada cliente.
- As **métricas** (+R$19M, +36Mil, +R$/4M) devem estar como texto no HTML, não geradas por counter animation.

---

# PARTE 4 — TRACKING E ANALYTICS

## 4.1. Google Tag Manager (GTM)

Criar componente `components/gtm.tsx`:

```typescript
import Script from 'next/script';

const GTM_ID = 'GTM-XXXXXXX'; // SUBSTITUIR pelo ID real do GTM

export function GTMHead() {
  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `,
      }}
    />
  );
}

export function GTMBody() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
```

No `layout.tsx`:
```tsx
<head>
  <GTMHead />
</head>
<body>
  <GTMBody />
  ...
</body>
```

**NOTA:** O GTM_ID precisa ser criado no Google Tag Manager. Marcar com `// TODO: SUBSTITUIR` no código.

## 4.2. DataLayer Events (eventos de conversão)

Criar `lib/tracking.ts`:

```typescript
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}

// ===== EVENTOS ESPECÍFICOS =====

// CTA principal clicado (qualquer botão de diagnóstico)
export function trackCTAClick(ctaLocation: string, ctaText: string) {
  trackEvent('cta_click', {
    cta_location: ctaLocation, // 'hero', 'nav', 'mid_page', 'footer'
    cta_text: ctaText,
  });
}

// FAQ aberto
export function trackFAQOpen(question: string) {
  trackEvent('faq_open', {
    faq_question: question,
  });
}

// Scroll depth (seções visualizadas)
export function trackSectionView(sectionId: string) {
  trackEvent('section_view', {
    section_id: sectionId,
  });
}

// Link externo clicado (WhatsApp, redes sociais)
export function trackExternalLink(destination: string) {
  trackEvent('external_link_click', {
    link_destination: destination,
  });
}

// Carrossel de logos interagido
export function trackSocialProofView() {
  trackEvent('social_proof_view');
}
```

## 4.3. Implementar eventos nos componentes

Em cada CTA button do site, adicionar:

```tsx
// Hero CTA
<button onClick={() => trackCTAClick('hero', 'QUERO UM PRÉ-DIAGNÓSTICO')}>
  QUERO UM PRÉ-DIAGNÓSTICO
</button>

// Nav CTA
<a onClick={() => trackCTAClick('nav', 'PRÉ-DIAGNÓSTICO ESTRATÉGICO')}>
  PRÉ-DIAGNÓSTICO ESTRATÉGICO
</a>

// Mid-page CTA
<button onClick={() => trackCTAClick('mid_page', 'QUERO FAZER O DIAGNÓSTICO')}>
  QUERO FAZER O DIAGNÓSTICO
</button>

// Footer CTA
<a onClick={() => trackCTAClick('footer', 'Pré-Diagnóstico Estratégico')}>
  Pré-Diagnóstico Estratégico →
</a>
```

No accordion do FAQ:
```tsx
<button onClick={() => trackFAQOpen('Já tive agência e não funcionou...')}>
  Já tive agência e não funcionou. Por que seria diferente?
</button>
```

## 4.4. UTM Capture + Append Links

Criar `lib/utm.ts`:

```typescript
// Captura UTMs da URL atual e salva no sessionStorage
export function captureUTMs() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  const utms: Record<string, string> = {};
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) utms[key] = value;
  });

  // Salva no sessionStorage se existir algum UTM
  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem('kwf_utms', JSON.stringify(utms));
  }

  // Também captura referrer e landing page
  if (!sessionStorage.getItem('kwf_first_page')) {
    sessionStorage.setItem('kwf_first_page', window.location.href);
    sessionStorage.setItem('kwf_referrer', document.referrer || 'direct');
  }
}

// Recupera UTMs salvos
export function getStoredUTMs(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(sessionStorage.getItem('kwf_utms') || '{}');
  } catch {
    return {};
  }
}

// Append UTMs a qualquer link externo (ex: WhatsApp, formulário)
export function appendUTMsToUrl(baseUrl: string): string {
  const utms = getStoredUTMs();
  if (Object.keys(utms).length === 0) return baseUrl;

  const url = new URL(baseUrl);
  Object.entries(utms).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  // Adiciona metadados extras
  const firstPage = sessionStorage.getItem('kwf_first_page');
  const referrer = sessionStorage.getItem('kwf_referrer');
  if (firstPage) url.searchParams.set('kwf_landing', firstPage);
  if (referrer) url.searchParams.set('kwf_referrer', referrer);

  return url.toString();
}
```

Criar `components/utm-capture.tsx` (client component para rodar no mount):

```tsx
'use client';

import { useEffect } from 'react';
import { captureUTMs } from '@/lib/utm';

export function UTMCapture() {
  useEffect(() => {
    captureUTMs();
  }, []);

  return null;
}
```

Incluir `<UTMCapture />` no `layout.tsx`.

**Uso nos CTAs:** Quando o CTA direciona para WhatsApp ou formulário externo:

```tsx
import { appendUTMsToUrl } from '@/lib/utm';

// Exemplo: CTA que vai pro WhatsApp
const whatsappBase = 'https://wa.me/55XXXXXXXXXXX?text=Quero+fazer+o+pré-diagnóstico';
const whatsappUrl = appendUTMsToUrl(whatsappBase);
```

## 4.5. Scroll Depth Tracking

Criar `components/scroll-tracker.tsx` (client component):

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { trackSectionView } from '@/lib/tracking';

const TRACKED_SECTIONS = [
  'hero',
  'problemas',
  'resultados',
  'como-funciona',
  'processo',
  'cta-diagnostico',
  'faq',
  'sobre',
];

export function ScrollTracker() {
  const trackedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !trackedRef.current.has(entry.target.id)) {
            trackedRef.current.add(entry.target.id);
            trackSectionView(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    TRACKED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
```

Incluir `<ScrollTracker />` no `layout.tsx`. Cada `<section>` da homepage DEVE ter o `id` correspondente.

---

# PARTE 5 — ARQUIVOS ESTÁTICOS E CONFIG

## 5.1. next.config.ts

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Se deploy na Vercel: REMOVER output: 'export'
  // Se deploy estático (Netlify, etc): DESCOMENTAR
  // output: 'export',
  trailingSlash: false,
  images: {
    // Se Vercel: remover unoptimized
    // Se static export: descomentar
    // unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

## 5.2. Manifest (`app/manifest.ts`)

```typescript
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Agência KWF',
    short_name: 'KWF',
    description: 'Sistemas de aquisição e receita previsível para empresas de serviço premium.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F0F0F',
    theme_color: '#0F0F0F',
    icons: [
      { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
```

---

# PARTE 6 — CHECKLIST DE VALIDAÇÃO PÓS-BUILD

Executar `npm run build` e verificar TUDO:

## SEO Técnico
- [ ] `npm run build` sem erros
- [ ] View Source da homepage: TODO conteúdo textual visível (headlines, parágrafos, CTAs, FAQ respostas)
- [ ] View Source: meta tags no `<head>` (title, description, og:*, twitter:*)
- [ ] View Source: JSON-LD schemas presentes (Organization, LocalBusiness, WebSite, Service, FAQPage)
- [ ] View Source: `<html lang="pt-BR">`
- [ ] View Source: canonical tags em cada página
- [ ] `/sitemap.xml` acessível e lista todas as páginas
- [ ] `/robots.txt` acessível, permite todos crawlers e referencia sitemap
- [ ] `/llms.txt` acessível com conteúdo markdown completo
- [ ] Heading hierarchy correta (h1 único, h2 > h3, sem pulos)
- [ ] HTML semântico (main, header, footer, section com aria-label, nav, article)
- [ ] TODAS imagens com alt text descritivo
- [ ] NENHUM conteúdo com opacity: 0 no HTML estático
- [ ] FAQ: todas as respostas presentes no HTML (não escondidas por JS)
- [ ] Métricas (+R$19M etc): valores presentes como texto no HTML

## GEO
- [ ] `/llms.txt` com resumo completo da empresa em markdown
- [ ] Página `/sobre` com conteúdo textual rico e indexável
- [ ] robots.txt permite GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot
- [ ] Conteúdo da homepage legível sem JS

## Tracking
- [ ] GTM script presente no head (com placeholder ID)
- [ ] DataLayer: evento `cta_click` em todos os botões CTA
- [ ] DataLayer: evento `faq_open` em cada pergunta do FAQ
- [ ] DataLayer: evento `section_view` no scroll de cada seção
- [ ] UTM capture no carregamento da página
- [ ] UTM append nos links externos (WhatsApp, formulários)
- [ ] ScrollTracker ativo e rastreando seções

## Design e Funcionalidade
- [ ] Design visual IDÊNTICO ao site atual (cores, tipografia, layout, espaçamentos)
- [ ] Scroll animations funcionam após hydration
- [ ] Accordion do FAQ abre/fecha
- [ ] Carrossel de logos funciona
- [ ] Carrossel de fotos funciona
- [ ] Links da nav fazem scroll suave para as seções
- [ ] Links do footer funcionam
- [ ] Página 404 customizada
- [ ] Página /sobre acessível e estilizada
- [ ] Mobile responsivo funcionando

## Performance
- [ ] Font Inter via next/font (não CDN)
- [ ] Imagens com next/image ou width/height explícitos
- [ ] Hero image com `priority`
- [ ] Demais imagens com `loading="lazy"`
- [ ] Nenhum CSS/JS bloqueante
- [ ] Security headers configurados

---

# DESIGN SYSTEM — REFERÊNCIA RÁPIDA (não alterar nada)

```
Background:        #0F0F0F
Texto primário:    #F5F5F5
Texto secundário:  #A0A0A0
Gold (labels):     #CDA066 — máx 2-3 por viewport
Green (CTAs):      #139657 — hover: #0F7D49
Glass:             rgba(255,255,255,0.06) + backdrop-filter: blur(20px) + border-radius: 12px
Botões:            border-radius: 8px
Fonte:             Inter (única)
Body text:         line-height: 1.7
Cards:             border: 1px solid rgba(255,255,255,0.08)
```

---

# PARTE 7 — BLOG (infraestrutura pronta, sem conteúdo)

O blog é o motor de SEO e GEO de médio prazo. A estrutura deve estar 100% funcional — quando eu criar um arquivo `.mdx` novo, o post aparece automaticamente na listagem, no sitemap e com todos os schemas.

## 7.1. Stack técnica do blog

- **MDX** via `@next/mdx` + `next-mdx-remote` ou `contentlayer` (escolher o mais simples que funcione com App Router)
- Posts como arquivos `.mdx` dentro de `content/blog/`
- Sem CMS externo — arquivo local no repo, deploy via push
- Cada post = 1 arquivo `.mdx` com frontmatter YAML

## 7.2. Estrutura de pastas

```
content/
  blog/
    _exemplo-de-post.mdx          ← prefixo _ = draft, não publica
    
app/
  blog/
    page.tsx                       ← listagem de posts
    [slug]/
      page.tsx                     ← post individual
```

## 7.3. Frontmatter padrão de cada post

```yaml
---
title: "Título do post"
description: "Descrição para SEO e OG (máx 160 chars)"
date: "2026-04-10"
updatedAt: "2026-04-10"              # opcional
author: "Agência KWF"
category: "sistema-de-receita"       # slug da categoria
tags: ["marketing", "sistema", "roi"]
image: "/blog/slug-do-post/cover.jpg" # OG image do post (1200x630)
imageAlt: "Descrição da imagem"
published: true                       # false = draft
---
```

## 7.4. Página de listagem (`app/blog/page.tsx`)

**Metadata:**
```typescript
export const metadata: Metadata = {
  title: 'Blog — Agência KWF | Marketing, Sistemas de Receita e IA',
  description: 'Artigos sobre sistema de aquisição de clientes, receita previsível, marketing para empresas de serviço e inteligência artificial aplicada a negócios.',
  alternates: { canonical: 'https://agenciakwf.com.br/blog' },
  openGraph: {
    title: 'Blog — Agência KWF',
    description: 'Artigos sobre sistema de aquisição de clientes, receita previsível e IA aplicada.',
    url: 'https://agenciakwf.com.br/blog',
    siteName: 'Agência KWF',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://agenciakwf.com.br/og-image.jpg', width: 1200, height: 630 }],
  },
};
```

**Layout:**
- Heading: `<h1>Blog</h1>` (ou headline mais criativa no tom KWF)
- Grid de cards (2 colunas desktop, 1 mobile)
- Cada card: imagem de capa, categoria como label dourado, título como `<h2>`, descrição curta, data
- Ordenado por data (mais recente primeiro)
- Filtrar `published: true` apenas
- Design: cards glass do Dark Clarity, mesma estética do site

**Se não houver posts publicados:** mostrar um state vazio elegante tipo "Em breve: artigos sobre sistema de receita, marketing e IA." — NÃO esconder a página. Ela precisa existir e ser indexável.

## 7.5. Página de post individual (`app/blog/[slug]/page.tsx`)

**Metadata dinâmica:**
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} — Blog Agência KWF`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: `https://agenciakwf.com.br/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://agenciakwf.com.br/blog/${post.slug}`,
      siteName: 'Agência KWF',
      locale: 'pt_BR',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author],
      images: [{ url: `https://agenciakwf.com.br${post.image}`, width: 1200, height: 630, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`https://agenciakwf.com.br${post.image}`],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

**Schema JSON-LD do post** (dentro de cada page):
```typescript
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.description,
  image: `https://agenciakwf.com.br${post.image}`,
  datePublished: post.date,
  dateModified: post.updatedAt || post.date,
  author: {
    '@type': 'Organization',
    name: 'Agência KWF',
    url: 'https://agenciakwf.com.br',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Agência KWF',
    logo: {
      '@type': 'ImageObject',
      url: 'https://agenciakwf.com.br/Logo/LOGO_COMPLETA_BRANCA.svg',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://agenciakwf.com.br/blog/${post.slug}`,
  },
  inLanguage: 'pt-BR',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agenciakwf.com.br' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenciakwf.com.br/blog' },
    { '@type': 'ListItem', position: 3, name: post.title, item: `https://agenciakwf.com.br/blog/${post.slug}` },
  ],
};
```

**Layout do post:**
- Breadcrumb visual: Início > Blog > Título do post
- Categoria como label dourado no topo
- `<h1>` = título do post
- Data + tempo de leitura estimado (calcular por word count ÷ 200)
- Imagem de capa (se existir)
- Corpo do artigo renderizado do MDX
- Seção "Outros artigos" no final (3 posts mais recentes, excluindo o atual)
- CTA fixo ao final: "Quer saber onde seu marketing está vazando?" + botão diagnóstico

**Estilo do conteúdo MDX — criar `components/mdx-components.tsx`:**
```
- h2: Inter 700, 28px, #F5F5F5, margin-top 48px
- h3: Inter 600, 22px, #F5F5F5, margin-top 32px
- p: Inter 400, 17px, #A0A0A0, line-height 1.8, max-width ~720px
- a: #CDA066, underline on hover
- blockquote: borda esquerda 3px #CDA066, padding-left 20px, italic, #A0A0A0
- ul/ol: #A0A0A0, spacing entre itens
- code inline: background rgba(255,255,255,0.06), padding 2px 6px, border-radius 4px
- code block: glass card com syntax highlighting (usar tema escuro)
- img dentro do post: border-radius 8px, max-width 100%
- strong: #F5F5F5 (destaque no texto cinza)
- hr: border rgba(255,255,255,0.08)
```

## 7.6. Funções utilitárias (`lib/blog.ts`)

```typescript
// Ler todos os posts publicados do diretório content/blog/
export async function getAllPosts(): Promise<Post[]> { ... }

// Ler um post específico por slug
export async function getPostBySlug(slug: string): Promise<Post | null> { ... }

// Calcular tempo de leitura
export function getReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min de leitura`;
}

// Tipo do post
interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  published: boolean;
  content: string; // MDX raw content
  readingTime: string;
}
```

## 7.7. Atualizar Sitemap (`app/sitemap.ts`)

O sitemap deve incluir posts do blog dinamicamente:

```typescript
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://agenciakwf.com.br';
  const now = new Date().toISOString();

  // Páginas fixas
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/sobre`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/termos-de-uso`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${baseUrl}/politica-de-privacidade`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
  ];

  // Posts do blog (dinâmico)
  const posts = await getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
```

## 7.8. Atualizar llms.txt (`public/llms.txt`)

Adicionar ao final do llms.txt existente:

```markdown
## Blog

Artigos sobre sistema de aquisição de clientes, marketing para empresas de serviço, receita previsível e inteligência artificial aplicada a negócios.

- [Blog](https://agenciakwf.com.br/blog)
```

## 7.9. Atualizar navegação

- Adicionar "Blog" na nav (entre "Sobre" e "Dúvidas" ou no final)
- Adicionar "Blog" no footer na seção "Navegação"
- Link: `/blog`

## 7.10. Tracking do blog

Adicionar ao `lib/tracking.ts`:

```typescript
// Post visualizado
export function trackPostView(slug: string, title: string, category: string) {
  trackEvent('blog_post_view', {
    post_slug: slug,
    post_title: title,
    post_category: category,
  });
}

// CTA dentro do post clicado
export function trackPostCTA(slug: string, ctaText: string) {
  trackEvent('blog_post_cta_click', {
    post_slug: slug,
    cta_text: ctaText,
  });
}

// Scroll depth do post (25%, 50%, 75%, 100%)
export function trackPostScrollDepth(slug: string, depth: number) {
  trackEvent('blog_post_scroll', {
    post_slug: slug,
    scroll_depth: `${depth}%`,
  });
}
```

## 7.11. Post de exemplo (draft)

Criar `content/blog/_exemplo-de-post.mdx` como referência de estrutura:

```mdx
---
title: "Por que seu marketing não gera clientes (e o que fazer sobre isso)"
description: "A maioria das empresas de serviço gasta em marketing sem saber o retorno. Entenda por que atividades isoladas não geram previsibilidade — e o que gera."
date: "2026-04-10"
author: "Agência KWF"
category: "sistema-de-receita"
tags: ["marketing", "sistema de aquisição", "ROI", "previsibilidade"]
image: "/blog/exemplo/cover.jpg"
imageAlt: "Dashboard mostrando métricas de aquisição de clientes"
published: false
---

Conteúdo de exemplo aqui. Este post não será publicado (published: false).

## Heading de seção

Parágrafo com **destaque** e [link exemplo](#).

> Blockquote de destaque

- Item de lista
- Outro item
```

---

## CHECKLIST ADICIONAL DO BLOG

Adicionar ao checklist da Parte 6:

### Blog
- [ ] `app/blog/page.tsx` existe e renderiza (mesmo sem posts: mostra state vazio)
- [ ] `app/blog/[slug]/page.tsx` existe com generateStaticParams
- [ ] `content/blog/` diretório existe com post draft de exemplo
- [ ] Frontmatter sendo lido corretamente (title, description, date, etc.)
- [ ] Metadata dinâmica gerando title + description + OG por post
- [ ] Article Schema JSON-LD presente em posts individuais
- [ ] Breadcrumb Schema presente em posts individuais
- [ ] Sitemap inclui `/blog` e posts publicados dinamicamente
- [ ] llms.txt atualizado com seção Blog
- [ ] MDX components estilizados seguindo Dark Clarity (h2, h3, p, blockquote, code, etc.)
- [ ] Link "Blog" presente na nav e footer
- [ ] CTA de diagnóstico no final de cada post
- [ ] Tempo de leitura calculado e exibido
- [ ] Tracking: blog_post_view, blog_post_cta_click, blog_post_scroll
- [ ] Posts com `published: false` NÃO aparecem na listagem nem no sitemap
- [ ] Criar novo post = criar arquivo .mdx + push = publicado automaticamente

---

# O QUE NÃO FAZER

- NÃO mudar nenhuma copy, headline ou texto existente
- NÃO mudar cores, espaçamentos ou layout da homepage
- NÃO usar getServerSideProps ou server actions — tudo é SSG
- NÃO remover animações — adaptar para SSG + hydration
- NÃO instalar analytics scripts inline (tudo via GTM)
- NÃO hardcodar IDs de tracking (usar variáveis/constantes com TODO)
- NÃO criar posts de blog reais — só a infraestrutura + post draft de exemplo
- NÃO adicionar CMS externo ao blog — são arquivos .mdx locais no repo
