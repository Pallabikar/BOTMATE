"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function GlobalFooter() {
  return (
    <footer className="global-footer">

      {/* Top accent line */}
      <div className="footer-accent-line" aria-hidden="true" />

      <div className="footer-body">
        <div className="footer-inner">

          {/* ── Brand Column ── */}
          <div className="footer-col brand-col">
            <Link href="/" className="footer-logo-wrap">
              <img
                src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274506/botmate-icon_t2vtig.png"
                alt="BotMate Logo"
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-tagline">
              AI-driven marketing, futuristic design, and high-performance automation — built for brands that refuse to be ordinary.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social" aria-label="Twitter">
                <Twitter size={13} />
              </a>
              <a href="#" className="footer-social" aria-label="LinkedIn">
                <Linkedin size={13} />
              </a>
              <a href="https://www.instagram.com/thebotmate" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram">
                <Instagram size={13} />
              </a>
            </div>
          </div>

          {/* ── Navigation Column ── */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              {[
                { label: "Home",        href: "/" },
                { label: "About Us",    href: "/about" },
                { label: "Services",    href: "/services" },
                { label: "Packages",    href: "/packages" },
                { label: "Case Studies",href: "/case-studies" },
                { label: "Blog",        href: "/blog" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="footer-link">
                    <span className="footer-link-dot" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services Column ── */}
          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              {[
                "SEO Optimization",
                "Social Media",
                "AI Chatbots",
                "Paid Advertising",
                "Content Creation",
                "Web Development",
              ].map((s) => (
                <li key={s}>
                  <Link href="/services" className="footer-link">
                    <span className="footer-link-dot" aria-hidden="true" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact + CTA Column ── */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-icon"><Mail size={13} /></span>
                <a href="mailto:contactbotmate@gmail.com" className="footer-contact-val">
                  contactbotmate@gmail.com
                </a>
              </li>
              <li>
                <span className="footer-contact-icon"><Phone size={13} /></span>
                <a href="tel:+919777209527" className="footer-contact-val">
                  +91 97772 09527
                </a>
              </li>
              <li>
                <span className="footer-contact-icon"><MapPin size={13} /></span>
                <span className="footer-contact-val">Bhubaneswar, Odisha 751015</span>
              </li>
            </ul>

            {/* CTA card */}
            <div className="footer-cta-card">
              <p className="footer-cta-text">
                Ready to scale your brand with AI-powered strategies?
              </p>
              <a href="/get-started" className="footer-cta-btn">
                Get Started
                <ArrowUpRight size={14} />
              </a>
              <a href="/contact" className="footer-cta-ghost">Book a free strategy call</a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} BotMate AI Systems. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link href="/privacy" className="footer-legal-link">Privacy Policy</Link>
            <span className="footer-legal-sep" aria-hidden="true">·</span>
            <Link href="/terms" className="footer-legal-link">Terms of Service</Link>
          </div>
          <div className="footer-status">
            <span className="status-dot" aria-hidden="true" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── Variables ── */
        .global-footer {
          --gold: #c9a84c;
          --gold-dim: rgba(201,168,76,0.12);
          --gold-border: rgba(201,168,76,0.2);
          --bg: #050402;
          --text-primary: #f0ead8;
          --text-muted: rgba(240,234,216,0.38);
          --text-secondary: rgba(240,234,216,0.55);
          --border: rgba(201,168,76,0.1);
          --font-display: 'Cormorant Garamond', Georgia, serif;
          --font-body: 'DM Sans', system-ui, sans-serif;

          background: var(--bg);
          color: var(--text-primary);
          font-family: var(--font-body);
          position: relative;
        }

        /* ── Accent Line ── */
        .footer-accent-line {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--gold) 30%, rgba(201,168,76,0.4) 50%, var(--gold) 70%, transparent 100%);
          opacity: 0.5;
        }

        /* ── Body ── */
        .footer-body {
          padding: 80px 0 72px;
        }

        .footer-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: 1.5fr 0.8fr 0.8fr 1.3fr;
          gap: 64px;
          align-items: start;
        }

        /* ── Brand ── */
        .brand-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .footer-logo-wrap {
          display: inline-block;
          margin-bottom: 22px;
        }

        .footer-logo-img {
          height: 60px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: opacity 0.25s;
        }

        .footer-logo-img:hover { opacity: 0.82; }

        .footer-tagline {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.82;
          max-width: 280px;
          margin-bottom: 28px;
        }

        .footer-socials {
          display: flex;
          gap: 10px;
        }

        .footer-social {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: var(--gold-dim);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .footer-social:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: rgba(201,168,76,0.08);
          transform: translateY(-2px);
        }

        /* ── Columns ── */
        .footer-col {
          display: flex;
          flex-direction: column;
        }

        .footer-heading {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.7;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }

        /* ── Links ── */
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s, gap 0.2s;
        }

        .footer-link-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }

        .footer-link:hover {
          color: var(--text-primary);
          gap: 10px;
        }

        .footer-link:hover .footer-link-dot {
          opacity: 0.7;
        }

        /* ── Contact ── */
        .footer-contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 32px;
        }

        .footer-contact-list li {
          display: flex;
          align-items: flex-start;
          gap: 11px;
        }

        .footer-contact-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 7px;
          background: var(--gold-dim);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          opacity: 0.8;
          margin-top: 1px;
        }

        .footer-contact-val {
          font-size: 13px;
          color: var(--text-secondary);
          text-decoration: none;
          line-height: 1.6;
          padding-top: 5px;
          transition: color 0.2s;
        }

        a.footer-contact-val:hover { color: var(--gold); }

        /* ── CTA Card ── */
        .footer-cta-card {
          border: 1px solid var(--gold-border);
          border-radius: 10px;
          padding: 22px 20px;
          background: linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 100%);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-cta-text {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .footer-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          color: #0a0804;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          align-self: flex-start;
          transition: all 0.25s;
          box-shadow: 0 4px 16px rgba(201,168,76,0.25);
        }

        .footer-cta-btn:hover {
          box-shadow: 0 6px 24px rgba(201,168,76,0.4);
          transform: translateY(-2px);
        }

        .footer-cta-ghost {
          font-size: 12px;
          color: rgba(201,168,76,0.5);
          text-decoration: none;
          transition: color 0.2s;
          align-self: flex-start;
        }

        .footer-cta-ghost:hover { color: var(--gold); }

        /* ── Bottom Bar ── */
        .footer-bottom {
          border-top: 1px solid var(--border);
        }

        .footer-bottom-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 22px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .footer-copy {
          font-size: 11.5px;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-legal-link {
          font-size: 11.5px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-legal-link:hover { color: var(--gold); }

        .footer-legal-sep {
          color: var(--text-muted);
          font-size: 11px;
        }

        .footer-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          color: var(--text-muted);
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(74,222,128,0.6);
          animation: statusPulse 2.5s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.25); }
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
          }
        }

        @media (max-width: 768px) {
          .footer-body { padding: 56px 0 52px; }
          .footer-inner {
            grid-template-columns: 1fr;
            padding: 0 24px;
            gap: 40px;
          }
          .footer-bottom-inner {
            padding: 20px 24px;
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          .footer-tagline { max-width: 100%; }
        }
      `}</style>
    </footer>
  );
}