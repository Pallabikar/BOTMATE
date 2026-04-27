"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), { damping: 20, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div 
      className="page-header" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="header-bg">
        <motion.div 
          className="grid-overlay" 
          style={{ 
            x: useTransform(rotateY, [-10, 10], [-20, 20]),
            y: useTransform(rotateX, [-10, 10], [20, -20])
          }}
        />
        <div className="glow-blob" />
        <div className="particles">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="particle" style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
      </div>
      
      <motion.div 
        className="header-content"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <h1 className="header-title" style={{ transform: "translateZ(30px)" }}>
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </h1>
        {subtitle && (
          <motion.p 
            className="header-sub"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ transform: "translateZ(15px)" }}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div 
          className="cyan-underline" 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ transform: "translateZ(20px)" }}
        />
      </motion.div>

      <style jsx>{`
        .page-header {
          position: relative;
          padding: 160px 48px 80px;
          text-align: center;
          background: #060a0f;
          overflow: hidden;
          perspective: 1000px;
        }
        .header-bg { position: absolute; inset: 0; z-index: 0; }
        .grid-overlay {
          position: absolute; inset: 0;
          background-image: 
            linear-gradient(rgba(0,175,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,175,255,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(circle at center, black 0%, transparent 80%);
        }
        .glow-blob {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 500px; height: 300px;
          background: radial-gradient(ellipse, rgba(0,229,255,0.08) 0%, transparent 70%);
          filter: blur(40px);
        }
        .particles { position: absolute; inset: 0; pointer-events: none; }
        .particle {
          position: absolute; width: 2px; height: 2px;
          background: rgba(0,229,255,0.4);
          top: calc(20% + var(--i) * 6%);
          left: calc(10% + var(--i) * 7.5%);
          animation: float 8s ease-in-out infinite alternate;
          animation-delay: calc(var(--i) * 0.4s);
        }
        @keyframes float {
          from { transform: translateY(0); opacity: 0.3; }
          to { transform: translateY(-40px); opacity: 0.7; }
        }

        .header-content { position: relative; z-index: 1; max-width: 800px; margin: 0 auto; }
        .header-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          color: #fff;
          letter-spacing: -2px;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .header-sub {
          font-size: 18px;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          margin-bottom: 32px;
        }
        .cyan-underline {
          width: 60px; height: 4px;
          background: #00e5ff;
          margin: 0 auto;
          border-radius: 2px;
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.5);
        }

        @media (max-width: 768px) {
          .page-header { padding: 120px 24px 60px; }
          .header-title { font-size: 32px; }
          .header-sub { font-size: 15px; }
        }
      `}</style>
    </div>
  );
}
