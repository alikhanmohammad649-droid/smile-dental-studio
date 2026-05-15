import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Award, Users, Clock, type LucideIcon } from "lucide-react";

interface Stat { icon: LucideIcon; value: number; suffix: string; label: string; }

const STATS: Stat[] = [
  { icon: Award, value: 15, suffix: "+", label: "Years of Experience" },
  { icon: Users, value: 1000, suffix: "+", label: "Happy Patients" },
  { icon: Clock, value: 24, suffix: "/7", label: "Emergency Care" },
];

function StatCounter({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (v) => Math.round(v).toString());
  const Icon = stat.icon;

  useEffect(() => {
    if (inView) spring.set(stat.value);
  }, [inView, spring, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15 }}
      className="glass rounded-3xl p-8 text-center group"
    >
      <motion.div
        whileHover={{ rotate: 10 }}
        className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-white"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
      >
        <Icon className="w-8 h-8" />
      </motion.div>
      <div className="flex items-baseline justify-center">
        <motion.span className="text-5xl md:text-6xl font-extrabold gradient-text">{display}</motion.span>
        <span className="text-3xl font-bold gradient-text-mint">{stat.suffix}</span>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: "60%" } : {}}
        transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
        className="h-1 mx-auto mt-3 rounded-full"
        style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
      />
      <div className="mt-4 text-muted-foreground font-medium">{stat.label}</div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="glass inline-block px-4 py-1 rounded-full text-sm text-primary font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold"><span className="gradient-text">Trust. Quality. Care.</span></h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {STATS.map((s, i) => <StatCounter key={s.label} stat={s} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-full px-6 py-4 flex flex-wrap items-center justify-center gap-6 max-w-3xl mx-auto"
        >
          {["FDA Approved Equipment", "ISO Certified Clinic", "100% Sterilized Tools"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-sm font-medium">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping"
                      style={{ background: "hsl(var(--secondary))" }} />
                <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "hsl(var(--secondary))" }} />
              </span>
              {t}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
