import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mic, Calendar, Clock, User, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  patient_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
});
type FormData = z.infer<typeof schema>;

function getDays() {
  const days: { date: Date; label: string }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    let label = "";
    if (i === 0) label = "Today";
    else if (i === 1) label = "Tomorrow";
    else label = d.toLocaleDateString("en-US", { weekday: "short" });
    days.push({ date: d, label });
  }
  return days;
}

function getSlots() {
  const slots: string[] = [];
  for (let h = 10; h < 20; h++) {
    for (const m of [0, 30]) {
      const hh = ((h + 11) % 12) + 1;
      const ampm = h < 12 ? "AM" : "PM";
      slots.push(`${hh}:${m.toString().padStart(2, "0")} ${ampm}`);
    }
  }
  return slots;
}

const fmtDate = (d: Date) => d.toISOString().split("T")[0];

export default function BookingForm() {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [listening, setListening] = useState(false);
  const days = getDays();
  const slots = getSlots();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("get_booked_slots", { _appointment_date: fmtDate(date) });
      if (Array.isArray(data)) setBookedSlots(data.map((r: { appointment_time?: string } | string) =>
        typeof r === "string" ? r : (r.appointment_time ?? "")
      ));
      else setBookedSlots([]);
    })();
  }, [date]);

  const isPast = (slot: string) => {
    if (fmtDate(date) !== fmtDate(new Date())) return false;
    const [time12, ampm] = slot.split(" ");
    const [h, m] = time12.split(":").map(Number);
    const h24 = ampm === "PM" && h !== 12 ? h + 12 : ampm === "AM" && h === 12 ? 0 : h;
    const slotDate = new Date();
    slotDate.setHours(h24, m, 0, 0);
    return slotDate.getTime() < Date.now() + 60 * 60 * 1000;
  };

  const startVoice = () => {
    const w = window as unknown as { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) { toast.error("Voice input not supported"); return; }
    const rec = new SR();
    rec.lang = "en-IN";
    rec.onresult = (e: any) => setValue("patient_name", e.results[0][0].transcript);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    setListening(true);
    rec.start();
  };

  const onSubmit = async (data: FormData) => {
    if (!time) { toast.error("Please select a time slot"); return; }
    setSubmitting(true);
    const dateStr = fmtDate(date);
    const { error } = await supabase.from("appointments").insert({
      patient_name: data.patient_name,
      phone: data.phone,
      appointment_date: dateStr,
      appointment_time: time,
    });
    setSubmitting(false);
    if (error) {
      if (error.code === "23505") toast.error("That slot was just booked. Pick another time.");
      else toast.error("Could not book. Please try again.");
      return;
    }
    toast.success("Appointment booked!");
    const msg = `Hello Doctor, I would like to book an appointment.\n\nName: ${data.patient_name}\nPhone: ${data.phone}\nAppointment Date: ${dateStr}\nAppointment Time: ${time}`;
    const wa = `https://wa.me/916397050608?text=${encodeURIComponent(msg)}`;
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `whatsapp://send?phone=916397050608&text=${encodeURIComponent(msg)}`;
      setTimeout(() => window.open(wa, "_blank"), 1500);
    } else {
      window.open(wa, "_blank");
    }
  };

  return (
    <section className="py-24 pt-32 bg-hero-pattern min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="gradient-text">Book Your Appointment</span></h1>
          <p className="text-muted-foreground">Choose a date and time that works for you</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 md:p-10 max-w-3xl mx-auto space-y-8"
        >
          <div>
            <label className="flex items-center gap-2 font-semibold mb-2"><User className="w-4 h-4" /> Full Name</label>
            <div className="flex gap-2">
              <Input {...register("patient_name")} placeholder="Enter your name" className="flex-1" />
              <Button type="button" onClick={startVoice} variant="outline" size="icon"
                      className={listening ? "bg-red-50" : ""}>
                <Mic className={`w-4 h-4 ${listening ? "text-red-500 animate-pulse" : ""}`} />
              </Button>
            </div>
            {errors.patient_name && <p className="text-sm text-destructive mt-1">{errors.patient_name.message}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold mb-2"><Phone className="w-4 h-4" /> Phone Number</label>
            <Input {...register("phone")} type="tel" maxLength={10} placeholder="10-digit mobile" />
            {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold mb-3"><Calendar className="w-4 h-4" /> Pick a Date</label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {days.map((d) => {
                const active = fmtDate(d.date) === fmtDate(date);
                return (
                  <button
                    type="button"
                    key={d.date.toString()}
                    onClick={() => { setDate(d.date); setTime(""); }}
                    className={`flex-shrink-0 rounded-2xl p-3 min-w-[80px] text-center transition-all ${
                      active ? "btn-primary-3d border-0" : "glass hover:bg-white"
                    }`}
                  >
                    <div className="text-xs font-medium">{d.label}</div>
                    <div className="text-2xl font-bold">{d.date.getDate()}</div>
                    <div className="text-xs">{d.date.toLocaleDateString("en-US", { month: "short" })}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold mb-3"><Clock className="w-4 h-4" /> Pick a Time</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((s) => {
                const booked = bookedSlots.includes(s);
                const past = isPast(s);
                const disabled = booked || past;
                const active = time === s;
                return (
                  <button
                    type="button"
                    key={s}
                    disabled={disabled}
                    onClick={() => setTime(s)}
                    className={`rounded-xl py-2 text-sm font-medium transition-all ${
                      active ? "btn-primary-3d border-0" :
                      disabled ? "bg-muted text-muted-foreground line-through cursor-not-allowed" :
                      "glass hover:bg-white"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <Button type="submit" disabled={submitting} className="w-full btn-primary-3d border-0 rounded-full py-6 text-lg font-semibold">
            {submitting ? "Booking..." : <>Confirm Appointment <ArrowRight className="w-5 h-5 ml-2" /></>}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
