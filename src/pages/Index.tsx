import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { SocialProof } from "@/components/sections/SocialProof";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Results } from "@/components/sections/Results";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DiagnosticForm } from "@/components/sections/DiagnosticForm";
import { FAQ } from "@/components/sections/FAQ";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/sections/Footer";

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
