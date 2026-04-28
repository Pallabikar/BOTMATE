"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { AnimatedText } from "./AnimationSystem";
import Magnetic from "./Magnetic";

/* ─────────────────────────────────────────────
   GLITCH TEXT HOOK
───────────────────────────────────────────── */
function useGlitchText(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  useEffect(() => {
    if (!trigger) return;
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((letter, idx) => {
          if (idx < iter) return letter;
          if (letter === " ") return "\u00A0"; // non-breaking space — never collapses
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iter >= text.length) clearInterval(interval);
      iter += 0.5;
    }, 30);
    return () => clearInterval(interval);
  }, [trigger, text]);
  return display;
}

/* ─────────────────────────────────────────────
   AR CORNER BRACKETS
───────────────────────────────────────────── */
function ARBrackets({ size = 20, color = "#00e5ff", thickness = 2 }: { size?: number; color?: string; thickness?: number }) {
  const s = `${size}px`;
  const b = `${thickness}px solid ${color}`;
  return (
    <>
      <span style={{ position:"absolute",top:0,left:0,width:s,height:s,borderTop:b,borderLeft:b, pointerEvents: "none" }} />
      <span style={{ position:"absolute",top:0,right:0,width:s,height:s,borderTop:b,borderRight:b, pointerEvents: "none" }} />
      <span style={{ position:"absolute",bottom:0,left:0,width:s,height:s,borderBottom:b,borderLeft:b, pointerEvents: "none" }} />
      <span style={{ position:"absolute",bottom:0,right:0,width:s,height:s,borderBottom:b,borderRight:b, pointerEvents: "none" }} />
    </>
  );
}

/* ─────────────────────────────────────────────
   HUD READOUT
───────────────────────────────────────────── */
function HUDReadout({ label, value }: { label: string; value: string }) {
  return (
    <div className="hud-readout">
      <span className="hud-label">{label}</span>
      <span className="hud-value">{value}</span>
      <style jsx>{`
        .hud-readout { display: flex; flex-direction: column; gap: 2px; }
        .hud-label { font-size: 9px; letter-spacing: 0.2em; color: rgba(0,229,255,0.4); text-transform: uppercase; font-family: monospace; }
        .hud-value { font-size: 13px; letter-spacing: 0.1em; color: #00e5ff; font-family: monospace; font-weight: 700; }
      `}</style>
    </div>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const glitchedHighlight = useGlitchText("BOTMATE", isInView);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="hero-container" ref={containerRef}>
      <section className="hero">
        {/* ── HUD OVERLAY ── */}
        <div className="hero-hud-frame" aria-hidden="true">
          <ARBrackets size={32} color="#00e5ff" thickness={2} />
          <div className="hud-corner-info tl"><HUDReadout label="SYSTEM" value="ACTIVE" /></div>
          <div className="hud-corner-info tr"><HUDReadout label="NEURAL" value="LINKED" /></div>
          <div className="hud-corner-info bl"><HUDReadout label="LOCATION" value="GLOBAL" /></div>
          <div className="hud-corner-info br"><HUDReadout label="PROTOCOL" value="V.4.2" /></div>
          <div className="scanning-bar" />
        </div>

        {/* ── BACKGROUND ── */}
        <div className="hero-bg">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="hero-video-bg"
            src="https://res.cloudinary.com/dh6ibke5w/video/upload/v1777274519/Robodino_Final_y3n3cq.mp4"
            poster="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274515/hero-poster_p8qcmr.png"
          />
          <div className="grid-overlay" />
          <div className="speed-lines" />
          <div className="glow-blob" />
          <div className="glow-blob glow-blob-2" />
          <div className="particles">
            {[...Array(18)].map((_, i) => (
              <span key={i} className="particle" style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="hero-inner">
          <div className="hero-left">
            <h1 className="hero-title">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ display: "block" }}
              >
                Grow Your Brand
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                style={{ display: "block" }}
              >
                Digitally with
              </motion.span>
              <span className="highlight">
                {glitchedHighlight.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            <div className="hero-sub-wrap">
              <AnimatedText 
                text="Enter a virtual tech universe. Experience premium, AI-driven growth strategies designed for the future of business."
                className="hero-sub"
                delay={0.8}
              />
            </div>

            <motion.div
              className="hero-btns"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link href="/get-started" className="btn-primary">
                <span>Start Your Journey</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/packages" className="btn-outline">
                View Packages
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ══ SHELL ══ */
        .hero-container {
          background: #060a0f;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
        }

        /* ══ HERO ══ */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: 72px;
        }




        /* ══ HUD ══ */
        .hero-hud-frame {
          position: absolute;
          inset: 32px;
          z-index: 10;
          pointer-events: none;
        }
        .hud-corner-info { position: absolute; }
        .tl { top: 12px; left: 12px; }
        .tr { top: 12px; right: 12px; text-align: right; }
        .bl { bottom: 12px; left: 12px; }
        .br { bottom: 12px; right: 12px; text-align: right; }

        .scanning-bar {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          box-shadow: 0 0 15px #00e5ff;
          opacity: 0.3;
          animation: scanVertical 6s ease-in-out infinite;
        }
        @keyframes scanVertical {
          0%, 100% { top: 0%; }
          50% { top: 100%; }
        }

        /* ══ BACKGROUND ══ */
        .hero-bg { position: absolute; inset: 0; z-index: 0; }

        .grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,175,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,175,255,0.04) 1px, transparent 1px);
          background-size: 100px 100px;
          mask-image: radial-gradient(ellipse 80% 80% at 65% 50%, black 0%, transparent 100%);
        }

        .speed-lines {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            -35deg,
            transparent 0, transparent 120px,
            rgba(0,175,255,0.025) 121px,
            rgba(0,175,255,0.025) 122px
          );
          animation: shiftLines 8s linear infinite;
        }

        .glow-blob {
          position: absolute; top: 45%; right: 5%;
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%);
          transform: translateY(-50%);
          border-radius: 50%;
          animation: pulse 5s ease-in-out infinite alternate;
          z-index: 1;
        }
        .glow-blob-2 {
          right: auto; left: -10%; top: 20%;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(0,80,180,0.08) 0%, transparent 70%);
          animation-delay: 2s;
        }

        .particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .particle {
          position: absolute;
          width: 2px; height: 2px;
          background: rgba(0,229,255,0.55);
          border-radius: 50%;
          top:  calc(10% + var(--i) * 5%);
          left: calc(5%  + var(--i) * 5.2%);
          animation: floatParticle calc(6s + var(--i) * 0.4s) ease-in-out infinite alternate;
          animation-delay: calc(var(--i) * 0.35s);
        }

        /* ══ LAYOUT ══ */
        .hero-inner {
          position: relative; z-index: 2;
          width: 100%;
          padding: 0 64px 0 130px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 40px;
        }

        /* ══ LEFT ══ */
        .hero-left { flex: 0 0 auto; max-width: 600px; z-index: 3; text-align: left; }

        .hero-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(40px, 5vw, 68px);
          font-weight: 700; line-height: 1.08;
          color: #fff; letter-spacing: -1.5px;
          word-spacing: 0.1em; /* prevents word-crush */
          margin-bottom: 22px;
        }
        .hero-title .highlight {
          color: #00e5ff; display: block;
          text-shadow: 0 0 30px rgba(0,229,255,0.4);
          letter-spacing: -2px;
          word-spacing: 0.15em;
          margin-top: 5px;
        }

        .hero-sub {
          font-size: 15.5px; color: rgba(255,255,255,0.55);
          line-height: 1.8; max-width: 470px; margin-bottom: 42px;
        }

        .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 48px; }

        .btn-primary {
          background: #00e5ff; color: #000;
          font-family: 'Montserrat', sans-serif;
          font-size: 15.5px; font-weight: 700;
          padding: 15px 36px; border-radius: 50px;
          border: none; cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 10px;
          transition: all 0.25s;
          box-shadow: 0 4px 20px rgba(0,229,255,0.4);
        }
        .btn-primary:hover {
          background: #00f7ff;
          box-shadow: 0 10px 40px rgba(0,229,255,0.55);
          transform: translateY(-2px); gap: 13px;
        }

        .btn-outline {
          background: transparent; color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 15.5px; font-weight: 600;
          padding: 14px 36px; border-radius: 50px;
          border: 2px solid rgba(0,229,255,0.4);
          cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center;
          transition: all 0.25s;
        }
        .btn-outline:hover {
          border-color: #00e5ff; color: #00e5ff;
          box-shadow: 0 0 20px rgba(0,229,255,0.18);
          transform: translateY(-2px);
        }

        /* ══ VIDEO ══ */
        .hero-video-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          mix-blend-mode: screen;
          filter: brightness(1.1);
          z-index: 1;
          pointer-events: none;
        }

        /* ══ KEYFRAMES ══ */
        @keyframes shiftLines { 0% { background-position: 0 0; } 100% { background-position: 300px 300px; } }
        @keyframes pulse {
          from { opacity: 0.6; transform: translateY(-50%) scale(1); }
          to   { opacity: 1;   transform: translateY(-50%) scale(1.1); }
        }
        @keyframes floatParticle {
          from { transform: translateY(0) translateX(0); opacity: 0.3; }
          to   { transform: translateY(-28px) translateX(12px); opacity: 0.8; }
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 960px) {
          .navbar { padding: 0 24px; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .hero-inner { flex-direction: column; padding: 60px 28px 48px; text-align: center; gap: 0; }
          .hero-left { max-width: 100%; }
          .hero-btns { justify-content: center; }
        }
        @media (max-width: 600px) {
          .hero-title { font-size: 36px; }
          .hero-inner { padding: 40px 20px 40px; }
        }
      `}</style>
    </div>
  );
}