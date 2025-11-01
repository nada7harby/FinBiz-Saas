import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/api/supabaseClient";
import commalight from "../../assets/images/comma_light.png";
import commadark from "../../assets/images/comma_dark.png";

export function TestimonialsSection() {
const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  const comma = theme === "dark" ? commalight : commadark;

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "theme") {
        const newTheme = event.newValue as "light" | "dark";
        if (newTheme) setTheme(newTheme);
      }
    };

    const handleLocalChange = () => {
      const current = localStorage.getItem("theme") as "light" | "dark";
      if (current && current !== theme) setTheme(current);
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleLocalChange, 100); // يلتقط تغييرات داخل نفس التبويب

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [theme]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  async function fetchTestimonials() {
    const { data, error } = await supabase.from("testimonials").select("*");
    if (error) throw error;
    return data;
  }

  const { data: testimonials = [], isLoading, isError } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  useEffect(() => {
    const handleStorage = () => {
      const storedTheme = localStorage.getItem("theme") as "light" | "dark";
      if (storedTheme) setTheme(storedTheme);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (isLoading)
    return <div className="text-center p-10">Loading testimonials...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500 p-10">
        Error loading testimonials.
      </div>
    );

  return (
    <section className="py-20 bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-dynamicBorder text-sm font-medium mb-4">
            <MessageSquare />
            Testimonials
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            What are people saying
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Thank you for your testimonial. Our clients are incredibly special
            to us and one comment or a great review can easily brighten our day
            and make all our efforts feel so well!
          </p>
        </motion.div>

        <div className="relative lg:ml-[13.5rem]">
          <div
            ref={scrollRef}
            className="flex justify-start gap-6 overflow-x-auto flex-nowrap pl-4 hide-scrollbar scroll-smooth"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl p-8 border border-border shadow-card transition-all duration-300 w-[660px] flex-shrink-0"
              >
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.feedback}"
                </p>

                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={`${testimonial.img}`}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {testimonial.role}
                      </p>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-[#FFC250] text-[#FFC250]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                      <img src={comma} alt="quote" className="w-[67.5px] h-[48px]" />

                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              onClick={scrollNext}
              className="rounded-full bg-primary"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
