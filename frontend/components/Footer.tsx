"use client";

import React from "react";
import Link from "next/link";
import BotDefenseGame from "./BotDefenseGame";
import { Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { StaggerReveal, RevealItem, AnimatedText } from "./AnimationSystem";
import Magnetic from "./Magnetic";

export default function GlobalFooter() {
  return (
    <footer className="global-footer">

      <StaggerReveal stagger={0.15}>
        <div className="footer-inner">

          {/* Brand */}
          <RevealItem>
            <div className="footer-col brand-col">
              <Magnetic amount={0.25}>
                <Link href="/" className="footer-logo">
                  <img
                    src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274506/botmate-icon_t2vtig.png"
                    alt="BotMate Logo"
                    className="footer-logo-img"
                  />
                </Link>
              </Magnetic>

              <div className="footer-tagline-wrap">
                <AnimatedText
                  text="Leading the digital evolution through AI-driven strategies, futuristic design, and high-performance automation."
                  className="footer-tagline"
                  delay={0.4}
                />
              </div>

              <div className="footer-socials">
                <Magnetic amount={0.3}>
                  <a href="#" className="footer-social"><Twitter size={14} /></a>
                </Magnetic>
                <Magnetic amount={0.3}>
                  <a href="#" className="footer-social"><Linkedin size={14} /></a>
                </Magnetic>
                <Magnetic amount={0.3}>
                  <a href="https://www.instagram.com/thebotmate" target="_blank" className="footer-social">
                    <Instagram size={14} />
                  </a>
                </Magnetic>
              </div>
            </div>
          </RevealItem>

          {/* Links */}
          <RevealItem>
            <div className="footer-col">
              <h4 className="footer-col-heading">Protocols</h4>
              <ul className="footer-links">
                <li><Link href="/" className="footer-link">Home</Link></li>
                <li><Link href="/about" className="footer-link">About Us</Link></li>
                <li><Link href="/services" className="footer-link">Services</Link></li>
                <li><Link href="/packages" className="footer-link">Packages</Link></li>
              </ul>
            </div>
          </RevealItem>

          {/* Contact */}
          <RevealItem>
            <div className="footer-col">
              <h4 className="footer-col-heading">Transmission</h4>
              <ul className="footer-contact-list">
                <li><Mail size={14} /><span>contactbotmate@gmail.com</span></li>
                <li><Phone size={14} /><span>+91 97772 09527</span></li>
                <li><MapPin size={14} /><span>Bhubaneswar, ODISHA 751015</span></li>
              </ul>
            </div>
          </RevealItem>

          {/* Interactive */}
          <RevealItem>
            <div className="footer-col interactive-col">
              <h4 className="footer-col-heading">System Defense</h4>
              <div className="game-wrapper">
                <BotDefenseGame />
              </div>
            </div>
          </RevealItem>

        </div>
      </StaggerReveal>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} BOTMATE AI SYSTEMS. ALL RIGHTS RESERVED.</p>
          <div className="footer-meta">
            <span>SECURE CONNECTION</span>
            <div className="status-dot" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .global-footer {
          background: #030609;
          border-top: 1px solid rgba(0,229,255,0.08);
          color: #fff;
          padding-top: 100px;
        }

        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 1fr 1.5fr;
          gap: 60px;
        }

        /* 🔥 BRAND */
        .brand-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-logo-img {
          height: 65px; /* 🔥 ENLARGED */
          width: auto;
          margin-bottom: 28px;
          object-fit: contain;
          filter: drop-shadow(0 0 12px rgba(0, 229, 255, 0.25));
          transition: transform 0.3s ease;
        }

        .footer-logo-img:hover {
          transform: scale(1.06);
        }

        .footer-tagline {
          font-size: 13.5px;
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
          margin-bottom: 30px;
          max-width: 300px;
        }

        /* SOCIAL */
        .footer-socials {
          display: flex;
          gap: 12px;
        }

        .footer-social {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: rgba(0,229,255,0.04);
          border: 1px solid rgba(0,229,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.5);
          transition: 0.3s;
        }

        .footer-social:hover {
          border-color: #00e5ff;
          color: #00e5ff;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,229,255,0.2);
        }

        /* HEADINGS */
        .footer-col-heading {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.3);
          margin-bottom: 24px;
        }

        /* LINKS */
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
        }

        .footer-link:hover {
          color: #00e5ff;
        }

        /* CONTACT */
        .footer-contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-contact-list li {
          display: flex;
          gap: 12px;
          font-size: 13.5px;
          color: rgba(255,255,255,0.45);
        }

        /* GAME */
        .game-wrapper {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(0,229,255,0.1);
        }

        /* BOTTOM */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 30px 0;
          margin-top: 60px;
        }

        .footer-bottom-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: rgba(255,255,255,0.25);
        }

        .footer-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #00e5ff;
          border-radius: 50%;
          box-shadow: 0 0 8px #00e5ff;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .footer-inner {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .footer-inner {
            grid-template-columns: 1fr;
          }

          .footer-bottom-inner {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}