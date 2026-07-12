"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, ChevronDown } from "lucide-react";
import { weddingData, WeddingEvent } from "@/config/weddingData";

// Map illustration — stylized location pin card
const MapIllustration = ({ event }: { event: WeddingEvent }) => (
  <div
    className="relative rounded-2xl overflow-hidden h-52 sm:h-64 flex items-center justify-center"
    style={{
      background: "linear-gradient(135deg, #EBF3FF 0%, #D6E8FF 50%, #C2DBFF 100%)",
    }}
    aria-hidden="true"
  >
    {/* Decorative map grid lines */}
    <div className="absolute inset-0 opacity-20">
      {[...Array(6)].map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 border-t border-[#4A7BC8]/30"
          style={{ top: `${(i + 1) * 16.66}%` }}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 border-l border-[#4A7BC8]/30"
          style={{ left: `${(i + 1) * 12.5}%` }}
        />
      ))}
    </div>

    {/* Roads illustration */}
    <svg
      className="absolute inset-0 w-full h-full opacity-30"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
    >
      <path d="M0 100 Q100 80 200 100 Q300 120 400 100" stroke="#4A7BC8" strokeWidth="3" fill="none" />
      <path d="M200 0 Q220 50 200 100 Q180 150 200 200" stroke="#7EA7E8" strokeWidth="2" fill="none" />
      <path d="M0 150 Q150 140 300 160 Q380 165 400 155" stroke="#4A7BC8" strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
    </svg>

    {/* Animated pin */}
    <div className="relative z-10 flex flex-col items-center animate-bob">
      <div className="w-14 h-14 rounded-full bg-[#4A7BC8] shadow-xl flex items-center justify-center border-4 border-white">
        <MapPin className="w-7 h-7 text-white fill-white/30" />
      </div>
      <div className="mt-1 w-4 h-4 rounded-full bg-[#4A7BC8]/20 blur-sm" />
    </div>

    {/* Location label */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md border border-[#7EA7E8]/20">
      <p className="text-xs font-semibold text-[#4A7BC8] whitespace-nowrap truncate max-w-[200px] text-center">
        {event.venue}
      </p>
    </div>
  </div>
);

interface LocationCardProps {
  event: WeddingEvent;
  index: number;
}

function LocationCard({ event, index }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      {/* Map illustration */}
      <MapIllustration event={event} />

      {/* Location info */}
      <div className="p-6 space-y-4">
        {/* Event name */}
        <div>
          <p className="text-[10px] font-extrabold tracking-[0.3em] text-[#7EA7E8] uppercase mb-1">
            Lokasi Acara
          </p>
          <h3 className="font-playfair text-xl font-bold text-[#4A7BC8]">{event.title}</h3>
        </div>

        {/* Venue */}
        <div className="flex items-start gap-3 p-3 bg-[#F5F8FF] rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-[#4A7BC8]/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-[#4A7BC8]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">{event.venue}</p>
            <p className="text-xs text-gray-400 font-light mt-0.5 leading-relaxed">
              {event.address}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          id={`btn-lokasi-${event.title.toLowerCase().replace(/\s/g, "-")}`}
          className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #4A7BC8 0%, #1D3557 100%)" }}
        >
          <Navigation className="w-4 h-4" />
          Buka di Google Maps
        </a>
      </div>
    </motion.div>
  );
}

export default function Maps() {
  const [activeTab, setActiveTab] = useState<"akad" | "reception">("akad");
  const { akad, reception } = weddingData.events;

  const tabs = [
    { id: "akad" as const, label: "Akad Nikah", event: akad },
    { id: "reception" as const, label: "Resepsi", event: reception },
  ];

  const isSameVenue = akad.venue === reception.venue && akad.address === reception.address;

  return (
    <section
      id="location"
      className="relative py-24 px-6 bg-[#F5F8FF] overflow-hidden"
      aria-label="Lokasi acara pernikahan"
    >
      {/* Background decorations */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-5 pointer-events-none -translate-y-1/2 translate-x-1/4"
        style={{ background: "radial-gradient(circle, #4A7BC8, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-great-vibes text-5xl text-[#7EA7E8] block mb-2">
            Temukan Kami
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide mb-4">
            Lokasi Acara
          </h2>
          <div className="section-divider mb-5" />
          <p className="text-gray-400 text-sm font-light max-w-md mx-auto">
            Kami tunggu kehadiran Anda di lokasi berikut.
          </p>
        </motion.div>

        {/* If same venue: show single card */}
        {isSameVenue ? (
          <LocationCard event={akad} index={0} />
        ) : (
          <>
            {/* Tab switcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
              role="tablist"
              aria-label="Pilih lokasi acara"
            >
              <div className="flex bg-white rounded-full p-1 shadow-md border border-[#7EA7E8]/20">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? "text-white shadow-md"
                        : "text-gray-400 hover:text-[#4A7BC8]"
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute inset-0 rounded-full"
                        style={{ background: "linear-gradient(135deg, #4A7BC8, #1D3557)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab panels */}
            <AnimatePresence mode="wait">
              {tabs.map((tab) =>
                activeTab === tab.id ? (
                  <motion.div
                    key={tab.id}
                    id={`panel-${tab.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${tab.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                    className="max-w-lg mx-auto"
                  >
                    <LocationCard event={tab.event} index={0} />
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </>
        )}

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-8 text-xs text-gray-400 font-light"
        >
          Butuh bantuan navigasi? Klik tombol di atas untuk membuka Google Maps.
        </motion.p>
      </div>
    </section>
  );
}
