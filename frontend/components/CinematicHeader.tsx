"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CinematicHeaderProps {
    title: string;
    highlight: string;
    subtitle: string;
}

// ── Floating 3D card layer ─────────────────────────────────────────────────
function Layer3D({
    children,
    depth = 1,
    className = "",
}: {
    children: React.ReactNode;
    depth?: number;
    className?: string;
}) {
    return (
        <motion.div
            className={`absolute pointer-events-none ${className}`}
            style={{ willChange: "transform" }}
            animate={{ z: depth * 10 }}
        >
            {children}
        </motion.div>
    );
}

// ── Parallax grid lines ────────────────────────────────────────────────────
function ParallaxGrid({ rotateX, rotateY }: { rotateX: any; rotateY: any }) {
    const tx = useTransform(rotateY, [-20, 20], ["-8%", "8%"]);
    const ty = useTransform(rotateX, [-20, 20], ["-8%", "8%"]);
    return (
        <motion.div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
                x: tx,
                y: ty,
                backgroundImage:
                    "linear-gradient(#00AFFF 1px, transparent 1px), linear-gradient(90deg, #00AFFF 1px, transparent 1px)",
                backgroundSize: "48px 48px",
            }}
        />
    );
}

export default function CinematicHeader({ title, highlight, subtitle }: CinematicHeaderProps) {
    const ref = useRef<HTMLElement>(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    // Spring-smooth the tilt
    const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [14, -14]), {
        stiffness: 120,
        damping: 22,
    });
    const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-18, 18]), {
        stiffness: 120,
        damping: 22,
    });

    // Parallax offsets per depth layer
    const tx1 = useTransform(rotateY, [-18, 18], [-12, 12]);
    const ty1 = useTransform(rotateX, [-14, 14], [-8, 8]);
    const tx2 = useTransform(rotateY, [-18, 18], [-24, 24]);
    const ty2 = useTransform(rotateX, [-14, 14], [-16, 16]);
    const tx3 = useTransform(rotateY, [-18, 18], [10, -10]);
    const ty3 = useTransform(rotateX, [-14, 14], [6, -6]);

    // Shadow that moves opposite to tilt
    const shadowX = useTransform(rotateY, [-18, 18], [12, -12]);
    const shadowY = useTransform(rotateX, [-14, 14], [-10, 10]);
    const textShadow = useTransform(
        [shadowX, shadowY],
        ([sx, sy]: number[]) =>
            `${sx}px ${sy}px 40px rgba(0,175,255,0.5), ${sx * 0.5}px ${sy * 0.5}px 80px rgba(0,100,200,0.3)`
    );

    // Glare spot
    const glareX = useTransform(rawX, [-0.5, 0.5], ["20%", "80%"]);
    const glareY = useTransform(rawY, [-0.5, 0.5], ["20%", "80%"]);
    const glareOpacity = useSpring(0, { stiffness: 80, damping: 20 });

    const [isIdle, setIsIdle] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        rawX.set((e.clientX - rect.left) / rect.width - 0.5);
        rawY.set((e.clientY - rect.top) / rect.height - 0.5);
        glareOpacity.set(0.12);
        setIsIdle(false);
    };

    const handleMouseLeave = () => {
        rawX.set(0);
        rawY.set(0);
        glareOpacity.set(0);
        setIsIdle(true);
    };

    // Idle auto-tilt when no mouse
    useEffect(() => {
        if (!isIdle) return;
        let frame: number;
        let t = 0;
        const tick = () => {
            t += 0.008;
            rawX.set(Math.sin(t * 0.7) * 0.18);
            rawY.set(Math.cos(t * 0.5) * 0.12);
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [isIdle, rawX, rawY]);

    return (
        <section
            ref={ref}
            className="pt-20 lg:pt-32 pb-12 lg:pb-20 relative z-10 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: isMobile ? "none" : "1000px" }}
        >
            {/* ── Parallax grid ── */}
            <ParallaxGrid rotateX={rotateX} rotateY={rotateY} />

            {/* ── Ambient blobs (layer 1 — deepest) ── */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ x: tx3, y: ty3 }}
            >
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.28, 0.18] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00AFFF] rounded-full blur-[120px] opacity-20"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.18, 0.28, 0.18] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0066CC] rounded-full blur-[120px] opacity-20"
                />
            </motion.div>

            {/* ── Floating corner brackets (layer 2) ── */}
            <motion.div
                className="absolute top-4 left-4 md:top-8 md:left-8 w-12 h-12 md:w-16 md:h-16 pointer-events-none z-10"
                style={{ x: tx2, y: ty2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1 }}
            >
                <svg viewBox="0 0 64 64" fill="none">
                    <motion.path
                        d="M0,24 L0,0 L24,0"
                        stroke="#00AFFF" strokeWidth="2" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    />
                </svg>
            </motion.div>
            <motion.div
                className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 md:w-16 md:h-16 pointer-events-none z-10"
                style={{ x: tx2, y: ty2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.1 }}
            >
                <svg viewBox="0 0 64 64" fill="none">
                    <motion.path
                        d="M64,24 L64,0 L40,0"
                        stroke="#00AFFF" strokeWidth="2" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                    />
                </svg>
            </motion.div>
            <motion.div
                className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-12 h-12 md:w-16 md:h-16 pointer-events-none z-10"
                style={{ x: tx2, y: ty2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.2 }}
            >
                <svg viewBox="0 0 64 64" fill="none">
                    <motion.path
                        d="M0,40 L0,64 L24,64"
                        stroke="#00AFFF" strokeWidth="2" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                    />
                </svg>
            </motion.div>
            <motion.div
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-16 md:h-16 pointer-events-none z-10"
                style={{ x: tx2, y: ty2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.3 }}
            >
                <svg viewBox="0 0 64 64" fill="none">
                    <motion.path
                        d="M64,40 L64,64 L40,64"
                        stroke="#00AFFF" strokeWidth="2" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                    />
                </svg>
            </motion.div>

            {/* ── Floating ring (mid layer) ── */}
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
                style={{ x: tx1, y: ty1 }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full border border-dashed border-[#00AFFF]/10"
                />
            </motion.div>
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
                style={{ x: tx2, y: ty2 }}
            >
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full border border-dotted border-[#00AFFF]/08"
                />
            </motion.div>

            {/* ── Main 3D card ── */}
            <motion.div
                className="container mx-auto px-6 text-center relative z-10"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Glare overlay */}
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-2xl z-20"
                    style={{
                        opacity: glareOpacity,
                        background: useTransform(
                            [glareX, glareY],
                            ([gx, gy]: string[]) =>
                                `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.25) 0%, transparent 60%)`
                        ),
                    }}
                />

                {/* Title — deepest text layer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ transformStyle: "preserve-3d", transform: isMobile ? "none" : "translateZ(30px)" }}
                >
                    <h1 className="text-[2rem] sm:text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight leading-tight px-4">
                        {/* Plain title */}
                        <motion.span
                            className="block"
                            style={{
                                textShadow: useTransform(
                                    [shadowX, shadowY],
                                    ([sx, sy]: number[]) =>
                                        `${sx * 0.4}px ${sy * 0.4}px 20px rgba(255,255,255,0.08)`
                                ),
                            }}
                        >
                            {title}
                        </motion.span>

                        {/* Highlight — floats higher in Z */}
                        <motion.span
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00AFFF] to-white"
                            style={{
                                transform: isMobile ? "none" : "translateZ(20px)",
                                textShadow: undefined,
                                filter: "none",
                                WebkitTextStroke: "0px",
                            }}
                        >
                            {/* Fake text shadow via stacked pseudo element */}
                            <span
                                className="relative inline-block"
                                style={{ transform: isMobile ? "none" : "translateZ(20px)", display: "inline-block" }}
                            >
                                {/* Shadow clone behind */}
                                <span
                                    aria-hidden
                                    className="absolute inset-0 text-[#00AFFF] blur-[2px] opacity-60 select-none"
                                    style={{ transform: isMobile ? "none" : "translateZ(-10px) translate(4px, 6px)" }}
                                >
                                    {highlight}
                                </span>
                                <motion.span
                                    className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#00AFFF] to-white"
                                    style={{ textShadow }}
                                >
                                    {highlight}
                                </motion.span>
                            </span>
                        </motion.span>
                    </h1>
                </motion.div>

                {/* Divider line — mid layer */}
                <motion.div
                    className="mx-auto mb-6 overflow-hidden"
                    style={{ transform: isMobile ? "none" : "translateZ(20px)", width: "fit-content" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <svg height="4" viewBox="0 0 320 4" className="w-64 md:w-80">
                        <motion.path
                            d="M0,2 Q80,0 160,2 Q240,4 320,2"
                            stroke="url(#lineGrad)"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
                        />
                        <defs>
                            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#00AFFF" stopOpacity="0" />
                                <stop offset="50%" stopColor="#00AFFF" stopOpacity="1" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>

                {/* Subtitle — front layer */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    style={{
                        transform: isMobile ? "none" : "translateZ(10px)",
                        textShadow: useTransform(
                            [shadowX, shadowY],
                            ([sx, sy]: number[]) =>
                                `${sx * 0.2}px ${sy * 0.2}px 10px rgba(0,0,0,0.5)`
                        ),
                    }}
                >
                    {subtitle}
                </motion.p>

                {/* Bottom status line — front-most */}
                <motion.div
                    className="mt-8 flex items-center justify-center gap-3"
                    style={{ transform: isMobile ? "none" : "translateZ(40px)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                >
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-[#00AFFF]"
                        animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#00AFFF]/60 uppercase">
                        Powered by BOTMATE
                    </span>
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-[#00AFFF]"
                        animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}