"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, X } from "lucide-react";
import clsx from "clsx";

const plans = [
    {
        name: "Starter Plan",
        price: "₹9,999",
        description: "This is the basic package for small businesses.",
        features: [
            { text: "~10–20K Reach", included: true },
            { text: "10 Creative Posts", included: true },
            { text: "1 Shoot & Video", included: true },
            { text: "Images & Video Post (Client media)", included: true },
            { text: "Profile Management", included: true },
            { text: "Competitor Research", included: true },
            { text: "ORM (Online Reputation Management)", included: true },
            { text: "Target Audience Ads", included: false },
            { text: "GMB (Google My Business)", included: false },
            { text: "Monthly Report", included: true },
        ],
        featured: false,
    },
    {
        name: "Business Plan",
        price: "₹14,999",
        description: "This is the most recommended plan (mid-level).",
        features: [
            { text: "~30–40K Reach", included: true },
            { text: "15 Creative Posts", included: true },
            { text: "2 Shoots & Videos", included: true },
            { text: "Images & Video Post (Client media)", included: true },
            { text: "Profile Management", included: true },
            { text: "Competitor Research", included: true },
            { text: "ORM", included: true },
            { text: "Target Audience Ads", included: true },
            { text: "GMB Optimization", included: true },
            { text: "Monthly Report", included: true },
        ],
        featured: true,
    },
    {
        name: "Enterprise Plan",
        price: "₹19,999",
        description: "This is the premium plan.",
        features: [
            { text: "~50–100K Reach", included: true },
            { text: "20 Creative Posts", included: true },
            { text: "3 Shoots & Videos", included: true },
            { text: "Images & Video Post (Client media)", included: true },
            { text: "Profile Management", included: true },
            { text: "Competitor Research", included: true },
            { text: "ORM", included: true },
            { text: "Target Audience Ads", included: true },
            { text: "GMB Optimization", included: true },
            { text: "Monthly Report", included: true },
        ],
        featured: false,
    },
];

export default function InvestmentProtocols() {
    return (
        <section className="py-12 sm:py-16 lg:py-32 relative z-10 bg-[#0B0F14]" id="investment">
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-0 w-full h-[500px] bg-gradient-to-r from-[#00AFFF]/5 via-transparent to-[#00AFFF]/5 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 lg:mb-24"
                >
                    <h2 className="text-sm font-bold tracking-[0.2em] text-[#00AFFF] uppercase mb-4">
                        Pricing Structure
                    </h2>
                    <h3 className="text-[1.85rem] sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Local Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AFFF] to-[#0066CC]">Plans</span>
                    </h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Select your tier of engagement. Scalable solutions for every business size.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -15, rotateX: 2 }}
                            className={clsx(
                                "relative p-1 rounded-2xl transition-all duration-300 flex flex-col h-full",
                                plan.featured
                                    ? "bg-gradient-to-b from-[#00AFFF] to-[#0066CC] shadow-[0_0_50px_rgba(0,175,255,0.2)]"
                                    : "bg-gradient-to-b from-white/10 to-transparent hover:from-[#00AFFF]/30"
                            )}
                        >
                            <div className="bg-[#0f151a] rounded-xl p-6 sm:p-8 h-full flex flex-col relative overflow-hidden">
                                {plan.featured && (
                                    <div className="absolute top-0 right-0 p-4">
                                        <div className="flex items-center gap-2 text-[#00AFFF]">
                                            <ShieldCheck size={18} />
                                            <span className="text-xs font-bold tracking-wider">RECOMMENDED</span>
                                        </div>
                                    </div>
                                )}

                                <h3 className="text-lg font-mono text-[#00AFFF] mb-2 uppercase tracking-wide">{plan.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-500 text-sm ml-1">/month</span>
                                </div>

                                <p className="text-gray-400 text-sm mb-8 pb-8 border-b border-white/10">
                                    {plan.description}
                                </p>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className={clsx("flex items-start text-sm", feature.included ? "text-gray-300" : "text-gray-600 line-through decoration-gray-600/50")}>
                                            {feature.included ? (
                                                <Check className="w-5 h-5 text-[#00AFFF] mr-3 shrink-0" />
                                            ) : (
                                                <X className="w-5 h-5 text-gray-600 mr-3 shrink-0" />
                                            )}
                                            {feature.text}
                                        </li>
                                    ))}
                                </ul>

                                <button className={clsx(
                                    "w-full py-4 rounded-lg font-bold transition-all uppercase tracking-wider text-sm",
                                    plan.featured
                                        ? "bg-[#00AFFF] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                                        : "bg-white/5 text-white hover:bg-[#00AFFF] hover:text-black"
                                )}>
                                    Initialize
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
