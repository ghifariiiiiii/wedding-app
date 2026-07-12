"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Copy, Check, QrCode } from "lucide-react";
import { weddingData } from "@/config/weddingData";

export default function Gifts() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { gifts } = weddingData;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).catch(() => {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    });
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section
      id="gifts"
      className="relative py-24 px-6 bg-[#F5F8FF] overflow-hidden"
      aria-label="Informasi hadiah pernikahan"
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-5 pointer-events-none -translate-x-1/3 -translate-y-1/3"
        style={{ background: "radial-gradient(circle, #4A7BC8, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-5 pointer-events-none translate-x-1/4 translate-y-1/4"
        style={{ background: "radial-gradient(circle, #7EA7E8, transparent)" }}
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
            Amplop Digital
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide mb-4">
            Hadiah Pernikahan
          </h2>
          <div className="section-divider mb-5" />
          <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed font-light">
            {gifts.message}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bank Transfer Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-2xl p-7 space-y-5"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4A7BC8]/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-[#4A7BC8]" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.25em] text-[#7EA7E8] uppercase">
                  Transfer
                </p>
                <h3 className="font-playfair text-lg font-bold text-[#4A7BC8] leading-tight">
                  Bank Transfer
                </h3>
              </div>
            </div>

            {/* Account list */}
            <div className="space-y-3">
              {gifts.accounts.map((acc, idx) => (
                <motion.div
                  key={acc.accountNumber}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                  className="bg-white rounded-xl p-4 border border-[#7EA7E8]/10 flex items-center justify-between gap-3 shadow-sm"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold tracking-widest text-[#7EA7E8] uppercase mb-0.5">
                      {acc.bankName}
                    </p>
                    <p className="font-mono text-sm font-bold text-gray-700 tracking-wider truncate">
                      {acc.accountNumber}
                    </p>
                    <p className="text-xs text-gray-400 font-light mt-0.5 truncate">
                      a.n. {acc.accountHolder}
                    </p>
                  </div>
                  <button
                    id={`btn-copy-${idx}`}
                    onClick={() => handleCopy(acc.accountNumber, idx)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 flex-shrink-0 ${
                      copiedIndex === idx
                        ? "bg-green-500 text-white scale-95"
                        : "bg-[#4A7BC8] text-white hover:bg-[#3b6bb3] hover:scale-105 active:scale-95"
                    }`}
                    aria-label={`Salin nomor rekening ${acc.bankName}`}
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Salin
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* QRIS Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card rounded-2xl p-7 flex flex-col items-center justify-center text-center space-y-5"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4A7BC8]/10 flex items-center justify-center">
                <QrCode className="w-5 h-5 text-[#4A7BC8]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-extrabold tracking-[0.25em] text-[#7EA7E8] uppercase">
                  Scan QR
                </p>
                <h3 className="font-playfair text-lg font-bold text-[#4A7BC8] leading-tight">
                  QRIS
                </h3>
              </div>
            </div>

            {/* QR Code image */}
            <div className="bg-white p-3 rounded-2xl shadow-md border border-gray-100 w-44 h-44 flex items-center justify-center">
              <img
                src={gifts.qrisUrl}
                alt="QR Code pembayaran QRIS"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-light max-w-[200px]">
              Scan menggunakan m-banking atau e-wallet apapun (GoPay, OVO, Dana, dll.)
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
