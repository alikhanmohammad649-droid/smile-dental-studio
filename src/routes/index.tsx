import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import DoctorSection from "@/components/DoctorSection";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smile Dental Care — Premium Dental Clinic" },
      { name: "description", content: "Comprehensive dental solutions with 15+ years of experience. Book your appointment today." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <DoctorSection />
        <Services />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
