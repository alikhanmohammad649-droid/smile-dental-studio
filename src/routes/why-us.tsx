import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/WhyChooseUs";

export const Route = createFileRoute("/why-us")({
  head: () => ({ meta: [
    { title: "Why Choose Us — Smile Dental Care" },
    { name: "description", content: "Discover why patients trust us: FDA-approved equipment, ISO certified clinic, 1000+ happy patients." },
  ] }),
  component: () => <div><Header /><div className="pt-24"><WhyChooseUs /></div><Footer /></div>,
});
