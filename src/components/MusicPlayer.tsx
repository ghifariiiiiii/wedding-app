"use client";

import React, { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  url: string;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  visible?: boolean;
}

export default function MusicPlayer({ url, isPlaying, setIsPlaying, visible = true }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instantiate audio object on client side
    audioRef.current = new Audio(url);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [url]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log("Audio play failed, user interaction needed:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={togglePlay}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/70 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white active:scale-95"
        aria-label="Toggle Background Music"
        animate={{
          boxShadow: isPlaying
            ? [
                "0px 0px 0px 0px rgba(74, 123, 200, 0.4)",
                "0px 0px 0px 10px rgba(74, 123, 200, 0)",
              ]
            : "0px 10px 25px -5px rgba(0, 0, 0, 0.1)",
        }}
        transition={{
          repeat: isPlaying ? Infinity : 0,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="flex items-center justify-center text-[#4A7BC8]"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.div>

        {isPlaying && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7EA7E8] opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-[#4A7BC8]"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
