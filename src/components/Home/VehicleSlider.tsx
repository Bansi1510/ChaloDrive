"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, Truck, Users } from "lucide-react";
import { vehiclesData } from "@/data/VehiclesSliderData";

const VehicleGrid = () => {
  const [vehicles] = useState(vehiclesData)
  return (
    <div className="w-full bg-black text-white py-14 px-6">

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-12 tracking-wide">
        Choose Your Vehicle
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">

        {vehicles.map((v, index) => {
          const Icon = v.icon;

          return (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="border border-white rounded-2xl bg-[#0a0a0a] h-[320px] flex flex-col justify-between p-6 hover:scale-[1.04] transition"
            >

              {/* ICON SECTION */}
              <div className="flex flex-col items-center gap-4 mt-4">

                <div className="border border-white rounded-full p-6">
                  <Icon size={60} className="text-white" />
                </div>

                <h3 className="text-xl font-semibold">
                  {v.name}
                </h3>

                <p className="text-gray-400 text-sm text-center">
                  {v.desc}
                </p>

              </div>

              {/* INFO */}
              <div className="flex justify-between text-sm text-gray-300 px-2">

                <div className="flex items-center gap-1">
                  <Users size={16} />
                  {v.seats}
                </div>

                <span className="font-semibold text-white">
                  {v.price}
                </span>

              </div>

              {/* BUTTON */}
              <button className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                Book Now
              </button>

            </motion.div>
          );
        })}

      </div>
      <div className="mt-14 flex flex-wrap justify-center gap-6 text-sm text-gray-300">

        <div className="flex items-center gap-2">
          <Truck size={16} />
          4+ Vehicle Categories
        </div>

        <div className="flex items-center gap-2">
          <Users size={16} />
          4000+ Active Vendors
        </div>

        <div className="flex items-center gap-2">
          <Star size={16} />
          1M+ Successful Rides
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck size={16} />
          Safe & Verified Drivers
        </div>

      </div>
    </div>
  );
};

export default VehicleGrid;