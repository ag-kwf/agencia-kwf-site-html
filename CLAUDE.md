# CLAUDE.md — Agência KWF Site

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · MDX (next-mdx-remote) · shadcn/ui

Static export (`output: 'export'`) hospedado em cPanel. Deploy via GitHub Actions → branch `deploy` → webhook PHP.

---

## Estrutura de Diretórios

```
app/
  (marketing)/          ← Route group: páginas institucionais
    diagnostico/        → agenciakwf.com.br/diagnostico
    sobre/              → agenciakwf.com.br/sobre
  (blog)/               ← Route group: blog
    blog/               → agenciakwf.com.br/blog
      [slug]/           → agenciakwf.com.br/blog/[slug]
  (legal)/              ← Route group: páginas legais
    politica-de-privacidade/
    termos-de-uso/
  layout.tsx            ← Layout raiz (GTM, Schema, Navbar, Footer)
  page.tsx              ← Redirect / → /diagnostico
  sitemap.ts            ← Sitemap dinâmico (inclui posts do blog)
  not-found.tsx

components/
  layout/               ← Navbar.tsx, Footer.tsx (aparecem em todas as páginas)
  sections/
    diagnostico/        ← Seções da página /diagnostico
    [nova-pagina]/      ← Seções de uma nova página ficam aqui
  ui/                   ← Primitivos reutilizáveis (kebab-case)
  providers/            ← Analytics, SEO, tracking (GTM, schema, etc.)

types/
  blog.ts               ← Interface Post
  index.ts              ← Re-exporta todos os tipos

lib/
  blog.ts               ← getAllPosts(), getPostBySlug(), getReadingTime()
  animations.ts         ← Variantes Framer Motion reutilizáveis
  tracking.ts           ← Funções GTM (trackCTAClick, trackEvent, etc.)
  utils.ts              ← cn() helper
  utm.ts                ← Captura/leitura de UTMs
  clientLogos.ts        ← Array de logos de clientes

content/
  blog/                 ← Artigos MDX (published: true para publicar)
    _exemplo.mdx        ← Prefixo _ = rascunho/ignorado pelo loader

public/
  images/
    blog/               ← Imagens dos artigos (formato: /images/blog/slug.webp)
    logos/              ← Logos de clientes
    photos/             ← Fotos da agência
  llms.txt              ← Instruções para IAs (atualizar ao publicar artigo)
  robots.txt
  .htaccess
```

---

## Convenções de Nomeação

| Local | Convenção | Exemplo |
|-------|-----------|---------|
| `components/ui/` | kebab-case | `magnetic-button.tsx` |
| `components/layout/` | PascalCase | `Navbar.tsx` |
| `components/sections/[page]/` | PascalCase | `Hero.tsx` |
| `components/providers/` | kebab-case | `schema-markup.tsx` |
| `app/` routes | kebab-case | `politica-de-privacidade/` |
| `content/blog/` | kebab-case | `marketing-para-negocios-locais.mdx` |
| Exports de componentes | PascalCase | `export function Hero()` |

---

## Como Adicionar uma Nova Página

1. **Criar a rota** em `app/(marketing)/[slug]/page.tsx` com metadata completo:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Título da Página — Agência KWF',
  description: 'Descrição SEO (máx 160 caracteres).',
  alternates: { canonical: 'https://agenciakwf.com.br/[slug]' },
  openGraph: {
    title: 'Título da Página',
    description: 'Descrição OG.',
    url: 'https://agenciakwf.com.br/[slug]',
    siteName: 'Agência KWF',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://agenciakwf.com.br/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function NomeDaPaginaPage() {
  return (
    <main role="main">
      {/* seções */}
    </main>
  );
}
```

2. **Criar seções** em `components/sections/[slug]/`:
   - Um arquivo por seção: `Hero.tsx`, `Features.tsx`, etc.
   - Criar `index.ts` com barrel exports

3. **Adicionar ao sitemap** em `app/sitemap.ts`:

```ts
{ url: `${BASE_URL}/[slug]`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
```

---

## Como Adicionar um Artigo de Blog

1. **Criar o arquivo** `content/blog/[slug-do-artigo].mdx`

2. **Frontmatter obrigatório:**

```yaml
---
title: "Título do artigo (frase natural, inclui keyword principal)"
description: "Descrição SEO — resposta direta à pergunta do artigo (máx 160 chars)"
date: "YYYY-MM-DD"
author: "Agência KWF"
category: "Nome da Categoria"
tags: ["keyword principal", "keyword secundária", "tag3"]
image: "/images/blog/slug-do-artigo.webp"
imageAlt: "Descrição acessível da imagem de capa"
published: true
---
```

3. **Estrutura de conteúdo SEO+GEO:**
   - **Parágrafo 1:** resposta direta e completa (answer-first — IAs indexam o primeiro parágrafo)
   - `## Por que X?` — expandir a resposta
   - `## Como fazer X?` — seção prática
   - `## Erros comuns / O que evitar`
   - `## Perguntas frequentes` — H3 como perguntas reais de busca
   - CTA final linkando para `/diagnostico`

4. **Após publicar**, adicionar link em `public/llms.txt` na seção "Blog"

5. O sitemap é atualizado automaticamente no próximo build.

---

## Barrel Exports

Cada diretório de componentes tem um `index.ts`. Use sempre o barrel ao importar:

```tsx
// ✓ correto
import { Hero, FAQ, DiagnosticForm } from "@/components/sections/diagnostico";
import { MagneticButton, AnimatedCounter } from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";
import { GTMHead, SchemaMarkup } from "@/components/providers";
import type { Post } from "@/types";

// ✗ evitar (import direto de arquivo)
import { Hero } from "@/components/sections/diagnostico/Hero";
```

---

## Cores e Tokens de Design

| Token | Valor | Uso |
|-------|-------|-----|
| `text-gold` | `hsl(var(--gold))` | Destaques, CTAs, categorias |
| `text-foreground` | branco | Títulos, texto primário |
| `text-muted-foreground` | cinza | Corpo de texto, meta |
| `bg-background` | `#0F0F0F` | Fundo geral |
| `border-white/10` | branco 10% opacidade | Separadores |
| Glass card | `background: rgba(255,255,255,0.06)` + `border: rgba(255,255,255,0.08)` | Cards, containers |

---

## Padrão de Tipografia nas Páginas

```tsx
// Título H1 de página
<h1 className="font-bold leading-[1.1] tracking-[-0.03em] text-foreground"
    style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}>

// Subtítulo de seção (H2)
<h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">

// Corpo de texto
<p className="text-muted-foreground text-[15px] leading-[1.8]">

// Tag de categoria (acima de título)
<span className="inline-block text-gold text-[11px] font-semibold uppercase tracking-[0.1em] mb-3">
```

---

## Comandos Úteis

```bash
npm run dev      # servidor local
npm run build    # build estático → /out
```

O deploy é automático: push para `main` → GitHub Actions → build → deploy no cPanel.
