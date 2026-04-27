"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

export default function MissionControl() {
    return (
        <section className="py-16 lg:py-32 relative z-10 overflow-hidden bg-[#0B0F14]">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#00AFFF]/20 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center bg-[#0f151a]/80 backdrop-blur-xl border border-[#00AFFF]/30 rounded-3xl p-8 md:p-16 lg:p-24 shadow-[0_0_80px_rgba(0,175,255,0.15)]"
                >
                    <div className="w-16 h-16 mx-auto bg-[#00AFFF] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_#00AFFF]">
                        <Terminal className="text-black w-8 h-8" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Ready to <span className="text-[#00AFFF]">Initialize?</span>
                    </h2>

                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Begin your digital transformation sequence today. Our engineers are standing by on secure channels.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button className="px-10 py-5 bg-[#00AFFF] text-black font-bold text-lg rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,175,255,0.4)] flex items-center gap-3">
                            Launch Project
                            <ArrowRight size={20} />
                        </button>
                        <button className="px-10 py-5 bg-transparent border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/5 hover:border-[#00AFFF] transition-all">
                            View Documentation
                        </button>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-2 text-gray-500 text-sm font-mono">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        SYSTEM STATUS: NORMAL
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
