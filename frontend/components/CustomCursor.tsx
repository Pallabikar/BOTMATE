"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { damping: 18, stiffness: 200 });
  const ringY = useSpring(cursorY, { damping: 18, stiffness: 200 });

  const outerX = useSpring(cursorX, { damping: 30, stiffness: 120 });
  const outerY = useSpring(cursorY, { damping: 30, stiffness: 120 });

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Trail particles
      const id = trailIdRef.current++;
      setTrail((prev) => [...prev.slice(-10), { x: e.clientX, y: e.clientY, id }]);
      setTimeout(() => {
        setTrail((prev) => prev.filter((t) => t.id !== id));
      }, 500);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          !!target.closest("a") ||
          !!target.closest("button") ||
          target.classList.contains("interactive")
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        @media (max-width: 1024px) {
          * { cursor: auto !important; }
          .cursor-root { display: none !important; }
        }

        .cursor-root {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 99999;
        }

        /* ── Core dot ── */
        .c-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00e5ff;
          box-shadow: 0 0 8px 2px #00e5ff, 0 0 20px 4px rgba(0,229,255,0.4);
        }

        /* ── Inner targeting ring ── */
        .c-inner {
          position: absolute;
          border: 1px solid rgba(0, 229, 255, 0.6);
          border-radius: 50%;
        }

        /* ── Outer ghost ring ── */
        .c-outer {
          position: absolute;
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 50%;
        }

        /* ── Corner brackets ── */
        .c-brackets {
          position: absolute;
        }
        .bracket {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: #00e5ff;
          border-style: solid;
          opacity: 0.9;
        }
        .bracket-tl { top: 0; left: 0;  border-width: 1.5px 0 0 1.5px; }
        .bracket-tr { top: 0; right: 0; border-width: 1.5px 1.5px 0 0; }
        .bracket-bl { bottom: 0; left: 0;  border-width: 0 0 1.5px 1.5px; }
        .bracket-br { bottom: 0; right: 0; border-width: 0 1.5px 1.5px 0; }

        /* ── Crosshair lines ── */
        .c-cross-h, .c-cross-v {
          position: absolute;
          background: rgba(0, 229, 255, 0.25);
        }
        .c-cross-h { height: 1px; width: 16px; top: 50%; transform: translateY(-50%); }
        .c-cross-v { width: 1px; height: 16px; left: 50%; transform: translateX(-50%); }
        .c-cross-h.left  { right: 100%; margin-right: 6px; }
        .c-cross-h.right { left:  100%; margin-left:  6px; }
        .c-cross-v.top    { bottom: 100%; margin-bottom: 6px; }
        .c-cross-v.bottom { top:    100%; margin-top:    6px; }

        /* ── Scan line ── */
        .c-scan {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent);
          animation: scanV 1.8s linear infinite;
        }
        @keyframes scanV {
          0%   { top: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* ── Rotation ── */
        .c-spin {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px dashed rgba(0,229,255,0.2);
          animation: spin 6s linear infinite;
        }
        .c-spin-rev {
          position: absolute;
          inset: 4px;
          border-radius: 50%;
          border: 1px dotted rgba(0,229,255,0.15);
          animation: spin 4s linear infinite reverse;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Pulse on click ── */
        .c-click-pulse {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(0,229,255,0.8);
          animation: clickPulse 0.4s ease-out forwards;
        }
        @keyframes clickPulse {
          from { width: 20px; height: 20px; opacity: 1; }
          to   { width: 80px; height: 80px; opacity: 0; }
        }

        /* ── Trail dots ── */
        .trail-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(0,229,255,0.4);
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition: opacity 0.5s ease;
        }

        /* ── HUD label ── */
        .c-label {
          position: absolute;
          top: 50%;
          left: calc(100% + 14px);
          transform: translateY(-50%);
          font-family: 'Courier New', monospace;
          font-size: 8px;
          letter-spacing: 1px;
          color: rgba(0,229,255,0.7);
          white-space: nowrap;
          line-height: 1.6;
        }
      `}</style>

      <div className="cursor-root" style={{ opacity: isVisible ? 1 : 0 }}>

        {/* Trail particles */}
        {trail.map((t, i) => (
          <div
            key={t.id}
            className="trail-dot"
            style={{
              left: t.x,
              top: t.y,
              opacity: (i / trail.length) * 0.5,
              width: `${3 + (i / trail.length) * 3}px`,
              height: `${3 + (i / trail.length) * 3}px`,
            }}
          />
        ))}

        {/* Click pulse */}
        {isClicking && (
          <motion.div
            className="c-click-pulse"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        )}

        {/* Outer ghost ring */}
        <motion.div
          className="c-outer"
          style={{
            x: outerX,
            y: outerY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            width: isHovered ? 90 : 64,
            height: isHovered ? 90 : 64,
            opacity: isHovered ? 0.4 : 0.2,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
        />

        {/* Main targeting ring with HUD elements */}
        <motion.div
          className="c-inner"
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
            overflow: "visible",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          animate={{
            width: isHovered ? 56 : 36,
            height: isHovered ? 56 : 36,
            borderColor: isHovered
              ? "rgba(0, 229, 255, 0.9)"
              : "rgba(0, 229, 255, 0.6)",
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ type: "spring", damping: 18, stiffness: 200 }}
        >
          {/* Rotating dashed rings */}
          <div className="c-spin" />
          <div className="c-spin-rev" />

          {/* Scan line */}
          <div className="c-scan" />

          {/* Corner brackets */}
          <motion.div
            className="c-brackets"
            animate={{
              inset: isHovered ? "-8px" : "-5px",
            }}
            style={{ position: "absolute", inset: "-5px" }}
          >
            <div className="bracket bracket-tl" />
            <div className="bracket bracket-tr" />
            <div className="bracket bracket-bl" />
            <div className="bracket bracket-br" />
          </motion.div>

          {/* Crosshair lines */}
          <div className="c-cross-h left" />
          <div className="c-cross-h right" />
          <div className="c-cross-v top" />
          <div className="c-cross-v bottom" />

          {/* HUD label */}
          {isHovered && (
            <motion.div
              className="c-label"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <div>TGT_LOCKED</div>
              <div style={{ color: "rgba(0,229,255,0.4)" }}>■ ENGAGE</div>
            </motion.div>
          )}
        </motion.div>

        {/* Center dot */}
        <motion.div
          className="c-dot"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isClicking ? 1.8 : isHovered ? 0.6 : 1,
            opacity: isHovered ? 0.7 : 1,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
        />
      </div>
    </>
  );
}