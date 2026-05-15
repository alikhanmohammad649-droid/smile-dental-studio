import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Services from "@/components/Services";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Our Services — Smile Dental Care" },
    { name: "description", content: "Comprehensive dental services: checkups, whitening, implants, braces, root canal, cosmetic dentistry." },
  ] }),
  component: () => <div><Header /><div className="pt-20"><Services /></div><Footer /></div>,
});
