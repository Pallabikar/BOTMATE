"use client";

import { motion } from "framer-motion";
import { Terminal, Shield, Cpu, ExternalLink, Zap } from "lucide-react";
import { useState } from "react";
import { StaggerReveal, RevealItem, AnimatedText } from "./AnimationSystem";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  icon: any;
  image: string;
  stats: { label: string; value: string }[];
}

const team: TeamMember[] = [
  {
    name: "Mr. Dev Dibyansu",
    role: "Founder & CEO",
    description: "Dev Dibyansu is the visionary behind BOTMATE and the driving force of the company. He leads the overall strategy, business growth and long-term direction of the brand.",
    icon: Terminal,
    image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274517/dev_w1x8nm.jpg",
    stats: [{ label: "EXPERIENCE", value: "8+ YRS" }, { label: "STRATEGY", value: "99%" }]
  },
  {
    name: "Mr. Advik Sharma",
    role: "Co-Founder & CMO",
    description: "Advik Sharma leads marketing strategy and brand growth. He specializes in social media growth, performance marketing and lead-generation systems.",
    icon: Zap,
    image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274517/advik_ppx2sh.jpg",
    stats: [{ label: "MARKETING", value: "12+ YRS" }, { label: "GROWTH", value: "100%" }]
  },
  {
    name: "Ms. Pallabi Kar",
    role: "Director & CTO",
    description: "Pallabi Kar heads technology and product development. She ensures every automation and digital solution is fast, scalable and future-ready.",
    icon: Cpu,
    image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274516/pallabi_cqhxki.jpg",
    stats: [{ label: "TECH STACK", value: "10+ YRS" }, { label: "SUCCESS", value: "100%" }]
  }
];

export default function TeamGrid() {
  return (
    <section className="team-section">
      <div className="section-inner">
        
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="header-tag"
          >
            [ PERSONNEL DOSSIER ]
          </motion.div>
          <h2 className="header-title">Expert Personnel</h2>
          <p className="header-desc">
            Our leadership team combines deep technical expertise with strategic marketing insight to deliver exponential growth for our clients.
          </p>
          <div className="header-line" />
        </div>

        <StaggerReveal stagger={0.15}>
          <div className="team-grid">
            {team.map((member, i) => (
              <RevealItem key={i}>
                <motion.div
                  className="member-card"
                  whileHover={{ y: -10 }}
                >
                  {/* Image Part */}
                  <div className="card-media">
                    <img src={member.image} alt={member.name} className="member-image" />
                    <div className="card-overlay" />
                    
                    {/* HUD Elements */}
                    <div className="hud-brackets">
                      <span className="b-tl" /> <span className="b-tr" />
                      <span className="b-bl" /> <span className="b-br" />
                    </div>
                    
                    <div className="scanning-line" />
                    <div className="media-footer">
                       <span className="id-tag">ID_{member.name.split(' ').pop()?.toUpperCase()}</span>
                       <div className="signal-bars">
                          <div className="bar filled" /><div className="bar filled" /><div className="bar filled" /><div className="bar" />
                       </div>
                    </div>
                  </div>

                  {/* Content Part */}
                  <div className="card-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    
                    <div className="member-bio">
                      <AnimatedText text={member.description} delay={0.4 + i * 0.1} />
                    </div>

                    <div className="member-stats">
                      {member.stats.map((s, si) => (
                        <div key={si} className="stat-box">
                          <span className="stat-val">{s.value}</span>
                          <span className="stat-lbl">{s.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="card-footer">
                        <div className="secure-tag">
                          <Shield size={12} className="shield-icon" />
                          <span>SECURE PERSONNEL</span>
                        </div>
                        <motion.button 
                          whileHover={{ color: "#00e5ff" }}
                          className="read-more-btn"
                        >
                          PROFILES <ExternalLink size={12} />
                        </motion.button>
                    </div>
                  </div>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>

      <style jsx>{`
        .team-section { padding: 120px 0; background: #060a0f; position: relative; }
        .section-inner { max-width: 1280px; margin: 0 auto; padding: 0 48px; }

        .section-header { text-align: center; margin-bottom: 80px; max-width: 800px; margin-left: auto; margin-right: auto; }
        .header-tag { font-family: monospace; font-size: 12px; color: #00e5ff; letter-spacing: 0.3em; margin-bottom: 16px; }
        .header-title { font-size: 48px; font-weight: 900; color: #fff; margin-bottom: 24px; letter-spacing: -0.02em; }
        .header-desc { font-size: 16px; color: rgba(255,255,255,0.45); line-height: 1.7; margin-bottom: 32px; }
        .header-line { width: 60px; height: 3px; background: #00e5ff; margin: 0 auto; box-shadow: 0 0 15px #00e5ff; border-radius: 2px; }

        .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }

        .member-card {
          background: rgba(4, 9, 15, 0.6);
          border: 1px solid rgba(0, 229, 255, 0.1);
          border-radius: 24px;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .member-card:hover { border-color: rgba(0, 229, 255, 0.4); box-shadow: 0 30px 60px rgba(0,0,0,0.5); }

        /* Media Part */
        .card-media { position: relative; height: 400px; overflow: hidden; }
        .member-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .member-card:hover .member-image { transform: scale(1.05) rotate(1deg); }
        .card-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 60%, #060a0f); }

        .hud-brackets { position: absolute; inset: 20px; pointer-events: none; opacity: 0.4; transition: opacity 0.3s; }
        .member-card:hover .hud-brackets { opacity: 1; }
        .hud-brackets span { position: absolute; width: 15px; height: 15px; border-color: #00e5ff; }
        .b-tl { top: 0; left: 0; border-top: 1.5px solid; border-left: 1.5px solid; }
        .b-tr { top: 0; right: 0; border-top: 1.5px solid; border-right: 1.5px solid; }
        .b-bl { bottom: 0; left: 0; border-bottom: 1.5px solid; border-left: 1.5px solid; }
        .b-br { bottom: 0; right: 0; border-bottom: 1.5px solid; border-right: 1.5px solid; }

        .scanning-line {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          box-shadow: 0 0 10px #00e5ff;
          animation: scanDown 4s linear infinite;
          opacity: 0; transition: opacity 0.3s;
        }
        .member-card:hover .scanning-line { opacity: 0.6; }
        @keyframes scanDown { 0% { top: 0%; } 100% { top: 100%; } }

        .media-footer { position: absolute; bottom: 20px; left: 20px; right: 20px; display: flex; justify-content: space-between; align-items: center; }
        .id-tag { font-family: monospace; font-size: 9px; color: rgba(0,229,255,0.5); letter-spacing: 1px; }
        .signal-bars { display: flex; gap: 3px; }
        .bar { width: 3px; height: 8px; background: rgba(0,229,255,0.15); border-radius: 1px; }
        .bar.filled { background: #00e5ff; }

        /* Info Part */
        .card-info { padding: 32px; border-top: 1px solid rgba(0, 229, 255, 0.05); }
        .member-name { font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 6px; letter-spacing: -0.5px; }
        .member-role { font-size: 11px; font-weight: 800; color: #00e5ff; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 20px; }
        .member-bio { font-size: 15px; color: rgba(255, 255, 255, 0.45); line-height: 1.7; margin-bottom: 28px; }

        .member-stats { display: flex; gap: 24px; margin-bottom: 32px; }
        .stat-box { display: flex; flex-direction: column; gap: 2px; }
        .stat-val { font-size: 20px; font-weight: 900; color: #fff; font-family: monospace; }
        .stat-lbl { font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 1px; }

        .card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px; }
        .secure-tag { display: flex; align-items: center; gap: 8px; font-family: monospace; font-size: 9px; color: rgba(255,255,255,0.2); letter-spacing: 1px; }
        .shield-icon { color: rgba(0, 229, 255, 0.3); }
        .read-more-btn { background: none; border: none; font-size: 10px; font-weight: 800; color: rgba(255,255,255,0.4); display: flex; align-items: center; gap: 8px; cursor: pointer; transition: color 0.2s; letter-spacing: 1px; }

        @media (max-width: 1100px) {
          .team-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .team-grid { grid-template-columns: 1fr; }
          .section-inner { padding: 0 24px; }
          .card-media { height: 350px; }
        }
      `}</style>
    </section>
  );
}
