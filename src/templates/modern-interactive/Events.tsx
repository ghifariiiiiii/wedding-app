"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Navigation } from "lucide-react";
import { weddingData, WeddingEvent } from "@/config/weddingData";

// Decorative SVG top wave divider
const WaveDivider = ({ inverted = false }: { inverted?: boolean }) => (
  <div
    className={`w-full overflow-hidden leading-none pointer-events-none ${inverted ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block w-full h-[40px] fill-[#F5F8FF]">
      <path d="M0,0 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" />
    </svg>
  </div>
);

interface EventCardProps {
  event: WeddingEvent;
  index: number;
  icon: React.ReactNode;
}

function EventCard({ event, index, icon }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      className="relative glass-card rounded-2xl p-8 overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
    >
      {/* Animated corner ornament */}
      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, #4A7BC8, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Event type icon badge */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#4A7BC8]/10 text-[#4A7BC8] flex-shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-extrabold tracking-[0.3em] text-[#7EA7E8] uppercase">
            Acara
          </p>
          <h3 className="font-playfair text-xl font-bold text-[#4A7BC8] leading-tight">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Event details */}
      <ul className="space-y-3.5">
        <li className="flex items-start gap-3">
          <Calendar className="w-4 h-4 text-[#7EA7E8] flex-shrink-0 mt-0.5" />
          <span className="text-sm text-gray-600 font-medium">{event.date}</span>
        </li>
        <li className="flex items-start gap-3">
          <Clock className="w-4 h-4 text-[#7EA7E8] flex-shrink-0 mt-0.5" />
          <span className="text-sm text-gray-600">{event.time}</span>
        </li>
        <li className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-[#7EA7E8] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-700">{event.venue}</p>
            <p className="text-xs text-gray-400 font-light mt-0.5 leading-relaxed">
              {event.address}
            </p>
          </div>
        </li>
      </ul>

      {/* Divider */}
      <div className="section-divider my-5" />

      {/* Maps button */}
      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        id={`btn-maps-${event.title.toLowerCase().replace(/\s/g, "-")}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#4A7BC8] hover:bg-[#3b6bb3] px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
      >
        <Navigation className="w-4 h-4" />
        Buka di Google Maps
      </a>
    </motion.div>
  );
}

export default function Events() {
  const { akad, reception } = weddingData.events;

  const akadIcon = (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.71.71m13.6 13.6.71.71M1 12h1m20 0h1M4.22 19.78l.71-.71m13.6-13.6.71-.71M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z" />
    </svg>
  );

  const receptionIcon = (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  );

  return (
    <section
      id="events"
      className="relative bg-white overflow-hidden"
      aria-label="Informasi acara pernikahan"
    >
      <WaveDivider />

      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <span className="font-great-vibes text-5xl text-[#7EA7E8] block mb-2">
              Acara Kami
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide mb-4">
              Informasi Acara
            </h2>
            <div className="section-divider mb-5" />
            <p className="text-gray-400 text-sm font-light max-w-md mx-auto">
              Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dan memberikan doa restu.
            </p>
          </motion.div>

          {/* Event cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <EventCard event={akad} index={0} icon={akadIcon} />
            <EventCard event={reception} index={1} icon={receptionIcon} />
          </div>
        </div>
      </div>

      <WaveDivider inverted />
    </section>
  );
}
