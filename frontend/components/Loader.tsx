"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Cpu, ShieldCheck, Wifi } from "lucide-react";

export default function Loader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const bootSequence = [
            "INITIALIZING CORE KERNEL...",
            "LOADING NEURAL MODULES...",
            "ESTABLISHING SECURE CONNECTION...",
            "SYNCING WITH ORBITAL DRONE...",
            "SYSTEM OPTIMIZED.",
            "WELCOME, COMMANDER."
        ];

        // Prevent scrolling during load
        document.body.style.overflow = "hidden";

        // Progress bar simulation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 10;
            });
        }, 200);

        // Log sequence simulation
        bootSequence.forEach((log, index) => {
            setTimeout(() => {
                setLogs(prev => [...prev, log]);
            }, index * 400);
        });

        // Finish loading
        setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "auto";
        }, 2800);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center font-mono text-[#00AFFF]"
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(#00AFFF 1px, transparent 1px), linear-gradient(90deg, #00AFFF 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}
                    />

                    {/* Cyber Overlay Elements */}
                    <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-[#00AFFF]/30 pointer-events-none" />
                    <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-[#00AFFF]/30 pointer-events-none" />

                    <div className="relative z-10 w-full max-w-lg p-10 bg-black/40 backdrop-blur-md rounded-3xl border border-[#00AFFF]/10 shadow-[0_0_100px_rgba(0,175,255,0.1)]">
                        {/* Header HUD */}
                        <div className="flex justify-between items-center mb-12">
                            <div className="flex flex-col">
                                <span className="text-[10px] tracking-[0.3em] opacity-40">SYSTEM_OS v4.2</span>
                                <span className="text-xs font-bold tracking-widest text-white">NEURAL_NETWORK_LINK</span>
                            </div>
                            <div className="flex gap-4">
                                <Cpu size={16} className="text-[#00AFFF] animate-pulse" />
                                <ShieldCheck size={16} className="text-[#00AFFF] animate-pulse delay-75" />
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative w-full h-1 bg-[#00AFFF]/10 rounded-full mb-4 overflow-hidden">
                            <motion.div
                                className="h-full bg-[#00AFFF] shadow-[0_0_20px_#00AFFF]"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono tracking-widest mb-12">
                            <span className="opacity-50">BY BOTMATE_SYSTEMS</span>
                            <span className="text-white">{Math.min(Math.round(progress), 100)}% COMPLETE</span>
                        </div>

                        {/* Terminal Logs */}
                        <div className="h-40 flex flex-col justify-end space-y-2.5 overflow-hidden">
                            <AnimatePresence>
                                {logs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                        className="text-[11px] md:text-xs flex items-center gap-3"
                                    >
                                        <span className="text-[#00AFFF] opacity-40 font-bold">{`[${i.toString().padStart(2, '0')}]`}</span>
                                        <span className="tracking-wide text-white/90">{log}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Scrolling ID footer */}
                        <div className="absolute -bottom-6 left-10 right-10 flex justify-between text-[8px] opacity-20 font-mono tracking-[0.5em]">
                            <span>ID_SEQ_{Math.random().toString(36).substring(7).toUpperCase()}</span>
                            <span>NODE_ALPHA_01</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
