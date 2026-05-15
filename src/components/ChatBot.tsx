import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, RotateCcw, ArrowLeft, ExternalLink } from "lucide-react";
import { CLINIC, buildWhatsAppLink } from "@/lib/clinic-info";

interface QR { id: string; label: string; answer: string; }

const QUICK_REPLIES: QR[] = [
  { id: "services", label: "🦷 Services we offer", answer: `We offer:\n${CLINIC.services.map((s) => `• ${s.title}`).join("\n")}` },
  { id: "doctor", label: "👨‍⚕️ About the doctor", answer: `${CLINIC.doctor}\n${CLINIC.doctorQualifications}\n\n${CLINIC.doctorBio}` },
  { id: "timings", label: "🕒 Clinic timings", answer: CLINIC.hours.map((h) => `${h.day}: ${h.time}`).join("\n") },
  { id: "location", label: "📍 Location & address", answer: CLINIC.address },
  { id: "contact", label: "📞 Contact number", answer: `Call us at ${CLINIC.phone}` },
  { id: "book", label: "📅 How to book an appointment", answer: "Visit the Book Now page or message us on WhatsApp with your preferred date and time." },
  { id: "emergency", label: "🚨 Emergency care", answer: CLINIC.emergency },
  { id: "faqs", label: "❓ FAQs", answer: CLINIC.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n") },
  { id: "why", label: "✅ Why choose us", answer: CLINIC.trust.map((t) => `• ${t}`).join("\n") },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<QR | null>(null);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
      >
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-75"
                style={{ background: "hsl(var(--secondary))" }} />
        )}
        <span className="relative">{open ? <X /> : <MessageCircle />}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[560px] z-[60] bg-card sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 text-white flex items-center justify-between"
                 style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>
              <div>
                <div className="font-bold">{CLINIC.shortName}</div>
                <div className="text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setActive(null)} className="p-1 hover:bg-white/20 rounded">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/20 rounded sm:hidden">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
              <div className="bg-white rounded-2xl p-3 mb-4 max-w-[85%]">
                <p className="text-sm">Hi! 👋 How can we help you today?</p>
              </div>

              {!active ? (
                <div className="space-y-2">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => setActive(q)}
                      className="w-full text-left bg-white hover:bg-primary/5 border border-border rounded-xl p-3 text-sm transition-all"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-primary/10 rounded-2xl p-3 ml-auto max-w-[85%] text-sm font-medium">
                    {active.label}
                  </div>
                  <div className="bg-white rounded-2xl p-4 max-w-[90%] text-sm whitespace-pre-line">
                    {active.answer}
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <a
                      href={buildWhatsAppLink(`Hi, I have a question about: ${active.label}`)}
                      target="_blank" rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-xl py-2.5 text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" /> Chat on WhatsApp
                    </a>
                    <button
                      onClick={() => setActive(null)}
                      className="flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 rounded-xl py-2.5 text-sm font-medium"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Menu
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
