"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { weddingData } from "@/config/weddingData";
import confetti from "canvas-confetti";

// --- Decorative SVG Components ---
const FloralRing = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer petal ring */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <ellipse
        key={deg}
        cx="100"
        cy="100"
        rx="12"
        ry="30"
        fill="currentColor"
        opacity="0.35"
        transform={`rotate(${deg} 100 100) translate(0 -52)`}
      />
    ))}
    {/* Inner ring */}
    <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.15" />
    <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.5" />
  </svg>
);

const OrnamentalDivider = () => (
  <div className="flex items-center justify-center gap-3 my-4">
    <div className="h-px w-12 bg-[#7EA7E8]/40" />
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#7EA7E8]" fill="currentColor">
      <path d="M12 2C6.5 7 2 9 2 12s4.5 5 10 10c5.5-5 10-7 10-10S17.5 7 12 2z" />
    </svg>
    <div className="h-px w-12 bg-[#7EA7E8]/40" />
  </div>
);

interface CoverProps {
  isOpen: boolean;
  guestName: string | null;
  onOpen: () => void;
}

export default function Cover({ isOpen, guestName, onOpen }: CoverProps) {
  const handleOpen = () => {
    onOpen();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.75 },
      colors: ["#4A7BC8", "#7EA7E8", "#A8DADC", "#FFFFFF", "#1D3557"],
      disableForReducedMotion: true,
    });
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="cover-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, y: "-8%" }}
          transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(
                to bottom,
                rgba(245, 248, 255, 0.93) 0%,
                rgba(245, 248, 255, 0.97) 100%
              ),
              url(${weddingData.couple.openingBg})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-label="Wedding invitation cover"
        >
          {/* Corner botanical decorations */}
          <div className="absolute top-0 left-0 opacity-20 pointer-events-none">
            <FloralRing className="w-40 h-40 text-[#4A7BC8] -translate-x-8 -translate-y-8" />
          </div>
          <div className="absolute top-0 right-0 opacity-20 scale-x-[-1] pointer-events-none">
            <FloralRing className="w-40 h-40 text-[#4A7BC8] translate-x-8 -translate-y-8" />
          </div>
          <div className="absolute bottom-0 left-0 opacity-15 scale-y-[-1] pointer-events-none">
            <FloralRing className="w-32 h-32 text-[#7EA7E8] -translate-x-6" />
          </div>
          <div className="absolute bottom-0 right-0 opacity-15 scale-x-[-1] scale-y-[-1] pointer-events-none">
            <FloralRing className="w-32 h-32 text-[#7EA7E8] translate-x-6" />
          </div>

          {/* Subtle animated background rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.05, 0.12, 0.05] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[600px] h-[600px] rounded-full border-2 border-[#4A7BC8]"
            />
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.04, 0.09, 0.04] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute w-[450px] h-[450px] rounded-full border border-[#7EA7E8]"
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
            {/* Spinning floral accent */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative mb-6"
            >
              <FloralRing className="w-28 h-28 text-[#4A7BC8]/20 animate-spin-slow absolute inset-0 m-auto" />
              <div className="relative flex items-center justify-center w-28 h-28">
                <span className="text-xs uppercase tracking-[0.3em] text-[#4A7BC8] font-semibold bg-white/80 px-4 py-2 rounded-full border border-[#4A7BC8]/20 backdrop-blur-sm shadow-sm">
                  Undangan
                </span>
              </div>
            </motion.div>

            {/* Guest name personalization */}
            {guestName && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-4 px-5 py-2 bg-[#4A7BC8]/8 border border-[#4A7BC8]/20 rounded-full"
              >
                <span className="text-sm text-[#4A7BC8] font-medium">
                  Kepada Yth. <strong>{guestName}</strong>
                </span>
              </motion.div>
            )}

            {/* "The Wedding Of" label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-playfair text-lg tracking-[0.2em] text-[#4A7BC8]/80 font-light italic mb-2"
            >
              The Wedding Of
            </motion.p>

            {/* Couple names — script font */}
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.65, duration: 1.1 }}
              className="font-great-vibes text-[5.5rem] sm:text-[7rem] leading-none text-[#4A7BC8] drop-shadow-sm"
            >
              {weddingData.couple.bride.shortName}
              <span className="text-[#7EA7E8]"> & </span>
              {weddingData.couple.groom.shortName}
            </motion.h1>

            <OrnamentalDivider />

            {/* Date */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="font-playfair text-sm tracking-[0.25em] text-[#7EA7E8] font-medium uppercase mb-8"
            >
              {weddingData.date.formattedFull}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              id="btn-buka-undangan"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring", stiffness: 200 }}
              onClick={handleOpen}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#4A7BC8] px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Buka Undangan Pernikahan"
            >
              {/* shimmer effect */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              />
              <Heart className="w-4 h-4 fill-white/30 group-hover:scale-125 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">Buka Undangan</span>
              <Sparkles className="w-4 h-4 opacity-70 relative z-10" />
            </motion.button>

            {/* Subtle hint text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="mt-5 text-xs text-[#7EA7E8] tracking-widest uppercase"
            >
              Tap to open
            </motion.p>
          </div>

          {/* Bottom branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-5 left-0 right-0 text-center"
          >
            <p className="text-[10px] text-[#7EA7E8]/50 tracking-[0.3em] uppercase">
              ghiDigital.id
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
