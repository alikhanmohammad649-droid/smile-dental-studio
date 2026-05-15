import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

export const Route = createFileRoute("/book")({
  head: () => ({ meta: [
    { title: "Book Appointment — Smile Dental Care" },
    { name: "description", content: "Book your dental appointment online. Choose a date and time that works for you." },
  ] }),
  component: () => <div><Header /><BookingForm /><Footer /></div>,
});
