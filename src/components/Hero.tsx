import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import FloatingTooth from "./FloatingTooth";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-pattern pt-24 pb-16">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
           style={{ background: "hsl(210 100% 40% / 0.2)" }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl"
           style={{ background: "hsl(165 100% 43% / 0.2)" }} />

      <FloatingTooth size={60} className="top-20 left-[10%]" delay={0} />
      <FloatingTooth size={40} className="top-40 right-[15%]" delay={1} />
      <FloatingTooth size={70} className="bottom-40 left-[20%]" delay={2} />
      <FloatingTooth size={50} className="bottom-20 right-[10%]" delay={3} />
      <FloatingTooth size={45} className="top-1/3 left-[5%]" delay={4} />
      <FloatingTooth size={80} className="top-1/4 right-[8%]" delay={5} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Premium Dental Care Experience</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6">
            <span className="gradient-text">Smile</span>
            <span> Dental</span>
            <br />
            <span>Care</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Where advanced technology meets compassionate care.{" "}
            <span className="gradient-text-mint font-semibold">Your perfect smile awaits.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/book">
              <button className="btn-primary-3d pulse-glow rounded-full px-8 py-4 font-semibold flex items-center gap-2">
                Book Your Appointment <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to="/services">
              <button className="rounded-full px-8 py-4 font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
                Explore Services
              </button>
            </Link>
            <button
              className="rounded-full px-8 py-4 font-semibold text-white flex items-center gap-2 cursor-default"
              style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)", boxShadow: "0 10px 30px rgba(245,158,11,0.4)" }}
            >
              <Star className="w-5 h-5 fill-white" /> Rate Us on Google
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
