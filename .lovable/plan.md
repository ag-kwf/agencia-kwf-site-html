

## Plano: Background diferenciado na seção Diagnóstico

Combinar **partículas animadas douradas** flutuando no fundo com um **container glassmorphism destacado**, criando uma seção visualmente única na página.

---

### O que será feito

1. **Container Glassmorphism destacado**
   - Envolver todo o conteúdo da seção em um card com `backdrop-blur`, borda dourada semi-transparente e fundo escuro diferenciado (`rgba(205,160,102,0.04)`)
   - Borda com glow dourado sutil via `box-shadow`

2. **Partículas animadas douradas**
   - Criar um componente `FloatingParticles` com ~15-20 pequenos círculos dourados (`#CDA066`) de tamanhos variados (2-6px)
   - Animar com CSS `@keyframes` (float vertical + horizontal suave, opacidade pulsante)
   - Posicionadas em `absolute` atrás do conteúdo, dentro da seção
   - Sem dependência de bibliotecas externas (CSS puro para performance)

3. **Gradiente de fundo da seção**
   - Adicionar um gradiente radial escuro com toque dourado no centro para dar profundidade visual à seção inteira

---

### Arquivos modificados

- **`src/pages/Index.tsx`** — Atualizar a seção `#diagnostico` com o novo background, partículas e container glass
- **`src/index.css`** — Adicionar keyframes das partículas (`float-particle`)

---

### Detalhes técnicos

- As partículas serão geradas via `Array.from()` com posições e delays aleatórios, renderizadas como `<div>` com `position: absolute` e `pointer-events: none`
- Keyframes CSS com `translateY` + `translateX` + `opacity` para movimento orgânico
- O container glass terá `backdrop-filter: blur(16px)`, borda `rgba(205,160,102,0.2)` e `box-shadow: 0 0 40px rgba(205,160,102,0.08)`
- Overflow hidden na seção para conter as partículas

