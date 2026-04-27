"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Shield, Zap } from "lucide-react";
import FuturisticPlaceholder from "./FuturisticPlaceholder";

interface Project {
    title: string;
    category: string;
    description: string;
    stats: { label: string; value: string }[];
    placeholderType: "social" | "web" | "creative" | "ads" | "security" | "finance" | "nature";
    image?: string;
}

const projects: Project[] = [
    {
        title: "EcoSphere AI",
        category: "Neural Network Architecture",
        description: "A self-optimizing energy management system that reduced data center power consumption by 40% through predictive load balancing.",
        stats: [
            { label: "Efficiency", value: "+40%" },
            { label: "Latency", value: "<12ms" }
        ],
        placeholderType: "nature",
        image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274514/ecosphere-ai_im9i6f.jpg"
    },
    {
        title: "CyberDefense Grid",
        category: "Enterprise Security",
        description: "Military-grade automated threat detection system protecting over $500M in digital assets across 3 continents.",
        stats: [
            { label: "Threats Blocked", value: "1.2M+" },
            { label: "Uptime", value: "99.99%" }
        ],
        placeholderType: "security",
        image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274513/cyberdefense-grid_gmfely.jpg"
    },
    {
        title: "Quantum Finance Core",
        category: "Fintech Infrastructure",
        description: "High-frequency trading engine built on next-gen blockchain protocols, ensuring microsecond execution speeds.",
        stats: [
            { label: "Transactions", value: "50k/sec" },
            { label: "Security", value: "AES-256" }
        ],
        placeholderType: "finance",
        image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274512/quantum-finance_ygifcv.jpg"
    }
];

export default function PremiumPortfolio() {
    return (
        <section className="py-16 lg:py-32 relative z-10 bg-[#0B0F14]" id="portfolio">
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-24 gap-8"
                >
                    <div>
                        <h2 className="text-sm font-bold tracking-[0.2em] text-[#00AFFF] uppercase mb-4">
                            Selected Works
                        </h2>
                        <h3 className="text-[1.85rem] sm:text-4xl md:text-6xl font-bold text-white leading-tight">
                            Engineering <br className="hidden sm:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AFFF] to-[#0066CC]">Excellence</span>
                        </h3>
                    </div>
                    <p className="text-gray-400 max-w-md text-lg pb-2">
                        Deploying mission-critical digital solutions for industry leaders.
                        Explore our classified case studies.
                    </p>
                </motion.div>

                {/* Projects List */}
                <div className="flex flex-col gap-16 lg:gap-32">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="group"
                        >
                            <div className="grid lg:grid-cols-2 gap-12 items-center">

                                {/* Project Visual */}
                                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#00AFFF]/50 transition-colors duration-500 min-h-[300px] sm:min-h-[400px]">
                                        <div className="absolute inset-0 bg-[#00AFFF]/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

                                        {project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                width={800}
                                                height={600}
                                                unoptimized
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <FuturisticPlaceholder title={project.title} type={project.placeholderType} />
                                        )}

                                        {/* Overlay Stats */}
                                         <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex gap-3 sm:gap-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                            {project.stats.map((stat, i) => (
                                                <div key={i} className="bg-black/80 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-[#00AFFF]/30">
                                                    <p className="text-[#00AFFF] text-[10px] sm:text-xs uppercase tracking-wider mb-1">{stat.label}</p>
                                                    <p className="text-white text-sm sm:text-base font-bold">{stat.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Project Details */}
                                <div className={`${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                                    <div className={`flex items-center gap-3 mb-6 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                                        <Cpu className="w-5 h-5 text-[#00AFFF]" />
                                        <span className="text-sm font-mono text-[#00AFFF] uppercase tracking-widest">{project.category}</span>
                                    </div>

                                     <h3 className="text-2xl sm:text-4xl font-bold text-white mb-6 group-hover:text-[#00AFFF] transition-colors duration-300">
                                        {project.title}
                                    </h3>

                                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <button className={`flex items-center gap-2 group/btn text-white font-bold text-lg hover:text-[#00AFFF] transition-colors ${index % 2 === 1 ? 'lg:ml-auto' : ''}`}>
                                        <span className="border-b border-transparent group-hover/btn:border-[#00AFFF] transition-all">View Case Study</span>
                                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
