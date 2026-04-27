"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import FuturisticPlaceholder from "./FuturisticPlaceholder";

interface ServiceBlockProps {
    title: string;
    description: string;
    bullets: string[];
    image?: string;
    placeholderType: "social" | "web" | "creative" | "ads";
    reverse?: boolean;
    link?: string;
}

const TiltCard = ({ title, image, placeholderType }: { title: string, image?: string, placeholderType: "social" | "web" | "creative" | "ads" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);
    const sheenX = useTransform(mouseX, [-0.5, 0.5], ["-100%", "200%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(0,170,255,0.15)] hover:shadow-[0_0_150px_rgba(0,170,255,0.25)] transition-shadow duration-500 group"
        >
            {/* Holographic Sheen */}
            <motion.div
                style={{
                    left: sheenX,
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                }}
                className="absolute top-0 bottom-0 w-1/2 skew-x-12 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00AFFF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

            {image ? (
                <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={600}
                    unoptimized
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
            ) : (
                <div className="pointer-events-none">
                    <FuturisticPlaceholder title={title} type={placeholderType} />
                </div>
            )}
        </motion.div>
    );
};

const ServiceBlock = ({ title, description, bullets, image, placeholderType, reverse = false, link }: ServiceBlockProps) => {
    return (
        <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 lg:gap-24 py-12 lg:py-24`}>
            {/* Image Side - Holographic Tilt */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 relative perspective-1000"
            >
                <TiltCard title={title} image={image} placeholderType={placeholderType} />
            </motion.div>

            {/* Content Side */}
            <motion.div
                initial={{ opacity: 0, x: reverse ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
            >
                <div className="flex items-center gap-4 mb-6">
                    <span className="w-12 h-2px bg-[#00AFFF]"></span>
                    <span className="text-[#00AFFF] uppercase tracking-widest text-sm font-bold">Our Service</span>
                </div>

                <h3 className="text-[1.75rem] sm:text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {title}
                </h3>

                <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
                    {description}
                </p>

                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                    {bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                            <span className="text-[#00AFFF] mr-3 mt-1">●</span>
                            {bullet}
                        </li>
                    ))}
                </ul>

                <a
                    href={link || "#"}
                    target={link?.startsWith("http") ? "_blank" : undefined}
                    rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-block"
                >
                    <button className="group relative px-8 py-4 bg-transparent border border-[#00AFFF] text-white rounded-full overflow-hidden transition-all hover:bg-[#00AFFF] hover:shadow-[0_0_30px_rgba(0,170,255,0.5)]">
                        <span className="relative z-10 flex items-center font-semibold tracking-wide">
                            Learn More
                            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </button>
                </a>
            </motion.div>
        </div>
    );
};

export default function ServiceShowcase() {
    const services = [
        {
            title: "Social Media Management",
            description: "We architect your brand's digital presence with data-driven strategies that engage audiences and convert followers into loyal customers.",
            bullets: [
                "Instagram & Facebook growth strategies",
                "Content planning, creation & posting",
                "Community engagement & analytics reporting"
            ],
            image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274511/social-media_wrts0h.jpg",
            placeholderType: "social" as const,
            reverse: false,
            link: "https://www.instagram.com/thebotmate?igsh=Nmh5Y21iZDNrd2dm&utm_source=qr"
        },
        {
            title: "Website Development",
            description: "Building high-performance, futuristic websites that serve as 24/7 sales engines for your business, tailored to your unique brand identity.",
            bullets: [
                "Custom responsive design & development",
                "SEO-optimized structure & speed",
                "Seamless specialized integrations"
            ],
            image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274511/web-dev_chotsn.jpg",
            placeholderType: "web" as const,
            reverse: true
        },
        {
            title: "Creative Photos & Graphics",
            description: "Visual storytelling that captivates. Our premium design work elevates your brand perception and sets you apart from the competition.",
            bullets: [
                "High-end photo manipulation & retouching",
                "Brand identity & logo design",
                "Marketing collateral & ad creatives"
            ],
            image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274510/creative_j7tjww.jpg",
            placeholderType: "creative" as const,
            reverse: false
        },
        {
            title: "Ads & Promotions",
            description: "Hyper-targeted advertising campaigns that deliver measurable ROI. We optimize every dollar of your ad spend for maximum impact.",
            bullets: [
                "Facebook & Instagram Ad campaigns",
                "Google Search & Display ads",
                "A/B testing & performance optimization"
            ],
            image: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274510/ads-promo_jddqot.jpg",
            placeholderType: "ads" as const,
            reverse: true
        }
    ];

    return (
        <section className="relative z-10 bg-[#0B0F14] overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00AFFF] opacity-5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 py-16 lg:py-[120px]">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 lg:mb-24"
                >
                    <h2 className="text-sm font-bold tracking-[0.2em] text-[#00AFFF] uppercase mb-4">
                        Our Services
                    </h2>
                    <h3 className="text-[1.85rem] sm:text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight px-4 sm:px-0">
                        Boost Your Brand with Our <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AFFF] to-[#0066CC]">
                            Digital Marketing Expertise
                        </span>
                    </h3>
                </motion.div>

                {/* Services List */}
                <div className="flex flex-col gap-0">
                    {services.map((service, index) => (
                        <ServiceBlock key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
