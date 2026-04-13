import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { SocialProof } from "@/components/sections/SocialProof";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Results } from "@/components/sections/Results";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DiagnosticForm } from "@/components/sections/DiagnosticForm";
import { FAQ } from "@/components/sections/FAQ";
import { About } from "@/components/sections/About";
import { AnimatedGridBg } from "@/components/ui/animated-grid-bg";

export default function HomePage() {
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
