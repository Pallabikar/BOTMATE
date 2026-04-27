"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)", filter: "blur(20px)" }}
                animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", filter: "blur(0px)" }}
                exit={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)", filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "relative", zIndex: 1 }}
            >
                {children}

                {/* Optional: Cinematic scan line during transition */}
                <motion.div 
                    initial={{ top: "-100%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 0.8, ease: "linear" }}
                    style={{
                        position: "fixed",
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "linear-gradient(90deg, transparent, #00e5ff, transparent)",
                        boxShadow: "0 0 15px #00e5ff",
                        zIndex: 9999,
                        pointerEvents: "none"
                    }}
                />
            </motion.div>
        </AnimatePresence>
    );
}
