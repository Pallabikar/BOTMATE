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

  // 🔥 Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 🔥 SCROLL PROGRESS BAR */}
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollProgress }}
      />

      <nav className="navbar">
        {/* LEFT LOGO */}
        <div className="nav-left">
          <Link href="/" className="nav-logo">
            <img src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274506/botmate-icon_t2vtig.png" alt="logo" />
          </Link>
        </div>

        {/* CENTER LINKS */}
        <ul className="nav-center">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} className="nav-item">
                <Link href={link.href} className="nav-link">
                  {link.name}

                  {/* 🔥 ACTIVE UNDERLINE */}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="underline"
                    />
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

        {/* MOBILE */}
        <button
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mobile-links">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/get-started"
                className="m-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          background: rgba(4, 8, 15, 0.85);
          backdrop-filter: blur(20px);
          z-index: 1000;
        }

        /* 🔥 PROGRESS BAR */
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          width: 100%;
          background: #00e5ff;
          transform-origin: left;
          z-index: 2000;
        }

        .nav-left {
          flex: 1;
        }

        .nav-logo img {
          height: 55px;
        }

        .nav-center {
          flex: 2;
          display: flex;
          justify-content: center;
          gap: 30px;
          list-style: none;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          font-size: 14px;
          padding: 6px 10px;
          position: relative;
          transition: 0.3s;
        }

        /* ✨ HOVER GLOW */
        .nav-link:hover {
          color: #00e5ff;
          text-shadow: 0 0 12px rgba(0, 229, 255, 0.6);
        }

        /* 🔥 UNDERLINE */
        .underline {
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 2px;
          width: 100%;
          background: #00e5ff;
          border-radius: 2px;
        }

        .nav-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }

        .nav-cta {
          background: #00e5ff;
          padding: 10px 24px;
          border-radius: 50px;
          color: black;
          text-decoration: none;
          font-weight: 600;
          transition: 0.3s;
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.4);
        }

        .nav-cta:hover {
          box-shadow: 0 0 25px rgba(0, 229, 255, 0.8);
          transform: translateY(-2px);
        }

        /* MOBILE */
        .hamburger {
          display: none;
        }

        @media (max-width: 960px) {
          .nav-center,
          .nav-right {
            display: none;
          }

          .hamburger {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          background: black;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: center;
        }

        .mobile-links a {
          color: white;
          font-size: 22px;
          text-decoration: none;
        }

        .m-cta {
          background: #00e5ff;
          padding: 12px 30px;
          border-radius: 50px;
          color: black !important;
        }
      `}</style>
    </>
  );
}