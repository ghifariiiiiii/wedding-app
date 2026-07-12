"use client";

import React, { useEffect, useRef } from "react";

export default function FlowerParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Initialize particles
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 8,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1.2 + 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }

    const drawPetal = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.beginPath();
      
      // Beautiful petal shape
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-size / 2, -size / 2, -size / 4, -size);
      ctx.quadraticCurveTo(0, -size * 1.2, size / 4, -size);
      ctx.quadraticCurveTo(size / 2, -size / 2, 0, 0);
      
      // Soft blue gradient matching palette
      const gradient = ctx.createRadialGradient(0, -size / 2, 0, 0, -size / 2, size);
      gradient.addColorStop(0, `rgba(126, 167, 232, ${opacity})`); // #7EA7E8
      gradient.addColorStop(1, `rgba(74, 123, 200, ${opacity * 0.3})`); // #4A7BC8

      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + p.size) {
          p.y = -p.size;
          p.x = Math.random() * canvas.width;
          p.speedY = Math.random() * 1.2 + 0.5;
          p.speedX = Math.random() * 1 - 0.5;
        }

        if (p.x > canvas.width + p.size) {
          p.x = -p.size;
        } else if (p.x < -p.size) {
          p.x = canvas.width + p.size;
        }

        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.opacity);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
