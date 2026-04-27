"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { StaggerReveal, RevealItem, AnimatedText } from "@/components/AnimationSystem";

/* ─────────────────────────────────────────────
   PACKAGES DATA
───────────────────────────────────────────── */
const PACKAGES = [
  {
    name: "Starter Plan",
    price: "₹9,999",
    period: "per month",
    desc: "Establish your digital footprint with essential reach and content.",
    features: ["~ 10-20K Reach", "10 Creative Posts", "1 Shoot & Video", "Profile Management", "Competitor Research", "ORM", "Performance Reports"],
    accent: "rgba(255, 255, 255, 0.4)",
    popular: false
  },
  {
    name: "Business Plan",
    price: "₹14,999",
    period: "per month",
    desc: "Accelerate your local growth with GMB optimization and expanded reach.",
    features: ["~ 30-40K Reach", "15 Creative Posts", "2 Shoots & Videos", "GMB Optimization", "Target Audience Targeting", "ORM", "Performance Reports"],
    accent: "#00e5ff",
    popular: true
  },
  {
    name: "Enterprise Plan",
    price: "₹19,999",
    period: "per month",
    desc: "Maximum local dominance with high-volume content and massive reach.",
    features: ["~ 50-100K Reach", "20 Creative Posts", "3 Shoots & Videos", "GMB Optimization", "Target Audience Targeting", "ORM", "Extended Reports"],
    accent: "rgba(255, 255, 255, 0.4)",
    popular: false
  }
];

function PackagesGrid() {
  return (
    <section className="packages-grid-section">
      <div className="grid-overlay" />
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Choose Your Plan
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText 
            text="No hidden fees. Cancel anytime. Results guaranteed." 
            className="section-sub"
            delay={0.6}
          />
        </div>
        <StaggerReveal stagger={0.15}>
          <div className="grid">
            {PACKAGES.map((pkg: any, i: number) => (
              <RevealItem key={i}>
                <motion.div 
                  className={`pkg-card ${pkg.popular ? "popular" : ""}`}
                  whileHover={{ 
                    y: -10,
                    boxShadow: pkg.popular 
                      ? "0 20px 80px rgba(0, 229, 255, 0.4)" 
                      : "0 20px 60px rgba(0, 0, 0, 0.4)"
                  }}
                >
                  {pkg.popular && <div className="popular-tag">MOST POPULAR</div>}
                  <h3 className="pkg-name">{pkg.name}</h3>
                  <div className="pkg-desc-wrap">
                    <AnimatedText text={pkg.desc} delay={0.4 + i * 0.1} />
                  </div>
                  <div className="pkg-price">
                    <span className="amt">{pkg.price}</span>
                    <span className="period">{pkg.period}</span>
                  </div>
                  <ul className="pkg-features">
                    {pkg.features.map((f: string, j: number) => (
                      <li key={j} className="f-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={pkg.popular ? "#00e5ff" : "rgba(255,255,255,0.4)"} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/get-started" className={`pkg-btn ${pkg.popular ? "btn-primary" : "btn-outline"}`}>
                    Choose {pkg.name}
                  </a>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
      <style jsx>{`
        .packages-grid-section { 
          padding: 100px 0; 
          background: #060a0f; 
          position: relative;
          overflow: hidden;
        }
        .grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,175,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,175,255,0.04) 1px, transparent 1px);
          background-size: 100px 100px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
        }
        .section-inner { max-width: 1280px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }

        .section-heading-wrap { text-align: center; margin-bottom: 72px; }
        .section-heading {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -1px;
          margin-bottom: 14px;
        }
        .cyan-underline {
          width: 56px; height: 3px;
          background: #00e5ff;
          border-radius: 2px;
          margin: 0 auto;
          box-shadow: 0 0 14px rgba(0,229,255,0.5);
        }
        .section-sub {
          color: rgba(255,255,255,0.42);
          font-size: 15px;
          margin-top: 14px;
          line-height: 1.6;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        
        .pkg-card {
          background: rgba(4, 8, 15, 0.6);
          border: 1px solid rgba(0, 229, 255, 0.1);
          border-radius: 32px;
          padding: 60px 40px;
          position: relative;
          transition: all 0.4s ease;
          display: flex; flex-direction: column;
        }
        .pkg-card.popular {
          border-color: #00e5ff;
          background: rgba(0, 229, 255, 0.03);
          transform: scale(1.05);
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
        }
        .popular-tag {
          position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          background: #00e5ff; color: #060a0f; font-size: 11px; font-weight: 800;
          padding: 6px 18px; border-radius: 50px; letter-spacing: 1px;
        }

        .pkg-name { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 12px; letter-spacing: 1px; text-transform: uppercase; }
        .pkg-desc { font-size: 14px; color: rgba(255, 255, 255, 0.4); line-height: 1.6; margin-bottom: 32px; height: 44px; }
        .pkg-price { margin-bottom: 40px; }
        .amt { font-size: 48px; font-weight: 900; color: #fff; display: block; letter-spacing: -2px; }
        .period { font-size: 14px; color: rgba(255, 255, 255, 0.4); font-weight: 500; }

        .pkg-features { list-style: none; margin-bottom: 48px; flex-grow: 1; }
        .f-item { display: flex; align-items: center; gap: 12px; font-size: 14px; color: rgba(255, 255, 255, 0.7); margin-bottom: 16px; }

        .pkg-btn {
          text-align: center; text-decoration: none; padding: 18px; border-radius: 50px; font-weight: 700; font-size: 15px; transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btn-primary { background: #00e5ff; color: #060a0f; box-shadow: 0 4px 20px rgba(0, 229, 255, 0.3); }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0, 229, 255, 0.5); }
        .btn-outline { border: 2px solid rgba(255, 255, 255, 0.1); color: #fff; }
        .btn-outline:hover { border-color: #00e5ff; color: #00e5ff; background: rgba(0, 229, 255, 0.05); }

        @media (max-width: 1100px) {
          .grid { grid-template-columns: 1fr; gap: 48px; max-width: 450px; margin: 0 auto; }
          .pkg-card.popular { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FAQ SECTION
───────────────────────────────────────────── */
const FAQS = [
  { q: "How long does it take to see results?", a: "While minor improvements happen in month one, significant scaling typically takes 3-6 months as AI models and SEO data stabilize." },
  { q: "Can I upgrade or downgrade my plan?", a: "Yes, you can move between plans at the end of any billing cycle. We recommend staying on a plan for at least 3 months to accurately measure performance." },
  { q: "Is there a long-term contract?", a: "No, all our standard packages are month-to-month. We believe our results should be the reason you stay with us." },
  { q: "Do the packages include ad spend?", a: "No, the prices listed cover our management, strategy, and creative execution. Ad spend is paid directly to platforms (Google/Meta) based on your budget." }
];

function FAQSection() {
  return (
    <section className="faq-section">
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText 
            text="Clear answers to your mission-critical queries." 
            className="section-sub"
            delay={0.6}
          />
        </div>
        <StaggerReveal stagger={0.1} delay={0.8}>
          <div className="faq-grid">
            {FAQS.map((f: any, i: number) => (
              <RevealItem key={i}>
                <div className="faq-item">
                  <h3 className="q">{f.q}</h3>
                  <div className="a-wrap">
                     <AnimatedText text={f.a} delay={1.0 + i * 0.1} />
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
      <style jsx>{`
        .faq-section { 
          padding: 100px 0; 
          background: #07090e; 
          border-top: 1px solid rgba(0, 229, 255, 0.05); 
          position: relative; 
          overflow: hidden;
        }
        .section-inner { max-width: 1100px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }
        
        .section-heading-wrap { text-align: center; margin-bottom: 72px; }
        .section-heading {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -1px;
          margin-bottom: 14px;
        }
        .cyan-underline {
          width: 56px; height: 3px;
          background: #00e5ff;
          border-radius: 2px;
          margin: 0 auto;
          box-shadow: 0 0 14px rgba(0,229,255,0.5);
        }
        .section-sub {
          color: rgba(255,255,255,0.42);
          font-size: 15px;
          margin-top: 14px;
          line-height: 1.6;
        }

        .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
        .q { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 16px; position: relative; padding-left: 24px; }
        .q::before { content: ""; position: absolute; left: 0; top: 10px; width: 8px; height: 2px; background: #00e5ff; }
        .a { font-size: 15px; color: rgba(255, 255, 255, 0.4); line-height: 1.7; }

        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function PackagesPage() {
  return (
    <main className="packages-main">
      <PageHeader 
        title="Scaling Solutions" 
        subtitle="Transparent pricing for businesses at every stage. Select a protocol to begin your digital acceleration."
      />
      <PackagesGrid />
      <FAQSection />
      <Footer />

      <style jsx global>{`
        body { background: #060a0f; margin: 0; }
        .packages-main { background: #060a0f; }
        .simple-footer { background: #030609; padding: 40px 24px; text-align: center; color: rgba(255,255,255,0.2); font-size: 12px; border-top: 1px solid rgba(0,229,255,0.05); }
      `}</style>
    </main>
  );
}
