

## Ajustes na Hero: Reduzir imagem + Adicionar background

### Alterações no arquivo `src/pages/Index.tsx`

**1. Reduzir imagem em 20%**
- Linha 310: Trocar `max-w-[500px]` por `max-w-[400px]`

**2. Adicionar background na seção Hero para profundidade**
- Linha 266: Adicionar classes/estilos de background na `<section>` com:
  - Gradiente radial sutil verde/dourado no centro (baixa opacidade)
  - Um glow difuso atrás da área de conteúdo
  - Estilo: `background: radial-gradient(ellipse at 60% 50%, rgba(19,150,87,0.08) 0%, transparent 60%), radial-gradient(ellipse at 30% 40%, rgba(198,165,78,0.06) 0%, transparent 50%)`
  - Posição `relative` para poder adicionar pseudo-elementos se necessário

Isso cria uma atmosfera de profundidade sem poluir visualmente, mantendo o estilo dark/premium da página.

