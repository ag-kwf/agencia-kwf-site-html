import { useState, FormEvent, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronLeft, ChevronRight, Sparkles, Search, Zap, Settings, Rocket } from "lucide-react";

import logoInstituto from "@/assets/logos/Instituto_di_Moda_Burgo.svg";
import logoJF from "@/assets/logos/JF_Ambiental.svg";
import logoKenco from "@/assets/logos/Kenco_Saude.svg";
import logoMaira from "@/assets/logos/Maira_Cardi.svg";
import logoMaple from "@/assets/logos/MapleBear.svg";
import logoMari from "@/assets/logos/Mari_Tortella.svg";
import logoMottainai from "@/assets/logos/Mottainai_Brasil.svg";
import logoRecicle from "@/assets/logos/Recicle_Ambiental.svg";
import logoSeca from "@/assets/logos/Seca_Voce.svg";
import logoTasso from "@/assets/logos/Tasso_Lago.svg";
import logoCentroOdonto from "@/assets/logos/Centro_Odontologico_Filhote.svg";
import logoCuraVoce from "@/assets/logos/Cura_Voce.svg";
import logoDaniUchoa from "@/assets/logos/Dani_Uchoa.svg";
import logoDesafioSeca from "@/assets/logos/Desafio_Seca.svg";
import logoFinancialMove from "@/assets/logos/Financial_Move.svg";
import logoFluency from "@/assets/logos/Fluency_Academy.svg";
import agenciaKwf1 from "@/assets/agencia_kwf_1.png";
import agenciaKwf2 from "@/assets/agencia_kwf_2.png";
import logoHalterTech from "@/assets/logos/HalterTech.svg";
import imgBaldeFurado from "@/assets/o_balde_furado.png";
import imgCarroSemPainel from "@/assets/o_carro_sem_painel.png";
import imgTrabalhoManual from "@/assets/o_trabalho_manual.png";
import logoKwf from "@/assets/logo-kwf.png";
import heroChip from "@/assets/hero-chip.png";

const clientLogos = [
  { src: logoInstituto, alt: "Instituto di Moda Burgo" },
  { src: logoJF, alt: "JF Ambiental" },
  { src: logoKenco, alt: "Kenco Saúde" },
  { src: logoMaira, alt: "Maíra Cardi" },
  { src: logoMaple, alt: "MapleBear" },
  { src: logoMari, alt: "Mari Tortella" },
  { src: logoMottainai, alt: "Mottainai Brasil" },
  { src: logoRecicle, alt: "Recicle Ambiental" },
  { src: logoSeca, alt: "Seca Você" },
  { src: logoTasso, alt: "Tasso Lago" },
  { src: logoCentroOdonto, alt: "Centro Odontológico Filhote" },
  { src: logoCuraVoce, alt: "Cura Você" },
  { src: logoDaniUchoa, alt: "Dani Uchoa" },
  { src: logoDesafioSeca, alt: "Desafio Seca" },
  { src: logoFinancialMove, alt: "Financial Move" },
  { src: logoFluency, alt: "Fluency Academy" },
  { src: logoHalterTech, alt: "HalterTech" },
];

/* ─── ANIMATION VARIANTS ─── */
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" as const } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" as const } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" as const } }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" as const } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

const staggerFast = {
  visible: { transition: { staggerChildren: 0.06 } }
};

/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 30, stiffness: 80 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(Math.round(v).toLocaleString("pt-BR"));
    });
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className="text-gold text-[24px] md:text-[28px] font-bold leading-none">
      {prefix}{display}{suffix}
    </span>
  );
}

/* ─── MAGNETIC BUTTON ─── */
function MagneticButton({ children, href, className = "" }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Resultados", href: "#resultados" },
    { label: "Sobre", href: "#sobre" },
    { label: "Dúvidas", href: "#faq" }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 h-[60px] md:h-[68px] flex items-center transition-all duration-500"
      style={{
        background: scrolled ? "rgba(15,15,15,0.98)" : "rgba(15,15,15,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid rgba(255,255,255,${scrolled ? 0.1 : 0.04})`,
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none"
      }}
    >
      <div className="w-full max-w-[1100px] mx-auto px-5 md:px-10 flex items-center justify-between">
        <a href="#" className="shrink-0 group">
          <motion.img
            src={logoKwf}
            alt="Agência KWF"
            className="h-12 w-auto"
            whileHover={{ scale: 1.05 }}
          />
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground text-sm hover:text-foreground transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <MagneticButton
            href="#diagnostico"
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-5 py-2.5 hover:bg-green-hover transition-all shadow-[0_0_20px_rgba(19,150,87,0.15)] hover:shadow-[0_0_30px_rgba(19,150,87,0.3)]"
          >
            Pré-Diagnóstico Estratégico
          </MagneticButton>
          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Menu">
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-[60px] md:top-[68px] left-0 right-0 md:hidden flex flex-col gap-1 p-4"
            style={{ background: "rgba(15,15,15,0.98)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-muted-foreground text-sm py-3 px-2 hover:text-foreground transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#diagnostico"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-5 py-3 hover:bg-green-hover transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Pré-Diagnóstico Estratégico
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="pt-[88px] md:pt-[100px] pb-8 md:pb-12 px-5 md:px-10 overflow-hidden">
      <div
        className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12"
      >
        {/* Left: text content */}
        <div className="w-full md:w-1/2 order-1 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={12} className="text-gold animate-pulse" />
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
              Sistema de aquisição e receita previsível
            </p>
          </div>

          <h1
            className="font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-4 text-2xl"
            style={{ fontSize: "clamp(18px, 2.8vw, 31px)", textWrap: "balance" }}
          >
            Transforme seu marketing em um sistema de aquisição e{" "}
            <span className="text-gold">receita previsível</span>{" "}
            com metodologia, processo e <span className="text-gold">inteligência</span> em cada etapa
          </h1>

          <p
            className="text-muted-foreground text-[14px] leading-[1.7] mb-6 md:text-sm"
            style={{ textWrap: "balance" as any }}
          >
            O que custa caro não é investir em marketing, é crescer sem sistema, sem clareza e sem saber onde o dinheiro está vazando.
          </p>

          <div>
            <MagneticButton
              href="#diagnostico"
              className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-7 py-3.5 hover:bg-green-hover transition-all shadow-[0_0_30px_rgba(19,150,87,0.2)] hover:shadow-[0_0_50px_rgba(19,150,87,0.35)]"
            >
              Quero um Pré-diagnóstico
            </MagneticButton>
          </div>
        </div>

        {/* Right: hero image */}
        <div className="w-full md:w-1/2 order-2 flex items-center justify-center">
          <motion.img
            src={heroChip}
            alt="Sistema KWF - Marketing, Vendas, Tecnologia, Digital"
            className="w-full max-w-[500px] h-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── GLASS CARD ─── */
function GlassCard({ children, className = "", hoverGold = false, hoverGlow = false }: {
  children: React.ReactNode;
  className?: string;
  hoverGold?: boolean;
  hoverGlow?: boolean;
}) {
  return (
    <motion.div
      className={`rounded-xl p-5 md:p-6 transition-all duration-300 ${className}`}
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}
      whileHover={{
        scale: 1.01,
        boxShadow: hoverGlow
          ? "0 0 40px rgba(205,160,102,0.12), 0 0 80px rgba(205,160,102,0.05)"
          : hoverGold
          ? "0 0 30px rgba(205,160,102,0.1)"
          : "0 8px 30px rgba(0,0,0,0.15)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.10)";
        e.currentTarget.style.borderColor = hoverGold || hoverGlow ? "rgba(205,160,102,0.30)" : "rgba(255,255,255,0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── PRA QUEM É (PROBLEMAS) ─── */
function Problems() {
  const cards = [
    {
      title: "O balde furado",
      body: "Você atrai lead, mas perde no caminho. Atendimento demorado, follow-up esquecido, proposta que some. O funil vaza antes de chegar no fechamento.",
      result: "→ Resultado: esforço alto, fechamento baixo.",
      image: imgBaldeFurado
    },
    {
      title: "O carro sem painel",
      body: "Sem metas claras, sem KPIs, sem dashboard. Você dirige no escuro. Não sabe se está acelerando, freando ou parado.",
      result: "→ Resultado: decisões no achismo, mês a mês.",
      image: imgCarroSemPainel
    },
    {
      title: "O trabalho manual",
      body: "Follow-up na mão, CRM preenchido com atraso, lead esperando resposta. Tudo depende de gente, e gente falha.",
      result: "→ Resultado: lead esfria, venda perde, concorrente ganha.",
      image: imgTrabalhoManual
    }
  ];

  return (
    <section className="py-8 md:py-12 px-5 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3 text-center">
          Caso se identifique, você está no lugar certo
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.15] tracking-[-0.02em] text-foreground mb-8 md:mb-10 text-center max-w-[700px] mx-auto"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Três problemas que <span className="text-gold">travam o crescimento</span> de 7 em cada 10 empresas.
        </motion.h2>

        <div className="space-y-4">
          {cards.map((c, i) => {
            const isReversed = i % 2 === 1;
            const variant = i % 2 === 0 ? fadeLeft : fadeRight;
            return (
              <motion.div key={c.title} variants={variant}>
                <GlassCard hoverGold>
                  <div className={`flex flex-col md:flex-row gap-5 items-center ${isReversed ? "md:flex-row-reverse" : ""}`}>
                    <div className="w-full md:w-1/2">
                      <motion.div
                        className="w-7 h-0.5 bg-gold rounded mb-3"
                        initial={{ width: 0 }}
                        whileInView={{ width: 28 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                      <h3 className="text-foreground text-base md:text-lg font-bold tracking-[-0.01em] mb-2">{c.title}</h3>
                      <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-2">{c.body}</p>
                      <p className="text-gold text-xs">{c.result}</p>
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="rounded-lg h-[140px] md:h-[180px] overflow-hidden">
                        <img src={c.image} alt={c.title} className="w-full h-full object-cover rounded-lg" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
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

  const mid = Math.ceil(clientLogos.length / 2);
  const row1 = clientLogos.slice(0, mid);
  const row2 = clientLogos.slice(mid);

  const renderRow = (ref: React.RefObject<HTMLDivElement | null>, logos: typeof clientLogos) => (
    <div ref={ref} className="flex overflow-hidden gap-[8px] px-0 mx-[28px]" style={{ scrollbarWidth: "none" }}>
      {[...logos, ...logos].map((logo, idx) => (
        <motion.div
          key={idx}
          className="shrink-0 w-[calc((100%-32px)/5)] aspect-square rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)"
          }}
          whileHover={{
            scale: 1.1,
            borderColor: "rgba(205,160,102,0.4)",
            boxShadow: "0 0 20px rgba(205,160,102,0.15)"
          }}
        >
          <img src={logo.src} alt={logo.alt} className="w-full h-full object-cover rounded-full" loading="lazy" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="space-y-3">
      {renderRow(scrollRef1, row1)}
      {renderRow(scrollRef2, row2)}
    </div>
  );
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
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2 text-center"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Quem já confiou na <span className="text-gold">Agência KWF</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] text-center mb-8">
          Atendemos grandes Empresas Tradicionais e do Digital
        </motion.p>

        <motion.div variants={scaleUp} className="mb-8">
          <LogoCarousel />
        </motion.div>

        <motion.div variants={fadeUp} className="text-center">
          <MagneticButton
            href="#diagnostico"
            className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-8 py-3.5 hover:bg-green-hover transition-all shadow-[0_0_20px_rgba(19,150,87,0.15)] hover:shadow-[0_0_40px_rgba(19,150,87,0.3)]"
          >
            Quero meu pré-diagnóstico
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── ANTES VS DEPOIS ─── */
function BeforeAfter() {
  const before = [
    "Investe em ads sem saber o retorno",
    "Relatórios soltos que não trazem inteligência ou identificam gargalos",
    "Lead chegam perdidos e ficam parados",
    "Operação Manual com nenhum controle",
    "Resultado depende de sorte e indicação",
    "Paga R$25–35k em equipe pra fazer o básico"
  ];

  const after = [
    "Dashboard com dados reais de retorno",
    "Mapeamento do fluxo de aquisição, sem perda de lead",
    "IA responde lead em segundos e qualifica o lead",
    "Implantação de IA e Automação nos processos",
    "Funil com previsibilidade de retorno",
    "Operação de aquisição completa por uma fração do custo"
  ];

  return (
    <section className="py-8 md:py-12 px-5 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[1000px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground text-center mb-2"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Enquanto você ainda sofre para <span className="text-gold">adivinhar</span>...
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] text-center mb-8"
          style={{ textWrap: "balance" }}
        >
          o faturamento que poderia estar no seu bolso está escorrendo.
        </motion.p>

        <div className="grid md:grid-cols-[4fr_5fr] gap-4">
          <motion.div
            variants={fadeLeft}
            className="rounded-xl p-5 md:p-6"
            style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}
            whileHover={{ borderColor: "rgba(239,68,68,0.35)", boxShadow: "0 0 30px rgba(239,68,68,0.08)" }}
          >
            <span
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1 rounded-md mb-4"
              style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444" }}
            >
              Como é hoje
            </span>
            <motion.ul className="space-y-2.5" variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {before.map((t) => (
                <motion.li
                  key={t}
                  variants={fadeUp}
                  className="flex items-start gap-2.5 text-muted-foreground text-[13px] md:text-[14px] leading-[1.6]"
                >
                  <span className="text-destructive mt-0.5 shrink-0">✕</span>
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            variants={fadeRight}
            className="rounded-xl p-5 md:p-6"
            style={{ background: "rgba(19,150,87,0.06)", border: "1px solid rgba(19,150,87,0.22)" }}
            whileHover={{ borderColor: "rgba(19,150,87,0.45)", boxShadow: "0 0 30px rgba(19,150,87,0.08)" }}
          >
            <span
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1 rounded-md mb-4"
              style={{ background: "rgba(19,150,87,0.14)", color: "#139657" }}
            >
              Com o sistema de aquisição da KWF
            </span>
            <motion.ul className="space-y-2.5" variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {after.map((t) => (
                <motion.li
                  key={t}
                  variants={fadeUp}
                  className="flex items-start gap-2.5 text-foreground text-[13px] md:text-[14px] leading-[1.6]"
                >
                  <span className="text-accent mt-0.5 shrink-0">✓</span>
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
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
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3 text-center">
          Resultados reais
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2 text-center"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Pare de ficar se perguntando <span className="text-gold">"isso tá funcionando?"</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-8 text-center" style={{ textWrap: "balance" }}>
          Abre o dashboard. Veja todo o fluxo. Tome decisões acertadas.
        </motion.p>

        <motion.div variants={scaleUp}>
          <GlassCard className="max-w-[900px] mx-auto md:max-w-[630px]" hoverGlow>
            <div className="rounded-lg overflow-hidden">
              <video
                src="/videos/site_agencia_kwf.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-lg"
              />
            </div>
          </GlassCard>
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
    }
  ];

  return (
    <section id="como-funciona" className="py-8 md:py-12 px-5 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[900px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3">
          Como funciona
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Do Pré-Diagnóstico ao <span className="text-gold">Sistema de Aquisição KWF</span> implementado
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-8">
          Você não precisa entender de marketing, só precisa ter clareza e ver resultado.
        </motion.p>

        <div className="space-y-0">
          {steps.map((s, i) => (
            <motion.div key={s.num} variants={fadeLeft} className="flex gap-4 md:gap-7">
              <div className="hidden md:block w-[180px] shrink-0">
                <motion.div
                  className="rounded-lg h-[110px] flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  whileHover={{ scale: 1.03, borderColor: "rgba(205,160,102,0.3)" }}
                >
                  <span className="text-muted-foreground text-[10px] opacity-40">Imagem</span>
                </motion.div>
              </div>

              <div className="flex flex-col items-center">
                <motion.div
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-gold text-[13px] font-bold shrink-0"
                  style={{ background: "rgba(205,160,102,0.12)", border: "1px solid rgba(205,160,102,0.30)" }}
                  whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(205,160,102,0.3)" }}
                  whileInView={{ rotate: [0, 5, -5, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                >
                  {s.num}
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div
                    className="w-px flex-1 my-2"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                )}
              </div>

              <div className={i < steps.length - 1 ? "pb-8 flex-1" : "pb-0 flex-1"}>
                <h3 className="text-foreground text-base md:text-lg font-bold tracking-[-0.01em] mb-1">{s.title}</h3>
                <p className="text-gold text-[13px] mb-1.5">{s.subtitle}</p>
                <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7]">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── DIAGNÓSTICO FORM ─── */
function DiagnosticForm() {
  const [form, setForm] = useState({ name: "", whatsapp: "", email: "", segment: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Quero agendar meu Pré-Diagnóstico Estratégico.\n\nNome: ${form.name}\nWhatsApp: ${form.whatsapp}\nEmail: ${form.email}\nSegmento: ${form.segment}`
    );
    window.open(`https://wa.me/SEU_NUMERO?text=${msg}`, "_blank");
  };

  const InputField = ({ label, placeholder, value, onChange, type = "text", id }: {
    label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string; id: string;
  }) => (
    <motion.div
      animate={focusedField === id ? { scale: 1.01 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <label className="block text-muted-foreground text-xs uppercase tracking-[0.14em] mb-1.5 font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocusedField(id)}
        onBlur={() => setFocusedField(null)}
        className="w-full rounded-lg text-foreground text-sm outline-none px-[14px] py-[12px] transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${focusedField === id ? "hsl(var(--gold))" : "rgba(255,255,255,0.10)"}`,
          boxShadow: focusedField === id ? "0 0 20px rgba(205,160,102,0.15)" : "none"
        }}
      />
    </motion.div>
  );

  return (
    <section id="diagnostico" className="py-8 md:py-12 px-5 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3">Próximo passo</p>
          <h2
            className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2 max-w-[700px] mx-auto"
            style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
          >
            Descubra em 10 minutos onde pode estar <span className="text-gold">vazando dinheiro</span> da sua operação de aquisição e Marketing.
          </h2>
          <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] max-w-[540px] mx-auto">
            Preencha o diagnóstico e receba uma análise completa e possibilidades de melhorias.
          </p>
        </motion.div>

        <motion.div variants={scaleUp}>
          <GlassCard className="max-w-[600px] mx-auto" hoverGlow>
            <p className="text-foreground text-[15px] font-semibold mb-5 text-center">
              Preencha as informações abaixo para iniciar o diagnóstico
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField id="name" label="Nome" placeholder="Ex: João Silva" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <InputField id="whatsapp" label="WhatsApp" placeholder="(00) 00000-0000" value={form.whatsapp} onChange={(v) => setForm({ ...form, whatsapp: v })} />
              <InputField id="email" label="Email" placeholder="seu@email.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
              <InputField id="segment" label="Segmento" placeholder="Ex: Clínica, Estética, Educação..." value={form.segment} onChange={(v) => setForm({ ...form, segment: v })} />

              <motion.button
                type="submit"
                className="w-full rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] py-3.5 hover:bg-green-hover transition-all"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(19,150,87,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Agendar meu pré-diagnóstico estratégico
              </motion.button>
            </form>
            <p className="text-muted-foreground text-xs text-center mt-4">
              Você sai com clareza de onde estão os gaps — independente de qualquer decisão de contratação.
            </p>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
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
    }
  ];

  return (
    <section id="faq" className="py-8 md:py-12 px-5 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[720px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-8 text-center"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          <span className="text-gold">Dúvidas</span> Frequentes
        </motion.h2>

        <div className="space-y-2">
          {items.map((item, i) => (
            <motion.div key={item.q} variants={fadeUp}>
              <motion.div
                className="rounded-xl overflow-hidden cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid rgba(255,255,255,${openIndex === i ? 0.14 : 0.08})`
                }}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                whileHover={{ borderColor: "rgba(205,160,102,0.25)", boxShadow: "0 0 20px rgba(205,160,102,0.05)" }}
                layout
              >
                <div className="flex items-center justify-between p-4 md:p-5 gap-3">
                  <h3 className="text-foreground text-[14px] md:text-[15px] font-semibold">{item.q}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground text-[13px] md:text-sm leading-[1.7] px-4 md:px-5 pb-4 md:pb-5">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── SOBRE (com carrossel de fotos) ─── */
function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const photos = [
    { src: agenciaKwf1, alt: "Equipe Agência KWF" },
    { src: agenciaKwf2, alt: "Agência KWF Eventos" },
  ];

  const metrics = [
    { target: 20, prefix: "+R$", suffix: "M", label: "investidos em campanhas" },
    { target: 60, prefix: "+", suffix: "mil", label: "vendas realizadas" },
    { target: 80, prefix: "+R$", suffix: "M", label: "de faturamento no digital" }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % photos.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <section id="sobre" className="py-8 md:py-12 px-5 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-8 text-center"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Conheça a <span className="text-gold">Agência KWF</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Photos carousel */}
          <motion.div variants={fadeLeft} className="relative">
            <div className="overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full aspect-square rounded-xl overflow-hidden"
                >
                  <img
                    src={photos[currentSlide].src}
                    alt={photos[currentSlide].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel controls */}
            <motion.button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-foreground transition-colors"
              style={{ background: "rgba(15,15,15,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}
              whileHover={{ scale: 1.15, borderColor: "rgba(205,160,102,0.5)" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-foreground transition-colors"
              style={{ background: "rgba(15,15,15,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}
              whileHover={{ scale: 1.15, borderColor: "rgba(205,160,102,0.5)" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={16} />
            </motion.button>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {photos.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="w-2 h-2 rounded-full"
                  animate={{
                    background: i === currentSlide ? "#CDA066" : "rgba(255,255,255,0.15)",
                    scale: i === currentSlide ? 1.3 : 1
                  }}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={fadeRight}>
            <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-4">
              A Agência KWF trabalha com empresas tradicionais e digitais, onde percebemos um padrão: negócios sólidos, com produto bom estão perdendo receita e oportunidade por falta de sistema de aquisição.
            </p>
            <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-4">
              Por isso, pegamos as estratégias de aquisição mais validadas do mercado digital e as instalamos dentro de negócios tradicionais com um método claro.
            </p>
            <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-8">
              O Sistema KWF combina estratégia, funil de aquisição, automações, IA e gestão de dados desenhada para gerar o máximo de previsibilidade de resultados.
            </p>

            <motion.div
              className="grid grid-cols-3 gap-3"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {metrics.map((m) => (
                <motion.div key={m.label} variants={fadeUp} className="group">
                  <p className="text-gold text-[24px] md:text-[28px] font-bold leading-none">{m.prefix}{m.target}{m.suffix}</p>
                  <p className="text-muted-foreground text-[11px] md:text-[12px] mt-1 group-hover:text-foreground transition-colors">{m.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <motion.footer
      className="px-5 md:px-10 pt-8 pb-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
          <div>
            <img src={logoKwf} alt="Agência KWF" className="h-14 w-auto mb-1.5" />
            <p className="text-muted-foreground text-[13px] leading-[1.7] max-w-[360px]">
              Sistemas de aquisição e receita previsível para empresas de serviço.
            </p>
            <p className="text-muted-foreground text-xs italic opacity-50 mt-1">Know What to Focus.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <div>
              <p className="text-foreground text-sm font-semibold mb-2">Navegação</p>
              <div className="flex flex-col gap-1.5">
                {["Como funciona", "Resultados", "Sobre", "Dúvidas"].map((l) => (
                  <a
                    key={l}
                    href={`#${l === "Como funciona" ? "como-funciona" : l === "Dúvidas" ? "faq" : l.toLowerCase()}`}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors relative group"
                  >
                    {l}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
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
                <a href="/politica-privacidade" className="text-muted-foreground text-sm hover:text-foreground transition-colors relative group">
                  Política de Privacidade
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
                <a href="/termo-de-uso" className="text-muted-foreground text-sm hover:text-foreground transition-colors relative group">
                  Termo de Uso
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
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
    </motion.footer>
  );
}

/* ─── PAGE ─── */
export default function LandingPage() {
  return (
    <motion.div
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
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
    </motion.div>
  );
}
