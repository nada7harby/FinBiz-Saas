import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CtaPhoto from "../../assets/images/Cta.png";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-muted">
      <div className="absolute inset-0" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background rounded-3xl p-6 sm:p-10 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-center lg:text-left"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Let's Upgrade your
                <br className="hidden sm:block" />
                finances experience
                <br className="hidden sm:block" />
                by using FinBiz
              </h2>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                <Button
                  size="lg"
                  className="shadow-lg shadow-primary/20 bg-[#A3DC2F] text-black w-full sm:w-auto rounded-full"
                >
                  Request Demo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Watch Video
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[500px]">
                <img
                  src={CtaPhoto}
                  alt="CTA illustration"
                  className="w-full h-auto object-cover rounded-2xl shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
