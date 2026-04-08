

## Performance: de 61% para 90%+ no Mobile

### Diagnóstico

O audit mostra que a **versão publicada** ainda serve os assets antigos (`.png`). As mudanças para `.webp` e font-loading assíncrono já estão no código mas **não foram publicadas**. Isso sozinho resolve vários pontos. Mas há correções adicionais necessárias:

| Problema | Impacto estimado | Solução |
|---|---|---|
| Imagens PNG (não WebP) no build publicado | ~570 KiB | Republicar (já corrigido no código) |
| LCP image não descobrível no HTML | ~800ms | Mover hero-chip para `/public` + preload |
| CLS 0.209 (Problems section) | 0.209 score | Não lazy-load Problems + dimensões explícitas |
| Render-blocking fonts | ~640ms | Já corrigido, precisa publicar |
| Unused JS (framer-motion) | ~59 KiB | Usar `LazyMotion` + `domAnimation` |
| Imagens sem width/height | CLS | Adicionar dimensões nas imagens do Problems |
| Cache headers | 886 KiB | Infraestrutura Lovable — não resolvível via código |
| Redirect 780ms | 780ms | DNS/domínio — não resolvível via código |

### Mudanças no código

**1. Mover hero-chip.webp para `/public` e preload no HTML**

O Lighthouse diz que o LCP image "is not discoverable in initial document". Isso acontece porque o import via JS (`import heroChip from ...`) só é resolvido depois do JS carregar. Solução: copiar `hero-chip.webp` para `public/`, referenciá-lo como `/hero-chip.webp`, e adicionar `<link rel="preload">` no `index.html`.

- `index.html`: adicionar `<link rel="preload" as="image" type="image/webp" href="/hero-chip.webp">`
- `Hero.tsx`: mudar `src` para `"/hero-chip.webp"` (string fixa, sem import)

**2. Remover lazy-load do Problems (causa CLS)**

O CLS de 0.209 vem da seção Problems aparecendo e empurrando conteúdo. Como está logo abaixo do fold, não deve ser lazy-loaded.

- `Index.tsx`: importar `Problems` diretamente (não lazy), mantendo os demais lazy

**3. Dimensões explícitas nas imagens do Problems**

- `Problems.tsx`: adicionar `width={600} height={400}` nas `<img>` dos cards

**4. Usar LazyMotion para reduzir JS não utilizado**

Substituir imports globais de `framer-motion` por `LazyMotion` + `domAnimation` no entry point, reduzindo ~22KB de código não usado.

- `Index.tsx`: envolver com `<LazyMotion features={domAnimation}>` 
- Componentes above-the-fold (Hero, Navbar): usar `m` em vez de `motion`

**5. Remover animação fade-in do wrapper principal**

O `motion.div` com `initial={{ opacity: 0 }}` no `Index.tsx` atrasa o FCP — o conteúdo começa invisível por 400ms.

- `Index.tsx`: trocar `motion.div` por `div` simples

### O que NÃO pode ser corrigido via código
- **Redirect 780ms**: configuração de domínio/DNS
- **Cache headers**: Lovable hosting não processa `_headers`
- **Forced reflow**: interno do framer-motion, impacto mínimo (32ms)

### Estimativa de ganho
- FCP: 3.5s → ~2.0s (font async + remover fade-in)
- LCP: 5.8s → ~3.0s (preload hero image + WebP publicado)
- CLS: 0.209 → ~0.05 (Problems não-lazy + dimensões)
- Unused JS: -22KB

Combinado, deve levar o score de **61 → 85-92** no mobile.

