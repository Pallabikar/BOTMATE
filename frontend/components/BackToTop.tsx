"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const totalH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setVisible(scrollY > 400);
      setProgress(totalH > 0 ? scrollY / totalH : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // SVG arc progress ring
  const RADIUS = 22;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            className="btt-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            whileHover={{ scale: 1.12, boxShadow: "0 0 30px rgba(0,229,255,0.55)" }}
            whileTap={{ scale: 0.92 }}
          >
            {/* Progress ring */}
            <svg className="btt-ring" width="54" height="54" viewBox="0 0 54 54">
              {/* Track */}
              <circle cx="27" cy="27" r={RADIUS} fill="none" stroke="rgba(0,229,255,0.12)" strokeWidth="2.5" />
              {/* Progress */}
              <circle
                cx="27" cy="27" r={RADIUS}
                fill="none"
                stroke="#00e5ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 27 27)"
                style={{ transition: "stroke-dashoffset 0.1s linear" }}
              />
            </svg>
            {/* Arrow */}
            <svg className="btt-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .btt-btn {
          position: fixed;
          bottom: 36px;
          right: 36px;
          z-index: 1500;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(4, 8, 15, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 229, 255, 0.25);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), 0 0 16px rgba(0, 229, 255, 0.2);
          transition: border-color 0.3s;
        }
        .btt-btn:hover { border-color: rgba(0,229,255,0.6); }
        .btt-ring {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .btt-arrow {
          color: #00e5ff;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 0 6px rgba(0,229,255,0.7));
        }

        @media (max-width: 600px) {
          .btt-btn { bottom: 20px; right: 20px; width: 46px; height: 46px; }
        }
      `}</style>
    </>
  );
}
