import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/api/supabaseClient";
import { SpendOverviewCard } from "../ui/SpendOverviewCard";

async function fetchDashboardData() {
  const [spendData, top_metrics, employee_categories] = await Promise.all([
    supabase.from("spendData").select("*"),
    supabase.from("top_metrics").select("*"),
    supabase.from("employee_categories").select("*"),
  ]);

  if (spendData.error) throw spendData.error;
  if (top_metrics.error) throw top_metrics.error;
  if (employee_categories.error) throw employee_categories.error;

  return {
    spendData: spendData.data || [],
    topMetrics: top_metrics.data || [],
    employeeCategories: employee_categories.data || [],
  };
}

export function StatsSection() {
  const [activeTab, setActiveTab] = useState("Yearly");

  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (isError) return <div className="text-center text-red-500 p-10">Error loading data</div>;
console.log(data);

  const { spendData, topMetrics, employeeCategories } = data;

  return (
    <section className="py-10 lg:m-10 relative bg-background rounded-lg ">
      <div className="container relative mx-auto p-4 sm:px-6 lg:px-8 rounded-lg bg-surface shadow-lg">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {topMetrics.map((metric, index) => (
            <motion.div
              key={metric.id || metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <span className={`text-xs font-medium ${
                  index === 0 ? "text-green-500" : index === 1 ? "text-red-500" : "text-blue-500"
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="flex items-end justify-between gap-4">
                <div className="text-4xl font-bold">{metric.value}</div>
                <div className="flex items-end gap-1 h-12">
                {metric.bars?.map((height, i) => {
  const raw = metric.bar_color?.[i];
  const match = raw ? String(raw).match(/#([A-Fa-f0-9]{3,8})/) : null;
  const bgHex = match ? `#${match[1]}` : null;
  const classFallback = !bgHex && raw ? String(raw) : "";
  return (
    <div
      key={i}
      className={`w-1 rounded-sm ${classFallback}`}
      style={{ height: `${height}%`, ...(bgHex ? { backgroundColor: bgHex } : {}) }}
    />
  );
})}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-sm text-muted-foreground mb-3">Total Balance</h3>
              <div className="text-4xl font-bold mb-4">$350.0</div>
              <div className="w-full bg-foreground text-background px-4 py-2 rounded-lg text-center mb-4">
                Transfer
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm text-muted-foreground">Total Income</h3>
                <span className="text-xs text-muted-foreground">92%</span>
              </div>
              <div className="text-4xl font-bold">$320.0</div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm text-muted-foreground">Total Expense</h3>
                <span className="text-xs text-muted-foreground">92%</span>
              </div>
              <div className="text-4xl font-bold">$220.0</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-card border border-border rounded-2xl lg:p-6 p-2 w-lg"
          >
            <SpendOverviewCard data={spendData} />
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-card border border-border rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Employee</h3>
            <div className="space-y-6">
              {employeeCategories.map((category, index) => (
                <div key={category.id || category.label} className="space-y-3">
                  <span className="text-sm text-foreground">{category.label}</span>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${category.progressF}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                      className="h-full bg-muted-foreground/40 rounded-full"
                    />
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${category.progressL}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                      className="h-full bg-muted-foreground/40 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
