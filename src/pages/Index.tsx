import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";

const Problems = lazy(() => import("@/components/sections/Problems").then(m => ({ default: m.Problems })));
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
    <motion.div
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <Problems />
        <SocialProof />
        <BeforeAfter />
        <Results />
        <HowItWorks />
        <DiagnosticForm />
        <FAQ />
        <About />
        <Footer />
      </Suspense>
    </motion.div>
  );
}
