"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { weddingData } from "@/config/weddingData";

// Custom Instagram Icon
const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Floral decoration for footer
const FooterFloral = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Main petals */}
    <path d="M80 80C64 44 44 64 44 80C44 96 64 116 80 80Z" fill="currentColor" />
    <path d="M80 80C96 44 116 64 116 80C116 96 96 116 80 80Z" fill="currentColor" />
    <path d="M80 80C44 64 64 44 80 44C96 44 116 64 80 80Z" fill="currentColor" />
    <path d="M80 80C44 96 64 116 80 116C96 116 116 96 80 80Z" fill="currentColor" />
    {/* Diagonal petals */}
    <path d="M80 80C52 52 44 68 56 80C44 92 52 108 80 80Z" fill="currentColor" opacity="0.5" />
    <path d="M80 80C108 52 116 68 104 80C116 92 108 108 80 80Z" fill="currentColor" opacity="0.5" />
    <circle cx="80" cy="80" r="10" fill="currentColor" opacity="0.8" />
  </svg>
);

export default function Closing() {
  const { bride, groom } = weddingData.couple;
  const { closing, date } = weddingData;

  return (
    <footer
      id="closing"
      className="relative py-24 px-6 text-center overflow-hidden"
      style={{
        background: "linear-gradient(170deg, #F5F8FF 0%, #EBF2FF 50%, #F5F8FF 100%)",
      }}
      aria-label="Penutup undangan"
    >
      {/* Decorative florals */}
      <div className="absolute bottom-0 left-0 pointer-events-none" aria-hidden="true">
        <FooterFloral className="w-36 h-36 text-[#4A7BC8]/10 -translate-x-6 translate-y-6" />
      </div>
      <div className="absolute bottom-0 right-0 scale-x-[-1] pointer-events-none" aria-hidden="true">
        <FooterFloral className="w-36 h-36 text-[#4A7BC8]/10 translate-x-6 translate-y-6" />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
        <FooterFloral className="w-24 h-24 text-[#7EA7E8]/8 -translate-y-8" />
      </div>

      {/* Animated bg ring */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[500px] h-[500px] rounded-full border-2 border-[#4A7BC8]" />
      </motion.div>

      <div className="max-w-2xl mx-auto relative z-10 space-y-6">
        {/* Thank you label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-great-vibes text-6xl text-[#7EA7E8] block">Terima Kasih</span>
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-playfair text-base sm:text-lg text-[#4A7BC8]/80 italic leading-relaxed max-w-md mx-auto"
        >
          {closing.message}
        </motion.p>

        {/* Divider with heart */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="h-px w-16 bg-[#7EA7E8]/30" />
          <Heart className="w-4 h-4 text-[#7EA7E8] fill-[#7EA7E8]" />
          <div className="h-px w-16 bg-[#7EA7E8]/30" />
        </motion.div>

        {/* Couple names */}
        <motion.h2
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-great-vibes text-6xl sm:text-7xl text-[#4A7BC8]"
        >
          {closing.coupleShort}
        </motion.h2>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs font-extrabold tracking-[0.35em] text-[#7EA7E8] uppercase"
        >
          {date.formattedFull}
        </motion.p>

        {/* Hashtag */}
        {closing.hashtag && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm font-semibold text-[#4A7BC8]/50 tracking-wide"
          >
            {closing.hashtag}
          </motion.p>
        )}

        {/* Separator */}
        <div className="section-divider opacity-30" />

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-center gap-6 text-[#4A7BC8]/50"
        >
          <a
            href={`https://instagram.com/${groom.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4A7BC8] hover:scale-110 transition-all duration-300"
            aria-label={`Instagram ${groom.shortName}`}
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href={`https://instagram.com/${bride.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4A7BC8] hover:scale-110 transition-all duration-300"
            aria-label={`Instagram ${bride.shortName}`}
          >
            <InstagramIcon size={18} />
          </a>
        </motion.div>

        {/* Branding */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-[10px] tracking-[0.4em] uppercase text-gray-300 pt-4"
        >
          Made with ♥ by ghiDigital.id
        </motion.p>
      </div>
    </footer>
  );
}
