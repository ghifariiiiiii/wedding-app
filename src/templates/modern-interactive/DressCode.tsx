"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/config/weddingData";

export default function DressCode() {
  const { dressCode } = weddingData;

  if (!dressCode.colors || dressCode.colors.length === 0) return null;

  return (
    <section
      id="dress-code"
      className="relative py-24 px-6 bg-white overflow-hidden"
      aria-label="Kode busana tamu undangan"
    >
      {/* Subtle top gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #F5F8FF, white)" }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="font-great-vibes text-5xl text-[#7EA7E8] block mb-2">
            Theme &amp; Colors
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide mb-4">
            Dress Code
          </h2>
          <div className="section-divider mb-5" />
          <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed font-light">
            {dressCode.guidelines}
          </p>
        </motion.div>

        {/* Color swatches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {dressCode.colors.map((color, idx) => {
            const isLight = color.hex === "#FFFFFF" || color.hex === "#F5F8FF";
            return (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                className="flex flex-col items-center gap-2.5"
              >
                {/* Color circle */}
                <div
                  className="w-20 h-20 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform duration-300 cursor-default"
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: `0 8px 24px ${color.hex}55`,
                    border: isLight ? "2px solid #E2EAF8" : "2px solid white",
                  }}
                  title={color.name}
                  aria-label={`Warna ${color.name}: ${color.hex}`}
                />
                <span className="text-xs font-semibold tracking-wider text-gray-600 text-center">
                  {color.name}
                </span>
                <span className="text-[10px] text-gray-300 font-mono">{color.hex}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Attire guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-5 max-w-xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-5 flex items-start gap-4">
            <span className="text-2xl flex-shrink-0">👗</span>
            <div>
              <h4 className="font-playfair font-bold text-sm text-[#4A7BC8] mb-1">
                Busana Wanita
              </h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Gaun panjang elegan, kebaya modern, atau busana semi-formal anggun sesuai palet warna tema.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 flex items-start gap-4">
            <span className="text-2xl flex-shrink-0">🤵</span>
            <div>
              <h4 className="font-playfair font-bold text-sm text-[#4A7BC8] mb-1">
                Busana Pria
              </h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Jas klasik, batik lengan panjang, atau busana formal bersih sesuai elemen warna tema.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
