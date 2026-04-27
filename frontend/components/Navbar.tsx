"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Service", href: "/services" },
  { name: "Package", href: "/packages" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollProgress }}
      />

      {/*
        KEY FIX: navbar z-index is now 1200, ABOVE the mobile-menu overlay
        (z-index: 1100). This ensures the hamburger/close button inside the
        navbar is always rendered on top of the full-screen menu.
      */}
      <nav className="navbar">
        {/* LEFT LOGO */}
        <div className="nav-left">
          <Link href="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
            <img
              src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274506/botmate-icon_t2vtig.png"
              alt="BotMate logo"
            />
          </Link>
        </div>

        {/* CENTER LINKS */}
        <ul className="nav-center">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} className="nav-item">
                <Link href={link.href} className={`nav-link${isActive ? " active" : ""}`}>
                  {link.name}
                  {isActive && (
                    <motion.div layoutId="underline" className="underline" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT CTA */}
        <div className="nav-right">
          <Link href="/get-started" className="nav-cta">
            Get Started
          </Link>
        </div>

        {/* HAMBURGER — always on top because navbar z-index > overlay */}
        <button
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="mobile-links">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.35 }}
                  >
                    <Link
                      href={link.href}
                      className={isActive ? "mob-link-active" : ""}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + NAV_LINKS.length * 0.07, duration: 0.35 }}
              >
                <Link
                  href="/get-started"
                  className="m-cta"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* ══ SCROLL PROGRESS ══ */
        .progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 3px;
          width: 100%;
          background: #00e5ff;
          transform-origin: left;
          /* Must be above everything */
          z-index: 2000;
        }

        /* ══ NAVBAR ══
           z-index: 1200 — sits ABOVE the mobile overlay (1100)
           so the hamburger/X icon is always visible and tappable.
        ══════════════ */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          background: rgba(4, 8, 15, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 1200;
          transition: height 0.3s ease;
        }

        .nav-left { display: flex; align-items: center; }

        .nav-logo img {
          height: 50px;
          width: auto;
          transition: height 0.3s ease;
          display: block;
        }

        /* ══ DESKTOP LINKS ══ */
        .nav-center {
          display: flex;
          justify-content: center;
          gap: 30px;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-item { position: relative; }

        .nav-link {
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 10px;
          position: relative;
          transition: color 0.3s, text-shadow 0.3s;
          letter-spacing: 0.5px;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #00e5ff;
          text-shadow: 0 0 12px rgba(0, 229, 255, 0.6);
        }

        .underline {
          position: absolute;
          bottom: -4px; left: 0;
          height: 2px; width: 100%;
          background: #00e5ff;
          border-radius: 2px;
        }

        /* ══ CTA ══ */
        .nav-right { display: flex; justify-content: flex-end; }

        .nav-cta {
          background: #00e5ff;
          padding: 10px 24px;
          border-radius: 50px;
          color: black;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          transition: box-shadow 0.3s, transform 0.3s;
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.4);
        }
        .nav-cta:hover {
          box-shadow: 0 0 25px rgba(0, 229, 255, 0.8);
          transform: translateY(-2px);
        }

        /* ══ HAMBURGER ══ */
        .hamburger {
          display: none;
          cursor: pointer;
          background: none;
          border: none;
          padding: 10px;
          flex-direction: column;
          gap: 6px;
          /* Inherits navbar's z-index (1200) — always above the overlay */
          position: relative;
        }

        .hamburger div {
          width: 28px;
          height: 2px;
          background-color: white;
          border-radius: 2px;
          transition: transform 0.35s ease, opacity 0.25s ease, background-color 0.3s ease;
          transform-origin: center;
        }

        /* ── X state ── */
        .hamburger.active .bar1 {
          transform: translateY(8px) rotate(45deg);
          background-color: #00e5ff;
        }
        .hamburger.active .bar2 {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.active .bar3 {
          transform: translateY(-8px) rotate(-45deg);
          background-color: #00e5ff;
        }

        /* ══ MOBILE OVERLAY ══
           z-index: 1100 — below the navbar (1200) so the hamburger
           is always clickable even when the menu is fully open.
        ═══════════════════════ */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: rgba(4, 8, 15, 0.97);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1100;
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 28px;
          align-items: center;
          text-align: center;
          width: 100%;
          padding: 80px 40px 40px; /* top padding clears the navbar */
        }

        .mobile-links a {
          color: rgba(255, 255, 255, 0.85);
          font-size: 28px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 1px;
          transition: color 0.25s, text-shadow 0.25s;
          display: inline-block;
        }
        .mobile-links a:hover,
        .mobile-links a.mob-link-active {
          color: #00e5ff;
          text-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
        }

        .m-cta {
          background: #00e5ff !important;
          padding: 16px 48px !important;
          border-radius: 50px;
          color: #000 !important;
          margin-top: 12px;
          font-size: 18px !important;
          font-weight: 800 !important;
          box-shadow: 0 10px 30px rgba(0, 229, 255, 0.35);
          text-shadow: none !important;
          transition: box-shadow 0.25s, transform 0.25s !important;
        }
        .m-cta:hover {
          box-shadow: 0 14px 40px rgba(0, 229, 255, 0.6) !important;
          transform: translateY(-2px);
          color: #000 !important;
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 1024px) {
          .navbar { padding: 0 30px; height: 70px; }
          .nav-center, .nav-right { display: none; }
          .hamburger { display: flex; }
          .nav-logo img { height: 40px; }
        }

        @media (max-width: 480px) {
          .navbar { padding: 0 20px; height: 60px; }
          .nav-logo img { height: 35px; }
          .mobile-links a { font-size: 24px; }
          .m-cta { font-size: 16px !important; padding: 14px 36px !important; }
        }
      `}</style>
    </>
  );
}