"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/* =========================
   DATA
========================= */
const milestones = [
  {
    year: "2023",
    title: "System Initialization",
    description: "BotMate Core online. First AI agents deployed.",
  },
  {
    year: "2024",
    title: "Network Expansion",
    description: "500+ clients integrated globally.",
  },
  {
    year: "2025",
    title: "Quantum Integration",
    description: "99.9% automation accuracy achieved.",
  },
  {
    year: "2026",
    title: "The Singularity",
    description: "Full autonomous digital scaling.",
  },
];

/* =========================
   FAUX 3D CARD
========================= */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="p-6 rounded-xl border border-white/10 bg-[#0B0F14]/70 backdrop-blur-xl"
    >
      {children}
    </motion.div>
  );
}

/* =========================
   MAIN TIMELINE
========================= */
export default function CompanyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Vertical scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal movement (desktop premium effect)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  // Disable x on mobile
  const responsiveX = isMobile ? "0%" : x;

  return (
    <section
      ref={containerRef}
      className="py-32 relative z-10 bg-[#0B0F14]/50 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h2 className="text-sm tracking-[0.2em] text-[#00AFFF] uppercase mb-4">
            Historical Log
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">
            System <span className="text-[#00AFFF]">Evolution</span>
          </h3>
        </motion.div>

        {/* PROGRESS LINE */}
        <div className="relative">
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] h-full origin-top bg-[#00AFFF]"
          />
        </div>

        {/* TIMELINE */}
        <motion.div
          style={{ x: responsiveX }}
          className="space-y-20 max-w-5xl mx-auto"
        >
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 pl-10 md:pl-0 ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* TEXT */}
              <div className="w-full md:w-1/2">
                <TiltCard>
                  <h4 className="text-5xl text-[#00AFFF]/20 font-bold mb-2">
                    {m.year}
                  </h4>
                  <h5 className="text-xl font-bold text-white mb-2">
                    {m.title}
                  </h5>
                  <p className="text-gray-400">{m.description}</p>
                </TiltCard>
              </div>

              {/* NODE (aligned with line) */}
              <div className="absolute left-[13px] md:relative md:left-0 flex items-center justify-center">
                <motion.div
                  className="w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-[#00AFFF] bg-[#0B0F14]"
                  animate={{
                    boxShadow: [
                      "0 0 5px #00AFFF",
                      "0 0 20px #00AFFF",
                      "0 0 5px #00AFFF",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* EMPTY SIDE */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* BACKGROUND GLOW */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,175,255,0.1) 0%, transparent 70%)",
          top: "20%",
          left: "-10%",
        }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
    </section>
  );
}