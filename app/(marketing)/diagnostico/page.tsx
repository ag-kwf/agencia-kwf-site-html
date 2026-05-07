import type { Metadata } from 'next';
import {
  Hero,
  Problems,
  SocialProof,
  BeforeAfter,
  Results,
  HowItWorks,
  DiagnosticForm,
  FAQ,
  About,
} from "@/components/sections/diagnostico";
import { AnimatedGridBg } from "@/components/ui/animated-grid-bg";

export const metadata: Metadata = {
  title: 'Diagnóstico de Marketing — Sistemas de Aquisição de Clientes | Agência KWF',
  description: 'Transforme seu marketing em um sistema de aquisição de clientes previsível. Metodologia, processo e inteligência artificial da captação ao fechamento. Diagnóstico em 10 minutos.',
  alternates: { canonical: 'https://agenciakwf.com.br/diagnostico' },
  openGraph: {
    title: 'Diagnóstico de Marketing — Agência KWF',
    description: 'Seu marketing gera relatório de likes ou gera clientes? Instalamos sistemas de aquisição com metodologia, processo e IA. Diagnóstico em 10 minutos.',
    url: 'https://agenciakwf.com.br/diagnostico',
    siteName: 'Agência KWF',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://agenciakwf.com.br/og-image.jpg', width: 1200, height: 630, alt: 'Agência KWF — Sistemas de Aquisição de Clientes' }],
  },
};

export default function DiagnosticoPage() {
  return (
    <main id="conteudo-principal" role="main">
      <AnimatedGridBg>
        <Hero />
        <Problems />
      </AnimatedGridBg>
      <SocialProof />
      <BeforeAfter />
      <Results />
      <AnimatedGridBg fadeTop fadeBottom={false}>
        <HowItWorks />
        <DiagnosticForm />
        <FAQ />
        <About />
      </AnimatedGridBg>
    </main>
  );
}
