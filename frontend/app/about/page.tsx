"use client";

import React, { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import TeamGrid from "@/components/TeamGrid";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { AnimatedSection, AnimatedText, StaggerReveal, RevealItem } from "@/components/AnimationSystem";

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
          if (letter === " ") return " ";
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
      <span style={{ position:"absolute",top:0,left:0,width:s,height:s,borderTop:b,borderLeft:b }} />
      <span style={{ position:"absolute",top:0,right:0,width:s,height:s,borderTop:b,borderRight:b }} />
      <span style={{ position:"absolute",bottom:0,left:0,width:s,height:s,borderBottom:b,borderLeft:b }} />
      <span style={{ position:"absolute",bottom:0,right:0,width:s,height:s,borderBottom:b,borderRight:b }} />
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

/* ─────────────────────────────────────────────
   PARTICLE FIELD
───────────────────────────────────────────── */
function ParticleField() {
  const [mounted, setMounted] = useState(false);
  const particles = useRef<any[]>([]);

  useEffect(() => {
    particles.current = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      dur: Math.random() * 8 + 4,
      delay: Math.random() * 6,
    }));
    setMounted(true);
  }, []);

  if (!mounted) return <div className="particle-field" aria-hidden="true" />;

  return (
    <div className="particle-field" aria-hidden="true">
      {particles.current.map(p => (
        <div key={p.id} className="particle" style={{
          left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.size}px`, height: `${p.size}px`,
          animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
        }} />
      ))}
      <style jsx>{`
        .particle-field { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        .particle {
          position: absolute; border-radius: 50%;
          background: #00e5ff; opacity: 0;
          animation: particleFloat linear infinite;
        }
        @keyframes particleFloat {
          0% { opacity: 0; transform: translateY(0) scale(1); }
          20% { opacity: 0.6; }
          80% { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-120px) scale(0.3); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOLOGRAPHIC GRID
───────────────────────────────────────────── */
function HoloGrid() {
  return (
    <div className="holo-grid" aria-hidden="true">
      <style jsx>{`
        .holo-grid {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden;
          background-image:
            linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridShift 20s linear infinite;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }
        @keyframes gridShift { 0% { background-position: 0 0; } 100% { background-position: 60px 60px; } }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RADAR SWEEP
───────────────────────────────────────────── */
function RadarSweep() {
  return (
    <div className="radar-wrap" aria-hidden="true">
      <div className="radar-circle" />
      <div className="radar-circle r2" />
      <div className="radar-circle r3" />
      <div className="radar-sweep" />
      <div className="radar-dot d1" />
      <div className="radar-dot d2" />
      <div className="radar-dot d3" />
      <style jsx>{`
        .radar-wrap {
          width: 220px; height: 220px; position: relative;
          border-radius: 50%; overflow: hidden;
        }
        .radar-circle {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid rgba(0,229,255,0.25);
        }
        .r2 { inset: 30px; }
        .r3 { inset: 60px; }
        .radar-sweep {
          position: absolute; inset: 0; border-radius: 50%;
          background: conic-gradient(from 0deg, transparent 80%, rgba(0,229,255,0.4) 95%, rgba(0,229,255,0.05) 100%);
          animation: radarRotate 3s linear infinite;
          transform-origin: center;
        }
        @keyframes radarRotate { to { transform: rotate(360deg); } }
        .radar-dot {
          position: absolute; width: 6px; height: 6px; border-radius: 50%;
          background: #00e5ff; box-shadow: 0 0 8px #00e5ff;
          animation: dotPulse 3s ease-in-out infinite;
        }
        .d1 { top: 40px; left: 60px; animation-delay: 0s; }
        .d2 { top: 120px; left: 150px; animation-delay: 1s; }
        .d3 { top: 80px; left: 140px; animation-delay: 2s; }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE HEADER WITH EXPRESSIVE TYPOGRAPHY
───────────────────────────────────────────── */
function EnhancedPageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const glitchedTitle = useGlitchText(title, inView);

  const subtitleWords = subtitle.split(" ");

  return (
    <section className="hero-header" ref={ref}>
      <HoloGrid />
      <ParticleField />

      {/* AR HUD corners */}
      <div className="hud-frame" aria-hidden="true">
        <ARBrackets size={32} color="#00e5ff" thickness={2} />
        <div className="hud-tl"><HUDReadout label="SYS.STATUS" value="ONLINE" /></div>
        <div className="hud-tr"><HUDReadout label="NEURAL.LINK" value="94.7%" /></div>
        <div className="hud-bl"><HUDReadout label="AI.CORE" value="ACTIVE" /></div>
        <div className="hud-br"><HUDReadout label="UPTIME" value="99.9%" /></div>
      </div>

      {/* Scanning line */}
      <div className="hero-scan" aria-hidden="true" />

      <div className="hero-content">
        {/* Pre-title tag */}
        <motion.div
          className="pre-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="tag-bracket">[</span>
          <span className="tag-text">ABOUT BOTMATE</span>
          <span className="tag-bracket">]</span>
        </motion.div>

        {/* Glitch Title */}
        <h1 className="hero-title">
          {glitchedTitle.split("").map((char, i) => (
            <motion.span
              key={i}
              className="char"
              initial={{ opacity: 0, y: 60, rotateX: -90 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.04, ease: [0.23, 1, 0.32, 1] }}
              style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Underline accent */}
        <motion.div
          className="title-line"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        />

        {/* Word-by-word subtitle */}
        <div className="hero-subtitle-wrap">
          <AnimatedText 
            text={subtitle}
            className="hero-subtitle"
            delay={0.8}
          />
        </div>

        {/* Bottom HUD bar */}
        <motion.div
          className="hud-bar"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          <div className="hud-line" />
          <span className="hud-txt">EST. 2024 · BHUBANESWAR, ODISHA · AI-POWERED</span>
          <div className="hud-line" />
        </motion.div>
      </div>

      <style jsx>{`
        .hero-header {
          min-height: 60vh;
          background: #060a0f;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-bottom: 1px solid rgba(0,229,255,0.08);
        }
        .hero-scan {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          animation: heroScan 4s ease-in-out infinite;
          opacity: 0.4;
        }
        @keyframes heroScan { 0%, 100% { top: 20%; } 50% { top: 80%; } }

        .hud-frame {
          position: absolute; inset: 24px; pointer-events: none;
        }
        .hud-tl { position: absolute; top: 12px; left: 12px; }
        .hud-tr { position: absolute; top: 12px; right: 12px; text-align: right; }
        .hud-bl { position: absolute; bottom: 12px; left: 12px; }
        .hud-br { position: absolute; bottom: 12px; right: 12px; text-align: right; }

        .hero-content {
          position: relative; z-index: 2;
          text-align: center; padding: 80px 48px;
          max-width: 900px;
        }

        .pre-tag {
          display: inline-flex; gap: 8px; align-items: center;
          margin-bottom: 24px;
          font-family: monospace; font-size: 12px;
          letter-spacing: 0.3em; color: rgba(0,229,255,0.6);
        }
        .tag-bracket { color: #00e5ff; font-size: 14px; }
        .tag-text { animation: tagBlink 2s ease-in-out infinite; }
        @keyframes tagBlink { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }

        .hero-title {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 900;
          color: #fff;
          line-height: 1;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
          perspective: 600px;
        }
        .char { transition: color 0.1s; }
        .char:hover { color: #00e5ff; text-shadow: 0 0 20px #00e5ff; }

        .title-line {
          height: 3px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          border-radius: 2px;
          transform-origin: left;
          margin: 0 auto 32px;
          width: 200px;
          box-shadow: 0 0 20px rgba(0,229,255,0.5);
        }

        .hero-subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          max-width: 700px;
          margin: 0 auto 40px;
        }

        .hud-bar {
          display: flex; align-items: center; gap: 16px;
          justify-content: center;
        }
        .hud-line { flex: 1; max-width: 80px; height: 1px; background: rgba(0,229,255,0.3); }
        .hud-txt {
          font-family: monospace; font-size: 10px;
          letter-spacing: 0.2em; color: rgba(0,229,255,0.4);
        }

        @media (max-width: 768px) {
          .hero-content { padding: 80px 24px; }
          .hud-tl, .hud-tr, .hud-bl, .hud-br { display: none; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STORY SECTION — AR Holographic
───────────────────────────────────────────── */
function StorySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const words = ["Redefining", "the", "Future", "of"];
  const highlight = ["Digital", "Growth"];

  return (
    <section className="story-section" ref={ref}>
      <HoloGrid />
      <div className="section-inner">
        <div className="story-grid">

          {/* IMAGE COLUMN — AR overlays */}
          <motion.div
            className="story-image-wrap"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="img-ar-frame">
              <ARBrackets size={24} color="#00e5ff" thickness={1.5} />

              {/* HUD overlays */}
              <div className="img-hud-top">
                <span className="img-hud-tag">◈ VISUAL.FEED</span>
                <span className="img-hud-tag">REC ●</span>
              </div>
              <div className="img-hud-bot">
                <span className="img-hud-tag">AI.SCAN — 97.3%</span>
                <span className="img-hud-tag">2024 · BHUBANESWAR</span>
              </div>

              {/* Crosshair */}
              <div className="crosshair" aria-hidden="true">
                <div className="ch-h" /><div className="ch-v" />
                <div className="ch-ring" />
              </div>

              <motion.div style={{ y }}>
                <img
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200"
                  alt="AI Agency Workspace"
                  className="main-img"
                />
              </motion.div>
              <div className="img-scan-line" aria-hidden="true" />
              <div className="img-glow" />
            </div>

            {/* Floating data cards */}
            <motion.div
              className="float-card fc-left"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <div className="fc-dot" /><span>AI.CORE ACTIVE</span>
            </motion.div>
            <motion.div
              className="float-card fc-right"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <div className="fc-bar"><div className="fc-fill" /></div>
              <span>ANALYSIS 94%</span>
            </motion.div>
          </motion.div>

          {/* TEXT COLUMN */}
          <div className="story-text">
            <motion.div
              className="section-tag"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="tag-line" /><span>[ OUR ORIGIN ]</span>
            </motion.div>

            <h2 className="story-title">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                >
                  {word}
                </motion.span>
              ))}
              {" "}
              {highlight.map((word, i) => (
                <motion.span
                  key={i}
                  className="highlight"
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.7, delay: 0.7 + i * 0.15, ease: [0.23, 1, 0.32, 1] }}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <StaggerReveal stagger={0.1} delay={0.9}>
              {[
                "Founded in 2024, BotMate emerged from a simple yet powerful idea: that artificial intelligence shouldn't just be a tool, but a core engine for business evolution.",
                "We started as a small team of AI enthusiasts and marketing experts in Bhubaneswar, Odisha. Today, we are a premier digital marketing agency that bridges the gap between complex AI technology and real-world business results.",
                "\"Our mission is to empower brands with intelligent strategies that don't just keep up with the future—they create it.\""
              ].map((para, i) => (
                <RevealItem key={i}>
                  <p className={`para${i === 2 ? " italic" : ""}`}>{para}</p>
                </RevealItem>
              ))}
            </StaggerReveal>

            {/* Stats row */}
            <motion.div
              className="stats-row"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              {[["2024", "FOUNDED"], ["50+", "CLIENTS"], ["99%", "SATISFACTION"]].map(([num, label]) => (
                <div key={label} className="stat-item">
                  <div className="stat-num">{num}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .story-section { padding: 120px 0; background: #060a0f; position: relative; overflow: hidden; }
        .section-inner { max-width: 1280px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }
        .story-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; align-items: center; }

        /* IMAGE */
        .story-image-wrap { position: relative; }
        .img-ar-frame {
          position: relative; border-radius: 20px; overflow: hidden;
          border: 1px solid rgba(0,229,255,0.15);
          background: #040609;
        }
        .main-img { width: 100%; height: 500px; object-fit: cover; display: block; filter: brightness(0.75) saturate(0.9); }
        .img-glow { position: absolute; inset: 0; box-shadow: inset 0 0 80px rgba(0,229,255,0.1); pointer-events: none; }
        .img-scan-line {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          box-shadow: 0 0 12px #00e5ff;
          animation: imgScan 5s linear infinite;
          opacity: 0.6;
        }
        @keyframes imgScan { 0% { top: 0%; } 100% { top: 100%; } }

        .img-hud-top, .img-hud-bot {
          position: absolute; left: 12px; right: 12px;
          display: flex; justify-content: space-between; z-index: 2;
        }
        .img-hud-top { top: 12px; }
        .img-hud-bot { bottom: 12px; }
        .img-hud-tag {
          font-family: monospace; font-size: 10px;
          color: rgba(0,229,255,0.7); letter-spacing: 0.1em;
          background: rgba(0,0,0,0.5); padding: 3px 8px; border-radius: 3px;
        }

        .crosshair {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          z-index: 3; pointer-events: none;
        }
        .ch-h { position: absolute; top: 0; left: -20px; width: 40px; height: 1px; background: rgba(0,229,255,0.4); top: 0; }
        .ch-v { position: absolute; left: 0; top: -20px; height: 40px; width: 1px; background: rgba(0,229,255,0.4); }
        .ch-ring {
          position: absolute; width: 30px; height: 30px; border-radius: 50%;
          border: 1px solid rgba(0,229,255,0.3);
          top: -15px; left: -15px;
          animation: ringPulse 2s ease-in-out infinite;
        }
        @keyframes ringPulse { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.3); opacity: 0.8; } }

        /* Floating cards */
        .float-card {
          position: absolute; background: rgba(0,229,255,0.05);
          border: 1px solid rgba(0,229,255,0.2); border-radius: 8px;
          padding: 8px 14px; font-family: monospace; font-size: 11px;
          color: #00e5ff; display: flex; align-items: center; gap: 8px;
          backdrop-filter: blur(10px); animation: floatCard 4s ease-in-out infinite;
        }
        .fc-left { bottom: 80px; left: -20px; }
        .fc-right { top: 60px; right: -20px; flex-direction: column; align-items: flex-start; }
        @keyframes floatCard { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .fc-dot { width: 8px; height: 8px; border-radius: 50%; background: #00e5ff; animation: dotBlink 1s ease-in-out infinite; }
        @keyframes dotBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        .fc-bar { width: 80px; height: 4px; background: rgba(0,229,255,0.15); border-radius: 2px; overflow: hidden; }
        .fc-fill { width: 94%; height: 100%; background: #00e5ff; animation: fillPulse 2s ease-in-out infinite; border-radius: 2px; }
        @keyframes fillPulse { 0%, 100% { width: 94%; } 50% { width: 75%; } }

        /* TEXT */
        .section-tag {
          display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
          font-family: monospace; font-size: 11px; letter-spacing: 0.2em;
          color: rgba(0,229,255,0.5);
        }
        .tag-line { width: 30px; height: 1px; background: rgba(0,229,255,0.4); }

        .story-title { font-size: 40px; font-weight: 800; color: #fff; margin-bottom: 28px; line-height: 1.15; }
        .highlight { color: #00e5ff; text-shadow: 0 0 30px rgba(0,229,255,0.25); }
        .para { font-size: 16px; color: rgba(255,255,255,0.55); line-height: 1.85; margin-bottom: 20px; }
        .italic { font-style: italic; color: rgba(0,229,255,0.8); border-left: 2px solid #00e5ff; padding-left: 20px; font-weight: 500; }

        .stats-row { display: flex; gap: 32px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); }
        .stat-num { font-size: 28px; font-weight: 900; color: #00e5ff; font-family: monospace; }
        .stat-label { font-size: 10px; letter-spacing: 0.15em; color: rgba(255,255,255,0.3); margin-top: 4px; }

        @media (max-width: 960px) {
          .story-grid { grid-template-columns: 1fr; gap: 50px; }
          .section-inner { padding: 0 24px; }
          .fc-left, .fc-right { display: none; }
          .main-img { height: 350px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   VALUES SECTION — AR Card Targeting
───────────────────────────────────────────── */
const VALUES = [
  { title: "Innovation First", desc: "We don't settle for 'best practices'. We pioneer new AI-driven methodologies to give our clients an unfair advantage.", code: "PROTO.01" },
  { title: "Data-Led Ethics", desc: "In a world of noise, we let data speak. We maintain absolute transparency in every metric we report.", code: "PROTO.02" },
  { title: "Human Centric", desc: "AI powers our logic, but human intuition and empathy guide our creative and strategic decisions.", code: "PROTO.03" },
];

function ValuesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="values-section" ref={ref}>
      <HoloGrid />
      <div className="section-inner">

        <div className="values-header">
          <motion.div
            className="sec-pre"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >[ CORE PROTOCOLS ]</motion.div>

          <h2 className="values-title">
            {["Our", "Core"].map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                style={{ display: "inline-block", marginRight: "0.3em" }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              className="highlight"
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ display: "inline-block" }}
            >
              Protocols
            </motion.span>
          </h2>

          {/* Decorative radar */}
          <motion.div
            className="radar-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <RadarSweep />
          </motion.div>
        </div>

        <div className="values-grid">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              className="value-card"
              initial={{ opacity: 0, y: 60, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* AR targeting brackets */}
              <div className="card-ar-brackets">
                <ARBrackets size={14} color="#00e5ff" thickness={1} />
              </div>

              <div className="card-code">{v.code}</div>
              <div className="card-index">0{i + 1}</div>
              <h3 className="card-title">
                {v.title.split("").map((ch, ci) => (
                  <motion.span
                    key={ci}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.2 + ci * 0.03 }}
                    style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </h3>
              <div className="card-desc">
                <AnimatedText text={v.desc} delay={0.8 + i * 0.1} />
              </div>

              <div className="card-footer">
                <div className="card-progress">
                  <motion.div
                    className="card-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${70 + i * 10}%` } : {}}
                    transition={{ delay: 0.8 + i * 0.2, duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="card-pct">{70 + i * 10}%</span>
              </div>

              <div className="card-scan" aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .values-section { padding: 120px 0; background: #07090e; position: relative; overflow: hidden; }
        .section-inner { max-width: 1280px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }

        .values-header { text-align: center; margin-bottom: 72px; position: relative; }
        .sec-pre {
          font-family: monospace; font-size: 11px; letter-spacing: 0.3em;
          color: rgba(0,229,255,0.4); margin-bottom: 16px;
        }
        .values-title { font-size: clamp(36px, 5vw, 56px); font-weight: 900; color: #fff; margin-bottom: 0; }
        .highlight { color: #00e5ff; }

        .radar-container {
          position: absolute; right: 0; top: 50%; transform: translateY(-50%);
          opacity: 0.7;
        }

        .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }

        .value-card {
          background: rgba(0,229,255,0.02);
          border: 1px solid rgba(0,229,255,0.08);
          padding: 48px 32px 32px;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
          perspective: 800px;
        }
        .value-card:hover {
          border-color: rgba(0,229,255,0.3);
          background: rgba(0,229,255,0.04);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,229,255,0.1);
        }

        .card-ar-brackets { position: absolute; inset: 12px; pointer-events: none; }

        .card-code {
          font-family: monospace; font-size: 10px; letter-spacing: 0.2em;
          color: rgba(0,229,255,0.35); margin-bottom: 8px;
        }
        .card-index { font-size: 48px; font-weight: 900; color: rgba(0,229,255,0.06); line-height: 1; margin-bottom: 12px; font-family: monospace; }
        .card-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 16px; }
        .card-desc { font-size: 14px; color: rgba(255,255,255,0.42); line-height: 1.75; margin-bottom: 24px; }

        .card-footer { display: flex; align-items: center; gap: 12px; }
        .card-progress { flex: 1; height: 2px; background: rgba(0,229,255,0.1); border-radius: 2px; overflow: hidden; }
        .card-fill { height: 100%; background: #00e5ff; border-radius: 2px; box-shadow: 0 0 8px #00e5ff; }
        .card-pct { font-family: monospace; font-size: 11px; color: rgba(0,229,255,0.5); }

        .card-scan {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent);
          top: 0; animation: cardScan 6s linear infinite;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .value-card:hover .card-scan { opacity: 1; }
        @keyframes cardScan { 0% { top: 0%; } 100% { top: 100%; } }

        @media (max-width: 960px) {
          .values-grid { grid-template-columns: 1fr; }
          .radar-container { display: none; }
          .section-inner { padding: 0 24px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MISSION STATEMENT — Expressive Typography
───────────────────────────────────────────── */
function MissionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const lines = [
    { text: "We don't follow the future.", size: "48px", weight: 300, color: "rgba(255,255,255,0.3)" },
    { text: "We engineer it.", size: "72px", weight: 900, color: "#fff" },
    { text: "With precision. With purpose. With AI.", size: "28px", weight: 400, color: "#00e5ff" },
  ];

  return (
    <section className="mission-section" ref={ref}>
      <HoloGrid />
      <ParticleField />
      <div className="mission-inner">

        {/* Scanning reticle */}
        <motion.div
          className="mission-reticle"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
          aria-hidden="true"
        >
          <div className="ret-outer" /><div className="ret-inner" />
          <div className="ret-h" /><div className="ret-v" />
        </motion.div>

        <div className="mission-text">
          <StaggerReveal stagger={0.3}>
            {lines.map((line, i) => (
              <RevealItem key={i}>
                <div 
                  className="mission-line" 
                  style={{ fontSize: line.size, fontWeight: line.weight, color: line.color }}
                >
                  {i === 1 ? (
                    line.text.split(" ").map((word, wi) => (
                      <motion.span
                        key={wi}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 + wi * 0.1 }}
                        style={{ display: "inline-block", marginRight: "0.3em" }}
                        className={word === "engineer" ? "glitch-word" : ""}
                      >
                        {word}
                      </motion.span>
                    ))
                  ) : line.text}
                </div>
              </RevealItem>
            ))}
          </StaggerReveal>
        </div>
      </div>

      <style jsx>{`
        .mission-section {
          padding: 140px 48px; background: #060a0f;
          position: relative; overflow: hidden;
          border-top: 1px solid rgba(0,229,255,0.05);
          border-bottom: 1px solid rgba(0,229,255,0.05);
        }
        .mission-inner { max-width: 1000px; margin: 0 auto; position: relative; z-index: 2; text-align: center; }

        .mission-reticle {
          width: 120px; height: 120px; margin: 0 auto 48px; position: relative;
        }
        .ret-outer {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid rgba(0,229,255,0.2);
          animation: retRotate 8s linear infinite;
        }
        .ret-inner {
          position: absolute; inset: 20px; border-radius: 50%;
          border: 1px dashed rgba(0,229,255,0.3);
          animation: retRotate 5s linear infinite reverse;
        }
        .ret-h {
          position: absolute; top: 50%; left: 0; right: 0; height: 1px;
          background: rgba(0,229,255,0.3); transform: translateY(-50%);
        }
        .ret-v {
          position: absolute; left: 50%; top: 0; bottom: 0; width: 1px;
          background: rgba(0,229,255,0.3); transform: translateX(-50%);
        }
        @keyframes retRotate { to { transform: rotate(360deg); } }

        .mission-text { display: flex; flex-direction: column; gap: 12px; }
        .mission-line { line-height: 1.1; letter-spacing: -0.01em; }

        .glitch-word {
          color: #00e5ff;
          display: inline-block !important;
          animation: glitchColor 4s ease-in-out infinite;
        }
        @keyframes glitchColor {
          0%, 90%, 100% { color: #00e5ff; text-shadow: none; }
          91% { color: #fff; text-shadow: -2px 0 #00e5ff, 2px 0 rgba(255,0,100,0.5); }
          93% { color: #00e5ff; text-shadow: 2px 0 #fff; }
          95% { color: #fff; text-shadow: -2px 0 rgba(255,0,100,0.5); }
          97% { color: #00e5ff; text-shadow: none; }
        }

        @media (max-width: 768px) {
          .mission-section { padding: 80px 24px; }
          .mission-line { font-size: clamp(24px, 8vw, 48px) !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <main className="about-main">
      <EnhancedPageHeader
        title="Who We Are"
        subtitle="BotMate is a collective of digital architects, AI specialists, and marketing visionaries on a mission to redefine the human-brand relationship in the digital age."
      />
      <StorySection />
      <MissionSection />
      <ValuesSection />
      <TeamGrid />
      <Footer />

      <style jsx global>{`
        body { background: #060a0f; margin: 0; }
        .about-main { background: #060a0f; }
        * { box-sizing: border-box; }
      `}</style>
    </main>
  );
}

