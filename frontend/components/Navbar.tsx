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
          aria-label="Toggle Menu"
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
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
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          background: rgba(4, 8, 15, 0.85);
          backdrop-filter: blur(20px);
          z-index: 1000;
          transition: height 0.3s ease;
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
          display: flex;
          align-items: center;
        }

        .nav-logo img {
          height: 50px;
          width: auto;
          transition: height 0.3s ease;
        }

        .nav-center {
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
          font-weight: 500;
          padding: 6px 10px;
          position: relative;
          transition: 0.3s;
          letter-spacing: 0.5px;
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
          display: flex;
          justify-content: flex-end;
        }

        .nav-cta {
          background: #00e5ff;
          padding: 10px 24px;
          border-radius: 50px;
          color: black;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
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
          cursor: pointer;
          background: none;
          border: none;
          padding: 10px;
          z-index: 1100;
          flex-direction: column;
          gap: 6px;
        }

        .hamburger div {
          width: 28px;
          height: 2px;
          background-color: white;
          transition: 0.4s;
          border-radius: 2px;
        }

        .hamburger.active .bar1 {
          transform: rotate(-45deg) translate(-6px, 6px);
          background-color: #00e5ff;
        }

        .hamburger.active .bar2 {
          opacity: 0;
        }

        .hamburger.active .bar3 {
          transform: rotate(45deg) translate(-5px, -6px);
          background-color: #00e5ff;
        }

        @media (max-width: 1024px) {
          .navbar {
            padding: 0 30px;
            height: 70px;
          }
          .nav-center,
          .nav-right {
            display: none;
          }

          .hamburger {
            display: flex;
          }
          
          .nav-logo img {
            height: 40px;
          }
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          background: rgba(4, 8, 15, 0.98);
          backdrop-filter: blur(15px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1050;
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 25px;
          text-align: center;
          width: 100%;
          padding: 40px;
        }

        .mobile-links a {
          color: white;
          font-size: 28px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 1px;
          transition: 0.3s;
        }
        
        .mobile-links a:hover {
          color: #00e5ff;
        }

        .m-cta {
          background: #00e5ff;
          padding: 15px 40px;
          border-radius: 50px;
          color: black !important;
          margin-top: 20px;
          font-size: 20px !important;
          font-weight: 800 !important;
          box-shadow: 0 10px 30px rgba(0, 229, 255, 0.3);
        }

        @media (max-width: 480px) {
          .navbar {
            padding: 0 20px;
            height: 60px;
          }
          .nav-logo img {
            height: 35px;
          }
          .mobile-links a {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}