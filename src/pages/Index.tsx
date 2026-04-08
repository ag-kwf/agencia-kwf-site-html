import { lazy, Suspense } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";

const SocialProof = lazy(() => import("@/components/sections/SocialProof").then(m => ({ default: m.SocialProof })));
const BeforeAfter = lazy(() => import("@/components/sections/BeforeAfter").then(m => ({ default: m.BeforeAfter })));
const Results = lazy(() => import("@/components/sections/Results").then(m => ({ default: m.Results })));
const HowItWorks = lazy(() => import("@/components/sections/HowItWorks").then(m => ({ default: m.HowItWorks })));
const DiagnosticForm = lazy(() => import("@/components/sections/DiagnosticForm").then(m => ({ default: m.DiagnosticForm })));
const FAQ = lazy(() => import("@/components/sections/FAQ").then(m => ({ default: m.FAQ })));
const About = lazy(() => import("@/components/sections/About").then(m => ({ default: m.About })));
const Footer = lazy(() => import("@/components/sections/Footer").then(m => ({ default: m.Footer })));

export default function LandingPage() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <Problems />
        <Suspense fallback={null}>
          <SocialProof />
          <BeforeAfter />
          <Results />
          <HowItWorks />
          <DiagnosticForm />
          <FAQ />
          <About />
          <Footer />
        </Suspense>
      </div>
    </LazyMotion>
  );
}
