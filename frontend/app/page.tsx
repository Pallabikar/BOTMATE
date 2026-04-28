"use client";

import React, { useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { motion, useInView, useScroll, useTransform, useMotionValue, AnimatePresence, useSpring } from "framer-motion";
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
   PARTICLE FIELD
───────────────────────────────────────────── */
function ParticleField() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      dur: Math.random() * 8 + 4,
      delay: Math.random() * 6,
    })));
  }, []);

  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map(p => (
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
   MORPH BLOB
───────────────────────────────────────────── */
function MorphBlob({ className }: { className?: string }) {
  return (
    <div className={`morph-blob ${className}`} aria-hidden="true">
      <style jsx>{`
        .morph-blob {
          position: absolute; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%);
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          animation: blobMorph 8s ease-in-out infinite alternate;
          filter: blur(40px);
        }
        @keyframes blobMorph {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: translate(0, 0) scale(1); }
          50% { border-radius: 60% 40% 30% 70% / 50% 60% 40% 60%; transform: translate(20px, -30px) scale(1.1); }
          100% { border-radius: 30% 70% 50% 50% / 60% 40% 70% 30%; transform: translate(-10px, 20px) scale(0.9); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TRUSTED BY
───────────────────────────────────────────── */
const BRANDS = [
  "NovaTech","PixelForge","CloudNine","ZenithAI",
  "QuantumLeap","FusionLabs","ArcadeMedia","StellarBrands",
];

function TrustedBy() {
  const doubled = [...BRANDS, ...BRANDS];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.section 
      className="trusted-section"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <motion.p 
        className="trusted-label"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        Trusted by 50+ brands worldwide
      </motion.p>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubled.map((b, i) => (
            <span key={i} className="marquee-brand">{b}</span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */
const SERVICES = [
  
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: "DIGITAL MARKETING",
    desc: "Grow your audience, drive engagement, and build a loyal community across every platform.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    title: "Web Development",
    desc: "Lightning-fast, conversion-optimised websites and landing pages built for growth.",
  },

  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    title: "SOCIAL MEDIA MANAGEMENT",
    desc: "Scroll-stopping visuals, reels, and copy that tell your brand story and drive real action.",
  },
  
];

function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const glitchedTitle = useGlitchText("What We Do", inView);

  return (
    <section className="section services-section" ref={ref}>
      <div className="grid-bg" />
      <ParticleField />
      <MorphBlob className="blob-1" />
      <MorphBlob className="blob-2" />
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {glitchedTitle}
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText 
            text="End-to-end digital solutions that drive measurable results." 
            className="section-sub"
            delay={0.6}
          />
        </div>
        <StaggerReveal stagger={0.15} delay={0.8}>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <RevealItem key={i}>
                <motion.div
                  className="service-card"
                  whileHover={{ 
                    y: -10,
                    rotateX: 5, rotateY: 5,
                    boxShadow: "0 20px 40px rgba(0,229,255,0.15)"
                  }}
                >
                  <ARBrackets size={14} color="rgba(0,229,255,0.3)" />
                  <div className="service-icon">{s.icon}</div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD (isolated — rules-of-hooks safe)
───────────────────────────────────────────── */
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const spring = useSpring(0, { damping: 35, stiffness: 90 });

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, value, spring]);

  return (
    <motion.div
      className="stat-card"
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <ARBrackets size={12} color="rgba(0,229,255,0.2)" />
      {/* motion.span required — MotionValues only update inside motion elements */}
      <motion.span className="stat-number">
        <motion.span>{useTransform(spring, (v) => Math.round(v).toString())}</motion.span>
        {suffix}
      </motion.span>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

const STATS = [
  { value: 50,  suffix: "+", label: "Clients Served" },
  { value: 98,  suffix: "%", label: "Retention Rate" },
  { value: 5,   suffix: "x", label: "Avg ROI"        },
  { value: 24,  suffix: "/7", label: "Support"       },
];

const FEATURES = [
  { title: "Tailored Strategies",    desc: "Every campaign is built around your unique goals, audience, and market — no cookie-cutter solutions." },
  { title: "Data-Driven Decisions",  desc: "We use real-time analytics and AI insights to continuously optimise your results." },
  { title: "Full Transparency",      desc: "Clear reporting, honest communication, and a team that treats your business like their own." },
];

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const glitchedTitle = useGlitchText("Why Choose Us", inView);

  return (
    <section className="section stats-section" ref={ref}>
      <div className="grid-bg" />
      <ParticleField />
      <MorphBlob className="blob-3" />
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {glitchedTitle}
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText 
            text="Numbers that speak louder than words." 
            className="section-sub"
            delay={0.6}
          />
        </div>
        <StaggerReveal stagger={0.1}>
          <div className="stats-grid">
            {STATS.map((s, i) => <RevealItem key={i}><StatCard {...s} /></RevealItem>)}
          </div>
        </StaggerReveal>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <motion.div 
              key={i} 
              className="feature-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              <div className="feature-check">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <motion.polyline 
                    points="20 6 9 17 4 12"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.15 }}
                  />
                </svg>
              </div>
              <div>
                <h4 className="feature-title">{f.title}</h4>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROCESS
───────────────────────────────────────────── */
const STEPS = [
  { num: "01", title: "Discovery",  desc: "We deep-dive into your business, goals, and competitors to build a strong foundation." },
  { num: "02", title: "Strategy",   desc: "A custom digital roadmap is crafted, backed by data, insights, and market intelligence." },
  { num: "03", title: "Execution",  desc: "Our team launches every campaign, asset, and system with precision and creativity." },
  { num: "04", title: "Results",    desc: "We monitor, optimise, and scale continuously — so your brand keeps growing every month." },
];

function ProcessSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const glitchedTitle = useGlitchText("Our Process", inView);

  return (
    <section className="section process-section" ref={ref}>
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {glitchedTitle}
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText 
            text="A proven 4-step framework built for consistent, scalable growth." 
            className="section-sub"
            delay={0.6}
          />
        </div>
        <div className="process-container">
          {/* Animated SVG Path for connection */}
          <div className="process-svg-container" aria-hidden="true">
             <svg width="100%" height="40" viewBox="0 0 1000 40" preserveAspectRatio="none">
               <motion.path 
                 d="M0 20 Q 250 0, 500 20 T 1000 20"
                 fill="none"
                 stroke="url(#lineGradient)"
                 strokeWidth="2"
                 style={{ pathLength }}
               />
               <defs>
                 <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#00e5ff" />
                    <stop offset="100%" stopColor="transparent" />
                 </linearGradient>
               </defs>
             </svg>
          </div>

          <StaggerReveal stagger={0.2}>
            <div className="process-track">
              {STEPS.map((s, i) => (
                <RevealItem key={i} className="process-step">
                  <div className="process-circle">
                    <ARBrackets size={10} color="rgba(255,255,255,0.3)" />
                    {s.num}
                  </div>
                  <h3 className="process-title">{s.title}</h3>
                  <p className="process-desc">{s.desc}</p>
                </RevealItem>
              ))}
            </div>
          </StaggerReveal>
        </div>
      </div>
      <style jsx>{`
        .process-container { position: relative; margin-top: 60px; }
        .process-svg-container { position: absolute; top: 40px; left: 0; right: 0; opacity: 0.3; pointer-events: none; }
        @media (max-width: 960px) { .process-svg-container { display: none; } }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRICING
───────────────────────────────────────────── */
const PLANS = [
  {
    name: "Starter Plan", price: "₹9,999", period: "/mo", popular: false,
    features: [
      "~ 10-20K Reach",
      "10 Creative Posts",
      "1 Shoot & Video",
      "Images & Video Content (User Provided)",
      "Profile Management",
      "Competitor Research",
      "ORM",
      "Performance Reports"
    ],
    cta: "Get Started",
  },
  {
    name: "Business Plan", price: "₹14,999", period: "/mo", popular: true,
    features: [
      "~ 30-40K Reach",
      "15 Creative Posts",
      "2 Shoots & Videos",
      "Images & Video Content (User Provided)",
      "Profile Management",
      "Competitor Research",
      "ORM",
      "Target Audience Targeting",
      "Google My Business (GMB)",
      "Performance Reports"
    ],
    cta: "Start Scaling",
  },
  {
    name: "Enterprise Plan", price: "₹19,999", period: "/mo", popular: false,
    features: [
      "~ 50-100K Reach",
      "20 Creative Posts",
      "3 Shoots & Videos",
      "Images & Video Content (User Provided)",
      "Profile Management",
      "Competitor Research",
      "ORM",
      "Target Audience Targeting",
      "Google My Business (GMB)",
      "Performance Reports"
    ],
    cta: "Maximize Growth",
  },
];

function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const glitchedTitle = useGlitchText("Choose Your Plan", inView);

  return (
    <section className="section pricing-section" ref={ref}>
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {glitchedTitle}
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ width: 0 }}
            animate={inView ? { width: 56 } : {}}
            transition={{ duration: 0.8 }}
          />
          <AnimatedText 
            text="No hidden fees. Cancel anytime. Results guaranteed." 
            className="section-sub"
            delay={0.4}
          />
        </div>
        <StaggerReveal stagger={0.15}>
          <div className="pricing-grid">
            {PLANS.map((p, i) => (
              <RevealItem key={i}>
                <motion.div 
                  className={`pricing-card${p.popular ? " pricing-popular" : ""}`}
                  whileHover={{ 
                    y: -10, 
                    rotateX: 2, rotateY: 2,
                    boxShadow: "0 25px 50px rgba(0,229,255,0.12)" 
                  }}
                >
                  <ARBrackets size={16} color="rgba(0,229,255,0.2)" />
                  {p.popular && <div className="popular-badge">MOST POPULAR</div>}
                  {p.popular && <div className="pulse-ring" />}
                  <p className="plan-name">{p.name}</p>
                  <div className="plan-price">
                    {p.price}<span className="plan-period">{p.period}</span>
                  </div>
                  <ul className="plan-features">
                    {p.features.map((f, j) => (
                      <li key={j} className="plan-feature">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/get-started" className={`plan-cta${p.popular ? " plan-cta-primary" : " plan-cta-outline"}`}>
                    {p.cta}
                  </a>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}


const TESTIMONIALS = [
  {
    quote: "BotMate transformed our online presence completely. Our leads tripled in just 3 months.",
    name: "Arjun Mehta",
    company: "UrbanVibe Co.",
    result: "3× More Leads",
  },
  {
    quote: "The AI chatbot handles 80% of our customer queries automatically.",
    name: "Priya Sharma",
    company: "GlowBox India",
    result: "80% Queries Automated",
  },
  {
    quote: "We’re consistently hitting 5x ROAS on our campaigns now.",
    name: "Rohan Kapoor",
    company: "TechNest Solutions",
    result: "5× ROAS",
  },
  {
    quote: "Our Instagram grew by 40K followers in 4 months organically.",
    name: "Sneha Joshi",
    company: "Bloom Lifestyle",
    result: "+40K Followers",
  },
];

function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );

  return (
    <section className="test-section">
      <div className="container">
        <h2>What Clients Say</h2>
        <p className="sub">Real results. Real businesses.</p>

        <div className="slider">
          <button className="nav left" onClick={prev}>‹</button>

          <div className="slide-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="card"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5 }}
              >
                <p className="quote">"{TESTIMONIALS[index].quote}"</p>

                <div className="result">
                  {TESTIMONIALS[index].result}
                </div>

                <div className="author">
                  <div className="avatar">
                    {TESTIMONIALS[index].name[0]}
                  </div>
                  <div>
                    <div className="name">
                      {TESTIMONIALS[index].name}
                    </div>
                    <div className="company">
                      {TESTIMONIALS[index].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="nav right" onClick={next}>›</button>
        </div>

        {/* Dots */}
        <div className="dots">
          {TESTIMONIALS.map((_, i) => (
            <span
              key={i}
              className={i === index ? "dot active" : "dot"}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .test-section {
          padding: 100px 20px;
          background: #04070d;
          color: white;
          text-align: center;
        }

        .container {
          max-width: 900px;
          margin: auto;
        }

        h2 {
          font-size: 36px;
          margin-bottom: 10px;
        }

        .sub {
          opacity: 0.6;
          margin-bottom: 40px;
        }

        .slider {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
          backdrop-filter: blur(20px);
        }

        .quote {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .result {
          display: inline-block;
          margin-bottom: 20px;
          padding: 6px 14px;
          border-radius: 20px;
          background: rgba(0, 229, 255, 0.1);
          color: #00e5ff;
          font-size: 12px;
        }

        .author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 229, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .name {
          font-weight: 600;
        }

        .company {
          font-size: 12px;
          opacity: 0.6;
        }

        .nav {
          position: absolute;
          background: none;
          border: none;
          font-size: 30px;
          color: #00e5ff;
          cursor: pointer;
          top: 50%;
          transform: translateY(-50%);
        }

        .left {
          left: -40px;
        }

        .right {
          right: -40px;
        }

        .dots {
          margin-top: 20px;
        }

        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin: 0 4px;
          background: gray;
          border-radius: 50%;
          cursor: pointer;
        }

        .dot.active {
          background: #00e5ff;
        }

        @media (max-width: 600px) {
          .nav {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CASE STUDIES
───────────────────────────────────────────── */

const CASE_STUDIES = [
  {
    industry: "E-Commerce / Fashion",
    client: "UrbanVibe Co.",
    problem: "Low organic reach and stagnant sales despite paid ads spend.",
    metrics: ["+340% Organic Reach", "3× Sales in 90 Days", "₹2.4L Saved"],
    tags: ["SEO", "Social Media", "Content"],
  },
  {
    industry: "Legal Services",
    client: "LegalEdge India",
    problem: "Zero digital presence, relying entirely on referrals.",
    metrics: ["Page 1 Google — 12 Keywords", "+220% Traffic", "60+ Leads/Month"],
    tags: ["SEO", "Web Dev", "Google Ads"],
  },
  {
    industry: "Health & Wellness",
    client: "Bloom Lifestyle",
    problem: "Low engagement and inconsistent content.",
    metrics: ["+40K Followers", "8.2% Engagement", "2× Revenue"],
    tags: ["Instagram", "Content", "Reels"],
  },
];

function CaseStudiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="case-section" ref={ref}>
      <div className="container">

        {/* 🔥 HEADING */}
        <motion.h2
          className="heading"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Case Studies
        </motion.h2>

        <motion.p
          className="sub"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Real campaigns. Real numbers. Real impact.
        </motion.p>

        {/* CASE BLOCKS */}
        <div className="cases">
          {CASE_STUDIES.map((cs, i) => (
            <motion.div
              key={i}
              className="case"
              initial={{ opacity: 0, y: 80 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 }}
            >
              <span className="industry">{cs.industry}</span>

              <h3>{cs.client}</h3>

              <p className="problem">{cs.problem}</p>

              <div className="metrics">
                {cs.metrics.map((m, i) => (
                  <div key={i} className="metric">✓ {m}</div>
                ))}
              </div>

              <div className="tags">
                {cs.tags.map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .case-section {
          padding: 120px 20px;
          background: #05080f;
          color: white;
        }

        .container {
          max-width: 800px;
          margin: auto;
          text-align: center;
        }

        .heading {
          font-size: 44px;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .sub {
          opacity: 0.6;
          margin-bottom: 70px;
        }

        .cases {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .case {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 35px 25px;
          transition: 0.3s;
        }

        .case:hover {
          border-color: rgba(0,229,255,0.4);
          transform: translateY(-5px);
        }

        .industry {
          display: block;
          font-size: 11px;
          color: #00e5ff;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        h3 {
          font-size: 26px;
          margin: 8px 0;
        }

        .problem {
          font-size: 14px;
          opacity: 0.6;
          margin-bottom: 20px;
        }

        .metrics {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 15px;
        }

        .metric {
          font-size: 14px;
          color: #00e5ff;
        }

        .tags {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .tags span {
          font-size: 11px;
          padding: 5px 12px;
          border-radius: 20px;
          background: rgba(0,229,255,0.08);
          border: 1px solid rgba(0,229,255,0.2);
        }
      `}</style>
    </section>
  );
}
/* ─────────────────────────────────────────────
   BLOG / RESOURCES
───────────────────────────────────────────── */
const BLOG_POSTS = [
  {
    category: "AI Marketing",
    title: "How AI is Replacing Manual Marketing Tasks in 2025",
    excerpt: "From automated copywriting to predictive audience targeting — discover how forward-thinking brands are scaling faster with AI.",
    readTime: "5 min read",
  },
  {
    category: "Social Media",
    title: "The Instagram Algorithm Decoded: What Works in 2025",
    excerpt: "We analysed 10,000+ posts to uncover patterns that drive real engagement and growth.",
    readTime: "7 min read",
  },
  {
    category: "Web & Automation",
    title: "Why Your Website Is Losing Customers",
    excerpt: "Page speed, UX, and conversion architecture — the real difference between high-performing websites.",
    readTime: "6 min read",
  },
];

function BlogSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="blog-section" ref={ref}>
      <div className="blog-container">
        <motion.h2
          className="blog-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Insights &amp; Resources
        </motion.h2>

        <motion.p
          className="blog-sub"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          AI insights, growth strategies, and digital trends.
        </motion.p>

        <div className="blog-grid">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={i}
              className="blog-card"
              initial={{ opacity: 0, y: 80 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="blog-glow" />

              <div className="blog-top">
                <span className="blog-cat">{post.category}</span>
                <span className="blog-time">{post.readTime}</span>
              </div>

              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>

              <div className="blog-bottom">
                <span>Coming Soon</span>
                <span className="blog-arrow">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .blog-section {
          padding: 100px 20px;
          background: radial-gradient(circle at top, #0b0f1a, #02040a);
          color: white;
          overflow: hidden;
        }

        .blog-container {
          max-width: 1200px;
          margin: auto;
          text-align: center;
        }

        .blog-heading {
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .blog-sub {
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 60px;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .blog-card {
          position: relative;
          padding: 30px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          transition: all 0.4s ease;
          text-align: left;
        }

        /* ✨ Animated Glow Border */
        .blog-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1px;
          background: linear-gradient(120deg, #00e5ff, #7b61ff, #00e5ff);
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: 0.4s;
        }

        .blog-card:hover::before {
          opacity: 1;
        }

        /* Glow Light */
        .blog-glow {
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.4), transparent);
          top: -50px;
          left: -50px;
          filter: blur(60px);
          opacity: 0;
          transition: 0.5s;
          pointer-events: none;
        }

        .blog-card:hover .blog-glow {
          opacity: 1;
        }

        .blog-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .blog-cat {
          font-size: 11px;
          color: #00e5ff;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .blog-time {
          font-size: 12px;
          opacity: 0.5;
        }

        .blog-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.4;
          color: #fff;
        }

        .blog-excerpt {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }

        .blog-bottom {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #00e5ff;
          font-weight: 600;
        }

        .blog-arrow {
          transition: transform 0.3s;
          display: inline-block;
        }

        .blog-card:hover .blog-arrow {
          transform: translateX(5px);
        }

        @media (max-width: 900px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
          .blog-heading { font-size: 32px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
const FAQS = [
  { q: "How long before I see results?",                     a: "Most clients begin seeing measurable improvements in engagement, reach, and leads within 30–60 days. SEO results typically compound over 90–120 days. We set clear milestones at the start so you always know what to expect." },
  { q: "Do you sign contracts?",                             a: "Yes. Every engagement is backed by a transparent service agreement outlining deliverables, timelines, and payment terms. There are no hidden clauses — just clear, mutual accountability." },
  { q: "Can I cancel anytime?",                             a: "Our plans run on a monthly cycle. You may cancel with 15 days' written notice before your next billing date. We believe in earning your business every month, not locking you in." },
  { q: "What makes BotMate different from other agencies?",  a: "We combine AI-powered automation with human creativity. Every strategy is backed by real data, and we never use generic templates. You get a dedicated team that treats your brand as if it were their own." },
  { q: "Which social media platforms do you manage?",        a: "We specialise in Instagram, Facebook, LinkedIn, and YouTube. Depending on your niche and audience, we'll recommend the platforms that will drive the most ROI for your business." },
  { q: "Do I need to provide the content and photos?",      a: "Not necessarily. Our Business and Enterprise plans include professional shoot sessions. For the Starter plan, we can work with content you provide or source high-quality stock visuals on your behalf." },
  { q: "Will I get reports to track progress?",             a: "Absolutely. All clients receive monthly performance reports covering reach, engagement, leads, conversions, and ad spend ROI. We also hold review calls to walk you through the numbers." },
  { q: "Do you handle paid advertising (Google Ads, Meta Ads)?", a: "Yes. We manage end-to-end paid campaigns including strategy, creatives, audience targeting, A/B testing, and optimisation. Paid ad spend is billed separately from our management fee." },
  { q: "Can you build or redesign my website?",             a: "Yes — web development is one of our core services. We build fast, mobile-first, conversion-optimised websites and landing pages. All sites are SEO-ready from day one." },
  { q: "Is there a minimum commitment period?",             a: "We recommend a minimum of 3 months for meaningful results, especially for SEO and organic growth. However, you are never locked in — we operate month-to-month after the initial period." },
  { q: "What industries do you work with?",                 a: "We work with brands across e-commerce, real estate, healthcare, education, legal, F&B, fashion, and more. If you have an audience to reach, we have a strategy to reach them." },
];



function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const glitchedTitle = useGlitchText("Frequently Asked", inView);

  return (
    <section className="section faq-section" ref={ref}>
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 className="section-heading" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            {glitchedTitle} <span style={{ color: "#00e5ff" }}>Questions</span>
          </motion.h2>
          <motion.div className="cyan-underline" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }} />
          <AnimatedText text="Everything you need to know before we get started." className="section-sub" delay={0.6} />
        </div>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              className={`faq-item${open === i ? " faq-open" : ""}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.055, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="faq-left-bar" />
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <motion.span
                  className="faq-num"
                  animate={open === i ? { color: "#00e5ff", boxShadow: "0 0 16px rgba(0,229,255,0.5)" } : { color: "rgba(0,229,255,0.3)", boxShadow: "none" }}
                  transition={{ duration: 0.3 }}
                >{String(i + 1).padStart(2, "0")}</motion.span>
                <span className="faq-qtext">{faq.q}</span>
                <motion.span
                  className="faq-icon"
                  animate={{ rotate: open === i ? 45 : 0, color: open === i ? "#00e5ff" : "rgba(0,229,255,0.5)" }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    className="faq-a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: "easeInOut" }}
                  >
                    <div className="faq-a-scan" />
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .faq-section { background: #07090e; }
        .faq-list { max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
        .faq-item {
          border: 1px solid rgba(0,229,255,0.1); border-radius: 16px;
          overflow: hidden; transition: border-color .3s, background .3s;
          position: relative;
        }
        .faq-left-bar {
          position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: #00e5ff; border-radius: 3px 0 0 3px;
          transform: scaleY(0); transform-origin: bottom;
          transition: transform .35s ease;
        }
        .faq-open .faq-left-bar { transform: scaleY(1); }
        .faq-open { border-color: rgba(0,229,255,0.35); background: rgba(0,229,255,0.025); }
        .faq-q {
          width: 100%; padding: 20px 24px 20px 20px;
          display: flex; align-items: center; gap: 14px;
          background: transparent; border: none; cursor: pointer;
          text-align: left; font-family: inherit;
        }
        .faq-q:hover .faq-qtext { color: #00e5ff; }
        .faq-num {
          font-family: monospace; font-size: 13px; font-weight: 700;
          min-width: 32px; height: 32px; border-radius: 8px;
          border: 1px solid rgba(0,229,255,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background .3s;
        }
        .faq-open .faq-num { background: rgba(0,229,255,0.1); }
        .faq-qtext { font-size: 15px; font-weight: 600; color: #fff; flex: 1; transition: color .3s; line-height: 1.4; }
        .faq-icon { flex-shrink: 0; display: flex; }
        .faq-a { overflow: hidden; position: relative; }
        .faq-a-scan {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent);
          animation: faqScan 3s linear infinite;
        }
        @keyframes faqScan { 0% { top: 0%; } 100% { top: 100%; } }
        .faq-a p { padding: 4px 24px 22px 70px; font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.85; margin: 0; }
      `}</style>
    </section>
  );
}


/* ─────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────── */
function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const glitchedTitle = useGlitchText("Ready to Grow Your Brand?", inView);

  return (
    <section className="cta-section" ref={ref}>
      <MorphBlob className="blob-1" />
      <MorphBlob className="blob-2" />
      <div className="cta-inner">
        <h2 className="cta-heading">{glitchedTitle}</h2>
        <AnimatedText 
          text="Join 50+ businesses already scaling with BotMate's AI-powered strategies." 
          className="cta-sub"
          delay={0.2}
        />
        <div className="cta-btns">
          <motion.a 
            href="/get-started" 
            className="cta-btn-primary"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(0,229,255,0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>
          <motion.a 
            href="/contact"     
            className="cta-btn-outline"
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Free Call
          </motion.a>
        </div>
      </div>
      <style jsx>{`
        .blob-1 { top: -100px; left: -100px; }
        .blob-2 { bottom: -100px; right: -100px; opacity: 0.1; }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
const QUICK_LINKS = [
  { label: "Home",        href: "/" },
  { label: "About Us",    href: "/about" },
  { label: "Services",    href: "/services" },
  { label: "Packages",    href: "/packages" },
  { label: "Contact",     href: "/contact" },
  { label: "Get Started", href: "/get-started" },
];
const SERVICE_LINKS = ["SEO Optimization","Social Media Management","AI Chatbots","Paid Ads","Content Creation","Web Development"];
const SOCIALS = [
  { label: "IG", name: "Instagram" },
  { label: "Li", name: "LinkedIn"  },
  { label: "Tw", name: "Twitter"   },
  { label: "Yt", name: "YouTube"   },
];

function SiteFooter() {
  return <Footer />;
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Home() {
  return (
    <main className="home-main">
      <Hero />
      <TrustedBy />
      <ServicesSection />
      <StatsSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <CaseStudiesSection />
      <BlogSection />
      <FAQSection />
      <CTABanner />
      <SiteFooter />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #060a0f;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
        }
        .home-main { background: #060a0f; }

        /* ══ SHARED ══ */
        .section        { padding: 100px 0; position: relative; }
        .section-inner  { max-width: 1280px; margin: 0 auto; padding: 0 48px; }

        .section-heading-wrap { text-align: center; margin-bottom: 64px; }
        .section-heading {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -1px;
          word-spacing: 0.08em; /* prevents word-crush with negative letter-spacing */
          margin-bottom: 14px;
        }
        .section-sub {
          color: rgba(255,255,255,0.42);
          font-size: 15px;
          margin-top: 14px;
          line-height: 1.6;
        }
        .cyan-underline {
          width: 56px; height: 3px;
          background: #00e5ff;
          border-radius: 2px;
          margin: 0 auto;
          box-shadow: 0 0 14px rgba(0,229,255,0.5);
        }

        /* fade-up scroll trigger */
        .fade-up { opacity: 0; transform: translateY(28px); transition: opacity .6s ease, transform .6s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }

        /* ══ TRUSTED BY ══ */
        .trusted-section {
          padding: 28px 0 30px;
          border-top: 1px solid rgba(0,229,255,0.08);
          border-bottom: 1px solid rgba(0,229,255,0.08);
          background: rgba(0,229,255,0.018);
          overflow: hidden;
        }
        .trusted-label {
          text-align: center;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 18px;
        }
        .marquee-wrapper { overflow: hidden; position: relative; width: 100%; }
        .marquee-track {
          display: flex;
          gap: 72px;
          padding: 10px 0;
          width: max-content;
          animation: marqueeScroll 30s linear infinite;
        }
        @media (max-width: 600px) {
          .marquee-track { gap: 40px; }
        }
        .marquee-brand {
          font-size: 13px; font-weight: 700;
          color: rgba(255,255,255,0.2);
          letter-spacing: .1em;
          text-transform: uppercase;
          transition: color .3s;
          white-space: nowrap;
        }
        .marquee-brand:hover { color: rgba(0,229,255,0.55); }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ══ SERVICES ══ */
        .services-section { background: #060a0f; position: relative; overflow: hidden; }
        .services-section .blob-1 { top: -10%; right: -5%; }
        .services-section .blob-2 { bottom: -10%; left: -5%; width: 500px; height: 500px; }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .service-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,229,255,0.1);
          border-radius: 18px;
          padding: 36px 28px;
          transition: border-color .3s, transform .3s, box-shadow .3s, opacity .6s, transform .6s;
          cursor: default;
        }
        .service-card:hover {
          border-color: rgba(0,229,255,0.45);
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,229,255,0.09), 0 0 0 1px rgba(0,229,255,0.12);
        }
        .service-icon { width: 48px; height: 48px; margin-bottom: 20px; }
        .service-title { font-size: 16.5px; font-weight: 700; color: #fff; margin-bottom: 10px; }
        .service-desc  { font-size: 13px; color: rgba(255,255,255,0.42); line-height: 1.75; }

        /* ══ STATS ══ */
        .stats-section { background: #07090e; overflow: hidden; position: relative; }
        .stats-section .blob-3 { top: 20%; left: 50%; width: 600px; height: 600px; opacity: 0.5; }
        .grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(0,175,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,175,255,0.025) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 56px;
          position: relative; z-index: 1;
        }
        .stat-card {
          text-align: center;
          background: rgba(0,229,255,0.035);
          border: 1px solid rgba(0,229,255,0.12);
          border-radius: 18px;
          padding: 44px 20px;
          transition: border-color .3s, box-shadow .3s;
        }
        .stat-card:hover {
          border-color: rgba(0,229,255,0.3);
          box-shadow: 0 0 32px rgba(0,229,255,0.07);
        }
        .stat-number {
          font-size: clamp(38px, 4.5vw, 60px);
          font-weight: 900;
          color: #00e5ff;
          letter-spacing: -2px;
          text-shadow: 0 0 24px rgba(0,229,255,0.38);
          margin-bottom: 8px;
          min-height: 72px;
          display: flex; align-items: center; justify-content: center;
        }
        .stat-label {
          font-size: 11.5px; font-weight: 700;
          color: rgba(255,255,255,0.38);
          text-transform: uppercase; letter-spacing: .18em;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          position: relative; z-index: 1;
        }
        .feature-item { display: flex; gap: 16px; align-items: flex-start; }
        .feature-check {
          flex-shrink: 0;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(0,229,255,0.1);
          display: flex; align-items: center; justify-content: center;
          margin-top: 2px;
        }
        .feature-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .feature-desc  { font-size: 13px; color: rgba(255,255,255,0.42); line-height: 1.7; }

        /* ══ PROCESS ══ */
        .process-section { background: #060a0f; }
        .process-track {
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .process-step {
          flex: 1;
          display: flex; flex-direction: column; align-items: center;
          text-align: center; padding: 0 20px;
          max-width: 260px;
        }
        .process-circle {
          width: 64px; height: 64px;
          border-radius: 50%;
          border: 2px solid #00e5ff;
          background: rgba(0,229,255,0.07);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; font-weight: 900; color: #00e5ff;
          margin-bottom: 20px;
          box-shadow: 0 0 22px rgba(0,229,255,0.22);
          position: relative; z-index: 2;
        }
        .process-line {
          flex: 0 0 auto;
          width: 72px;
          height: 2px;
          border-top: 2px dashed rgba(0,229,255,0.3);
          margin-top: 30px;
          flex-shrink: 0;
        }
        .process-title { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 10px; }
        .process-desc  { font-size: 13px; color: rgba(255,255,255,0.42); line-height: 1.7; max-width: 210px; }

        /* ══ PRICING ══ */
        .pricing-section { background: #07090e; }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: center;
        }
        .pricing-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,229,255,0.1);
          border-radius: 22px;
          padding: 40px 32px;
          position: relative;
          overflow: visible;
          transition: border-color .3s, box-shadow .3s, transform .3s;
        }
        .pricing-card:hover { transform: translateY(-4px); }
        .pricing-popular {
          border-color: rgba(0,229,255,0.5) !important;
          box-shadow: 0 0 48px rgba(0,229,255,0.1), 0 0 0 1px rgba(0,229,255,0.18);
          background: rgba(0,229,255,0.04);
          transform: scale(1.04);
        }
        .pricing-popular:hover { transform: scale(1.04) translateY(-4px); }
        .popular-badge {
          position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          background: #00e5ff; color: #060a0f;
          font-size: 10px; font-weight: 800; letter-spacing: .1em;
          padding: 5px 16px; border-radius: 50px;
          white-space: nowrap;
        }
        .pulse-ring {
          position: absolute; inset: -3px;
          border-radius: 24px;
          border: 1px solid rgba(0,229,255,0.35);
          animation: pricePulse 2.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes pricePulse {
          0%,100% { opacity:.5; transform:scale(1); }
          50%      { opacity:1;  transform:scale(1.01); }
        }
        .plan-name  { font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,0.38); margin-bottom: 14px; }
        .plan-price { font-size: clamp(28px,3vw,44px); font-weight: 900; color: #fff; margin-bottom: 28px; letter-spacing: -1px; }
        .plan-period { font-size: 15px; font-weight: 500; color: rgba(255,255,255,0.38); letter-spacing: 0; }
        .plan-features { list-style: none; margin-bottom: 32px; display: flex; flex-direction: column; gap: 12px; }
        .plan-feature  { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: rgba(255,255,255,0.62); }
        .plan-cta {
          display: block; text-align: center; text-decoration: none;
          padding: 14px 24px; border-radius: 50px;
          font-size: 14px; font-weight: 700; transition: all .25s;
        }
        .plan-cta-primary {
          background: #00e5ff; color: #060a0f;
          box-shadow: 0 4px 22px rgba(0,229,255,0.38);
        }
        .plan-cta-primary:hover {
          background: #00f7ff;
          box-shadow: 0 8px 34px rgba(0,229,255,0.52);
          transform: translateY(-2px);
        }
        .plan-cta-outline { border: 2px solid rgba(0,229,255,0.32); color: #fff; }
        .plan-cta-outline:hover {
          border-color: #00e5ff; color: #00e5ff;
          box-shadow: 0 0 22px rgba(0,229,255,0.14);
          transform: translateY(-2px);
        }

        /* ══ TESTIMONIALS ══ */
        .testimonials-section { background: #060a0f; }

        /* sliding-window carousel */
        .t-carousel-outer {
          overflow: hidden;
          border-radius: 20px;
          position: relative;
        }
        .t-carousel-track {
          display: flex;
          transition: transform .5s cubic-bezier(.4,0,.2,1);
          will-change: transform;
        }
        .testimonial-card {
          flex: 0 0 100%;
          background: rgba(255,255,255,0.038);
          border: 1px solid rgba(0,229,255,0.12);
          border-radius: 20px;
          padding: 44px 48px;
          backdrop-filter: blur(12px);
        }
        .t-stars { display: flex; gap: 4px; margin-bottom: 18px; }
        .t-quote {
          font-size: 15.5px; color: rgba(255,255,255,0.72);
          line-height: 1.8; margin-bottom: 28px; font-style: italic;
        }
        .t-author { display: flex; align-items: center; gap: 14px; }
        .t-avatar {
          width: 46px; height: 46px; border-radius: 50%;
          background: rgba(0,229,255,0.12);
          border: 2px solid rgba(0,229,255,0.28);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: #00e5ff;
          flex-shrink: 0;
        }
        .t-name    { font-size: 14px; font-weight: 700; color: #fff; }
        .t-company { font-size: 12px; color: rgba(0,229,255,0.6); margin-top: 2px; }

        .t-dots {
          display: flex; justify-content: center; gap: 8px; margin-top: 28px;
        }
        .t-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.15); border: none; cursor: pointer;
          transition: all .3s; padding: 0;
        }
        .t-dot-active {
          background: #00e5ff; width: 26px; border-radius: 4px;
          box-shadow: 0 0 10px rgba(0,229,255,0.5);
        }
        .t-arrows {
          display: flex; gap: 12px; justify-content: center; margin-top: 20px;
        }
        .t-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid rgba(0,229,255,0.25);
          background: rgba(0,229,255,0.05);
          color: rgba(255,255,255,0.6);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all .25s;
        }
        .t-arrow:hover {
          border-color: #00e5ff; color: #00e5ff;
          background: rgba(0,229,255,0.1);
        }

        /* ══ CTA ══ */
        .cta-section {
          position: relative; padding: 130px 48px;
          text-align: center; overflow: hidden;
          background: linear-gradient(135deg, rgba(0,25,55,.92) 0%, rgba(4,8,15,.96) 50%, rgba(0,45,75,.88) 100%);
        }
        .cta-glow {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 350px;
          background: radial-gradient(ellipse, rgba(0,229,255,0.16) 0%, transparent 70%);
          animation: ctaGlow 4s ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes ctaGlow {
          from { opacity:.6; transform:translate(-50%,-50%) scale(1); }
          to   { opacity:1;  transform:translate(-50%,-50%) scale(1.18); }
        }
        .cta-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .cta-particle {
          position: absolute; width: 3px; height: 3px; border-radius: 50%;
          background: rgba(0,229,255,0.4);
          top:  calc(4% + var(--pi) * 4%);
          left: calc(2% + var(--pi) * 4.1%);
          animation: ctaFloat calc(5s + var(--pi) * 0.3s) ease-in-out infinite alternate;
          animation-delay: calc(var(--pi) * 0.2s);
        }
        @keyframes ctaFloat {
          from { transform:translateY(0) scale(1); opacity:.25; }
          to   { transform:translateY(-30px) scale(1.6); opacity:.75; }
        }
        .cta-inner { position: relative; z-index: 2; max-width: 680px; margin: 0 auto; }
        .cta-heading {
          font-size: clamp(30px, 5vw, 58px);
          font-weight: 900; color: #fff;
          letter-spacing: -1.5px; margin-bottom: 18px; line-height: 1.08;
        }
        .cta-sub {
          font-size: 16px; color: rgba(255,255,255,0.5);
          line-height: 1.7; margin-bottom: 48px;
        }
        .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .cta-btn-primary {
          background: #00e5ff; color: #060a0f;
          font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 700;
          padding: 16px 44px; border-radius: 50px; text-decoration: none;
          box-shadow: 0 4px 26px rgba(0,229,255,0.44);
          transition: all .25s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cta-btn-primary:hover {
          background: #00f7ff;
          box-shadow: 0 8px 38px rgba(0,229,255,0.62);
          transform: translateY(-2px);
        }
        .cta-btn-outline {
          background: transparent; color: #fff;
          font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 600;
          padding: 15px 44px; border-radius: 50px;
          border: 2px solid rgba(255,255,255,0.32);
          text-decoration: none; transition: all .25s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cta-btn-outline:hover {
          border-color: rgba(255,255,255,.65);
          background: rgba(255,255,255,0.05);
          transform: translateY(-2px);
        }

        /* ══ FOOTER ══ */
        .site-footer {
          background: #030609;
          border-top: 1px solid rgba(0,229,255,0.08);
          padding: 80px 48px 0;
        }
        .footer-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 48px; padding-bottom: 64px;
        }
        .footer-logo { font-size: 26px; font-weight: 900; color: #fff; letter-spacing: -.5px; margin-bottom: 14px; }
        .footer-logo span { color: #00e5ff; }
        .footer-tagline { font-size: 13px; color: rgba(255,255,255,0.36); line-height: 1.75; margin-bottom: 24px; max-width: 240px; }
        .footer-socials { display: flex; gap: 10px; }
        .footer-social {
          width: 38px; height: 38px; border-radius: 10px;
          border: 1px solid rgba(0,229,255,0.18);
          background: rgba(0,229,255,0.05);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; color: rgba(255,255,255,0.45);
          text-decoration: none; transition: all .2s; letter-spacing: 0;
        }
        .footer-social:hover { border-color: #00e5ff; color: #00e5ff; background: rgba(0,229,255,0.1); }
        .footer-col-heading {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .22em; color: rgba(255,255,255,0.32); margin-bottom: 18px;
        }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-link { font-size: 13.5px; color: rgba(255,255,255,0.48); text-decoration: none; transition: color .2s; }
        .footer-link:hover { color: #00e5ff; }
        .footer-contact-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-contact-list li { display: flex; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.42); line-height: 1.5; }
        .footer-bottom {
          max-width: 1280px; margin: 0 auto;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 24px 0;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12px; color: rgba(255,255,255,0.28);
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 960px) {
          .section { padding: 64px 0; overflow-x: hidden; }
          .section-inner { padding: 0 20px; }
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-grid    { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: 1fr; }
          .pricing-grid  { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; }
          .pricing-popular { transform: scale(1); }
          .pricing-popular:hover { transform: translateY(-4px); }
          .process-track {
            flex-direction: column; align-items: center; gap: 0; padding: 0;
          }
          .process-step  { flex-direction: column; align-items: center; max-width: 320px; padding: 0 16px 0; }
          .process-line  { width: 2px; height: 36px; border-top: none; border-left: 2px dashed rgba(0,229,255,0.3); margin-top: 0; }
          .footer-inner  { grid-template-columns: 1fr 1fr; gap: 36px; }
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
          .cta-section   { padding: 80px 28px; }
          .site-footer   { padding: 60px 28px 0; }
          .testimonial-card { padding: 32px 28px; }
        }

        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
          .stats-grid    { grid-template-columns: 1fr; }
          .footer-inner  { grid-template-columns: 1fr; }
          .cta-heading   { font-size: 30px; }
          .t-quote       { font-size: 14px; }
          .testimonial-card { padding: 24px 20px; }
          .section-heading { font-size: 32px; }
        }
      `}</style>
    </main>
  );
}
