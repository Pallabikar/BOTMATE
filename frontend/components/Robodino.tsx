"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Send } from "lucide-react";

export default function Robodino() {
    const [isOpen, setIsOpen] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);
    const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
        { role: 'bot', text: "Systems online. I am Robodino. How can I assist you today?" }
    ]);
    const [inputValue, setInputValue] = useState("");

    // Auto-show greeting
    useEffect(() => {
        const timer = setTimeout(() => setShowGreeting(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // User message
        const userMsg = inputValue;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInputValue("");

        // Simulated AI response
        setTimeout(() => {
            const responses = [
                "Scanning your request...",
                "Accessing neural database...",
                "I recommend checking our Packages section for optimal growth.",
                "My logic cores suggest engaging with our human operatives via the Contact page.",
                "Affirmative. System operating at 100% efficiency."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            setMessages(prev => [...prev, { role: 'bot', text: randomResponse }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-[#0B0F14] border border-[#00AFFF]/30 w-80 h-96 rounded-2xl shadow-[0_0_30px_rgba(0,175,255,0.2)] flex flex-col overflow-hidden mb-4"
                    >
                        {/* Header */}
                        <div className="bg-[#00AFFF]/10 p-4 border-b border-[#00AFFF]/20 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="font-bold text-[#00AFFF]">ROBODINO AI</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-[#00AFFF]/20">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.role === 'user'
                                        ? 'bg-[#00AFFF] text-black font-medium rounded-tr-none'
                                        : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/20">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type a command..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 pr-10 text-sm text-white focus:border-[#00AFFF] outline-none"
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#00AFFF] hover:text-white transition-colors">
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Greeting Bubble (Only if chat is closed) */}
            <AnimatePresence>
                {showGreeting && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-white text-black p-3 rounded-xl rounded-br-none shadow-lg mb-4 mr-2 max-w-[200px] relative border border-[#00AFFF]"
                    >
                        <button
                            onClick={() => setShowGreeting(false)}
                            className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 hover:bg-red-500 hover:text-white transition-colors"
                        >
                            <X size={10} />
                        </button>
                        <p className="text-xs font-medium">
                            Status: Online. <br /> Click me for assistance! 🦖
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Robot Avatar Trigger */}
            <motion.div
                className="pointer-events-auto cursor-pointer relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowGreeting(false);
                }}
            >
                {/* Glow Ring */}
                <div className="absolute inset-0 bg-[#00AFFF] rounded-full blur-md opacity-20 group-hover:opacity-50 transition-opacity animate-pulse" />

                <div className="relative w-16 h-16 bg-[#0B0F14] rounded-full border-2 border-[#00AFFF] flex items-center justify-center overflow-hidden shadow-lg group-hover:border-white transition-colors">
                    <Image
                        src="/botmate-icon.png"
                        alt="Robodino"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                </div>

                {/* Online Indicator */}
                <span className="absolute bottom-0 right-1 w-4 h-4 bg-green-500 border-2 border-[#0B0F14] rounded-full shadow-[0_0_10px_#22c55e]"></span>
            </motion.div>
        </div>
    );
}
