import { motion } from "framer-motion";
import { GraduationCap, Award, Stethoscope } from "lucide-react";
import doctorImg from "@/assets/doctor.jpg";

const quals = [
  { icon: GraduationCap, title: "BDS", desc: "Bachelor of Dental Surgery" },
  { icon: Award, title: "MDS", desc: "Master of Dental Surgery" },
  { icon: Stethoscope, title: "Specialist", desc: "Oral & Maxillofacial Surgery" },
];

export default function DoctorSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 rounded-3xl pulse-glow z-0" />
              <img src={doctorImg} alt="Dr. Expert Dentist" className="w-full h-[600px] object-cover relative z-10" />
              <div className="absolute bottom-0 inset-x-0 h-1/3 z-20"
                   style={{ background: "linear-gradient(to top, hsl(var(--dental-navy)/0.7), transparent)" }} />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute bottom-6 right-6 glass rounded-2xl px-5 py-3 z-30"
              >
                <div className="text-2xl font-bold gradient-text">15+ Years</div>
                <div className="text-xs text-muted-foreground">Experience</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="glass inline-block px-4 py-1 rounded-full text-sm text-primary font-medium mb-4">
              Meet Our Expert
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Dr. Expert Dentist</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Leading dental specialist with extensive experience in advanced dental procedures, committed to providing the highest quality care with a gentle touch.
            </p>
            <div className="space-y-4">
              {quals.map((q, i) => (
                <motion.div
                  key={q.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                       style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>
                    <q.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold">{q.title}</div>
                    <div className="text-sm text-muted-foreground">{q.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
