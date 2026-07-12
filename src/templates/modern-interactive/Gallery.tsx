"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from "lucide-react";
import { weddingData } from "@/config/weddingData";

// Masonry Gallery Grid
function MasonryGrid({
  images,
  onOpen,
}: {
  images: string[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: (idx % 4) * 0.06 }}
          onClick={() => onOpen(idx)}
          className="relative overflow-hidden rounded-xl shadow-md group cursor-zoom-in break-inside-avoid"
        >
          <img
            src={img}
            alt={`Momen foto ${idx + 1}`}
            className="w-full object-cover group-hover:scale-107 transition-transform duration-500"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#4A7BC8]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Maximize2 className="text-white w-5 h-5" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Lightbox Modal
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Foto gallery lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Tutup lightbox"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-[90vw] max-h-[85vh] px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Momen foto ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
      </motion.div>

      {/* Prev button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 sm:left-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
        aria-label="Foto sebelumnya"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 sm:right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
        aria-label="Foto selanjutnya"
      >
        <ChevronRight size={24} />
      </button>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 overflow-x-auto px-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); }}
            className={`flex-shrink-0 w-10 h-10 rounded-md overflow-hidden border-2 transition-all ${
              i === currentIndex ? "border-[#7EA7E8] scale-110" : "border-transparent opacity-50"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { gallery } = weddingData;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + gallery.length) % gallery.length : 0));
  const nextPhoto = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % gallery.length : 0));

  // Keyboard navigation
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  return (
    <section
      id="gallery"
      className="relative py-24 px-6 bg-white overflow-hidden"
      aria-label="Galeri foto pra-nikah"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="font-great-vibes text-5xl text-[#7EA7E8] block mb-2">Memories</span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide mb-4">
            Galeri Foto
          </h2>
          <div className="section-divider mb-5" />
          <div className="inline-flex items-center gap-2 text-xs text-gray-400 font-light tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Klik foto untuk memperbesar</span>
          </div>
        </motion.div>

        {/* Masonry grid */}
        <MasonryGrid images={gallery} onOpen={openLightbox} />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={gallery}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
