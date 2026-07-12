"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { weddingData } from "@/config/weddingData";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax: background moves at half speed when scrolling
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Text fades out as user scrolls down
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-15%"]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between items-center text-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.2) 0%,
              rgba(0,0,0,0.35) 50%,
              rgba(245,248,255,1) 100%
            ),
            url(${weddingData.couple.romanticPhoto})
          `,
          backgroundPosition: "center 35%",
          y: bgY,
          scale: 1.1, // pre-scale to avoid white edges during parallax
        }}
        aria-hidden="true"
      />

      {/* Animated light streaks overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ x: ["-100%", "200%"], opacity: [0, 0.06, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-1/3 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-white to-transparent"
          style={{ transform: "rotate(-30deg)", height: "1px" }}
        />
        <motion.div
          animate={{ x: ["-100%", "200%"], opacity: [0, 0.04, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute top-2/3 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-white to-transparent"
          style={{ transform: "rotate(-30deg)", height: "1px" }}
        />
      </div>

      {/* Main content — parallax text */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8 max-w-3xl mx-auto w-full"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/85 text-xs sm:text-sm tracking-[0.45em] uppercase font-medium drop-shadow-md mb-4 block"
        >
          The Wedding Of
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-great-vibes text-[5rem] sm:text-[7rem] md:text-[9rem] leading-none text-white drop-shadow-xl font-normal"
        >
          {weddingData.couple.bride.shortName}
          <span className="text-[#eff2f3]"> & </span>
          {weddingData.couple.groom.shortName}
        </motion.h1>

        {/* Decorative line with heart */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-3 my-6"
        >
          <div className="h-px w-16 bg-white/40" />
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/70 fill-current">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.517 4.96 1 8.5 1c2.009 0 4.076.867 5.5 2.687C15.424 1.867 17.491 1 19.5 1 23.04 1 27 3.517 27 7.19c0 4.106-5.37 8.863-11 14.402L12 21.593z" />
          </svg>
          <div className="h-px w-16 bg-white/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="font-playfair text-white/90 text-base sm:text-lg md:text-xl tracking-[0.3em] font-medium drop-shadow-md uppercase"
        >
          {weddingData.date.formattedFull}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ duration: 2, delay: 1.5, repeat: Infinity }}
        onClick={() =>
          document.getElementById("couple")?.scrollIntoView({ behavior: "smooth" })
        }
        className="relative z-10 flex flex-col items-center gap-1 text-white/70 cursor-pointer mb-8 hover:text-white transition-colors group"
        aria-label="Scroll ke section berikutnya"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium group-hover:tracking-[0.35em] transition-all duration-300">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
