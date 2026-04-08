

## Redesign do Funil Borboleta — Estilo Gravata-Borboleta (Bowtie)

### Problema atual
O funil atual usa clip-paths simples que criam formas trapezoidais desconectadas e sem impacto visual. O modelo de referência mostra um formato de **gravata-borboleta (bowtie)** muito mais elegante e profissional.

### Novo design baseado na referência

O funil será redesenhado usando **SVG** em vez de clip-paths CSS, para ter controle total sobre o formato. A estrutura visual será:

```text
 ┌─────────┐  ┌─────┐  ╔═╗  ┌─────┐  ┌─────────┐
 │         ├──┤     ├──╢ ╠──┤     ├──┤         │
 │ AQUIS.  │  │AQUEC│  ║A║  │ATIV.│  │ AMPLI.  │
 │         ├──┤     ├──╢ ╠──┤     ├──┤         │
 └─────────┘  └─────┘  ╚═╝  └─────┘  └─────────┘
```

- **Aquisição** e **Ampliação**: grandes retângulos com borda arredondada e seta apontando para o centro
- **Aquecimento** e **Ativação**: trapezoides médios convergindo/divergindo
- **Ação**: forma estreita/estrela no centro, ponto focal

### Adaptação à identidade visual

- Fundo escuro (#0F0F0F) com bordas douradas (#CDA066) e verde (#139657)
- Cada fase terá borda com gradiente (verde para o lado esquerdo, dourado para o centro, transição para roxo/magenta no lado direito adaptado para verde/dourado da marca)
- Na referência há cores variadas (ciano, verde, laranja, rosa, roxo) — adaptaremos para um gradiente **verde → dourado** da esquerda para a direita, mantendo a identidade KWF
- Glow sutil nas bordas quando a fase está ativa
- Labels em uppercase, tracking largo, cor dourada quando ativo

### Implementação técnica

**Arquivo:** `src/components/ButterflyFunnel.tsx` — reescrita completa

1. **SVG inline** com 5 formas de path desenhadas para criar o formato bowtie:
   - Formas externas (Aquisição/Ampliação): retângulos grandes com borda chevron
   - Formas intermediárias (Aquecimento/Ativação): trapezoides menores
   - Forma central (Ação): losango/estrela compacta

2. **Animação scroll-triggered** mantida com `useInView` e delays escalonados (0.3s por fase)

3. **Cada fase** terá:
   - Stroke animado (de transparente para dourado/verde)
   - Fill com gradiente sutil quando ativo
   - Label posicionado dentro ou abaixo da forma
   - Ícone Lucide centralizado na forma

4. **Responsivo**: no mobile, SVG escala proporcionalmente com `viewBox`; sem necessidade de scroll horizontal

### Paleta de cores das bordas (gradiente da marca)
- Fase 1 (Aquisição): verde (#139657)
- Fase 2 (Aquecimento): verde→dourado
- Fase 3 (Ação): dourado (#CDA066) com glow
- Fase 4 (Ativação): dourado→verde
- Fase 5 (Ampliação): verde (#139657)

