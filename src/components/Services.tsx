import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope, Sparkles, CircleDot, Smile, HeartPulse, Palette,
  type LucideIcon,
} from "lucide-react";
import checkup from "@/assets/service-checkup.jpg";
import whitening from "@/assets/service-whitening.jpg";
import implants from "@/assets/service-implants.jpg";
import braces from "@/assets/service-braces.jpg";
import rootcanal from "@/assets/service-rootcanal.jpg";
import cosmetic from "@/assets/service-cosmetic.jpg";

interface Service {
  title: string;
  desc: string;
  icon: LucideIcon;
  image: string;
}

const SERVICES: Service[] = [
  { title: "General Checkup", icon: Stethoscope, image: checkup, desc: "Comprehensive oral examinations with state-of-the-art diagnostic tools for complete dental health assessment." },
  { title: "Teeth Whitening", icon: Sparkles, image: whitening, desc: "Professional whitening treatments that safely brighten your smile by several shades in just one visit." },
  { title: "Dental Implants", icon: CircleDot, image: implants, desc: "Permanent tooth replacement solutions using titanium implants that look and function like natural teeth." },
  { title: "Braces & Aligners", icon: Smile, image: braces, desc: "Modern orthodontic solutions including invisible aligners for a perfectly aligned, confident smile." },
  { title: "Root Canal", icon: HeartPulse, image: rootcanal, desc: "Gentle, pain-free root canal therapy to save damaged teeth and eliminate infection with precision." },
  { title: "Cosmetic Dentistry", icon: Palette, image: cosmetic, desc: "Transform your smile with veneers, bonding, and complete smile makeovers tailored to your vision." },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const Icon = service.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className="glass rounded-2xl overflow-hidden group relative"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={service.image} alt={service.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--dental-navy)/0.7), transparent)" }} />
        <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl flex items-center justify-center text-white"
             style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
        <p className="text-sm text-muted-foreground">{service.desc}</p>
      </div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity"
           style={{ borderColor: "hsl(var(--dental-mint))" }} />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity"
           style={{ borderColor: "hsl(var(--dental-mint))" }} />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="py-24 relative bg-muted/30">
      <svg className="absolute top-0 inset-x-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="hsl(var(--background))" />
      </svg>
      <div className="container mx-auto px-4 relative z-10 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="glass inline-block px-4 py-1 rounded-full text-sm text-primary font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Comprehensive Dental Solutions</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
        </div>
      </div>
      <svg className="absolute bottom-0 inset-x-0 w-full rotate-180" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="hsl(var(--background))" />
      </svg>
    </section>
  );
}
