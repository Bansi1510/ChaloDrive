"use client";

import { motion } from "motion/react";
import { MapPin, Star, Truck, Zap, ShieldCheck, Lock, Headphones } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const stats = [
  { icon: Truck, value: "12K+", label: "Vendors" },
  { icon: MapPin, value: "50+", label: "Cities" },
  { icon: Star, value: "4.9", label: "Rating" },
  { icon: Zap, value: "2min", label: "Booking" },
];

const badges = [
  { icon: ShieldCheck, label: "GST Verified" },
  { icon: Lock, label: "Secure Pay" },
  { icon: Headphones, label: "24/7 Support" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});
type Props = {
  onLogin: () => void
}
const Hero = ({ onLogin }: Props) => {
  const { userData } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  return (
    <section className="relative min-h-screen bg-[#0a0f1a] flex items-center justify-center overflow-hidden px-4">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-orange-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center py-24">

        {/* Badge */}
        <motion.span {...fade(0)} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-400 border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 rounded-full mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
          Vendor Vehicle Booking
        </motion.span>

        {/* Headline */}
        <motion.h1 {...fade(0.15)} className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tight mb-5">
          Book Trucks.<br />
          <span className="text-orange-400">Move Faster.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p {...fade(0.3)} className="text-white/45 text-base leading-relaxed mb-10 max-w-sm mx-auto">
          Connect with verified vendors instantly — transparent pricing, real-time availability, zero hassle.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(0.45)} className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <motion.button
            onClick={() => !userData ? onLogin : router.push("/user/book")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm bg-orange-500 hover:bg-orange-400 transition-colors shadow-[0_0_28px_rgba(249,115,22,0.35)]"
          >
            <Truck size={16} /> Book a Vehicle
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white/60 text-sm border border-white/10 hover:border-white/25 hover:text-white transition-all"
          >
            <MapPin size={16} /> View Vendors
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div {...fade(0.6)} className="grid grid-cols-4 gap-3 mb-10">
          {stats.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4, borderColor: "rgba(249,115,22,0.4)" }}
              className="bg-white/5 border border-white/10 rounded-2xl py-4 flex flex-col items-center gap-1 transition-colors cursor-default"
            >
              <Icon size={18} className="text-orange-400" />
              <span className="text-lg font-black text-white">{value}</span>
              <span className="text-[10px] text-white/35 uppercase tracking-wider">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div {...fade(0.75)} className="flex flex-wrap justify-center gap-4">
          {badges.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 text-xs text-white/30 font-medium">
              <Icon size={13} className="text-orange-400/60" />
              {label}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
};

export default Hero;