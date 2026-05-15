export const CLINIC = {
  name: "Smile Dental Care",
  shortName: "Smile Clinic",
  tagline: "Where advanced technology meets compassionate care.",
  established: 2009,
  doctor: "Dr. Expert Dentist",
  doctorQualifications: "BDS, MDS — Specialist in Oral & Maxillofacial Surgery",
  doctorBio:
    "Leading dental specialist with extensive experience in advanced dental procedures, committed to providing the highest quality care with a gentle touch.",
  experience: "15+ Years",
  phone: "+91 6397050608",
  whatsappNumber: "916397050608",
  email: "info@smiledentalcare.com",
  address: "123 Healthcare Avenue, Medical District, City - 110001",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "9:00 AM – 5:00 PM" },
    { day: "Sunday", time: "10:00 AM – 2:00 PM" },
  ],
  emergency: "24/7 Emergency Care Available",
  appointmentSlotWindow: "10:00 AM – 8:00 PM (every 30 minutes)",
  services: [
    { title: "General Checkup", desc: "Comprehensive oral examinations." },
    { title: "Teeth Whitening", desc: "Professional whitening treatments." },
    { title: "Dental Implants", desc: "Permanent tooth replacement." },
    { title: "Braces & Aligners", desc: "Modern orthodontic solutions." },
    { title: "Root Canal", desc: "Gentle, pain-free root canal therapy." },
    { title: "Cosmetic Dentistry", desc: "Veneers and smile makeovers." },
  ],
  trust: [
    "FDA Approved Equipment",
    "ISO Certified Clinic",
    "100% Sterilized Tools",
    "1000+ Happy Patients",
    "24/7 Emergency Care",
  ],
  faqs: [
    { q: "How do you ensure hygiene?", a: "We use 100% sterilized tools and follow strict ISO-certified hygiene protocols for every patient." },
    { q: "Do you treat children?", a: "Yes, we offer gentle pediatric dentistry in a friendly, comforting environment." },
    { q: "Is root canal painful?", a: "No, modern root canal therapy is virtually painless thanks to advanced anesthesia and techniques." },
    { q: "How long do dental implants last?", a: "With proper care, dental implants can last a lifetime. We use premium titanium implants." },
    { q: "Do you handle dental emergencies?", a: "Yes, we provide 24/7 emergency dental care. Call us anytime." },
    { q: "What payment methods do you accept?", a: "We accept cash, all major credit/debit cards, UPI, and offer EMI options for major treatments." },
  ],
};

export const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${CLINIC.whatsappNumber}?text=${encodeURIComponent(message)}`;
