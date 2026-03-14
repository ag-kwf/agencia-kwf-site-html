import { useState, FormEvent, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

/* ─── NAVBAR ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Resultados", href: "#resultados" },
  { label: "Sobre", href: "#sobre" },
  { label: "Dúvidas", href: "#faq" }];


  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[60px] md:h-[68px] flex items-center"
      style={{
        background: "rgba(15,15,15,0.97)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)"
      }}>
      
      <div className="w-full max-w-[1100px] mx-auto px-5 md:px-10 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 shrink-0">
          <span className="text-foreground font-bold text-lg tracking-tight">KWF</span>
          <span className="text-muted-foreground text-[11px] font-medium uppercase tracking-[0.14em] hidden sm:inline">
            | Sistemas de Receita
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) =>
          <a key={l.href} href={l.href} className="text-muted-foreground text-sm hover:text-foreground transition-colors">
              {l.label}
            </a>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#diagnostico"
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-5 py-2.5 hover:bg-green-hover transition-all">
            
            Pré-Diagnóstico Estratégico
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open &&
      <div
        className="absolute top-[60px] md:top-[68px] left-0 right-0 md:hidden flex flex-col gap-1 p-4"
        style={{ background: "rgba(15,15,15,0.98)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        
          {links.map((l) =>
        <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground text-sm py-3 px-2 hover:text-foreground transition-colors">
              {l.label}
            </a>
        )}
          <a
          href="#diagnostico"
          onClick={() => setOpen(false)}
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-5 py-3 hover:bg-green-hover transition-all">
          
            Pré-Diagnóstico Estratégico
          </a>
        </div>
      }
    </nav>);

}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="pt-[88px] md:pt-[100px] pb-8 md:pb-12 px-5 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}>
        
        {/* Left: text content */}
        <div className="w-full md:w-1/2 order-1 text-left">
          <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3">
            Sistema de aquisição e receita previsível
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-4 text-2xl"
            style={{ fontSize: "clamp(26px, 4vw, 44px)", textWrap: "balance" }}>
            
            Transforme seu marketing em um sistema de aquisição e{" "}
            <span className="text-gold">receita previsível</span>{" "}
            com metodologia, processo e <span className="text-gold">inteligência</span> em cada etapa
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-[14px] leading-[1.7] mb-6 md:text-sm"
            style={{ textWrap: "balance" }}>
            
            O que custa caro não é investir em marketing, é crescer sem sistema, sem clareza e sem saber onde o dinheiro está vazando.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <a
              href="#diagnostico"
              className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-7 py-3.5 hover:bg-green-hover transition-all">
              
              Quero um Pré-diagnóstico
            </a>
          </motion.div>
        </div>

        {/* Right: image placeholder */}
        <motion.div variants={fadeUp} className="w-full md:w-1/2 order-2">
          <GlassCard className="h-[220px] md:h-[360px] flex items-center justify-center">
            {/* TODO: substituir por imagem real */}
            <span className="text-muted-foreground text-xs opacity-40">Imagem Hero</span>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>);

}

/* ─── GLASS CARD ─── */
function GlassCard({ children, className = "", hoverGold = false }: {children: React.ReactNode;className?: string;hoverGold?: boolean;}) {
  return (
    <div
      className={`rounded-xl p-5 md:p-6 transition-all duration-300 ${className}`}
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.10)";
        e.currentTarget.style.borderColor = hoverGold ? "rgba(205,160,102,0.30)" : "rgba(255,255,255,0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}>
      
      {children}
    </div>);

}

/* ─── PRA QUEM É (PROBLEMAS) ─── */
function Problems() {
  const cards = [
  {
    title: "O balde furado",
    body: "Você atrai lead, mas perde no caminho. Atendimento demorado, follow-up esquecido, proposta que some. O funil vaza antes de chegar no fechamento.",
    result: "→ Resultado: esforço alto, fechamento baixo."
  },
  {
    title: "O carro sem painel",
    body: "Sem metas claras, sem KPIs, sem dashboard. Você dirige no escuro. Não sabe se está acelerando, freando ou parado.",
    result: "→ Resultado: decisões no achismo, mês a mês."
  },
  {
    title: "O trabalho manual",
    body: "Follow-up na mão, CRM preenchido com atraso, lead esperando resposta. Tudo depende de gente, e gente falha.",
    result: "→ Resultado: lead esfria, venda perde, concorrente ganha."
  }];


  return (
    <section className="py-8 md:py-12 px-5 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}>
        
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3 text-center">
          Caso se identifique, você está no lugar certo
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.15] tracking-[-0.02em] text-foreground mb-8 md:mb-10 text-center max-w-[700px] mx-auto"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}>
          
          Três problemas que <span className="text-gold">travam o crescimento</span> de 7 em cada 10 empresas.
        </motion.h2>

        <div className="space-y-4">
          {cards.map((c, i) => {
            const isReversed = i % 2 === 1;
            return (
              <motion.div key={c.title} variants={fadeUp}>
                <GlassCard hoverGold>
                  <div className={`flex flex-col md:flex-row gap-5 items-center ${isReversed ? "md:flex-row-reverse" : ""}`}>
                    <div className="w-full md:w-1/2">
                      <div className="w-7 h-0.5 bg-gold rounded mb-3" />
                      <h3 className="text-foreground text-base md:text-lg font-bold tracking-[-0.01em] mb-2">{c.title}</h3>
                      <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-2">{c.body}</p>
                      <p className="text-gold text-xs">{c.result}</p>
                    </div>
                    <div className="w-full md:w-1/2">
                      <div
                        className="rounded-lg h-[140px] md:h-[180px] flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        
                        <span className="text-muted-foreground text-xs opacity-40">Imagem</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>);

          })}
        </div>
      </motion.div>
    </section>);

}

/* ─── CARROSSEL DE LOGOS ─── */
function LogoCarousel() {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = (ref: React.RefObject<HTMLDivElement | null>, speed: number) => {
      let pos = 0;
      const el = ref.current;
      if (!el) return;
      const tick = () => {
        pos += speed;
        if (pos >= el.scrollWidth / 2) pos = 0;
        el.scrollLeft = pos;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    animate(scrollRef1, 0.5);
    animate(scrollRef2, 0.4);
  }, []);

  const logos = Array.from({ length: 8 }, (_, i) => i + 1);

  const renderRow = (ref: React.RefObject<HTMLDivElement | null>) =>
  <div ref={ref} className="flex overflow-hidden gap-[12px] px-0 mx-[40px]" style={{ scrollbarWidth: "none" }}>
      {[...logos, ...logos].map((n, idx) =>
    <div
      key={idx}
      className="shrink-0 w-[80px] h-[80px] md:w-[90px] md:h-[90px] rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}>
      
          <span className="text-muted-foreground text-[9px] opacity-40">Logo {n}</span>
        </div>
    )}
    </div>;


  return (
    <div className="space-y-3">
      {renderRow(scrollRef1)}
      {renderRow(scrollRef2)}
    </div>);

}

/* ─── PROVA SOCIAL ─── */
function SocialProof() {
  return (
    <section className="py-8 md:py-12 px-5 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}>
        
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2 text-center"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}>
          
          Quem já confiou na <span className="text-gold">Agência KWF</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] text-center mb-8">
          Atendemos grandes Empresas Tradicionais e do Digital
        </motion.p>

        <motion.div variants={fadeUp} className="mb-8">
          <LogoCarousel />
        </motion.div>

        <motion.div variants={fadeUp} className="text-center">
          <a
            href="#diagnostico"
            className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-8 py-3.5 hover:bg-green-hover transition-all">
            
            Quero meu pré-diagnóstico
          </a>
        </motion.div>
      </motion.div>
    </section>);

}

/* ─── ANTES VS DEPOIS ─── */
function BeforeAfter() {
  const before = [
  "Investe em ads sem saber o retorno",
  "Relatórios soltos que não trazem inteligência ou identificam gargalos",
  "Lead chegam perdidos e ficam parados",
  "Operação Manual com nenhum controle",
  "Resultado depende de sorte e indicação",
  "Paga R$25–35k em equipe pra fazer o básico"];

  const after = [
  "Dashboard com dados reais de retorno",
  "Mapeamento do fluxo de aquisição, sem perda de lead",
  "IA responde lead em segundos e qualifica o lead",
  "Implantação de IA e Automação nos processos",
  "Funil com previsibilidade de retorno",
  "Operação de aquisição completa por uma fração do custo"];


  return (
    <section className="py-8 md:py-12 px-5 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[1000px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}>
        
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground text-center mb-2"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}>
          
          Enquanto você ainda sofre para <span className="text-gold">adivinhar</span>...
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] text-center mb-8"
          style={{ textWrap: "balance" }}>
          
          o faturamento que poderia estar no seu bolso está escorrendo.
        </motion.p>

        <div className="grid md:grid-cols-[4fr_5fr] gap-4">
          <motion.div
            variants={fadeUp}
            className="rounded-xl p-5 md:p-6"
            style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}>
            
            <span
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1 rounded-md mb-4"
              style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444" }}>
              
              Como é hoje
            </span>
            <ul className="space-y-2.5">
              {before.map((t) =>
              <li key={t} className="flex items-start gap-2.5 text-muted-foreground text-[13px] md:text-[14px] leading-[1.6]">
                  <span className="text-destructive mt-0.5 shrink-0">✕</span>
                  {t}
                </li>
              )}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-xl p-5 md:p-6"
            style={{ background: "rgba(19,150,87,0.06)", border: "1px solid rgba(19,150,87,0.22)" }}>
            
            <span
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1 rounded-md mb-4"
              style={{ background: "rgba(19,150,87,0.14)", color: "#139657" }}>
              
              Com o sistema de aquisição da KWF
            </span>
            <ul className="space-y-2.5">
              {after.map((t) =>
              <li key={t} className="flex items-start gap-2.5 text-foreground text-[13px] md:text-[14px] leading-[1.6]">
                  <span className="text-accent mt-0.5 shrink-0">✓</span>
                  {t}
                </li>
              )}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>);

}

/* ─── RESULTADOS / DASHBOARD ─── */
function Results() {
  return (
    <section id="resultados" className="py-8 md:py-12 px-5 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}>
        
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3 text-center">
          Resultados reais
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2 text-center"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}>
          
          Pare de ficar se perguntando <span className="text-gold">"isso tá funcionando?"</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-8 text-center" style={{ textWrap: "balance" }}>
          Abre o dashboard. Veja todo o fluxo. Tome decisões acertadas.
        </motion.p>

        <motion.div variants={fadeUp}>
          <GlassCard className="max-w-[900px] mx-auto">
            <div
              className="rounded-lg h-[200px] md:h-[380px] flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              
              <span className="text-muted-foreground text-sm opacity-40">Imagem do Dashboard</span>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>);

}

/* ─── COMO FUNCIONA ─── */
function HowItWorks() {
  const steps = [
  {
    num: "01",
    title: "Pré-Diagnóstico",
    subtitle: "Análise do funil de aquisição atual",
    body: "Entenda como está sua aquisição atualmente e como ter clareza do sistema te ajuda a escalar seus resultados."
  },
  {
    num: "02",
    title: "Diagnóstico Raio-X",
    subtitle: "Você descobre onde o dinheiro vaza",
    body: "Mapeamos seu marketing e mostramos exatamente o que funciona e o que não funciona. Você recebe um relatório visual com o caminho claro."
  },
  {
    num: "03",
    title: "Instalação do Sistema",
    subtitle: "Montamos tudo no seu negócio em 30 dias",
    body: "Funil automatizado, IA no WhatsApp, dashboard de resultado. Tudo rodando sem você precisar virar especialista em nada."
  },
  {
    num: "04",
    title: "Aceleração Contínua",
    subtitle: "Seu marketing melhora todo mês",
    body: "Otimização diária. Testes semanais. O sistema fica mais inteligente e mais rentável a cada ciclo — sem você fazer mais nada."
  }];


  return (
    <section id="como-funciona" className="py-8 md:py-12 px-5 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[900px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}>
        
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3">
          Como funciona
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}>
          
          Do Pré-Diagnóstico ao Sistema de Aquisição KWF implementado
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-8">
          Você não precisa entender de marketing, só precisa ter clareza e ver resultado.
        </motion.p>

        <div className="space-y-0">
          {steps.map((s, i) =>
          <motion.div key={s.num} variants={fadeUp} className="flex gap-4 md:gap-7">
              <div className="hidden md:block w-[180px] shrink-0">
                <div
                className="rounded-lg h-[110px] flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                
                  <span className="text-muted-foreground text-[10px] opacity-40">Imagem</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div
                className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-gold text-[13px] font-bold shrink-0"
                style={{ background: "rgba(205,160,102,0.12)", border: "1px solid rgba(205,160,102,0.30)" }}>
                
                  {s.num}
                </div>
                {i < steps.length - 1 &&
              <div className="w-px flex-1 my-2" style={{ background: "rgba(255,255,255,0.08)" }} />
              }
              </div>

              <div className={i < steps.length - 1 ? "pb-8 flex-1" : "pb-0 flex-1"}>
                <h3 className="text-foreground text-base md:text-lg font-bold tracking-[-0.01em] mb-1">{s.title}</h3>
                <p className="text-gold text-[13px] mb-1.5">{s.subtitle}</p>
                <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7]">{s.body}</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>);

}

/* ─── DIAGNÓSTICO FORM ─── */
function DiagnosticForm() {
  const [form, setForm] = useState({ name: "", whatsapp: "", email: "", segment: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Quero agendar meu Pré-Diagnóstico Estratégico.\n\nNome: ${form.name}\nWhatsApp: ${form.whatsapp}\nEmail: ${form.email}\nSegmento: ${form.segment}`
    );
    window.open(`https://wa.me/SEU_NUMERO?text=${msg}`, "_blank");
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "8px",
    color: "#F5F5F5",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s"
  };

  const InputField = ({ label, placeholder, value, onChange, type = "text"

  }: {label: string;placeholder: string;value: string;onChange: (v: string) => void;type?: string;}) =>
  <div>
      <label className="block text-muted-foreground text-xs uppercase tracking-[0.14em] mb-1.5 font-medium">{label}</label>
      <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={inputStyle}
      onFocus={(e) => e.currentTarget.style.borderColor = "#CDA066"}
      onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"} />
    
    </div>;


  return (
    <section id="diagnostico" className="py-8 md:py-12 px-5 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}>
        
        <motion.div variants={fadeUp} className="text-center mb-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3">Próximo passo</p>
          <h2
            className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2 max-w-[700px] mx-auto"
            style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}>
            
            Descubra em 10 minutos onde pode estar vazando dinheiro da sua operação de aquisição e Marketing.
          </h2>
          <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] max-w-[540px] mx-auto">
            Preencha o diagnóstico e receba uma análise completa e possibilidades de melhorias.
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <GlassCard className="max-w-[600px] mx-auto">
            <p className="text-foreground text-[15px] font-semibold mb-5 text-center">
              Preencha as informações abaixo para iniciar o diagnóstico
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField label="Nome" placeholder="Ex: João Silva" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <InputField label="WhatsApp" placeholder="(00) 00000-0000" value={form.whatsapp} onChange={(v) => setForm({ ...form, whatsapp: v })} />
              <InputField label="Email" placeholder="seu@email.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
              <InputField label="Segmento" placeholder="Ex: Clínica, Estética, Educação..." value={form.segment} onChange={(v) => setForm({ ...form, segment: v })} />

              <button
                type="submit"
                className="w-full rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] py-3.5 hover:bg-green-hover transition-all">
                
                Agendar meu pré-diagnóstico estratégico
              </button>
            </form>
            <p className="text-muted-foreground text-xs text-center mt-4">
              Você sai com clareza de onde estão os gaps — independente de qualquer decisão de contratação.
            </p>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>);

}

/* ─── FAQ ─── */
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
  {
    q: "Já tive agência e não funcionou. Por que seria diferente?",
    a: "Porque o problema não era a agência — era a falta de sistema. A KWF conecta cada real ao resultado num dashboard que você abre quando quiser. Não gerenciamos peças. Instalamos a operação inteira."
  },
  {
    q: "Preciso entender de marketing?",
    a: "Não. O sistema roda sozinho. Você acompanha o dashboard e foca no seu negócio."
  },
  {
    q: "Quanto tempo pra ver resultado?",
    a: "Sistema instalado em 30 dias. Leads entre 30–60 dias. Resultado previsível a partir de 60–90 dias."
  },
  {
    q: "O diagnóstico tem algum custo?",
    a: "Não. 30 minutos de conversa. Você sai sabendo onde seu marketing vaza dinheiro — independente de qualquer decisão de contratação."
  },
  {
    q: "Funciona pra qualquer empresa?",
    a: "O sistema KWF é pra empresas de serviço premium com faturamento entre R$100k e R$500k/mês que já investem em marketing mas não conseguem medir o retorno."
  }];


  return (
    <section id="faq" className="py-8 md:py-12 px-5 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[720px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}>
        
        

        
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-8 text-center"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}>
          
          Dúvidas Frequentes
        </motion.h2>

        <div className="space-y-2">
          {items.map((item, i) =>
          <motion.div key={item.q} variants={fadeUp}>
              <div
              className="rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              
                <div className="flex items-center justify-between p-4 md:p-5 gap-3">
                  <h3 className="text-foreground text-[14px] md:text-[15px] font-semibold">{item.q}</h3>
                  <ChevronDown
                  size={18}
                  className={`text-muted-foreground shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
                
                </div>
                <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === i ? "200px" : "0px",
                  opacity: openIndex === i ? 1 : 0
                }}>
                
                  <p className="text-muted-foreground text-[13px] md:text-sm leading-[1.7] px-4 md:px-5 pb-4 md:pb-5">{item.a}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>);

}

/* ─── SOBRE (com carrossel de fotos) ─── */
function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const photos = [
  "Foto equipe 1",
  "Foto equipe 2",
  "Reunião estratégica",
  "Dashboard real",
  "Escritório KWF",
  "Evento"];


  const metrics = [
  { value: "+R$20M", label: "investidos em campanhas" },
  { value: "+60mil", label: "vendas realizadas" },
  { value: "+R$80M", label: "de faturamento no digital" }];


  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % photos.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <section id="sobre" className="py-8 md:py-12 px-5 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}>
        
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-8 text-center"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}>
          
          Conheça a Agência KWF
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Photos carousel */}
          <motion.div variants={fadeUp} className="relative">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                
                {photos.map((photo, i) =>
                <div
                  key={i}
                  className="w-full shrink-0 h-[220px] md:h-[300px] rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)"
                  }}>
                  
                    {/* TODO: substituir por fotos reais */}
                    <span className="text-muted-foreground text-xs opacity-40">{photo}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Carousel controls */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-foreground transition-colors"
              style={{ background: "rgba(15,15,15,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}>
              
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-foreground transition-colors"
              style={{ background: "rgba(15,15,15,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}>
              
              <ChevronRight size={16} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {photos.map((_, i) =>
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: i === currentSlide ? "#CDA066" : "rgba(255,255,255,0.15)"
                }} />

              )}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={fadeUp}>
            <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-4">
              A Agência KWF trabalha com empresas tradicionais e digitais, onde percebemos um padrão: negócios sólidos, com produto bom estão perdendo receita e oportunidade por falta de sistema de aquisição.
            </p>
            <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-4">
              Por isso, pegamos as estratégias de aquisição mais validadas do mercado digital e as instalamos dentro de negócios tradicionais com um método claro.
            </p>
            <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-8">
              O Sistema KWF combina estratégia, funil de aquisição, automações, IA e gestão de dados desenhada para gerar o máximo de previsibilidade de resultados.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {metrics.map((m) =>
              <div key={m.label}>
                  <p className="text-gold text-[24px] md:text-[28px] font-bold leading-none mb-1">{m.value}</p>
                  <p className="text-muted-foreground text-[11px] md:text-[12px]">{m.label}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>);

}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="px-5 md:px-10 pt-8 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
          <div>
            <p className="text-foreground text-xl font-bold mb-1.5">KWF</p>
            <p className="text-muted-foreground text-[13px] leading-[1.7] max-w-[360px]">
              Sistemas de aquisição e receita previsível para empresas de serviço.
            </p>
            <p className="text-muted-foreground text-xs italic opacity-50 mt-1">Know What to Focus.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <div>
              <p className="text-foreground text-sm font-semibold mb-2">Navegação</p>
              <div className="flex flex-col gap-1.5">
                {["Como funciona", "Resultados", "Sobre", "Dúvidas"].map((l) =>
                <a
                  key={l}
                  href={`#${l === "Como funciona" ? "como-funciona" : l === "Dúvidas" ? "faq" : l.toLowerCase()}`}
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  
                    {l}
                  </a>
                )}
              </div>
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold mb-2">Ação</p>
              <a href="#diagnostico" className="text-accent text-sm font-semibold hover:underline">
                Pré-Diagnóstico Estratégico →
              </a>
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold mb-2">Legal</p>
              <div className="flex flex-col gap-1.5">
                <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Política de Privacidade
                </a>
                <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Termo de Uso
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-muted-foreground text-xs opacity-50">
            © 2026 Agência KWF. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>);

}

/* ─── PAGE ─── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Problems />
      <SocialProof />
      <BeforeAfter />
      <Results />
      <HowItWorks />
      <DiagnosticForm />
      <FAQ />
      <About />
      <Footer />
    </div>);

}