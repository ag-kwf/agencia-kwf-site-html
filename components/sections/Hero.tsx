'use client';

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import Image from "next/image";
import { trackCTAClick } from "@/lib/tracking";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Apresentação principal"
      className="relative pt-[88px] md:pt-[130px] pb-8 md:pb-20 px-5 md:px-10 overflow-hidden md:min-h-[80vh] flex items-center"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.4) 100%), radial-gradient(ellipse at 60% 50%, rgba(19,150,87,0.08) 0%, transparent 60%), radial-gradient(ellipse at 30% 40%, rgba(198,165,78,0.06) 0%, transparent 50%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full pointer-events-none"
        style={{ background: "hsl(var(--primary) / 0.15)", filter: "blur(120px)" }}
        animate={{ y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full pointer-events-none"
        style={{ background: "hsl(var(--gold) / 0.10)", filter: "blur(100px)" }}
        animate={{ y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
        <div className="w-full md:w-1/2 order-1 text-center md:text-left">
          <span className="inline-block text-gold font-semibold uppercase tracking-[0.15em] text-[11px] md:text-xs mb-3 border border-gold/30 rounded-full px-4 py-1.5 bg-gold/5">
            Empresas que Faturam +R$150mil/Mês
          </span>

          <h1
            className="font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-4 text-2xl"
            style={{ fontSize: "clamp(18px, 2.8vw, 31px)", textWrap: "balance" }}
          >
            Transforme seu Marketing em um Sistema de Aquisição{" "}
            <span className="text-gold">Previsível</span> com Método e{" "}
            <span className="text-gold">Inteligência Artificial</span>
          </h1>

          <p
            className="text-muted-foreground leading-[1.7] mb-6 md:text-sm text-xs"
            style={{ textWrap: "balance" as React.CSSProperties["textWrap"] }}
          >
            Escale com sistema, clareza e mapeando todos os gargalos operacionais que podem estar travando os seus resultados.
          </p>

          <div>
            <MagneticButton
              href="#diagnostico"
              onClick={() => trackCTAClick('hero', 'QUERO UM PRÉ-DIAGNÓSTICO')}
              className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-7 py-3.5 hover:bg-green-hover transition-all shadow-[0_0_30px_rgba(19,150,87,0.2)] hover:shadow-[0_0_50px_rgba(19,150,87,0.35)]"
            >
              Quero um Pré-diagnóstico
            </MagneticButton>
          </div>
        </div>

        <div className="w-full md:w-1/2 order-2 flex items-center justify-center">
          <Image
            src="/hero-chip.webp"
            alt="Sistema KWF - Marketing, Vendas, Tecnologia, Digital"
            className="w-full max-w-[200px] md:max-w-[280px] h-auto"
            width={560}
            height={504}
            priority
          />
        </div>
      </div>
    </section>
  );
}
