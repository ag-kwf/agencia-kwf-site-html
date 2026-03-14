

# Agência KWF — Landing Page Institucional

## Visão Geral
Landing page institucional completa para a Agência KWF, seguindo rigorosamente o design system dark/glass com cores #0F0F0F, dourado #CDA066 e verde #139657. Fonte Inter, glassmorphism cards, e layout premium estilo Linear/Stripe.

## Estrutura da Página (11 seções)

### 1. Navbar
- Sticky, blur backdrop, altura 68px
- Logo "KWF | SISTEMAS DE RECEITA" + links internos + CTA verde

### 2. Hero
- Label dourado + H1 com "receita previsível" em dourado
- Blockquote com borda dourada à esquerda
- Dois botões: CTA verde + Ghost branco

### 3. Três Problemas (fundo alternado)
- 3 glass cards: "O balde furado" 🪣, "O carro sem painel" 🚗, "O trabalho manual" ⚙️
- Barra dourada no topo de cada card, frase resultado em dourado

### 4. Antes vs Depois
- Dois cards lado a lado: vermelho (COMO É HOJE) vs verde (COM O SISTEMA KWF)
- 7 itens cada com ícones ✕/✓ coloridos
- CTA centralizado abaixo

### 5. Como Funciona (fundo alternado)
- 3 steps verticais com círculos numerados dourados e linha conectora
- Diagnóstico Raio-X → Instalação → Aceleração Contínua

### 6. Resultados
- 4 cards de métricas: 347 leads, R$18 CPL, 4.2% conversão, 8.4x ROI
- Números em dourado, variações em verde, disclaimer abaixo

### 7. Prova Social (fundo alternado)
- Grid 4 logos placeholder + 4 métricas da agência
- 2 depoimentos com aspas, nomes e cargos

### 8. Diagnóstico — Formulário
- Glass card com 5 campos (nome, WhatsApp, empresa, faturamento, textarea)
- CTA full-width verde, micro-copy abaixo

### 9. Sobre (fundo alternado)
- 2 colunas: texto à esquerda + grid de fotos placeholder à direita

### 10. FAQ
- 5 perguntas em glass cards expandidos, max-width 720px

### 11. Footer
- Logo + tagline + navegação + link verde diagnóstico
- Copyright 2026

## Detalhes Técnicos
- Instalar `framer-motion` para animações sutis de entrada
- Import Inter do Google Fonts no index.html
- Smooth scroll behavior no CSS
- Formulário redireciona para WhatsApp Business (placeholder URL)
- Mobile: coluna única, nav simplificada com ícone menu
- Componente único `LandingPage.tsx` substituindo o Index atual

