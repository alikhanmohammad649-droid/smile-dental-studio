import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const REVIEWS = [
  { name: "Priya Sharma", text: "Excellent dental care! Dr. provided painless treatment and the staff was very friendly. Highly recommend for anyone looking for quality dental services.", date: "2 weeks ago" },
  { name: "Rajesh Kumar", text: "Best dental clinic in Pilibhit. Very professional and hygienic environment. Got my root canal done here and it was completely painless.", date: "1 month ago" },
  { name: "Anita Gupta", text: "Amazing experience! The doctor is very skilled and explains everything clearly. My whole family gets treatment here. Thank you for the wonderful service!", date: "3 weeks ago" },
  { name: "Mohit Verma", text: "Very satisfied with my teeth cleaning and whitening. The clinic has modern equipment and the treatment was quick and effective.", date: "1 week ago" },
  { name: "Sunita Devi", text: "Got my dental implant done here. Excellent work by the doctor. Very caring and professional approach. Highly recommended!", date: "2 months ago" },
  { name: "Vikram Singh", text: "Best experience ever! The clinic is very clean and well-maintained. Doctor is very patient and answers all queries. Will definitely visit again.", date: "1 month ago" },
];

const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="w-4 h-4">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.97 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7C13.42 13.62 18.27 9.75 24 9.75z" />
  </svg>
);

export default function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="glass inline-block px-4 py-1 rounded-full text-sm text-primary font-medium mb-4">
            Patient Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">What Our Patients Say</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-6 relative"
            >
              <Quote className="absolute top-4 right-4 w-12 h-12 text-primary opacity-10" />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-foreground/80 italic mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                     style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>
                  {r.name[0]}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 text-xs">
                  <GoogleG /> Review
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="rounded-full px-8 py-4 font-semibold text-white inline-flex items-center gap-2"
            style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)", boxShadow: "0 10px 30px rgba(245,158,11,0.4)" }}
          >
            <Star className="w-5 h-5 fill-white" /> View All Reviews on Google
          </button>
        </div>
      </div>
    </section>
  );
}
