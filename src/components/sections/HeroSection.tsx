import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import photo from "../../assets/images/photo.png";
import photo2 from "../../assets/images/photo2.png";
import photo3 from "../../assets/images/photo3.png";
import photo4 from "../../assets/images/photo(1).png";
import { StatsSection } from "./StatsSection";


export function HeroSection() {
  const images = [photo, photo2, photo3, photo4];

  return (
   <section className="lg:h-[1640px] md-h-[1800px] sm:h-[2400px] h-[2850px]">
     <div className="relative pt-[200px]  pb-20  h-[1291px] bg-muted">

      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-[8px]  py-[4px] rounded-full border-t border-l border-r border-[#3B3B3B] bg-baground/100 text-sm font-medium mb-6"
          >
            <span className="pl-[8px] pr-[4px] py-[4px] rounded-full bg-primary text-white" >New</span>
          <span className="text-dynamicBorder flex">  Introducing AI Automation <ArrowRight  className="pl-[6px]" /></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            The Finance Solutions
            <br />
              For Your Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-textP mb-8 max-w-2xl mx-auto"
          >
            Empower your finance with this modern software's efficiency and experience of small and medium-sized business.
          </motion.p>

        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="flex items-center justify-between  bg-BgInput rounded-full max-w-lg mx-auto px-2 py-1"
>
  <Input
    type="email"
    placeholder="Enter your email adress"
    className="
      bg-transparent
      text-gray-300
      placeholder:text-gray-500
      border-none
      focus-visible:ring-0
      focus-visible:ring-offset-0
      flex-1
      h-12
      px-4
    "
  />
  <Button
    size="lg"
    className="
      h-12
      bg-foreground
      text-background
      font-medium
      rounded-full
      px-6
      hover:bg-gray-200
      transition
    "
  >
    Book a Demo
  </Button>
</motion.div>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center flex-col  gap-2 mb-16 mt-12"
          >
            <div className="flex -space-x-2">
          {images.map((img, index) => (
        <img
          key={index}
          src={img}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-glow border-2 border-background"
          alt={`logo-${index}`}
        />
      ))}
            </div>
            
            <span className="text-sm text-bold text-textP " >1,200+ reviews (4.9 of 5)</span>
          </motion.div>         
        </motion.div>
      </div>

      <div className="absolute lg:left-[192px] top-[819px] lg:right-[192px]">
        <StatsSection/>
      </div>
    </div>
   </section>
  );
}
