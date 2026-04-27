"use client";

import { motion } from "framer-motion";
import { Laptop, Share2, Palette, Megaphone, Shield, TrendingUp, Leaf } from "lucide-react";

interface FuturisticPlaceholderProps {
    title: string;
    type: "social" | "web" | "creative" | "ads" | "security" | "finance" | "nature";
}

export default function FuturisticPlaceholder({ title, type }: FuturisticPlaceholderProps) {

    const getIcon = () => {
        switch (type) {
            case "social": return <Share2 className="w-16 h-16 text-[#00AFFF]" />;
            case "web": return <Laptop className="w-16 h-16 text-[#00AFFF]" />;
            case "creative": return <Palette className="w-16 h-16 text-[#00AFFF]" />;
            case "ads": return <Megaphone className="w-16 h-16 text-[#00AFFF]" />;
            case "security": return <Shield className="w-16 h-16 text-[#00AFFF]" />;
            case "finance": return <TrendingUp className="w-16 h-16 text-[#00AFFF]" />;
            case "nature": return <Leaf className="w-16 h-16 text-[#00AFFF]" />;
            default: return <Laptop className="w-16 h-16 text-[#00AFFF]" />;
        }
    };

    return (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-[#0f151a] rounded-3xl overflow-hidden flex items-center justify-center border border-[#00AFFF]/20">

            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#00AFFF 1px, transparent 1px), linear-gradient(90deg, #00AFFF 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Radial Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-[#00AFFF]/10 to-transparent opacity-50" />

            {/* Central Animated Elements */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Pulsing Circles */}
                <div className="relative mb-6">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-[#00AFFF] rounded-full blur-xl"
                    />
                    <div className="relative bg-[#0B0F14] p-6 rounded-full border border-[#00AFFF] shadow-[0_0_30px_rgba(0,175,255,0.3)]">
                        {getIcon()}
                    </div>
                </div>

                {/* Text */}
                <h4 className="text-xl font-bold text-white tracking-widest uppercase mb-2">
                    {title}
                </h4>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#00AFFF] rounded-full animate-pulse" />
                    <span className="text-[#00AFFF] text-xs font-mono">SYSTEM_VISUALIZATION_ACTIVE</span>
                </div>

            </div>

            {/* Decorative Corners */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#00AFFF]/50 rounded-tl-xl" />
            <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#00AFFF]/50 rounded-tr-xl" />
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#00AFFF]/50 rounded-bl-xl" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#00AFFF]/50 rounded-br-xl" />

        </div>
    );
}
