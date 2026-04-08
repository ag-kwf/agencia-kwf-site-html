

## Funil Borboleta Horizontal — Substituir vídeo na seção Resultados

### Conceito visual

O funil borboleta fica na horizontal: começa largo à esquerda, afunila no centro e expande à direita. As 5 fases ficam lado a lado, como um diamante/ampulheta deitado.

```text
┌──┐                              ┌──┐
│  │──┐                      ┌──│  │
│ AQ │  ──┐            ┌──  │ AM │
│  │  │AQC│──┐    ┌──│ATV│  │  │
│  │  │   │AÇÃ│──│   │  │  │
│  │  │   │──┘    └──│   │  │  │
│  │  ──┘            └──  │  │
│  │──┘                      └──│  │
└──┘                              └──┘
 AQ    AQC    AÇÃO    ATV     AMP
```

Fases da esquerda para a direita:
1. **Aquisição** — largo
2. **Aquecimento** — médio
3. **Ação** — estreito (centro)
4. **Ativação** — médio
5. **Ampliação** — largo

### Como funciona a animação

- Ao scrollar pela seção, cada fase é destacada sequencialmente da esquerda para a direita usando `whileInView` do Framer Motion com delays escalonados
- Fase ativa: gradiente dourado, glow, escala levemente maior, label branco
- Fase inativa: cor neutra (`rgba(255,255,255,0.08)`), opacidade reduzida
- No mobile: o funil fica em scroll horizontal ou empilha verticalmente (a decidir pelo espaço)

### Arquivos

**Novo:** `src/components/ButterflyFunnel.tsx`
- 5 segmentos usando `clip-path` polygon para criar o formato borboleta horizontal
- Cada segmento é um `motion.div` com animação `whileInView` + delay incremental (0s, 0.3s, 0.6s, 0.9s, 1.2s)
- Ícones opcionais por fase (Target, Flame, Zap, Rocket, Megaphone)
- Labels abaixo de cada segmento
- Responsivo: no mobile, segmentos ficam menores ou com scroll horizontal

**Editado:** `src/components/sections/Results.tsx`
- Remove o `<video>` e `GlassCard`
- Insere `<ButterflyFunnel />`
- Atualiza headline/sub para contexto do funil

### Estilo
- Fase inativa: `rgba(255,255,255,0.08)`, borda `rgba(255,255,255,0.1)`
- Fase ativa: gradiente gold, `boxShadow` glow dourado
- Consistente com design dark/premium existente

