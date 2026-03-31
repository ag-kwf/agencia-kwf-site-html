import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import logoKwf from "@/assets/logo-kwf.png";

const links = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Resultados", href: "#resultados" },
  { label: "Sobre", href: "#sobre" },
  { label: "Dúvidas", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
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
