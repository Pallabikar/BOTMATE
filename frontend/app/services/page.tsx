"use client";

import React, { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";

/* ─── DATA ─────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "01",
    code: "SVC::MKTG",
    title: "Digital Marketing",
    tagline: "Dominate Every Channel",
    accent: "#00f0ff",
    accentDim: "rgba(0,240,255,0.08)",
    accentGlow: "rgba(0,240,255,0.25)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3"/>
        <path d="M12 32 L20 20 L28 26 L36 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="36" cy="14" r="3" fill="currentColor"/>
        <path d="M8 38 h32" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
      </svg>
    ),
    features: [
      { label: "SEO & SEM", desc: "Rank #1 organically and dominate paid search with precision bidding." },
      { label: "Paid Ads", desc: "Google, Meta & programmatic campaigns engineered for maximum ROI." },
      { label: "Email Automation", desc: "AI-driven sequences that nurture leads 24/7 without human input." },
      { label: "Analytics & Reporting", desc: "Real-time dashboards that turn data into decisions instantly." },
    ],
    stat: { value: "8×", label: "Avg. ROI" },
  },
  {
    id: "02",
    code: "SVC::WEBDEV",
    title: "Web Development",
    tagline: "Engineer Your Digital HQ",
    accent: "#b14fff",
    accentDim: "rgba(177,79,255,0.08)",
    accentGlow: "rgba(177,79,255,0.25)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4 14 h40" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
        <circle cx="10" cy="11" r="1.5" fill="currentColor" opacity="0.5"/>
        <circle cx="15" cy="11" r="1.5" fill="currentColor" opacity="0.5"/>
        <circle cx="20" cy="11" r="1.5" fill="currentColor" opacity="0.5"/>
        <path d="M17 22 l-5 4 5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M31 22 l5 4 -5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M22 32 l4 -12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 40 l24 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M24 36 l0 4" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    features: [
      { label: "Next.js & React", desc: "Blazing-fast apps with SSR, edge functions, and zero-lag UX." },
      { label: "Performance Optimization", desc: "Core Web Vitals 100/100. Sub-second load times, globally." },
      { label: "Secure API Integration", desc: "Enterprise-grade backends with airtight auth and data flows." },
      { label: "Conversion Design", desc: "Every pixel engineered to turn visitors into paying customers." },
    ],
    stat: { value: "100ms", label: "Load Target" },
  },
  {
    id: "03",
    code: "SVC::SOCIAL",
    title: "Social Media Management",
    tagline: "Own the Conversation",
    accent: "#ff6b35",
    accentDim: "rgba(255,107,53,0.08)",
    accentGlow: "rgba(255,107,53,0.25)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <circle cx="10" cy="24" r="5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="38" cy="12" r="5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="38" cy="36" r="5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M15 21.5 L33 14.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M15 26.5 L33 33.5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="10" cy="24" r="2" fill="currentColor"/>
        <circle cx="38" cy="12" r="2" fill="currentColor"/>
        <circle cx="38" cy="36" r="2" fill="currentColor"/>
      </svg>
    ),
    features: [
      { label: "Viral Content Strategy", desc: "Trend-prediction AI ensures your brand leads the conversation." },
      { label: "Community Management", desc: "Real humans + AI tools building loyalty around your brand." },
      { label: "Reels & Short-Form", desc: "Scroll-stopping video content engineered for platform algorithms." },
      { label: "Influencer Partnerships", desc: "Curated creator network across every niche and follower size." },
    ],
    stat: { value: "3×", label: "Avg. Engagement" },
  },
];

const TECH = ["OpenAI", "Meta Ads", "Google Analytics", "Next.js", "Python", "TensorFlow", "HubSpot", "Shopify", "Vercel", "Figma"];

interface Feature {
  label: string;
  desc: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Service {
  id: string;
  code: string;
  title: string;
  tagline: string;
  accent: string;
  accentDim: string;
  accentGlow: string;
  icon: React.ReactNode;
  features: Feature[];
  stat: Stat;
}

/* ─── HOOK: animate counter ─────────────────────────────────────────── */
function useCountUp(target: string | number, duration: number = 1200, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const num = typeof target === "string" ? parseFloat(target) : target;
    if (isNaN(num)) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return val;
}

/* ─── SERVICE CARD ───────────────────────────────────────────────────── */
function ServiceCard({ svc, idx }: { svc: Service; idx: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isEven = idx % 2 === 0;

  return (
    <div
      ref={ref}
      className={`svc-card ${visible ? "svc-in" : ""} ${isEven ? "svc-even" : "svc-odd"}`}
      style={{ 
        "--accent": svc.accent, 
        "--accent-dim": svc.accentDim, 
        "--accent-glow": svc.accentGlow, 
        "--delay": `${idx * 0.15}s` 
      } as React.CSSProperties}
    >
      {/* ── LEFT COLUMN ── */}
      <div className="svc-left">
        <div className="svc-meta">
          <span className="svc-id">{svc.id}</span>
          <span className="svc-code">{svc.code}</span>
        </div>

        <div className="svc-icon" style={{ color: svc.accent }}>
          {svc.icon}
        </div>

        <h2 className="svc-title">{svc.title}</h2>
        <p className="svc-tagline">{svc.tagline}</p>

        <div className="svc-stat">
          <span className="stat-value">{svc.stat.value}</span>
          <span className="stat-label">{svc.stat.label}</span>
        </div>

        <div className="svc-corner-tl" />
        <div className="svc-corner-br" />
      </div>

      {/* ── DIVIDER ── */}
      <div className="svc-divider">
        <div className="divider-line" />
        <div className="divider-dot" />
        <div className="divider-line" />
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className="svc-right">
        {svc.features.map((f: Feature, fi: number) => (
          <div
            key={fi}
            className={`feat-item ${hovered === fi ? "feat-active" : ""}`}
            onMouseEnter={() => setHovered(fi)}
            onMouseLeave={() => setHovered(null)}
            style={{ "--fi": fi } as React.CSSProperties}
          >
            <div className="feat-num">{String(fi + 1).padStart(2, "0")}</div>
            <div className="feat-body">
              <div className="feat-label">{f.label}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
            <div className="feat-arrow">→</div>
          </div>
        ))}
      </div>

      {/* BG glow */}
      <div className="svc-bg-glow" />

      <style jsx>{`
        .svc-card {
          display: grid;
          grid-template-columns: 320px 1px 1fr;
          gap: 0;
          background: linear-gradient(135deg, rgba(6,8,15,0.95) 0%, rgba(4,6,12,0.98) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.7s ease var(--delay), transform 0.7s cubic-bezier(0.16,1,0.3,1) var(--delay), border-color 0.4s ease;
        }
        .svc-card:hover { border-color: rgba(255,255,255,0.15); }
        .svc-in { opacity: 1; transform: translateY(0); }

        /* Left */
        .svc-left {
          padding: 52px 44px;
          position: relative;
          background: var(--accent-dim);
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .svc-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 36px;
        }
        .svc-id {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.15em;
          opacity: 0.7;
        }
        .svc-code {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.1em;
          background: rgba(255,255,255,0.04);
          padding: 3px 10px;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .svc-icon {
          width: 56px;
          height: 56px;
          margin-bottom: 28px;
          filter: drop-shadow(0 0 12px var(--accent-glow));
          transition: transform 0.3s ease;
        }
        .svc-card:hover .svc-icon { transform: scale(1.1); }
        .svc-title {
          font-family: 'Georgia', serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin: 0 0 10px;
          letter-spacing: -0.5px;
        }
        .svc-tagline {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: var(--accent);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 40px;
          opacity: 0.8;
        }
        .svc-stat {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .stat-value {
          font-family: 'Georgia', serif;
          font-size: 42px;
          font-weight: 700;
          color: var(--accent);
          line-height: 1;
          text-shadow: 0 0 30px var(--accent-glow);
        }
        .stat-label {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'Courier New', monospace;
        }
        .svc-corner-tl, .svc-corner-br {
          position: absolute;
          width: 16px;
          height: 16px;
          border-color: var(--accent);
          border-style: solid;
          opacity: 0.4;
        }
        .svc-corner-tl { top: 16px; left: 16px; border-width: 1.5px 0 0 1.5px; }
        .svc-corner-br { bottom: 16px; right: 16px; border-width: 0 1.5px 1.5px 0; }

        /* Divider */
        .svc-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: transparent;
        }
        .divider-line { flex: 1; width: 1px; background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent); }
        .divider-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); flex-shrink: 0; margin: 8px 0; }

        /* Right */
        .svc-right {
          padding: 40px 44px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .feat-item {
          display: grid;
          grid-template-columns: 40px 1fr 28px;
          gap: 16px;
          align-items: center;
          padding: 20px 18px;
          border-radius: 12px;
          border: 1px solid transparent;
          cursor: default;
          transition: background 0.25s ease, border-color 0.25s ease;
          opacity: 0;
          transform: translateX(20px);
          animation: feat-in 0.5s ease forwards;
          animation-delay: calc(var(--delay) + 0.3s + var(--fi) * 0.08s);
        }
        @keyframes feat-in {
          to { opacity: 1; transform: translateX(0); }
        }
        .feat-active {
          background: var(--accent-dim);
          border-color: rgba(255,255,255,0.08);
        }
        .feat-num {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: var(--accent);
          opacity: 0.5;
          letter-spacing: 0.05em;
          font-weight: 700;
        }
        .feat-label {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
          letter-spacing: -0.2px;
        }
        .feat-desc {
          font-size: 12.5px;
          color: rgba(255,255,255,0.38);
          line-height: 1.55;
        }
        .feat-arrow {
          font-size: 14px;
          color: var(--accent);
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          transform: translateX(-4px);
        }
        .feat-active .feat-arrow { opacity: 1; transform: translateX(0); }

        /* BG glow */
        .svc-bg-glow {
          position: absolute;
          top: -80px; left: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .svc-card:hover .svc-bg-glow { opacity: 1; }

        @media (max-width: 900px) {
          .svc-card { grid-template-columns: 1fr; grid-template-rows: auto; }
          .svc-divider { flex-direction: row; height: 1px; width: 100%; }
          .divider-line { flex: 1; height: 1px; width: auto; background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent); }
          .divider-dot { margin: 0 8px; }
          .svc-left, .svc-right { padding: 36px 28px; }
          .svc-title { font-size: 24px; }
          .feat-item { grid-template-columns: 32px 1fr; }
          .feat-arrow { display: none; }
        }
      `}</style>
    </div>
  );
}

/* ─── TECH STACK ─────────────────────────────────────────────────────── */
function TechStack() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="tech-section">
      <div className="tech-inner">
        <div className={`tech-label ${visible ? "t-in" : ""}`}>
          <span className="dot" />
          TECHNOLOGY STACK
        </div>
        <h2 className={`tech-heading ${visible ? "t-in" : ""}`} style={{ transitionDelay: "0.1s" }}>
          Powered by the <em>World's Best</em> Tools
        </h2>
        <div className="tech-grid">
          {TECH.map((t, i) => (
            <div
              key={i}
              className={`tech-pill ${visible ? "t-in" : ""}`}
              style={{ transitionDelay: `${0.2 + i * 0.06}s` }}
            >
              <span className="pill-dot" />
              {t}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .tech-section {
          padding: 120px 0;
          background: #050810;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .tech-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 600px; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,240,255,0.3), transparent);
        }
        .tech-inner { max-width: 1000px; margin: 0 auto; padding: 0 32px; }
        .tech-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .tech-label.t-in { opacity: 1; transform: translateY(0); }
        .dot { width: 5px; height: 5px; border-radius: 50%; background: #00f0ff; box-shadow: 0 0 6px #00f0ff; }
        .tech-heading {
          font-family: 'Georgia', serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          color: #fff;
          letter-spacing: -1px;
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .tech-heading.t-in { opacity: 1; transform: translateY(0); }
        .tech-heading em { font-style: italic; color: #b14fff; }
        .tech-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }
        .tech-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.02em;
          cursor: default;
          transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease, transform 0.3s ease, opacity 0.5s ease;
          opacity: 0;
          transform: scale(0.9);
        }
        .tech-pill.t-in { opacity: 1; transform: scale(1); }
        .tech-pill:hover { color: #fff; border-color: rgba(0,240,255,0.4); background: rgba(0,240,255,0.05); transform: scale(1.06) translateY(-2px); }
        .pill-dot { width: 4px; height: 4px; border-radius: 50%; background: currentColor; opacity: 0.4; }
      `}</style>
    </section>
  );
}

/* ─── PAGE HEADER ───────────────────────────────────────────────────── */
function ServicesHeader() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);
  return (
    <header className="svc-header">
      <div className="header-grid" />
      <div className="header-inner">
        <div className={`breadcrumb ${loaded ? "h-in" : ""}`}>
          <span>BOTMATE</span>
          <span className="sep">/</span>
          <span className="active-crumb">SERVICES</span>
        </div>
        <h1 className={`header-title ${loaded ? "h-in" : ""}`} style={{ transitionDelay: "0.1s" }}>
          What We<br /><em>Build for You</em>
        </h1>
        <p className={`header-sub ${loaded ? "h-in" : ""}`} style={{ transitionDelay: "0.2s" }}>
          Three core disciplines. One integrated strategy. Built to scale your brand in a world that never stops moving.
        </p>
        <div className={`header-tags ${loaded ? "h-in" : ""}`} style={{ transitionDelay: "0.3s" }}>
          <span className="htag" style={{ "--tc": "#00f0ff" } as React.CSSProperties}>Digital Marketing</span>
          <span className="htag" style={{ "--tc": "#b14fff" } as React.CSSProperties}>Web Development</span>
          <span className="htag" style={{ "--tc": "#ff6b35" } as React.CSSProperties}>Social Media</span>
        </div>
      </div>
      <div className="header-line" />
      <style jsx>{`
        .svc-header {
          padding: 140px 0 90px;
          background: #060a0f;
          position: relative;
          overflow: hidden;
        }
        .header-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .header-inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 2;
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.15em;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .breadcrumb.h-in { opacity: 1; transform: translateY(0); }
        .sep { opacity: 0.3; }
        .active-crumb { color: #00f0ff; }
        .header-title {
          font-family: 'Georgia', serif;
          font-size: clamp(48px, 7vw, 90px);
          font-weight: 700;
          color: #fff;
          line-height: 1.0;
          letter-spacing: -3px;
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .header-title.h-in { opacity: 1; transform: translateY(0); }
        .header-title em { font-style: italic; color: rgba(255,255,255,0.4); }
        .header-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          max-width: 520px;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .header-sub.h-in { opacity: 1; transform: translateY(0); }
        .header-tags {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .header-tags.h-in { opacity: 1; transform: translateY(0); }
        .htag {
          padding: 7px 18px;
          border: 1px solid var(--tc);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          color: var(--tc);
          letter-spacing: 0.05em;
          background: rgba(255,255,255,0.02);
          font-family: 'Courier New', monospace;
        }
        .header-line {
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent);
        }
      `}</style>
    </header>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <main style={{ background: "#060a0f", minHeight: "100vh" }}>
      <ServicesHeader />

      <section style={{ padding: "100px 0", background: "#060a0f" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", flexDirection: "column", gap: 28 }}>
          {SERVICES.map((svc, idx) => (
            <ServiceCard key={svc.id} svc={svc} idx={idx} />
          ))}
        </div>
      </section>

      <TechStack />


      {/* CTA STRIP */}
      <section style={{ padding: "80px 32px", background: "#040710", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
        <p style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          — Ready to begin —
        </p>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#fff", letterSpacing: "-1px", marginBottom: 32 }}>
          Let's Build Something <em style={{ color: "#00f0ff", fontStyle: "italic" }}>Exceptional</em>
        </h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/get-started" style={{ padding: "16px 40px", background: "#00f0ff", color: "#000", fontWeight: 700, fontSize: 14, borderRadius: 8, textDecoration: "none", letterSpacing: "0.05em" }}>
            Get Started
          </a>
          <a href="/packages" style={{ padding: "16px 40px", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 14, borderRadius: 8, textDecoration: "none", letterSpacing: "0.05em" }}>
            View Packages
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}