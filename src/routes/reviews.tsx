import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [
    { title: "Patient Reviews — Smile Dental Care" },
    { name: "description", content: "Read what our patients have to say about our dental care services." },
  ] }),
  component: () => <div><Header /><div className="pt-24"><Testimonials /></div><Footer /></div>,
});
