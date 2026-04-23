"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10 mt-0">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-xl font-bold mb-4">
            <Car size={22} />
            ChaloDrive
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            Your trusted platform for easy, fast, and reliable vehicle booking.
            Choose from multiple categories and enjoy a smooth travel experience.
          </p>
        </motion.div>

        {/* QUICK LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold mb-4">Quick Links</h3>

          <div className="flex flex-col gap-2 text-sm text-gray-400">
            {["Home", "Vehicles", "Pricing", "About Us"].map((item) => (
              <Link
                key={item}
                href="#"
                className="hover:text-white transition"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* SUPPORT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold mb-4">Support</h3>

          <div className="flex flex-col gap-2 text-sm text-gray-400">
            {["Help Center", "Terms", "Privacy", "FAQs"].map((item) => (
              <Link
                key={item}
                href="#"
                className="hover:text-white transition"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* CONTACT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold mb-4">Contact</h3>

          <div className="flex flex-col gap-3 text-sm text-gray-400">

            <div className="flex items-center gap-2">
              <Phone size={16} />
              +91 98765 43210
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} />
              support@chaldodrive.com
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              India
            </div>

          </div>
        </motion.div>

      </div>

      {/* BOTTOM BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-white/10 py-4 text-center text-xs text-gray-500"
      >
        © {new Date().getFullYear()} ChaloDrive. All rights reserved.
      </motion.div>

    </footer>
  );
};

export default Footer;