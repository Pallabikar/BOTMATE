"use client";

import { motion } from "framer-motion";
import { Network, Database, Cpu, Zap, Lock, Globe } from "lucide-react";

export default function SystemArchitecture() {
    const features = [
        {
            icon: <Network className="w-8 h-8" />,
            title: "Neural Synergy",
            description: "Seamless integration of AI agents across your entire digital ecosystem."
        },
        {
            icon: <Database className="w-8 h-8" />,
            title: "Data Sovereignty",
            description: "Enterprise-grade encryption ensuring your proprietary data remains secure."
        },
        {
            icon: <Cpu className="w-8 h-8" />,
            title: "Adaptive Learning",
            description: "Systems that evolve in real-time based on user interaction patterns."
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Micro-Latency",
            description: "Optimized code architecture delivering millisecond response times."
        },
        {
            icon: <Lock className="w-8 h-8" />,
            title: "Zero-Trust Security",
            description: "Advanced verification protocols embedded at every access point."
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Scalability",
            description: "Cloud-native infrastructure designed to scale instantly with demand."
        }
    ];

    return (
        <section className="py-16 lg:py-32 relative z-10 bg-[#0B0F14] overflow-hidden" id="architecture">
            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#00AFFF 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 lg:mb-24"
                >
                    <h2 className="text-sm font-bold tracking-[0.2em] text-[#00AFFF] uppercase mb-4">
                        Core Advantages
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
                        System <span className="text-[#00AFFF]">Architecture</span>
                    </h3>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative p-6 lg:p-8 rounded-2xl bg-[#0f151a] border border-white/5 hover:border-[#00AFFF]/50 transition-all duration-300"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00AFFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-xl bg-[#00AFFF]/10 flex items-center justify-center mb-6 text-[#00AFFF] group-hover:bg-[#00AFFF] group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,175,255,0.1)] group-hover:shadow-[0_0_30px_rgba(0,175,255,0.4)]">
                                    {feature.icon}
                                </div>

                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#00AFFF] transition-colors">
                                    {feature.title}
                                </h4>

                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-2 h-2 bg-[#00AFFF] rounded-full shadow-[0_0_10px_#00AFFF]" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
