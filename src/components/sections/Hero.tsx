import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import heroChip from "@/assets/hero-chip.png";

export function Hero() {
  return (
    <section
      className="relative pt-[88px] md:pt-[100px] pb-8 md:pb-12 px-5 md:px-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 60% 50%, rgba(19,150,87,0.08) 0%, transparent 60%), radial-gradient(ellipse at 30% 40%, rgba(198,165,78,0.06) 0%, transparent 50%)",
      }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
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
              className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-7 py-3.5 hover:bg-green-hover transition-all shadow-[0_0_30px_rgba(19,150,87,0.2)] hover:shadow-[0_0_50px_rgba(19,150,87,0.35)]"
            >
              Quero um Pré-diagnóstico
            </MagneticButton>
          </div>
        </div>

        <div className="w-full md:w-1/2 order-2 flex items-center justify-center">
          <motion.img
            src={heroChip}
            alt="Sistema KWF - Marketing, Vendas, Tecnologia, Digital"
            className="w-full max-w-[200px] md:max-w-[280px] h-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    </section>
  );
}
