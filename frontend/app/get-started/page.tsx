"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { StaggerReveal, RevealItem, AnimatedText } from "@/components/AnimationSystem";

/* ─────────────────────────────────────────────
   CONTACT INFO
───────────────────────────────────────────── */
const CONTACT_METHODS = [
  { icon: "📧", label: "Email Us", val: "contactbotmate@gmail.com", sub: "Support 24/7" },
  { icon: "📱", label: "Call Us", val: "+91 97772 09527", sub: "Mon-Sat, 9am-7pm" },
  { icon: "📍", label: "Visit Us", val: "N6/354, Block N6, IRC Village, Nayapalli, Bhubaneswar, Odisha 751015", sub: " Bhubaneswar, Odisha 751015" },
];

function ContactGrid() {
  return (
    <section className="contact-grid-section">
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
            Contact Methods
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText 
            text="Direct channels to our core operations team." 
            className="section-sub"
            delay={0.6}
          />
        </div>
        <StaggerReveal stagger={0.1}>
          <div className="grid">
            {CONTACT_METHODS.map((m, i) => (
              <RevealItem key={i}>
                <motion.div 
                  className="info-card"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 60px rgba(0, 229, 255, 0.15)"
                  }}
                >
                  <div className="icon">{m.icon}</div>
                  <h3 className="label">{m.label}</h3>
                  <div className="val-wrap">
                    <AnimatedText text={m.val} delay={0.4 + i * 0.1} />
                  </div>
                  <p className="sub">{m.sub}</p>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
      <style jsx>{`
        .contact-grid-section { 
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
        }

        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        
        .info-card {
          background: rgba(4, 8, 15, 0.6);
          border: 1px solid rgba(0, 229, 255, 0.1);
          padding: 48px;
          border-radius: 24px;
          text-align: center;
          transition: all 0.3s ease;
        }
        .info-card:hover {
          background: rgba(0, 229, 255, 0.04);
          border-color: rgba(0, 229, 255, 0.4);
          transform: translateY(-5px);
        }
        .icon { font-size: 32px; margin-bottom: 20px; }
        .label { font-size: 13px; font-weight: 700; color: #00e5ff; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; }
        .val { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .sub { font-size: 14px; color: rgba(255, 255, 255, 0.4); }

        @media (max-width: 960px) {
          .grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
function ContactForm() {
  return (
    <section className="form-section">
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Send a Transmission
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText 
            text="Describe your project requirements for analysis." 
            className="section-sub"
            delay={0.6}
          />
        </div>
        <div className="form-container">
          <form className="cf-form">
            <div className="input-group">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Business Email" required />
            </div>
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Tell us about your project goals..." rows={6} required />
            <button type="submit" className="submit-btn">Initiate Connection</button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .form-section { padding: 50px 0 120px; background: #060a0f; }
        .section-inner { max-width: 1000px; margin: 0 auto; padding: 0 48px; }
        
        .form-container { 
          background: rgba(4, 8, 15, 0.6);
          border: 1px solid rgba(0, 229, 255, 0.1);
          padding: 60px;
          border-radius: 32px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
          max-width: 800px;
          margin: 0 auto;
        }
        
        .cf-form { display: flex; flex-direction: column; gap: 20px; }
        .input-group { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        
        input, textarea {
          background: rgba(4, 8, 15, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 18px 24px;
          border-radius: 12px;
          color: #fff;
          font-family: inherit;
          font-size: 15px;
          transition: all 0.3s ease;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #00e5ff;
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.15);
          background: rgba(0, 229, 255, 0.02);
        }
        
        .submit-btn {
          background: #00e5ff;
          color: #060a0f;
          border: none;
          padding: 20px;
          border-radius: 50px;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
          transition: all 0.3s;
          box-shadow: 0 6px 20px rgba(0, 229, 255, 0.3);
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 229, 255, 0.5);
          background: #00f7ff;
        }

        @media (max-width: 650px) {
          .input-group { grid-template-columns: 1fr; }
          .form-container { padding: 40px 24px; }
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
      <PageHeader 
        title="Connect with Us" 
        subtitle="Ready to transform your digital strategy? Our operatives are standing by to assist with your brand's evolution."
      />
      <ContactGrid />
      <ContactForm />
      <Footer />

      <style jsx global>{`
        body { background: #060a0f; margin: 0; }
        .contact-main { background: #060a0f; }
        .simple-footer { background: #030609; padding: 40px 24px; text-align: center; color: rgba(255,255,255,0.2); font-size: 12px; border-top: 1px solid rgba(0,229,255,0.05); }
      `}</style>
    </main>
  );
}