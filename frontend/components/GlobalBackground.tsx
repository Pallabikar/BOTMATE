"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FloatingRobot from "./FloatingRobot";

export default function GlobalBackground() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ x: number, y: number, scale: number, duration: number, size: number, yOffset: number }>>([]);

  useEffect(() => {
    setMounted(true);
    const newParticles = [...Array(20)].map(() => ({
      // eslint-disable-next-line
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      // eslint-disable-next-line
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 10 + 10,
      size: Math.random() * 3 + 1,
      yOffset: Math.random() * -100
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Layer 1: Gradient Base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, #0f2a44 0%, transparent 40%),
            radial-gradient(circle at 80% 30%, #001a2f 0%, transparent 40%),
            #0B0F14
          `,
        }}
      />

      {/* Layer 1.5: Illusion Blobs (High-Level Animation) */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#7b2cbf] rounded-full mix-blend-screen filter blur-[128px] opacity-40"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1.2, 1, 1.2],
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00AFFF] rounded-full mix-blend-screen filter blur-[128px] opacity-30"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.3, 1],
            x: [0, 50, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-[#00f2ea] rounded-full mix-blend-screen filter blur-[100px] opacity-20"
        />
      </div>

      {/* Layer 2: Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(#00AFFF 1px, transparent 1px), linear-gradient(90deg, #00AFFF 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Layer 3: Particle Dots */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            initial={{
              x: p.x,
              y: p.y,
              scale: p.scale,
            }}
            animate={{
              y: [null, p.yOffset],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: p.size + "px",
              height: p.size + "px",
            }}
          />
        ))}
      </div>

      {/* Layer 4: Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 5: Floating Robot */}
      <FloatingRobot />
    </div>
  );
}
