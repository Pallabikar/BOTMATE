"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FloatingRobot() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

            {/* 🌊 LIQUID GRADIENT BACKGROUND BLOB */}
            <motion.div
                className="absolute top-1/3 left-1/3 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-3xl opacity-20"
                animate={{
                    borderRadius: [
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                        "30% 60% 70% 40% / 50% 60% 30% 60%",
                        "50% 60% 30% 60% / 30% 40% 60% 70%",
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                    ],
                    x: [0, 40, -30, 0],
                    y: [0, -50, 30, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    background:
                        "linear-gradient(135deg, #00AFFF, #6A5ACD, #00FFA3)",
                }}
            />

            {/* 🤖 MAIN ROBOT */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 opacity-30 cursor-pointer z-20"
                
                /* FLOAT + LIQUID MOTION */
                animate={{
                    y: [0, -30, 10, 0],
                    x: [0, 20, -10, 0],
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.05, 0.98, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}

                /* INTERACTION */
                whileHover={{
                    scale: 1.2,
                    rotate: 0,
                }}
                whileTap={{ scale: 0.9 }}

                style={{
                    filter: "drop-shadow(0 0 25px rgba(0,175,255,0.6))",
                }}

                onClick={() => {
                    alert("SYSTEM ALERT: ORBITAL DRONE ONLINE");
                }}
            >
                {/* 🔥 ANIMATED GRADIENT AURA */}
                <motion.div
                    className="absolute inset-0 rounded-full blur-xl opacity-70"
                    animate={{
                        background: [
                            "radial-gradient(circle, #00AFFF, transparent 70%)",
                            "radial-gradient(circle, #6A5ACD, transparent 70%)",
                            "radial-gradient(circle, #00FFA3, transparent 70%)",
                            "radial-gradient(circle, #00AFFF, transparent 70%)",
                        ],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* IMAGE */}
                <Image
                    src="/botmate-icon.png"
                    alt="Floating Robot"
                    fill
                    className="object-contain relative z-10"
                />
            </motion.div>

            {/* 🧠 SECONDARY FLOATING ELEMENT */}
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-20 h-20 md:w-40 md:h-40 opacity-20 cursor-pointer z-10"

                animate={{
                    y: [0, 40, -20, 0],
                    x: [0, -30, 15, 0],
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}

                whileHover={{ scale: 1.4 }}
            >
                {/* GRADIENT GLOW */}
                <motion.div
                    className="absolute inset-0 rounded-full blur-lg opacity-60"
                    animate={{
                        background: [
                            "radial-gradient(circle, #00FFA3, transparent 70%)",
                            "radial-gradient(circle, #00AFFF, transparent 70%)",
                            "radial-gradient(circle, #6A5ACD, transparent 70%)",
                            "radial-gradient(circle, #00FFA3, transparent 70%)",
                        ],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                <Image
                    src="/botmate-icon.png"
                    alt="Floating Robot secondary"
                    fill
                    className="object-contain relative z-10"
                />
            </motion.div>
        </div>
    );
}