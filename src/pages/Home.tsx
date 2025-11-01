import { Navbar } from "../components/layout/Navbar";
import { HeroSection } from "../components/sections/HeroSection";
import { Footer } from "../components/layout/Footer";
import { StatsSection } from "@/components/sections/StatsSection";
import { Tabs } from "@/components/sections/Tabs";
import FeaturesSection from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { CtaSection } from "@/components/sections/CtaSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="relative z-10 w-full">
            <HeroSection />
          </div>

        <div className="relative flex flex-col items-center">
        
          <div
            className="absolute top-[100%] left-1/2 
              w-[95%] sm:w-[700px] md:w-[800px] lg:w-[900px] xl:w-[1000px]
              h-[280px] sm:h-[300px] md:h-[320px]
              bg-[radial-gradient(circle_at_center_top,_#A3DC2F_20%,_rgba(0,0,0,0)_80%)]
              -translate-x-1/2 -translate-y-1/2 blur-[120px] opacity-70
              pointer-events-none z-0"
          />

          
        </div>

        <div className="sticky top-0 z-10 py-4 ">
          <Tabs />
        </div>

      <FeaturesSection/>
      <TestimonialsSection/>
      <PricingSection/>
      <CtaSection/>
      </main>

      <Footer />
    </div>    
  );
};

export default Index;
