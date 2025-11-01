import { motion } from "framer-motion";
import { Check, Sparkle, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/api/supabaseClient";
// دالة fetch data من supabase
async function fetchPlans() {
  const { data, error } = await supabase.from("plans").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export function PricingSection() {
  const { data: plans, isLoading, isError } = useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });

  if (isLoading)
    return (
      <div className="py-20 text-center text-muted-foreground">
        Loading plans...
      </div>
    );

  if (isError)
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load plans.
      </div>
    );

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-dynamicBorder text-sm font-medium mb-4">
            <Tag className="scale-x-[-1]" />
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Find the right plan
          </h2>
          <p className="text-base sm:text-lg text-textP max-w-3xl mx-auto">
            Invest in your company's future with our comprehensive financial
            solution. Contact us for pricing details and see how we can help you
            streamline your finances and reach your business goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id || plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-background rounded-2xl border p-8 md:p-10 lg:p-12 transition-all duration-300 hover:shadow-card-hover flex flex-col justify-between"
            >
              {plan.is_popular && (
                <div className="absolute top-4 right-4 border border-[#33C6AB] rounded-full">
                  <span className="px-3 py-1 text-[#33C6AB] text-sm font-medium rounded-full flex justify-center items-center gap-1.5">
                    <Sparkle className="w-4 h-4" /> Popular
                  </span>
                </div>
              )}

              <div className="mb-6 text-center">
                <h3
  className={`text-xl sm:text-2xl font-normal mb-2 ${
    plan.name === "Basic"
      ? "text-foreground"
      : plan.name === "Pro"
      ? "text-primary"
      : plan.name === "Enterprise"
      ? "text-dynamicBorder"
      : "text-foreground"
  }`}
>
  {plan.name}
</h3>
                <p className="text-sm text-textP mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1 justify-center py-6">
                  <span className="text-4xl sm:text-5xl font-bold">
                    ${plan.price}
                  </span> 
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex flex-col justify-start h-80">
                {plan.features?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
  size="lg"
  className={`w-full rounded-full ${
    plan.name === "Basic"
      ? "bg-muted text-foreground hover:bg-muted/80 border-t border-l border-r border-[#3B3B3B] "
      : plan.name === "Pro"
      ? "bg-foreground text-background hover:bg-foreground/90"
      : plan.name === "Enterprise"
      ? "bg-[#A3DC2F] text-white hover:bg-[#A3DC2F]/90"
      : "bg-popover text-secondary-foreground hover:bg-secondary/80"
  }`}
>
  {plan.btn}
</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
