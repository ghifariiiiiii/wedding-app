"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/config/weddingData";

// Custom Instagram Icon
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Floral SVG decoration
const FloralDecor = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M60 60C48 36 36 48 36 60C36 72 48 84 60 60Z" fill="currentColor" />
    <path d="M60 60C72 36 84 48 84 60C84 72 72 84 60 60Z" fill="currentColor" />
    <path d="M60 60C36 48 48 36 60 36C72 36 84 48 60 60Z" fill="currentColor" />
    <path d="M60 60C36 72 48 84 60 84C72 84 84 72 60 60Z" fill="currentColor" />
    <circle cx="60" cy="60" r="8" fill="currentColor" opacity="0.7" />
    {/* Extra petals */}
    <path d="M60 60C50 26 38 42 42 60C38 78 50 94 60 60Z" fill="currentColor" opacity="0.4" />
    <path d="M60 60C70 26 82 42 78 60C82 78 70 94 60 60Z" fill="currentColor" opacity="0.4" />
  </svg>
);

import type { Variants, TargetAndTransition } from "framer-motion";
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.2, ease: [0.25, 0.1, 0.25, 1], },
  }),
} ;

interface PersonCardProps {
  name: string;
  fullName: string;
  role: "Mempelai Pria" | "Mempelai Wanita";
  parentNames: string;
  instagram: string;
  photo: string;
  index: number;
}

function PersonCard({ name, fullName, role, parentNames, instagram, index }: PersonCardProps) {
  const isBride = role === "Mempelai Wanita";

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group tilt-card glass-card rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden relative"
    >
      {/* Top gradient band */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{
          background: isBride
            ? "linear-gradient(to right, #7EA7E8, #4A7BC8, #A8DADC)"
            : "linear-gradient(to right, #1D3557, #4A7BC8, #7EA7E8)",
        }}
      />

      {/* Photo */}
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-5 shadow-md">
        <img
          src={isBride ? weddingData.couple.bride.photo : weddingData.couple.groom.photo}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#4A7BC8]/30 to-transparent" />
      </div>

      {/* Role badge */}
      <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#7EA7E8] uppercase mb-2">
        {role}
      </span>

      {/* Name */}
      <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#4A7BC8] mb-1 leading-snug">
        {fullName}
      </h3>

      {/* Divider */}
      <div className="section-divider my-3 w-12" />

      {/* Parent names */}
      <p className="text-sm text-gray-500 font-light leading-relaxed mb-4 max-w-xs">
        {parentNames}
      </p>

      {/* Instagram */}
      <a
        href={`https://instagram.com/${instagram.replace("@", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#4A7BC8] hover:text-[#7EA7E8] transition-colors bg-[#F5F8FF] px-4 py-2 rounded-full border border-[#7EA7E8]/20 shadow-sm hover:shadow"
      >
        <InstagramIcon size={13} />
        {instagram}
      </a>
    </motion.div>
  );
}

export default function Couple() {
  const { bride, groom, openingQuote } = weddingData.couple;

  return (
    <section
      id="couple"
      className="relative py-24 px-6 bg-[#F5F8FF] overflow-hidden"
      aria-label="Profil mempelai"
    >
      {/* Decorative florals */}
      <div className="absolute top-0 left-0 pointer-events-none" aria-hidden="true">
        <FloralDecor className="w-36 h-36 text-[#7EA7E8]/15" />
      </div>
      <div className="absolute top-0 right-0 scale-x-[-1] pointer-events-none" aria-hidden="true">
        <FloralDecor className="w-36 h-36 text-[#7EA7E8]/15" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="font-great-vibes text-5xl text-[#7EA7E8] block mb-2">Bismillah</span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide mb-4">
            Pasangan Berbahagia
          </h2>
          <div className="section-divider mb-5" />
          {openingQuote && (
            <p className="text-gray-400 max-w-lg mx-auto text-sm italic leading-relaxed font-light px-4">
              {openingQuote}
            </p>
          )}
        </motion.div>

        {/* Couple cards grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-3xl mx-auto">
          <PersonCard
            name={groom.shortName}
            fullName={groom.fullName}
            role="Mempelai Pria"
            parentNames={groom.parentNames}
            instagram={groom.instagram}
            photo={groom.photo}
            index={0}
          />
          <PersonCard
            name={bride.shortName}
            fullName={bride.fullName}
            role="Mempelai Wanita"
            parentNames={bride.parentNames}
            instagram={bride.instagram}
            photo={bride.photo}
            index={1}
          />
        </div>

        {/* Connecting element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mt-10"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-[#7EA7E8]/30" />
            <span className="font-great-vibes text-3xl text-[#4A7BC8]/60">bersatu</span>
            <div className="h-px w-16 bg-[#7EA7E8]/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
