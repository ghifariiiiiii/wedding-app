"use client";

// ============================================================
// template-modern-interactive/index.tsx
// ghiDigital.id — Template: Modern Interactive v1.0
//
// Entry point yang merakit semua section menjadi satu halaman.
// Urutan section (sesuai PRD 5.6):
//   Cover → Hero → Couple → Events → Countdown →
//   LoveStory → Gallery → Maps → DressCode → Gifts → Closing
// ============================================================

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Sections
import Cover from "./Cover";
import Hero from "./Hero";
import Couple from "./Couple";
import Events from "./Events";
import Countdown from "./Countdown";
import LoveStory from "./LoveStory";
import Gallery from "./Gallery";
import Maps from "./Maps";
import DressCode from "./DressCode";
import Gifts from "./Gifts";
import Closing from "./Closing";

// Shared components
import MusicPlayer from "@/components/MusicPlayer";
import FlowerParticles from "@/components/FlowerParticles";

interface ModernInteractiveTemplateProps {
  /** Nama tamu dari URL query param ?to=NamaTamu */
  guestName: string | null;
}

export default function ModernInteractiveTemplate({ guestName }: ModernInteractiveTemplateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(true);

  const handleOpen = () => {
    setIsOpen(true);
    setMusicPlaying(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F5F8FF] overflow-x-hidden">
      {/* 1. Cover / Opening Screen */}
      <Cover isOpen={isOpen} guestName={guestName} onOpen={handleOpen} />

      {/* Floating music player — mounted immediately to try autoplaying */}
      <MusicPlayer
        url="/lagu-weeding.mp3"
        isPlaying={musicPlaying}
        setIsPlaying={setMusicPlaying}
        visible={isOpen}
      />

      {/* Flower particle background effect */}
      {isOpen && <FlowerParticles />}

      {/* 2–11. Main Content — revealed after "Buka Undangan" */}
      <AnimatePresence>
        {isOpen && (
          <motion.main
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            aria-label="Konten undangan pernikahan"
          >
            {/* 2. Hero */}
            <Hero />

            {/* 3. Couple Profiles */}
            <Couple />

            {/* 4. Event Information (Akad & Resepsi) */}
            <Events />

            {/* 5. Countdown */}
            <Countdown />

            {/* 6. Love Story Timeline */}
            <LoveStory />

            {/* 7. Photo Gallery */}
            <Gallery />

            {/* 8. Location / Maps */}
            <Maps />

            {/* 9. Dress Code */}
            <DressCode />

            {/* 10. Wedding Gifts */}
            <Gifts />

            {/* 11. Closing / Footer */}
            <Closing />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
