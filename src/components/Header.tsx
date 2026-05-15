import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/clinic-info";

const links = [
  { to: "/", label: "Home" },
  { to: "/doctor", label: "Doctor" },
  { to: "/services", label: "Services" },
  { to: "/reviews", label: "Reviews" },
  { to: "/why-us", label: "Why Us" },
  { to: "/book", label: "Book Now" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-xl"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
          >
            S
          </motion.div>
          <div className="leading-tight">
            <div className="font-bold text-lg gradient-text">{CLINIC.shortName}</div>
            <div className="text-xs text-muted-foreground">Dental Care</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.slice(0, 5).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                pathname === l.to
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href={`tel:${CLINIC.phone}`} className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary">
            <Phone className="w-4 h-4" />
            <span>+91 97190 30530</span>
          </a>
          <Link to="/book">
            <Button className="rounded-full btn-primary-3d border-0">Book Appointment</Button>
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon"><Menu /></Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="gradient-text text-2xl mb-6">{CLINIC.shortName}</SheetTitle>
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium ${
                    pathname === l.to ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <a href={`tel:${CLINIC.phone}`} className="flex items-center gap-2 px-4 py-3 text-foreground/80">
                <Phone className="w-4 h-4" /> {CLINIC.phone}
              </a>
              <Link to="/book" onClick={() => setOpen(false)}>
                <Button className="w-full mt-2 btn-primary-3d border-0 rounded-full">Book Appointment</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
