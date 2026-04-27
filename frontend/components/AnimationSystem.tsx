"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";

/* ─────────────────────────────────────────────
   CONSTANTS & VARIANTS
   Consistent durations and easings for a premium feel.
───────────────────────────────────────────── */

export const ANIM_EASE = [0.22, 1, 0.36, 1]; // Custom cubic-bezier for elegant motion

export const TRANSITION_SLOW = { duration: 1, ease: ANIM_EASE } as any;
export const TRANSITION_MEDIUM = { duration: 0.8, ease: ANIM_EASE } as any;
export const TRANSITION_FAST = { duration: 0.5, ease: ANIM_EASE } as any;

export const VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 40, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  lineReveal: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
  }
};

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

/**
 * AnimatedSection
 * Wrapper for sections that reveals content when in view.
 */
export const AnimatedSection = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={VARIANTS.fadeInUp}
      transition={{ ...TRANSITION_MEDIUM, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * AnimatedText
 * Animates text by splitting it into words or lines.
 */
export const AnimatedText = ({ 
  text, 
  el: Tag = "p", 
  className,
  delay = 0,
  highlight = ""
}: { 
  text: string; 
  el?: React.ElementType; 
  className?: string; 
  delay?: number;
  highlight?: string | string[];
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const words = text.split(" ");

  // Helper to check if a word should be highlighted
  const isHighlighted = (word: string) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    if (Array.isArray(highlight)) {
      return highlight.some(h => h.toLowerCase() === cleanWord.toLowerCase());
    }
    return highlight && cleanWord.toLowerCase() === highlight.toLowerCase();
  };

  return (
    <Tag ref={ref} className={className}>
      <motion.span
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        transition={{ staggerChildren: 0.02, delayChildren: delay }}
        style={{ display: "inline-block" }}
      >
        {words.map((word, i) => (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <motion.span
              variants={{
                initial: { y: "110%", opacity: 0 },
                animate: { y: 0, opacity: 1 }
              }}
              transition={TRANSITION_MEDIUM}
              style={{ 
                display: "inline-block", 
                marginRight: "0.25em",
                color: isHighlighted(word) ? "#00e5ff" : "inherit",
                fontWeight: isHighlighted(word) ? 700 : "inherit"
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};

/**
 * StaggerReveal
 * Wrapper to stagger children entrance.
 */
export const StaggerReveal = ({ children, delay = 0, stagger = 0.1 }: { children: React.ReactNode; delay?: number; stagger?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={{
        animate: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * RevealItem
 * Children of StaggerReveal or standalone reveal.
 */
export const RevealItem = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      variants={VARIANTS.fadeInUp}
      transition={TRANSITION_MEDIUM}
      className={className}
    >
      {children}
    </motion.div>
  );
};
