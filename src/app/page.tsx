import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { Hero } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Portfolio } from "@/components/sections/portfolio";
import { Services } from "@/components/sections/services";
import { WhyMe } from "@/components/sections/why-me";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <CursorGlow />
      <NoiseOverlay />
      <Navbar />
      <main className="relative">
        <Hero />
        <MarqueeStrip />
        <About />
        <Skills />
        <Portfolio />
        <Services />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
