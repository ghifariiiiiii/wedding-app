"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/config/weddingData";

interface TimeUnit {
  value: number;
  label: string;
}

// Animated flip-digit card
function FlipDigit({ value, label }: { value: number; label: string }) {
  const prevValueRef = useRef(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 420);
      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Card */}
      <div
        className="relative w-[70px] sm:w-[88px] h-[80px] sm:h-[100px] rounded-xl overflow-hidden shadow-lg"
        style={{ perspective: "400px" }}
      >
        {/* Background with gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(145deg, #4A7BC8 0%, #1D3557 100%)",
          }}
          aria-hidden="true"
        />

        {/* Top half shadow line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/20 z-10" aria-hidden="true" />

        {/* The digit */}
        <div
          key={`${label}-${value}`}
          className={`absolute inset-0 flex items-center justify-center ${isFlipping ? "countdown-flip" : ""}`}
        >
          <span
            className="font-playfair text-4xl sm:text-5xl font-bold text-white tabular-nums"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
          >
            {display}
          </span>
        </div>

        {/* Gloss overlay */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 opacity-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, white, transparent)" }}
          aria-hidden="true"
        />
      </div>

      {/* Label */}
      <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.25em] text-[#7EA7E8]">
        {label}
      </span>
    </div>
  );
}

// Separator
function Separator() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      className="font-playfair text-3xl sm:text-4xl font-bold text-[#4A7BC8]/40 pb-6 select-none"
      aria-hidden="true"
    >
      :
    </motion.span>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: "Hari" },
    { value: 0, label: "Jam" },
    { value: 0, label: "Menit" },
    { value: 0, label: "Detik" },
  ]);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const target = +new Date(weddingData.date.countdownTarget);
      const now = +new Date();
      const difference = target - now;

      if (difference <= 0) {
        setIsPast(true);
        return [
          { value: 0, label: "Hari" },
          { value: 0, label: "Jam" },
          { value: 0, label: "Menit" },
          { value: 0, label: "Detik" },
        ];
      }

      return [
        { value: Math.floor(difference / (1000 * 60 * 60 * 24)), label: "Hari" },
        { value: Math.floor((difference / (1000 * 60 * 60)) % 24), label: "Jam" },
        { value: Math.floor((difference / (1000 * 60)) % 60), label: "Menit" },
        { value: Math.floor((difference / 1000) % 60), label: "Detik" },
      ];
    };

    setTimeLeft(calculateTime());
    const interval = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="countdown"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1D3557 0%, #4A7BC8 50%, #2d5a9e 100%)",
      }}
      aria-label="Hitung mundur hari pernikahan"
    >
      {/* Decorative blurred circles */}
      <div
        className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7EA7E8, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-100px] left-[-60px] w-[350px] h-[350px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #A8DADC, transparent)" }}
        aria-hidden="true"
      />

      {/* Animated floating orb */}
      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[180px] h-[180px] rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, white, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="font-great-vibes text-5xl text-white/50 block mb-2">
            Menuju Hari Bahagia
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white tracking-wide mb-4">
            Hitung Mundur
          </h2>
          {/* Gradient divider for dark bg */}
          <div
            className="h-px w-20 mx-auto rounded-full"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)" }}
          />
          <p className="text-white/50 text-sm mt-4 font-light">
            {weddingData.date.formattedFull}
          </p>
        </motion.div>

        {/* Countdown display */}
        {isPast ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-8"
          >
            <p className="font-great-vibes text-6xl text-white/80 mb-2">Alhamdulillah</p>
            <p className="text-white/60 text-sm font-light">Hari yang dinantikan telah tiba ✨</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-end justify-center gap-3 sm:gap-5"
            role="timer"
            aria-label="Countdown timer"
          >
            <FlipDigit value={timeLeft[0].value} label={timeLeft[0].label} />
            <Separator />
            <FlipDigit value={timeLeft[1].value} label={timeLeft[1].label} />
            <Separator />
            <FlipDigit value={timeLeft[2].value} label={timeLeft[2].label} />
            <Separator />
            <FlipDigit value={timeLeft[3].value} label={timeLeft[3].label} />
          </motion.div>
        )}

        {/* Bottom decorative text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-10 text-white/30 text-xs tracking-[0.4em] uppercase"
        >
          {weddingData.couple.bride.shortName} &amp; {weddingData.couple.groom.shortName}
        </motion.p>
      </div>
    </section>
  );
}
