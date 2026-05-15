import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DoctorSection from "@/components/DoctorSection";

export const Route = createFileRoute("/doctor")({
  head: () => ({ meta: [
    { title: "Meet Our Doctor — Smile Dental Care" },
    { name: "description", content: "Meet Dr. Expert Dentist with 15+ years of experience in advanced dental care." },
  ] }),
  component: () => <div><Header /><div className="pt-24"><DoctorSection /></div><Footer /></div>,
});
