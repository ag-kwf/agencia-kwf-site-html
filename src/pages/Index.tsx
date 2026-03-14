import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── NAVBAR ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Resultados", href: "#resultados" },
    { label: "Sobre", href: "#sobre" },
    { label: "Dúvidas", href: "#faq" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center"
      style={{
        background: "rgba(15,15,15,0.97)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="w-full max-w-[1100px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 shrink-0">
          <span className="text-foreground font-bold text-lg tracking-tight">KWF</span>
          <span className="text-muted-foreground text-[11px] font-medium uppercase tracking-[0.14em] hidden sm:inline">
            | Sistemas de Receita
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#diagnostico"
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-5 py-2.5 hover:bg-green-hover transition-all"
            style={{ boxShadow: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(19,150,87,0.30)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            Diagnóstico Estratégico
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-[68px] left-0 right-0 md:hidden flex flex-col gap-1 p-4"
          style={{ background: "rgba(15,15,15,0.98)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-muted-foreground text-sm py-3 px-2 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#diagnostico"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-5 py-3 hover:bg-green-hover transition-all"
          >
            Diagnóstico Estratégico
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="pt-[120px] pb-24 md:pb-[96px] px-6 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3.5">
          Sistema de aquisição e receita previsível
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-3"
          style={{ fontSize: "clamp(34px, 5vw, 58px)" }}
        >
          Transforme seu marketing em um sistema de aquisição e{" "}
          <span className="text-gold">receita previsível</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-[15px] md:text-base text-muted-foreground leading-[1.7] max-w-[640px] mb-8">
          com metodologia, processo e inteligência em cada etapa — da captação ao fechamento.
        </motion.p>

        <motion.blockquote
          variants={fadeUp}
          className="border-l-2 border-gold rounded-r-lg italic text-muted-foreground text-[15px] leading-[1.7] pl-5 py-4 pr-4 mb-10 max-w-[640px]"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          "O que custa caro não é investir em marketing — é crescer sem sistema, sem clareza e sem saber onde o
          dinheiro está vazando."
        </motion.blockquote>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          <a
            href="#diagnostico"
            className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.05em] px-7 md:px-9 py-4 hover:bg-green-hover transition-all"
            style={{ boxShadow: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(19,150,87,0.30)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            Agendar Diagnóstico Estratégico
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center justify-center rounded-lg text-foreground text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.05em] px-6 py-4 transition-all"
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
            }}
          >
            Como Funciona →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── GLASS CARD ─── */
function GlassCard({ children, className = "", hoverGold = false }: { children: React.ReactNode; className?: string; hoverGold?: boolean }) {
  return (
    <div
      className={`rounded-xl p-6 transition-all duration-300 ${className}`}
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget.style.background = "rgba(255,255,255,0.10)");
        (e.currentTarget.style.borderColor = hoverGold ? "rgba(205,160,102,0.30)" : "rgba(255,255,255,0.14)");
      }}
      onMouseLeave={(e) => {
        (e.currentTarget.style.background = "rgba(255,255,255,0.06)");
        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)");
      }}
    >
      {children}
    </div>
  );
}

/* ─── TRÊS PROBLEMAS ─── */
function Problems() {
  const cards = [
    {
      emoji: "🪣",
      title: "O balde furado",
      body: "Você atrai lead, mas perde no caminho. Atendimento demorado, follow-up esquecido, proposta que some. O funil vaza antes de chegar no fechamento.",
      result: "→ Resultado: esforço alto, fechamento baixo.",
    },
    {
      emoji: "🚗",
      title: "O carro sem painel",
      body: "Sem metas claras, sem KPIs, sem dashboard. Você dirige no escuro. Não sabe se está acelerando, freando ou parado.",
      result: "→ Resultado: decisões no achismo, mês a mês.",
    },
    {
      emoji: "⚙️",
      title: "O trabalho manual",
      body: "Follow-up na mão, CRM preenchido com atraso, lead esperando resposta. Tudo depende de gente, e gente falha.",
      result: "→ Resultado: lead esfria, venda perde, concorrente ganha.",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3.5">
          Caso se identifique, você está no lugar certo
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-12"
          style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
        >
          Três problemas que travam o crescimento de 7 em cada 10 empresas.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {cards.map((c) => (
            <motion.div key={c.title} variants={fadeUp}>
              <GlassCard hoverGold>
                <div className="w-7 h-0.5 bg-gold rounded mb-5" />
                <span className="text-[28px] block mb-3">{c.emoji}</span>
                <h3 className="text-foreground text-lg font-bold tracking-[-0.01em] mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-[1.7] mb-4">{c.body}</p>
                <p className="text-gold text-xs">{c.result}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── ANTES VS DEPOIS ─── */
function BeforeAfter() {
  const before = [
    "Investe em ads sem saber o que voltou",
    "Relatório de likes que não paga boleto",
    "Lead chega e demora horas pra responder",
    "CRM preenchido na mão — ou não preenchido",
    "Resultado depende de sorte e indicação",
    "Ferramentas soltas que não conversam",
    "Paga R$15–20k em equipe pra fazer o básico",
  ];
  const after = [
    "Dashboard mostra quanto cada real retornou",
    "Métricas de receita, não de vaidade",
    "IA responde lead em menos de 3 segundos",
    "CRM preenche sozinho com dados da conversa",
    "Funil previsível — você sabe quantos clientes vêm",
    "Tudo integrado: ads → landing → WhatsApp → CRM",
    "Operação completa por uma fração do custo",
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <motion.div
        className="max-w-[920px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground text-center mb-12"
          style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
        >
          Enquanto você ainda adivinha... <span className="text-gold">seu concorrente já sabe.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          <motion.div
            variants={fadeUp}
            className="rounded-xl p-6"
            style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}
          >
            <span
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1 rounded-md mb-5"
              style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444" }}
            >
              Como é hoje
            </span>
            <ul className="space-y-3">
              {before.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-muted-foreground text-[14px] leading-[1.6]">
                  <span className="text-destructive mt-0.5 shrink-0">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-xl p-6"
            style={{ background: "rgba(19,150,87,0.06)", border: "1px solid rgba(19,150,87,0.22)" }}
          >
            <span
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1 rounded-md mb-5"
              style={{ background: "rgba(19,150,87,0.14)", color: "#139657" }}
            >
              Com o sistema KWF
            </span>
            <ul className="space-y-3">
              {after.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-foreground text-[14px] leading-[1.6]">
                  <span className="text-accent mt-0.5 shrink-0">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="text-center mt-10">
          <a
            href="#diagnostico"
            className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-9 py-4 hover:bg-green-hover transition-all"
          >
            Quero sair do achismo
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── COMO FUNCIONA ─── */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Diagnóstico Raio-X",
      subtitle: "Você descobre onde o dinheiro vaza",
      body: "Mapeamos seu marketing e mostramos exatamente o que funciona e o que não funciona. Você recebe um relatório visual com o caminho claro.",
    },
    {
      num: "02",
      title: "Instalação do Sistema",
      subtitle: "Montamos tudo no seu negócio em 30 dias",
      body: "Funil automatizado, IA no WhatsApp, dashboard de resultado. Tudo rodando sem você precisar virar especialista em nada.",
    },
    {
      num: "03",
      title: "Aceleração Contínua",
      subtitle: "Seu marketing melhora todo mês",
      body: "Otimização diária. Testes semanais. O sistema fica mais inteligente e mais rentável a cada ciclo — sem você fazer mais nada.",
    },
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-24 px-6 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[780px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3.5">
          Como funciona
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-3"
          style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
        >
          Do diagnóstico ao resultado. Tudo visível pra você.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-[15px] leading-[1.7] mb-12">
          Você não precisa entender de marketing. Precisa ver resultado.
        </motion.p>

        <div className="space-y-0">
          {steps.map((s, i) => (
            <motion.div key={s.num} variants={fadeUp} className="flex gap-5 md:gap-7">
              {/* Left: circle + connector */}
              <div className="flex flex-col items-center">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-gold text-[13px] font-bold shrink-0"
                  style={{ background: "rgba(205,160,102,0.12)", border: "1px solid rgba(205,160,102,0.30)" }}
                >
                  {s.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 my-2" style={{ background: "rgba(255,255,255,0.08)" }} />
                )}
              </div>

              {/* Right: content */}
              <div className={i < steps.length - 1 ? "pb-10" : "pb-0"}>
                <h3 className="text-foreground text-lg font-bold tracking-[-0.01em] mb-1">{s.title}</h3>
                <p className="text-gold text-[13px] mb-2">{s.subtitle}</p>
                <p className="text-muted-foreground text-[15px] leading-[1.7]">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── RESULTADOS ─── */
function Results() {
  const metrics = [
    { value: "347", label: "leads gerados / mês", change: "▲ +23% vs anterior" },
    { value: "R$18", label: "custo por lead", change: "▼ -31% vs anterior" },
    { value: "4,2%", label: "taxa de conversão", change: "▲ +0,8pp vs anterior" },
    { value: "8,4x", label: "retorno sobre investimento", change: "▲ +2,1x vs anterior" },
  ];

  return (
    <section id="resultados" className="py-16 md:py-24 px-6 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3.5">
          Resultados reais
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-3"
          style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
        >
          Você nunca mais vai perguntar "isso tá funcionando?"
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-[15px] leading-[1.7] mb-12">
          Abre o dashboard. Vê tudo. Em tempo real. Sem depender de ninguém.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {metrics.map((m) => (
            <motion.div key={m.label} variants={fadeUp}>
              <GlassCard>
                <div className="w-full h-0.5 rounded mb-5" style={{ background: "rgba(205,160,102,0.40)" }} />
                <p className="text-gold text-[38px] font-bold leading-none mb-1">{m.value}</p>
                <p className="text-muted-foreground text-xs mb-3">{m.label}</p>
                <p className="text-accent text-xs font-semibold">{m.change}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} className="text-center text-[11px] text-muted-foreground mt-8 opacity-60">
          Dados ilustrativos. Seu dashboard terá as métricas reais do seu negócio.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ─── PROVA SOCIAL ─── */
function SocialProof() {
  const agencyMetrics = [
    { value: "6+", label: "anos de operação" },
    { value: "R$2M+", label: "gerenciados em ads" },
    { value: "100%", label: "foco em resultado" },
    { value: "24/7", label: "sistema operando" },
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3.5">
          Prova social
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-12"
          style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
        >
          Quem já confiou na Agência KWF.
        </motion.h2>

        {/* Client logos placeholder */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[1, 2, 3, 4].map((n) => (
            <GlassCard key={n} className="flex items-center justify-center h-[72px]">
              {/* TODO: substituir por assets reais */}
              <span className="text-muted-foreground text-xs opacity-40">Logo cliente {n}</span>
            </GlassCard>
          ))}
        </motion.div>

        {/* Agency metrics */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {agencyMetrics.map((m) => (
            <div key={m.label} className="pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-gold text-[32px] font-bold leading-none mb-1">{m.value}</p>
              <p className="text-muted-foreground text-[13px]">{m.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        {/* TODO: substituir por depoimentos validados */}
        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-5 max-w-[860px] mx-auto">
          {[
            {
              quote: "Pela primeira vez sei quanto cada real retorna. Antes era confiança cega. Agora é dado.",
              name: "Ricardo M.",
              role: "CEO, Clínica Premium — SP",
            },
            {
              quote: "Queria só focar no meu negócio. O dashboard me dá tranquilidade total.",
              name: "Fernanda S.",
              role: "Fundadora, Estética — CWB",
            },
          ].map((t) => (
            <GlassCard key={t.name}>
              <p className="text-foreground text-[15px] italic leading-[1.7] mb-5">"{t.quote}"</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="pt-4">
                <p className="text-foreground text-sm font-semibold">— {t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── DIAGNÓSTICO FORM ─── */
function DiagnosticForm() {
  const [form, setForm] = useState({ name: "", whatsapp: "", company: "", revenue: "", pain: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Quero agendar meu Diagnóstico Estratégico.\n\nNome: ${form.name}\nWhatsApp: ${form.whatsapp}\nEmpresa: ${form.company}\nFaturamento: ${form.revenue}\nDor: ${form.pain}`
    );
    // TODO: substituir pelo número real
    window.open(`https://wa.me/SEU_NUMERO?text=${msg}`, "_blank");
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "8px",
    color: "#F5F5F5",
    padding: "14px 16px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  const InputField = ({ label, placeholder, value, onChange, textarea = false }: {
    label: string; placeholder: string; value: string; onChange: (v: string) => void; textarea?: boolean;
  }) => (
    <div>
      <label className="block text-muted-foreground text-xs uppercase tracking-[0.14em] mb-2 font-medium">{label}</label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#CDA066")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
          className="resize-none"
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#CDA066")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
        />
      )}
    </div>
  );

  return (
    <section id="diagnostico" className="py-16 md:py-24 px-6 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3.5">Próximo passo</p>
          <h2
            className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-3"
            style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
          >
            Descubra em 30 minutos onde seu marketing vaza dinheiro.
          </h2>
          <p className="text-muted-foreground text-[15px] leading-[1.7] max-w-[540px] mx-auto">
            Preencha o diagnóstico e receba uma análise completa da sua operação de marketing.
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <GlassCard className="max-w-[600px] mx-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField label="Seu nome" placeholder="Ex: João Silva" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <InputField label="WhatsApp" placeholder="(00) 00000-0000" value={form.whatsapp} onChange={(v) => setForm({ ...form, whatsapp: v })} />
              <InputField label="Nome da empresa" placeholder="Ex: Clínica Premium SP" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
              <InputField label="Faturamento mensal" placeholder="Ex: R$150.000" value={form.revenue} onChange={(v) => setForm({ ...form, revenue: v })} />
              <InputField label="Qual sua maior dor com marketing hoje?" placeholder="Conte brevemente..." value={form.pain} onChange={(v) => setForm({ ...form, pain: v })} textarea />

              <button
                type="submit"
                className="w-full rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] py-4 hover:bg-green-hover transition-all"
                style={{ boxShadow: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(19,150,87,0.30)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                Agendar meu diagnóstico estratégico
              </button>
            </form>
            <p className="text-muted-foreground text-xs text-center mt-5">
              Você sai com clareza de onde estão os gaps — independente de qualquer decisão de contratação.
            </p>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── SOBRE ─── */
function About() {
  return (
    <section id="sobre" className="py-16 md:py-24 px-6 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <motion.div variants={fadeUp}>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3.5">Sobre</p>
            <h2
              className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-3"
              style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
            >
              Por trás do sistema que entrega esses resultados.
            </h2>
            <p className="text-muted-foreground text-[15px] leading-[1.7]">
              6+ anos resolvendo um problema: empresários bons investindo em marketing sem ver retorno. A KWF nasceu da
              frustração de ver negócios sólidos desperdiçando capital em ações desconectadas — sem sistema, sem método,
              sem resultado mensurável.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            {/* TODO: substituir por assets reais */}
            <GlassCard className="h-40 flex items-center justify-center">
              <span className="text-muted-foreground text-xs opacity-40">Foto equipe</span>
            </GlassCard>
            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="h-28 flex items-center justify-center">
                <span className="text-muted-foreground text-xs opacity-40">Reunião estratégica</span>
              </GlassCard>
              <GlassCard className="h-28 flex items-center justify-center">
                <span className="text-muted-foreground text-xs opacity-40">Dashboard real</span>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const items = [
    {
      q: "Já tive agência e não funcionou. Por que seria diferente?",
      a: "Porque o problema não era a agência — era a falta de sistema. A KWF conecta cada real ao resultado num dashboard que você abre quando quiser. Não gerenciamos peças. Instalamos a operação inteira.",
    },
    {
      q: "Preciso entender de marketing?",
      a: "Não. O sistema roda sozinho. Você acompanha o dashboard e foca no seu negócio.",
    },
    {
      q: "Quanto tempo pra ver resultado?",
      a: "Sistema instalado em 30 dias. Leads entre 30–60 dias. Resultado previsível a partir de 60–90 dias.",
    },
    {
      q: "O diagnóstico tem algum custo?",
      a: "Não. 30 minutos de conversa. Você sai sabendo onde seu marketing vaza dinheiro — independente de qualquer decisão de contratação.",
    },
    {
      q: "Funciona pra qualquer empresa?",
      a: "O sistema KWF é pra empresas de serviço premium com faturamento entre R$100k e R$500k/mês que já investem em marketing mas não conseguem medir o retorno.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 px-6 md:px-10">
      <motion.div
        className="max-w-[720px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3.5">
          Dúvidas
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-12"
          style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
        >
          Tudo que você quer saber antes de dar o próximo passo.
        </motion.h2>

        <div className="space-y-1">
          {items.map((item) => (
            <motion.div key={item.q} variants={fadeUp}>
              <GlassCard>
                <h3 className="text-foreground text-[15px] font-semibold mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm leading-[1.7]">{item.a}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="px-6 md:px-10 pt-12 pb-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div>
            <p className="text-foreground text-xl font-bold mb-2">KWF</p>
            <p className="text-muted-foreground text-sm leading-[1.7] max-w-[360px]">
              Sistemas de aquisição e receita previsível para empresas de serviço.
            </p>
            <p className="text-muted-foreground text-xs italic opacity-50 mt-1">Know What to Focus.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div>
              <p className="text-foreground text-sm font-semibold mb-3">Navegação</p>
              <div className="flex flex-col gap-2">
                {["Como funciona", "Resultados", "Sobre", "Dúvidas"].map((l) => (
                  <a
                    key={l}
                    href={`#${l === "Como funciona" ? "como-funciona" : l === "Dúvidas" ? "faq" : l.toLowerCase()}`}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold mb-3">Ação</p>
              <a href="#diagnostico" className="text-accent text-sm font-semibold hover:underline">
                Diagnóstico Estratégico →
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-muted-foreground text-xs opacity-50">
            © 2026 Agência KWF. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Problems />
      <BeforeAfter />
      <HowItWorks />
      <Results />
      <SocialProof />
      <DiagnosticForm />
      <About />
      <FAQ />
      <Footer />
    </div>
  );
}
