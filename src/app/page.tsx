"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Music,
  ChevronDown,
  Gift,
  Copy,
  Check,
  User,
  Users,
  MessageSquare,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { weddingData } from "@/config/weddingData";
import FlowerParticles from "@/components/FlowerParticles";
import MusicPlayer from "@/components/MusicPlayer";

// Custom Instagram Icon SVG
const InstagramIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Custom Hand-drawn Blue Flower SVG Decor
const FloralDecoration = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-24 h-24 text-[#7EA7E8]/30 ${className}`}
  >
    <path
      d="M50 50C40 30 30 40 30 50C30 60 40 70 50 50Z"
      fill="currentColor"
    />
    <path
      d="M50 50C60 30 70 40 70 50C70 60 60 70 50 50Z"
      fill="currentColor"
    />
    <path
      d="M50 50C30 40 40 30 50 30C60 30 70 40 50 50Z"
      fill="currentColor"
    />
    <path
      d="M50 50C30 60 40 70 50 70C60 70 70 60 50 50Z"
      fill="currentColor"
    />
    <circle cx="50" cy="50" r="5" fill="#4A7BC8" />
  </svg>
);

// Torn Paper Divider Component
const TornDivider = ({ direction = "down" }: { direction?: "up" | "down" }) => {
  const path = direction === "down"
    ? "M0,0 C150,50 350,10 600,45 C850,80 1050,20 1200,35 L1200,80 L0,80 Z"
    : "M0,80 C150,30 350,70 600,35 C850,0 1050,60 1200,45 L1200,0 L0,0 Z";

  return (
    <div className="relative w-full overflow-hidden leading-none z-10">
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="relative block w-full h-[35px] text-[#F5F8FF] fill-current"
      >
        <path d={path}></path>
      </svg>
    </div>
  );
};

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);





  // Lightbox Gallery State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Countdown timer logic
  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(weddingData.date.countdownTarget) - +new Date();
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTime());
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);





  const handleOpenInvitation = () => {
    setIsOpen(true);
    setMusicPlaying(true);
    // Play initial elegant confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#4A7BC8", "#7EA7E8", "#F5F8FF", "#FFFFFF"],
    });
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };





  return (
    <div className="relative min-h-screen">
      {/* Background Particles when invitation is open */}
      {isOpen && <FlowerParticles />}

      {/* Background Music controls */}
      {isOpen && (
        <MusicPlayer
          url={weddingData.musicUrl}
          isPlaying={musicPlaying}
          setIsPlaying={setMusicPlaying}
        />
      )}

      {/* Opening Envelope Screen */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cover bg-center text-center p-6"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(245, 248, 255, 0.92), rgba(245, 248, 255, 0.97)), url(${weddingData.couple.openingBg})`,
            }}
          >
            {/* Elegant Floral Bloom Graphic */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative mb-6 flex items-center justify-center"
            >
              <FloralDecoration className="animate-spin-slow text-[#4A7BC8]/10 w-48 h-48 absolute" />
              <div className="relative text-xs uppercase tracking-[0.3em] text-[#4A7BC8] font-semibold bg-white/60 px-4 py-2 rounded-full border border-[#4A7BC8]/20 backdrop-blur-sm">
                You Are Cordially Invited
              </div>
            </motion.div>

            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="font-playfair text-xl tracking-[0.15em] text-[#4A7BC8] font-light italic mb-3"
            >
              The Wedding Of
            </motion.h3>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="font-great-vibes text-7xl md:text-8xl text-[#4A7BC8] drop-shadow-sm mb-4"
            >
              {weddingData.couple.bride.shortName} & {weddingData.couple.groom.shortName}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="font-playfair font-medium tracking-[0.2em] text-sm text-[#7EA7E8] mb-8"
            >
              {weddingData.date.formattedFull.toUpperCase()}
            </motion.p>

            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              onClick={handleOpenInvitation}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#4A7BC8] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#3b6bb3] active:scale-95 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white/20 group-hover:scale-110 transition-transform" />
              Open Invitation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Wedding Invitation Content */}
      {isOpen && (
        <div className="relative">
          {/* Hero Section */}
          <section className="relative min-h-screen flex flex-col justify-between items-center text-center py-16 px-6 overflow-hidden">
            {/* Romantic Background Cover */}
            <div
              className="absolute inset-0 z-0 bg-cover brightness-[0.9]"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(245, 248, 255, 1) 5%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.2) 100%), url(${weddingData.couple.romanticPhoto})`,
                backgroundPosition: 'center 35%',
              }}
            />

            {/* Float details */}
            <div className="relative z-10 w-full max-w-2xl mx-auto flex-1 flex flex-col justify-center items-center mt-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="space-y-4"
              >
                <span className="text-white/90 text-sm tracking-[0.4em] uppercase font-medium drop-shadow-md">
                  The Wedding Of
                </span>

                <h1 className="font-great-vibes text-7xl sm:text-8xl md:text-9xl text-white drop-shadow-lg font-normal py-4">
                  {weddingData.couple.bride.shortName} & {weddingData.couple.groom.shortName}
                </h1>

                <div className="w-24 h-[1px] bg-white/40 mx-auto my-6" />

                <p className="font-playfair text-white/90 text-lg md:text-xl tracking-[0.25em] font-medium drop-shadow-md">
                  {weddingData.date.formattedFull.toUpperCase()}
                </p>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="relative z-10 flex flex-col items-center gap-1 text-white/80 cursor-pointer mb-2"
              onClick={() => {
                document.getElementById("couple")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll Down</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </section>

          {/* Bride & Groom Section */}
          <section id="couple" className="relative py-24 px-6 bg-[#F5F8FF]">
            {/* Top Floral Accents */}
            <div className="absolute top-0 left-0">
              <FloralDecoration className="w-32 h-32 text-[#7EA7E8]/20" />
            </div>
            <div className="absolute top-0 right-0 scale-x-[-1]">
              <FloralDecoration className="w-32 h-32 text-[#7EA7E8]/20" />
            </div>

            <div className="max-w-5xl mx-auto text-center space-y-12">
              <div className="space-y-3">
                <span className="font-great-vibes text-4xl text-[#7EA7E8]">Pendahuluan</span>
                <h2 className="font-playfair text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide">
                  Pasangan yang Berbahagia
                </h2>
                <div className="w-20 h-1 bg-[#4A7BC8]/20 mx-auto rounded-full" />
                <p className="text-gray-500 max-w-md mx-auto text-sm italic">
                  "Dan kami ciptakan kamu berpasang-pasangan" — Q.S. Adz-dzariyat: 49
                </p>
              </div>

              {/* Grid of couple cards */}
              <div className="grid md:grid-cols-2 gap-12 items-center pt-8">
                {/* Groom Card */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="group relative bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="aspect-[4/5] relative rounded-xl overflow-hidden mb-6 shadow-inner">
                    <img
                      src={weddingData.couple.groom.photo}
                      alt={weddingData.couple.groom.shortName}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-[#4A7BC8] mb-1">
                    {weddingData.couple.groom.fullName}
                  </h3>
                  <p className="text-[#7EA7E8] font-semibold text-xs tracking-wider mb-3">GROOM</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed font-light">
                    {weddingData.couple.groom.parentNames}
                  </p>
                  <a
                    href={`https://instagram.com/${weddingData.couple.groom.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#4A7BC8] hover:text-[#7EA7E8] transition-colors bg-[#F5F8FF] px-4 py-2 rounded-full border border-[#7EA7E8]/20 shadow-sm"
                  >
                    <InstagramIcon size={14} />
                    {weddingData.couple.groom.instagram}
                  </a>
                </motion.div>

                {/* Bride Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="group relative bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="aspect-[4/5] relative rounded-xl overflow-hidden mb-6 shadow-inner">
                    <img
                      src={weddingData.couple.bride.photo}
                      alt={weddingData.couple.bride.shortName}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-[#4A7BC8] mb-1">
                    {weddingData.couple.bride.fullName}
                  </h3>
                  <p className="text-[#7EA7E8] font-semibold text-xs tracking-wider mb-3">BRIDE</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed font-light">
                    {weddingData.couple.bride.parentNames}
                  </p>
                  <a
                    href={`https://instagram.com/${weddingData.couple.bride.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#4A7BC8] hover:text-[#7EA7E8] transition-colors bg-[#F5F8FF] px-4 py-2 rounded-full border border-[#7EA7E8]/20 shadow-sm"
                  >
                    <InstagramIcon size={14} />
                    {weddingData.couple.bride.instagram}
                  </a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Love Story Section */}
          <section className="relative py-24 px-6 bg-white overflow-hidden">
            {/* Watercolor Dividers */}
            <div className="absolute top-0 left-0 w-full rotate-180">
              <TornDivider direction="up" />
            </div>

            <div className="max-w-4xl mx-auto pt-10">
              <div className="text-center space-y-3 mb-16">
                <span className="font-great-vibes text-4xl text-[#7EA7E8]">Our Timeline</span>
                <h2 className="font-playfair text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide">
                  Our Love Story
                </h2>
                <div className="w-20 h-1 bg-[#4A7BC8]/20 mx-auto rounded-full" />
              </div>

              {/* Story Vertical Timeline */}
              <div className="relative border-l-2 border-[#7EA7E8]/30 ml-4 md:ml-0 md:left-1/2">
                {weddingData.loveStory.map((story, idx) => (
                  <motion.div
                    key={story.year}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`relative mb-16 md:w-1/2 md:px-8 ${idx % 2 === 0 ? "md:left-[-50%] md:text-right" : "md:left-[50%] md:text-left"
                      }`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute top-1.5 -left-[9px] md:left-auto md:right-[-9px] w-4 h-4 rounded-full bg-[#4A7BC8] border-4 border-white shadow-md z-10" />

                    <div className={`pl-8 md:pl-0 ${idx % 2 !== 0 && "md:pl-8"}`}>
                      {/* Timeline Card */}
                      <div className="bg-[#F5F8FF] rounded-2xl p-6 border border-[#7EA7E8]/20 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <span className="inline-block px-3 py-1 bg-[#4A7BC8] text-white text-xs font-semibold rounded-full tracking-wider mb-3">
                          {story.year}
                        </span>

                        <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-4 shadow-sm">
                          <img
                            src={story.image}
                            alt={story.title}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <h3 className="font-playfair text-xl font-bold text-[#4A7BC8] mb-2">
                          {story.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed font-light">
                          {story.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom torn divider */}
            <div className="absolute bottom-0 left-0 w-full">
              <TornDivider direction="down" />
            </div>
          </section>

          {/* Event Details Section */}
          <section className="relative py-24 px-6 bg-[#F5F8FF]">
            <div className="absolute top-10 right-10 opacity-40">
              <FloralDecoration className="w-28 h-28" />
            </div>

            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="font-great-vibes text-4xl text-[#7EA7E8]">Join Us</span>
                <h2 className="font-playfair text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide">
                  Wedding Schedule & Countdown
                </h2>
                <div className="w-20 h-1 bg-[#4A7BC8]/20 mx-auto rounded-full" />
              </div>

              {/* Countdown Timer */}
              <div className="grid grid-cols-4 gap-3 max-w-xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#7EA7E8]/20 shadow-lg text-center">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Mins" },
                  { value: timeLeft.seconds, label: "Secs" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <span className="font-playfair text-3xl md:text-4xl font-extrabold text-[#4A7BC8]">
                      {item.value}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#7EA7E8]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Schedule cards */}
              <div className="grid md:grid-cols-2 gap-8 pt-8">
                {/* Akad Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 border border-[#7EA7E8]/20 shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-[#F5F8FF] rounded-full flex items-center justify-center text-[#4A7BC8] mb-4">
                      <Clock size={24} />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-[#4A7BC8]">
                      {weddingData.events.akad.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 font-light">
                      <p className="flex items-center gap-2 font-medium">
                        <Calendar size={16} className="text-[#7EA7E8]" />
                        {weddingData.events.akad.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={16} className="text-[#7EA7E8]" />
                        {weddingData.events.akad.time}
                      </p>
                      <p className="flex items-center gap-2 align-top">
                        <MapPin size={16} className="text-[#7EA7E8] shrink-0" />
                        <span>
                          <strong>{weddingData.events.akad.venue}</strong>
                          <br />
                          {weddingData.events.akad.address}
                        </span>
                      </p>
                    </div>
                  </div>
                  <a
                    href={weddingData.events.akad.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full mt-6 bg-[#4A7BC8] text-white hover:bg-[#3b6bb3] font-semibold text-sm tracking-wider py-3 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Open Google Maps
                  </a>
                </motion.div>

                {/* Reception Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-[#7EA7E8]/20 shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-[#F5F8FF] rounded-full flex items-center justify-center text-[#4A7BC8] mb-4">
                      <Clock size={24} />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-[#4A7BC8]">
                      {weddingData.events.reception.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 font-light">
                      <p className="flex items-center gap-2 font-medium">
                        <Calendar size={16} className="text-[#7EA7E8]" />
                        {weddingData.events.reception.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={16} className="text-[#7EA7E8]" />
                        {weddingData.events.reception.time}
                      </p>
                      <p className="flex items-center gap-2 align-top">
                        <MapPin size={16} className="text-[#7EA7E8] shrink-0" />
                        <span>
                          <strong>{weddingData.events.reception.venue}</strong>
                          <br />
                          {weddingData.events.reception.address}
                        </span>
                      </p>
                    </div>
                  </div>
                  <a
                    href={weddingData.events.reception.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full mt-6 bg-[#4A7BC8] text-white hover:bg-[#3b6bb3] font-semibold text-sm tracking-wider py-3 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Open Google Maps
                  </a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Venue Section (Maps Embed) */}
          <section className="relative py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="font-great-vibes text-4xl text-[#7EA7E8]">Location</span>
                <h2 className="font-playfair text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide">
                  Our Venue Maps
                </h2>
                <div className="w-20 h-1 bg-[#4A7BC8]/20 mx-auto rounded-full" />
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-[#7EA7E8]/20 shadow-xl aspect-[16/9] min-h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666467005822!2d106.8286812!3d-6.17017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f15c7e0996c5%3A0xc4ebde590bf7df5e!2sGereja%20Katedral%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </section>

          {/* Dress Code Section */}
          <section className="relative py-24 px-6 bg-[#F5F8FF]">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-3">
                <span className="font-great-vibes text-4xl text-[#7EA7E8]">Theme & Colors</span>
                <h2 className="font-playfair text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide">
                  Wedding Dress Code
                </h2>
                <div className="w-20 h-1 bg-[#4A7BC8]/20 mx-auto rounded-full" />
                <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed font-light">
                  {weddingData.dressCode.guidelines}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto pt-6">
                {weddingData.dressCode.colors.map((color) => (
                  <div
                    key={color.name}
                    className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-[#7EA7E8]/10"
                  >
                    <div
                      className="w-16 h-16 rounded-full border border-gray-100 shadow-md"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-semibold text-xs tracking-wider text-gray-700">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto pt-8">
                <div className="p-4 bg-white/70 backdrop-blur-md rounded-xl border border-white/50 text-left">
                  <h4 className="font-bold text-sm text-[#4A7BC8] mb-1">👗 Women</h4>
                  <p className="text-xs text-gray-500 font-light">
                    Elegant long dress, gown, modern kebaya, or classy semi-formal attire in matching tones.
                  </p>
                </div>
                <div className="p-4 bg-white/70 backdrop-blur-md rounded-xl border border-white/50 text-left">
                  <h4 className="font-bold text-sm text-[#4A7BC8] mb-1">🤵 Men</h4>
                  <p className="text-xs text-gray-500 font-light">
                    Classic suit, batik longsleeve, or clean formal attire matching the color elements.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="relative py-24 px-6 bg-white">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="font-great-vibes text-4xl text-[#7EA7E8]">Moments</span>
                <h2 className="font-playfair text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide">
                  Our Pre-Wedding Gallery
                </h2>
                <div className="w-20 h-1 bg-[#4A7BC8]/20 mx-auto rounded-full" />
              </div>

              {/* Masonry Layout */}
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {weddingData.gallery.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => setLightboxIndex(idx)}
                    className="relative overflow-hidden rounded-xl shadow-md group cursor-zoom-in break-inside-avoid"
                  >
                    <img
                      src={img}
                      alt={`Gallery moment ${idx}`}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#4A7BC8]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="text-white" size={24} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
              {lightboxIndex !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                >
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="absolute top-6 right-6 text-white/80 hover:text-white"
                  >
                    <X size={32} />
                  </button>

                  <button
                    onClick={() => {
                      setLightboxIndex(
                        (lightboxIndex - 1 + weddingData.gallery.length) %
                        weddingData.gallery.length
                      );
                    }}
                    className="absolute left-6 text-white/80 hover:text-white"
                  >
                    <ChevronLeft size={48} />
                  </button>

                  <div className="max-w-4xl max-h-[80vh] relative">
                    <img
                      src={weddingData.gallery[lightboxIndex]}
                      alt="Moment enlarged"
                      className="max-w-full max-h-[80vh] object-contain rounded-lg"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setLightboxIndex((lightboxIndex + 1) % weddingData.gallery.length);
                    }}
                    className="absolute right-6 text-white/80 hover:text-white"
                  >
                    <ChevronRight size={48} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>


          {/* Wedding Gift / Digital Gift Section */}
          <section className="relative py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="font-great-vibes text-4xl text-[#7EA7E8]">Wishes & Gifts</span>
                <h2 className="font-playfair text-4xl md:text-5xl text-[#4A7BC8] font-bold tracking-wide">
                  Wedding Gifts
                </h2>
                <div className="w-20 h-1 bg-[#4A7BC8]/20 mx-auto rounded-full" />
                <p className="text-gray-500 text-sm max-w-md mx-auto font-light">
                  Your prayers and presence are already a blessing. If you wish to send a gift, we provide the digital wallets/bank details below.
                </p>
              </div>

              {/* Gift cards */}
              <div className="grid md:grid-cols-2 gap-8 pt-6">
                {/* Bank Transfer Card */}
                <div className="bg-[#F5F8FF] rounded-2xl p-8 border border-[#7EA7E8]/20 shadow-md space-y-6">
                  <div className="flex items-center gap-3">
                    <Gift size={24} className="text-[#4A7BC8]" />
                    <h3 className="font-playfair text-lg font-bold text-[#4A7BC8]">Bank Transfer</h3>
                  </div>

                  <div className="space-y-4">
                    {weddingData.gifts.accounts.map((acc, index) => (
                      <div
                        key={acc.accountNumber}
                        className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs uppercase font-extrabold text-[#7EA7E8]">
                            {acc.bankName}
                          </p>
                          <p className="font-mono text-sm font-bold text-gray-700">
                            {acc.accountNumber}
                          </p>
                          <p className="text-xs text-gray-500 font-light mt-1">
                            A/N {acc.accountHolder}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopy(acc.accountNumber, index)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4A7BC8] text-white hover:bg-[#3b6bb3] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check size={12} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QRIS / E-wallet Card */}
                <div className="bg-[#F5F8FF] rounded-2xl p-8 border border-[#7EA7E8]/20 shadow-md flex flex-col items-center justify-center text-center space-y-6">
                  <h3 className="font-playfair text-lg font-bold text-[#4A7BC8]">Gift via QRIS</h3>
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 w-48 h-48 flex items-center justify-center">
                    <img
                      src={weddingData.gifts.qrisUrl}
                      alt="Wedding QRIS Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    Scan the QR code above using any e-wallet or banking app (OVO, GoPay, Dana, LinkAja, BCA, Mandiri, etc.)
                  </p>
                </div>
              </div>
            </div>
          </section>






          {/* Footer Section */}
          <footer className="relative py-16 px-6 bg-[#F5F8FF] text-center border-t border-[#7EA7E8]/10 overflow-hidden">
            <div className="absolute bottom-0 left-0 scale-y-[-1]">
              <FloralDecoration className="w-24 h-24" />
            </div>
            <div className="absolute bottom-0 right-0 scale-x-[-1] scale-y-[-1]">
              <FloralDecoration className="w-24 h-24" />
            </div>

            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <span className="font-great-vibes text-4xl text-[#7EA7E8]">Thank You</span>
              <p className="font-playfair text-xl md:text-2xl font-semibold text-[#4A7BC8] italic">
                Thank You For Being Part Of Our Special Day
              </p>

              <h2 className="font-great-vibes text-5xl text-[#4A7BC8]">
                Alghi & Yughi
              </h2>

              <p className="text-xs uppercase font-extrabold tracking-widest text-[#7EA7E8]">
                9 April 2027
              </p>

              <div className="w-16 h-[1px] bg-[#7EA7E8]/30 mx-auto my-4" />

              <div className="flex justify-center gap-4 text-[#4A7BC8]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <InstagramIcon size={18} />
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
