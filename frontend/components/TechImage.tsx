"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Scan, Activity } from "lucide-react";

interface TechImageProps {
    src: string;
    alt: string;
    className?: string;
    analysisData?: {
        type: string;
        integrity: string;
        status: string;
    };
}

export default function TechImage({ src, alt, className, analysisData }: TechImageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative cursor-pointer group overflow-hidden rounded-xl border border-white/10 hover:border-[#00AFFF] transition-colors ${className}`}
                onClick={() => setIsOpen(true)}
            >
                <div className="absolute inset-0 bg-[#00AFFF]/0 group-hover:bg-[#00AFFF]/10 transition-colors z-10 flex items-center justify-center">
                    <Scan className="text-[#00AFFF] opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 w-12 h-12" />
                </div>
                <Image src={src} alt={alt} fill className="object-cover" />
            </motion.div>

            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                            onClick={() => setIsOpen(false)}
                        >
                            {/* Grid Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-20"
                                style={{ backgroundImage: 'linear-gradient(#00AFFF 1px, transparent 1px), linear-gradient(90deg, #00AFFF 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                            />

                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="relative max-w-5xl w-full bg-[#0B0F14] border border-[#00AFFF]/50 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,175,255,0.2)] flex flex-col md:flex-row"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Image Section */}
                                <div className="relative w-full md:w-2/3 h-64 md:h-[600px] border-b md:border-b-0 md:border-r border-[#00AFFF]/30">
                                    <Image src={src} alt={alt} fill className="object-cover" />

                                    {/* Scanning Line Animation */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00AFFF]/20 to-transparent h-[20%] w-full"
                                        animate={{ top: ["-20%", "120%"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>

                                {/* Analysis Sidebar */}
                                <div className="w-full md:w-1/3 p-8 flex flex-col">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-1">OBJECT ANALYSIS</h2>
                                            <p className="text-[#00AFFF] text-xs font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                                        </div>
                                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                            <X />
                                        </button>
                                    </div>

                                    <div className="space-y-6 flex-grow font-mono text-sm">
                                        <div className="p-4 bg-[#00AFFF]/5 border border-[#00AFFF]/20 rounded">
                                            <span className="block text-gray-500 text-xs mb-1">OBJECT TYPE</span>
                                            <span className="text-white font-bold">{analysisData?.type || "UNKNOWN ENTITY"}</span>
                                        </div>
                                        <div className="p-4 bg-[#00AFFF]/5 border border-[#00AFFF]/20 rounded">
                                            <span className="block text-gray-500 text-xs mb-1">STRUCTURAL INTEGRITY</span>
                                            <div className="flex items-center gap-2 text-[#00AFFF]">
                                                <Activity size={16} />
                                                <span className="font-bold">{analysisData?.integrity || "98.4%"}</span>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-[#00AFFF]/5 border border-[#00AFFF]/20 rounded">
                                            <span className="block text-gray-500 text-xs mb-1">STATUS</span>
                                            <span className="text-green-400 font-bold">{analysisData?.status || "OPERATIONAL"}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-white/10">
                                        <p className="text-gray-500 text-xs">
                                            Scanning complete. No anomalies detected in visual spectrum.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
