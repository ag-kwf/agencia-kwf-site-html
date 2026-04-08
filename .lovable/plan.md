

## Ajustes no Funil Borboleta — Padronizar formas + Inverter cores

### Problemas atuais
- As formas intermediárias (Aquecimento/Ativação) e a central (Ação) têm formatos irregulares com pontas internas (losango) que ficam estranhos
- As formas das pontas (Aquisição/Ampliação) são pequenas demais em relação ao centro
- Cores: atualmente verde nas pontas e dourado no centro — inverter

### Alterações no `src/components/ButterflyFunnel.tsx`

**1. Redesenhar os SVG paths com proporções corretas**

Novo layout simétrico com formas consistentes:
- **Aquisição / Ampliação** (pontas): chevrons grandes, altura total (y: 10 → 250), largura ~220px
- **Aquecimento / Ativação** (intermediários): trapezoides padronizados, mesma forma espelhada, altura reduzida proporcionalmente (y: 45 → 215)
- **Ação** (centro): retângulo estreito/losango compacto, bem definido (y: 75 → 185)

Todas as formas terão bordas retas e limpas, sem pontas internas irregulares nos trapezoides.

**2. Inverter as cores**

- Fases 1, 2, 4, 5 (Aquisição, Aquecimento, Ativação, Ampliação): **Dourado (#CDA066)**
- Fase 3 (Ação - centro): **Verde (#139657)** — destaque especial

**3. Reposicionar ícones e labels**

Ajustar as posições X dos ícones e labels para o centro de cada nova forma.

