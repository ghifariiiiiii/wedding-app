"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingData, LoveStoryItem } from "@/config/weddingData";

interface StoryCardProps {
  item: LoveStoryItem;
  index: number;
}

function StoryCard({ item, index }: StoryCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex items-start gap-0 md:gap-0">
      {/* Timeline line + node */}
      <div className="relative flex-shrink-0 flex flex-col items-center">
        {/* Top connector line */}
        {index !== 0 && (
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#7EA7E8]/40" />
        )}

        {/* Node circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="relative z-10 w-12 h-12 rounded-full bg-[#4A7BC8] flex items-center justify-center shadow-lg flex-shrink-0"
        >
          <span className="font-playfair text-xs font-bold text-white leading-none text-center">
            {item.year}
          </span>
        </motion.div>

        {/* Bottom connector line */}
        <div className="w-px flex-1 min-h-[40px] bg-gradient-to-b from-[#7EA7E8]/40 to-transparent" />
      </div>

      {/* Story content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        className="flex-1 ml-6 mb-8"
      >
        <div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
          {/* Photo */}
          {item.image && (
            <div className="relative h-52 sm:h-64 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Year badge on image */}
              <div className="absolute bottom-3 left-4">
                <span className="text-xs font-extrabold tracking-[0.3em] text-white/90 uppercase drop-shadow">
                  {item.year}
                </span>
              </div>
            </div>
          )}

          {/* Text content */}
          <div className="p-5">
            <h3 className="font-playfair text-lg font-bold text-[#4A7BC8] mb-1.5">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoveStory() {
  const { loveStory } = weddingData;

  // Don't render if no story items
  if (!loveStory || loveStory.length === 0) return null;

  return (
    <section
      id="love-story"
      className="relative py-24 px-6 bg-[#F5F8FF] overflow-hidden"
      aria-label="Cerita perjalanan cinta"
    >
      {/* Background decorative shapes */}
      <div
        className="absolute top-1/4 right-[-100px] w-[300px] h-[300px] rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #4A7BC8, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-[-80px] w-[250px] h-[250px] rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7EA7E8, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-great-vibes text-5xl text-[#7EA7E8] block mb-2">Our Timeline</span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide mb-4">
            Cerita Kami
          </h2>
          <div className="section-divider mb-5" />
          <p className="text-gray-400 text-sm font-light max-w-sm mx-auto">
            Setiap perjalanan panjang dimulai dari satu langkah pertama bersama.
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {loveStory.map((item, index) => (
            <StoryCard key={`${item.year}-${item.title}`} item={item} index={index} />
          ))}
        </div>

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-6"
        >
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-12 bg-[#7EA7E8]/30" />
            <span className="font-great-vibes text-2xl text-[#7EA7E8]">dan selamanya...</span>
            <div className="h-px w-12 bg-[#7EA7E8]/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
