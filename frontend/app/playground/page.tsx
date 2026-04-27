"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import BotDefenseGame from "@/components/BotDefenseGame";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { StaggerReveal, RevealItem, AnimatedText } from "@/components/AnimationSystem";

export default function PlaygroundPage() {
  return (
    <main className="playground-main">
      <PageHeader 
        title="Neural Playground" 
        subtitle="Interact with the BotMate systems. Test our neural defense protocols or just experience the futuristic interface in action."
      />
      
      <section className="game-section">
        <div className="grid-overlay" />
        <div className="section-inner">
          <motion.div 
            className="game-container"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* AR Corner Elements */}
            <div className="hud-corner tl" /><div className="hud-corner tr" />
            <div className="hud-corner bl" /><div className="hud-corner br" />

            <div className="header-meta">
              <div className="status">
                <div className="dot" />
                <AnimatedText text="TERMINAL_ACTIVE" delay={0.4} />
              </div>
              <div className="title">BOT_DEFENSE_V2.0</div>
            </div>
            
            <div className="game-display">
               <BotDefenseGame />
            </div>

            <StaggerReveal stagger={0.15} delay={0.6}>
              <div className="instructions">
                <RevealItem>
                  <h3>How to Play</h3>
                </RevealItem>
                <RevealItem>
                  <p>Bugs are attempting to breach the firewall. Click on them to neutralize the threats before they overload the system buffers.</p>
                </RevealItem>
                <RevealItem>
                  <div className="stats-meta">
                    <span className="interactive">MAX_THREATS: 5</span>
                    <span>|</span>
                    <span className="interactive">DIFFICULTY: SCALABLE</span>
                  </div>
                </RevealItem>
              </div>
            </StaggerReveal>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .playground-main { background: #060a0f; min-height: 100vh; }
        
        .game-section { 
          padding: 80px 0 120px; 
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
        .section-inner { max-width: 1000px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }
        
        .game-container {
          background: rgba(4, 8, 15, 0.8);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 32px;
          padding: 60px;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
          position: relative;
          backdrop-filter: blur(20px);
        }

        .hud-corner {
          position: absolute; width: 40px; height: 40px; pointer-events: none;
        }
        .tl { top: 20px; left: 20px; border-top: 2px solid #00e5ff; border-left: 2px solid #00e5ff; opacity: 0.5; }
        .tr { top: 20px; right: 20px; border-top: 2px solid #00e5ff; border-right: 2px solid #00e5ff; opacity: 0.5; }
        .bl { bottom: 20px; left: 20px; border-bottom: 2px solid #00e5ff; border-left: 2px solid #00e5ff; opacity: 0.5; }
        .br { bottom: 20px; right: 20px; border-bottom: 2px solid #00e5ff; border-right: 2px solid #00e5ff; opacity: 0.5; }

        .header-meta {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 20px;
        }
        .status { 
          display: flex; align-items: center; gap: 10px; 
          font-family: monospace; font-size: 12px; color: #00e5ff;
        }
        .dot { width: 6px; height: 6px; background: #00e5ff; border-radius: 50%; box-shadow: 0 0 10px #00e5ff; }
        .title { font-family: 'Montserrat', sans-serif; font-weight: 900; color: #fff; letter-spacing: 2px; font-size: 14px; }

        .game-display {
           height: 300px; /* Force a bit more height if the component allows */
           margin-bottom: 40px;
        }

        .instructions {
           background: rgba(255,255,255,0.02);
           border-radius: 20px; padding: 30px;
           text-align: center;
        }
        .instructions h3 { 
          font-family: 'Montserrat', sans-serif; font-size: 18px; color: #fff; margin-bottom: 12px; 
        }
        .instructions p { 
          font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; max-width: 600px; margin: 0 auto 20px;
        }
        .stats-meta { 
          font-family: monospace; font-size: 11px; color: rgba(255,255,255,0.2); 
          display: flex; gap: 15px; justify-content: center;
        }

        @media (max-width: 768px) {
           .game-container { padding: 40px 24px; }
           .game-display { height: 250px; }
        }
      `}</style>

      <style jsx global>{`
        body { background: #060a0f; margin: 0; }
      `}</style>
    </main>
  );
}
