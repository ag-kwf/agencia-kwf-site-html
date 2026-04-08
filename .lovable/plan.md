

## Hero: Altura maior (desktop/tablet) + Background animado com grid sutil

### Arquivo: `src/components/sections/Hero.tsx`

### 1. Aumentar altura apenas em desktop/tablet

- Manter padding mobile como está: `pt-[88px] pb-8`
- Desktop/tablet: aumentar para `md:pt-[130px] md:pb-20 md:min-h-[80vh]`
- Mobile fica inalterado

### 2. Background animado com orbes flutuantes

Dois `motion.div` posicionados em `absolute` com `pointer-events-none`:

- **Orbe verde** (direita superior): `bg-primary/15`, `blur-[120px]`, animação flutuante lenta (y sobe/desce, scale pulsa, duração ~10s, loop infinito)
- **Orbe dourado** (esquerda inferior): `bg-gold/10`, `blur-[100px]`, mesma técnica com timing diferente (~12s)

### 3. Textura de grade sutil (grid pattern)

Adicionar um `div` com background de grid usando CSS repeating pattern:

```css
background-image: 
  linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
background-size: 40px 40px;
```

Posicionado em `absolute inset-0` com opacidade baixa (~0.5), cria uma textura de quadriculado quase imperceptível que adiciona profundidade sem poluir.

### Estrutura final

```text
<section relative overflow-hidden (md:min-h-[80vh])>
  ├── div.absolute (grid pattern sutil)
  ├── motion.div (orbe verde, flutuando)
  ├── motion.div (orbe dourado, flutuando)
  └── div.relative (conteúdo existente)
</section>
```

Todas as camadas decorativas ficam atrás do conteúdo com `z-0` e `pointer-events-none`.

