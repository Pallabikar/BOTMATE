"use client";

import React, { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { StaggerReveal, RevealItem, AnimatedText } from "@/components/AnimationSystem";

/* ─────────────────────────────────────────────
   MORPHING BLOB BACKGROUND
───────────────────────────────────────────── */
function MorphBlob({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="morph-blob" style={style} aria-hidden="true">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="blobGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path fill="url(#blobGrad)">
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M200,80 C270,60 340,120 360,200 C380,280 330,360 250,380 C170,400 90,360 70,280 C50,200 80,120 140,90 C160,82 180,84 200,80 Z;
              M200,60 C290,50 370,100 390,200 C410,300 360,390 250,390 C140,390 60,320 50,220 C40,120 90,50 160,55 C175,55 185,62 200,60 Z;
              M200,90 C260,70 330,110 350,190 C370,270 340,360 260,385 C180,410 100,370 75,290 C50,210 70,110 130,85 C155,75 178,96 200,90 Z;
              M200,80 C270,60 340,120 360,200 C380,280 330,360 250,380 C170,400 90,360 70,280 C50,200 80,120 140,90 C160,82 180,84 200,80 Z
            "
          />
        </path>
      </svg>
      <style jsx>{`
        .morph-blob { position: absolute; pointer-events: none; z-index: 0; }
        .morph-blob svg { width: 100%; height: 100%; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MORPHING BORDER CARD
───────────────────────────────────────────── */
function MorphCard({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className={`morph-card ${className}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 40, borderRadius: "40px" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      animate={{ borderRadius: hovered ? "12px 32px 12px 32px" : "24px" }}
    >
      {children}
      <style jsx>{`
        .morph-card {
          background: rgba(4, 8, 15, 0.7);
          border: 1px solid rgba(0,229,255,0.1);
          position: relative; overflow: hidden;
          transition: border-color 0.4s, background 0.4s, box-shadow 0.4s;
        }
        .morph-card:hover {
          border-color: rgba(0,229,255,0.35);
          background: rgba(0,229,255,0.03);
          box-shadow: 0 0 40px rgba(0,229,255,0.06);
        }
      `}</style>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MORPHING LIQUID DIVIDER
───────────────────────────────────────────── */
function LiquidDivider() {
  return (
    <div className="liquid-div" aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="rgba(0,229,255,0.04)">
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,30 C360,60 720,0 1440,30 L1440,60 L0,60 Z;
              M0,20 C360,50 720,10 1440,40 L1440,60 L0,60 Z;
              M0,40 C360,10 720,50 1440,20 L1440,60 L0,60 Z;
              M0,30 C360,60 720,0 1440,30 L1440,60 L0,60 Z
            "
          />
        </path>
      </svg>
      <style jsx>{`
        .liquid-div { width: 100%; height: 60px; }
        .liquid-div svg { width: 100%; height: 100%; display: block; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MORPHING SVG ICON (replaces emoji)
───────────────────────────────────────────── */
function MorphIcon({ type }: { type: "email" | "phone" | "location" }) {
  const paths = {
    email: {
      a: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 L12,13 L2,6",
      b: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    },
    phone: {
      a: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72",
      b: "M6.6 10.8c1 1.73 2.4 3.13 4.14 4.14l1.38-1.38a1.35 1.35 0 011.39-.33 15.5 15.5 0 004.86 1.56 1.36 1.36 0 011.13 1.36V18a1.36 1.36 0 01-1.48 1.35A21.3 21.3 0 013 3.65 1.36 1.36 0 014.35 2.2H6.6A1.36 1.36 0 017.96 3.33a15.5 15.5 0 001.56 4.86 1.35 1.35 0 01-.34 1.39z"
    },
    location: {
      a: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a1 1 0 110-2 1 1 0 010 2",
      b: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    }
  };
  const [toggled, setToggled] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setToggled(p => !p), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="morph-icon-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="morph-icon-svg">
        <path d={toggled ? paths[type].b : paths[type].a} style={{ transition: "d 0.8s ease" }}>
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values={`${paths[type].a};${paths[type].b};${paths[type].a}`}
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
          />
        </path>
      </svg>
      <div className="icon-ring" />
      <style jsx>{`
        .morph-icon-wrap {
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(0,229,255,0.06);
          border: 1px solid rgba(0,229,255,0.15);
          display: flex; align-items: center; justify-content: center;
          position: relative; margin: 0 auto 24px;
          animation: iconPulse 4s ease-in-out infinite;
        }
        @keyframes iconPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,229,255,0.15); }
          50% { box-shadow: 0 0 0 12px rgba(0,229,255,0); }
        }
        .morph-icon-svg { width: 28px; height: 28px; }
        .icon-ring {
          position: absolute; inset: -6px; border-radius: 50%;
          border: 1px dashed rgba(0,229,255,0.2);
          animation: ringRotate 8s linear infinite;
        }
        @keyframes ringRotate { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT INFO CARDS
───────────────────────────────────────────── */
const CONTACT_METHODS: { icon: "email" | "phone" | "location"; label: string; val: string; sub: string }[] = [
  { icon: "email",    label: "Email Us",  val: "contactbotmate@gmail.com", sub: "Support 24/7" },
  { icon: "phone",    label: "Call Us",   val: "+91 97772 09527",          sub: "Mon-Sat, 9am-7pm" },
  { icon: "location", label: "Visit Us",  val: "N6/354, Block N6, IRC Village, Nayapalli", sub: "Bhubaneswar, Odisha 751015" },
];

function ContactGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="contact-grid-section" ref={ref}>
      <MorphBlob style={{ width: 600, height: 600, top: -200, left: -200 }} />
      <MorphBlob style={{ width: 500, height: 500, bottom: -100, right: -100 }} />

      <div className="section-inner">
        <div className="heading-wrap">
          <motion.p
            className="pre-label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >[ CONTACT METHODS ]</motion.p>

          <h2 className="section-heading">
            <AnimatedText text="Contact Methods" />
          </h2>

          <motion.div
            className="morph-underline"
            initial={{ scaleX: 0, borderRadius: "2px" }}
            animate={inView ? { scaleX: 1, borderRadius: "50px" } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />

          <motion.p
            className="section-sub"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            Direct channels to our core operations team.
          </motion.p>
        </div>

        <StaggerReveal stagger={0.15}>
          <div className="cards-grid">
            {CONTACT_METHODS.map((m, i) => (
              <RevealItem key={i}>
                <MorphCard className="info-card-inner">
                  <div className="card-glow" />
                  <MorphIcon type={m.icon} />
                  <h3 className="label">{m.label}</h3>
                  <div className="val-wrap">
                    <AnimatedText text={m.val} delay={0.4 + i * 0.1} />
                  </div>
                  <p className="sub">{m.sub}</p>
                  <motion.div
                    className="card-bottom-line"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                  />
                </MorphCard>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>

      <style jsx>{`
        .contact-grid-section {
          padding: 100px 0; background: #060a0f;
          position: relative; overflow: hidden;
        }
        .section-inner { max-width: 1280px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }

        .heading-wrap { text-align: center; margin-bottom: 72px; }
        .pre-label { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(0,229,255,0.4); margin-bottom: 16px; }
        .section-heading {
          font-size: clamp(32px, 5vw, 52px); font-weight: 900;
          color: #fff; letter-spacing: -1px; margin-bottom: 16px;
        }
        .morph-underline {
          width: 60px; height: 3px; background: #00e5ff;
          margin: 0 auto 16px; transform-origin: center;
          box-shadow: 0 0 16px rgba(0,229,255,0.5);
        }
        .section-sub { color: rgba(255,255,255,0.4); font-size: 15px; }

        .cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        :global(.info-card-inner) { padding: 48px 32px; text-align: center; }
        .card-glow {
          position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
          background: radial-gradient(ellipse at top, rgba(0,229,255,0.05) 0%, transparent 70%);
          opacity: 0; transition: opacity 0.4s;
        }
        :global(.morph-card:hover) .card-glow { opacity: 1; }
        .label { font-size: 12px; font-weight: 700; color: #00e5ff; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 12px; }
        .val { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px; line-height: 1.4; }
        .sub { font-size: 13px; color: rgba(255,255,255,0.35); }
        .card-bottom-line {
          position: absolute; bottom: 0; left: 10%; right: 10%; height: 2px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          transform-origin: left; border-radius: 2px;
        }

        @media (max-width: 960px) {
          .cards-grid { grid-template-columns: 1fr; }
          .section-inner { padding: 0 24px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MORPHING FORM FIELD
───────────────────────────────────────────── */
function MorphInput({ type = "text", placeholder, required = false, as = "input", rows }: {
  type?: string; placeholder: string; required?: boolean;
  as?: "input" | "textarea"; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const Tag = as as any;

  return (
    <div className="morph-field">
      <motion.div
        className="field-border"
        animate={{
          borderRadius: focused ? "8px 24px 8px 24px" : "14px",
          borderColor: focused ? "rgba(0,229,255,0.6)" : filled ? "rgba(0,229,255,0.25)" : "rgba(255,255,255,0.08)",
          boxShadow: focused ? "0 0 0 4px rgba(0,229,255,0.06), 0 0 20px rgba(0,229,255,0.1)" : "none",
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <Tag
          type={type}
          placeholder={placeholder}
          required={required}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={(e: any) => { setFocused(false); setFilled(e.target.value.length > 0); }}
          className="field-input"
        />
        <AnimatePresence>
          {focused && (
            <motion.div
              className="field-scanner"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <style jsx>{`
        .morph-field { position: relative; }
        .field-border {
          position: relative; border: 1px solid; overflow: hidden;
          transition: background 0.3s;
          background: rgba(4, 8, 15, 0.6);
        }
        .field-border:focus-within { background: rgba(0,229,255,0.02); }
        :global(.field-input) {
          width: 100%; background: transparent;
          border: none; padding: 18px 24px;
          color: #fff; font-family: inherit; font-size: 15px;
          outline: none; resize: none; display: block;
        }
        :global(.field-input::placeholder) { color: rgba(255,255,255,0.28); }
        .field-scanner {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          transform-origin: left;
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MORPHING SUBMIT BUTTON
───────────────────────────────────────────── */
function MorphButton() {
  const [state, setState] = useState<"idle"|"sending"|"done">("idle");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setState("sending");
    setTimeout(() => setState("done"), 1800);
    setTimeout(() => setState("idle"), 3500);
  };

  const labels = { idle: "Initiate Connection", sending: "Transmitting...", done: "✓ Message Sent" };
  const colors = { idle: "#00e5ff", sending: "#0080aa", done: "#00ff9d" };

  return (
    <motion.button
      className="morph-btn"
      onClick={handleClick}
      animate={{
        background: colors[state],
        borderRadius: state === "sending" ? "50px" : state === "done" ? "12px 40px 12px 40px" : "50px",
        scale: state === "sending" ? 0.97 : 1,
      }}
      whileHover={{ scale: state === "idle" ? 1.03 : 1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {labels[state]}
        </motion.span>
      </AnimatePresence>
      {state === "sending" && <div className="btn-ripple" />}
      <style jsx>{`
        .morph-btn {
          width: 100%; padding: 20px;
          border: none; font-weight: 800; font-size: 16px;
          cursor: pointer; color: #060a0f; position: relative; overflow: hidden;
          font-family: inherit; letter-spacing: 0.02em;
          box-shadow: 0 6px 24px rgba(0,229,255,0.2);
        }
        .btn-ripple {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: btnSweep 1.2s ease-in-out infinite;
        }
        @keyframes btnSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="form-section" ref={ref}>
      <LiquidDivider />
      <MorphBlob style={{ width: 700, height: 700, top: "10%", right: "-200px", opacity: 0.6 }} />

      <div className="section-inner">
        <div className="heading-wrap">
          <motion.p className="pre-label" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
            [ TRANSMISSION ]
          </motion.p>
          <h2 className="section-heading">
            <AnimatedText text="Send a Transmission" highlight="Transmission" />
          </h2>
          <AnimatedText 
            text="Describe your project requirements for analysis." 
            className="section-sub"
            delay={0.4}
          />
        </div>

        <motion.div
          className="form-shell"
          initial={{ opacity: 0, y: 50, borderRadius: "40px" }}
          animate={inView ? { opacity: 1, y: 0, borderRadius: "32px" } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Morphing decorative top strip */}
          <div className="form-top-strip">
            <div className="strip-dot" /><div className="strip-dot" /><div className="strip-dot" />
            <div className="strip-bar" />
            <span className="strip-label">BOTMATE // SECURE.FORM</span>
          </div>

          {/* Corner brackets */}
          <div className="form-bracket tl" /><div className="form-bracket tr" />
          <div className="form-bracket bl" /><div className="form-bracket br" />

          <form className="cf-form" onSubmit={e => e.preventDefault()}>
            <div className="row-2">
              <MorphInput placeholder="Your Name" required />
              <MorphInput type="email" placeholder="Business Email" required />
            </div>
            <MorphInput placeholder="Subject" required />
            <MorphInput as="textarea" placeholder="Tell us about your project goals..." required rows={6} />
            <MorphButton />
          </form>

          {/* Animated background blob inside form */}
          <div className="form-inner-blob" aria-hidden="true">
            <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
              <path fill="rgba(0,229,255,0.03)">
                <animate
                  attributeName="d"
                  dur="10s"
                  repeatCount="indefinite"
                  values="
                    M150,30 C200,20 260,80 270,150 C280,220 230,280 150,270 C70,260 20,200 30,130 C40,60 100,40 150,30 Z;
                    M150,20 C210,10 280,70 280,150 C280,230 210,290 140,280 C70,270 10,210 20,140 C30,70 90,30 150,20 Z;
                    M150,30 C200,20 260,80 270,150 C280,220 230,280 150,270 C70,260 20,200 30,130 C40,60 100,40 150,30 Z
                  "
                />
              </path>
            </svg>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .form-section { padding: 40px 0 120px; background: #060a0f; position: relative; overflow: hidden; }
        .section-inner { max-width: 860px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }
        .heading-wrap { text-align: center; margin-bottom: 56px; }
        .pre-label { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(0,229,255,0.4); margin-bottom: 16px; }
        .section-heading { font-size: clamp(32px, 5vw, 52px); font-weight: 900; margin-bottom: 12px; }
        .section-sub { color: rgba(255,255,255,0.4); font-size: 15px; }

        .form-shell {
          background: rgba(4, 8, 15, 0.8);
          border: 1px solid rgba(0,229,255,0.12);
          padding: 52px;
          position: relative; overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
          backdrop-filter: blur(20px);
        }

        /* Corner decorations */
        .form-bracket {
          position: absolute; width: 20px; height: 20px; pointer-events: none;
        }
        .tl { top: 14px; left: 14px; border-top: 1.5px solid rgba(0,229,255,0.4); border-left: 1.5px solid rgba(0,229,255,0.4); }
        .tr { top: 14px; right: 14px; border-top: 1.5px solid rgba(0,229,255,0.4); border-right: 1.5px solid rgba(0,229,255,0.4); }
        .bl { bottom: 14px; left: 14px; border-bottom: 1.5px solid rgba(0,229,255,0.4); border-left: 1.5px solid rgba(0,229,255,0.4); }
        .br { bottom: 14px; right: 14px; border-bottom: 1.5px solid rgba(0,229,255,0.4); border-right: 1.5px solid rgba(0,229,255,0.4); }

        /* Top info strip */
        .form-top-strip {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 36px; padding-bottom: 20px;
          border-bottom: 1px solid rgba(0,229,255,0.06);
        }
        .strip-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(0,229,255,0.4); animation: dotPulse 1.5s ease-in-out infinite; }
        .strip-dot:nth-child(2) { animation-delay: 0.2s; background: rgba(0,229,255,0.25); }
        .strip-dot:nth-child(3) { animation-delay: 0.4s; background: rgba(0,229,255,0.12); }
        @keyframes dotPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .strip-bar { flex: 1; height: 1px; background: rgba(0,229,255,0.08); }
        .strip-label { font-family: monospace; font-size: 10px; letter-spacing: 0.15em; color: rgba(0,229,255,0.3); }

        .cf-form { display: flex; flex-direction: column; gap: 20px; position: relative; z-index: 2; }
        .row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        .form-inner-blob { position: absolute; width: 350px; height: 350px; bottom: -100px; right: -100px; pointer-events: none; z-index: 0; }
        .form-inner-blob svg { width: 100%; height: 100%; }

        @media (max-width: 650px) {
          .row-2 { grid-template-columns: 1fr; }
          .form-shell { padding: 32px 24px; }
          .section-inner { padding: 0 24px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAP SECTION — morphing frame
───────────────────────────────────────────── */
function MapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="map-section" ref={ref}>
      <LiquidDivider />
      <div className="section-inner">
        <div className="map-header">
          <motion.p className="pre-label" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
            [ LOCATION ]
          </motion.p>
          <motion.h2
            className="map-title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Find Us <span className="cyan">Here</span>
          </motion.h2>
        </div>

        <motion.div
          className="map-shell"
          initial={{ opacity: 0, borderRadius: "60px", scale: 0.96 }}
          animate={inView ? { opacity: 1, borderRadius: "24px", scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* AR corner brackets on map */}
          <div className="map-br tl" /><div className="map-br tr" />
          <div className="map-br bl" /><div className="map-br br" />

          {/* Scanning line */}
          <div className="map-scan" aria-hidden="true" />

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.808!2d85.8138!3d20.2961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0x2ac1a3571e4cd5cd!2sN6%2F354%2C%20IRC%20Village%2C%20Nayapalli%2C%20Bhubaneswar%2C%20Odisha%20751015!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BotMate Office Location"
          />

          <div className="map-footer">
            <div className="mf-dot" />
            <span className="mf-text">N6/354, Block N6, IRC Village, Nayapalli, Bhubaneswar, Odisha 751015</span>
            <a href="https://maps.app.goo.gl/Vhenu8EPSTTZ4gKK9" target="_blank" rel="noopener noreferrer" className="mf-link">
              Open in Maps ↗
            </a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .map-section { padding: 20px 0 120px; background: #060a0f; position: relative; }
        .section-inner { max-width: 1100px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }
        .map-header { text-align: center; margin-bottom: 48px; }
        .pre-label { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(0,229,255,0.4); margin-bottom: 12px; }
        .map-title { font-size: clamp(28px, 4vw, 44px); font-weight: 900; color: #fff; margin: 0; }
        .cyan { color: #00e5ff; }

        .map-shell {
          position: relative; overflow: hidden;
          border: 1px solid rgba(0,229,255,0.15);
          box-shadow: 0 0 60px rgba(0,229,255,0.05);
        }

        .map-br { position: absolute; width: 22px; height: 22px; z-index: 3; }
        .tl { top: 10px; left: 10px; border-top: 2px solid #00e5ff; border-left: 2px solid #00e5ff; }
        .tr { top: 10px; right: 10px; border-top: 2px solid #00e5ff; border-right: 2px solid #00e5ff; }
        .bl { bottom: 48px; left: 10px; border-bottom: 2px solid #00e5ff; border-left: 2px solid #00e5ff; }
        .br { bottom: 48px; right: 10px; border-bottom: 2px solid #00e5ff; border-right: 2px solid #00e5ff; }

        .map-scan {
          position: absolute; left: 0; right: 0; height: 2px; z-index: 2;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent);
          animation: mapScan 5s linear infinite; pointer-events: none;
        }
        @keyframes mapScan { 0% { top: 0; } 100% { top: 100%; } }

        .map-footer {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 20px;
          background: rgba(0,229,255,0.03);
          border-top: 1px solid rgba(0,229,255,0.08);
        }
        .mf-dot { width: 8px; height: 8px; border-radius: 50%; background: #00e5ff; flex-shrink: 0; animation: mapDotBlink 2s ease-in-out infinite; }
        @keyframes mapDotBlink { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0,229,255,0.4); } 50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(0,229,255,0); } }
        .mf-text { font-size: 13px; color: rgba(255,255,255,0.4); flex: 1; font-family: monospace; }
        .mf-link { font-size: 13px; color: #00e5ff; text-decoration: none; white-space: nowrap; font-weight: 600; transition: opacity 0.2s; }
        .mf-link:hover { opacity: 0.7; }

        @media (max-width: 768px) {
          .section-inner { padding: 0 24px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE HERO HEADER
───────────────────────────────────────────── */
function ContactHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const blobX = useTransform(mouseX, [0, 1], [-30, 30]);
  const blobY = useTransform(mouseY, [0, 1], [-20, 20]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  };

  const title = "Connect with Us";
  const subtitle = "Ready to transform your digital strategy? Our operatives are standing by to assist with your brand's evolution.";

  return (
    <section className="hero" ref={ref} onMouseMove={handleMouse}>
      {/* Parallax morphing blob */}
      <motion.div className="hero-blob" style={{ x: blobX, y: blobY }}>
        <MorphBlob style={{ width: "100%", height: "100%" }} />
      </motion.div>

      {/* Grid bg */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Liquid wave top */}
      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="rgba(0,229,255,0.03)">
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z;
                M0,20 C240,60 480,20 720,60 C960,20 1200,60 1440,20 L1440,80 L0,80 Z;
                M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z
              "
            />
          </path>
        </svg>
      </div>

      <div className="hero-content">
        <motion.p className="pre-tag" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
          <span className="tag-bracket">[</span> INITIATE CONTACT <span className="tag-bracket">]</span>
        </motion.p>

        <h1 className="hero-title">
          <AnimatedText text={title} />
        </h1>

        <motion.div
          className="title-morph-line"
          initial={{ scaleX: 0, borderRadius: "2px" }}
          animate={inView ? { scaleX: 1, borderRadius: "50px" } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        />

        <div className="hero-sub-wrap">
          <AnimatedText text={subtitle} className="hero-sub" delay={0.8} />
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 55vh; background: #060a0f;
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid rgba(0,229,255,0.06);
        }
        .hero-blob { position: absolute; width: 700px; height: 700px; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .hero-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-wave { position: absolute; bottom: 0; left: 0; right: 0; height: 80px; }
        .hero-wave svg { width: 100%; height: 100%; display: block; }

        .hero-content { position: relative; z-index: 2; text-align: center; padding: 80px 48px; max-width: 860px; }

        .pre-tag { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(0,229,255,0.5); display: block; margin-bottom: 24px; }
        .tag-bracket { color: #00e5ff; }

        .hero-title {
          font-size: clamp(44px, 7vw, 88px); font-weight: 900;
          color: #fff; line-height: 1; margin-bottom: 16px; letter-spacing: -0.02em;
        }
        .title-morph-line {
          height: 3px; width: 180px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          margin: 0 auto 28px; transform-origin: center;
          box-shadow: 0 0 20px rgba(0,229,255,0.4);
        }
        .hero-sub { font-size: 18px; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 620px; margin: 0 auto; }

        @media (max-width: 768px) {
          .hero-content { padding: 80px 24px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <main className="contact-main">
      <ContactHero />
      <ContactGrid />
      <ContactForm />
      <MapSection />
      <Footer />

      <style jsx global>{`
        body { background: #060a0f; margin: 0; }
        .contact-main { background: #060a0f; }
        * { box-sizing: border-box; }
      `}</style>
    </main>
  );
}
