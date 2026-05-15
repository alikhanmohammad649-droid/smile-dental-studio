import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { CLINIC } from "@/lib/clinic-info";

export default function Footer() {
  return (
    <footer className="relative bg-foreground text-background pt-24 pb-8 overflow-hidden">
      <svg className="absolute top-0 inset-x-0 w-full -translate-y-px" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="hsl(var(--background))" />
      </svg>

      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: "hsl(var(--dental-blue) / 0.15)" }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: "hsl(var(--dental-mint) / 0.15)" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-xl"
                   style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>S</div>
              <div className="font-bold text-lg">{CLINIC.shortName}</div>
            </Link>
            <p className="text-sm text-background/70">{CLINIC.tagline}</p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-background/70">
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {CLINIC.address}</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {CLINIC.phone}</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {CLINIC.email}</div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Opening Hours</h3>
            <table className="text-sm text-background/70">
              <tbody>
                {CLINIC.hours.map((h) => (
                  <tr key={h.day}><td className="pr-4 py-1">{h.day}</td><td>{h.time}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-background/60">
          © {new Date().getFullYear()} Smile Dental Care. All rights reserved. Built with ♥ for healthy smiles.
        </div>
      </div>
    </footer>
  );
}
