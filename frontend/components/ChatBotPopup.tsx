"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  time: string;
}

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const botReply = (input: string) => {
  const t = input.toLowerCase();
  if (t.includes("price")) return "We offer flexible pricing plans based on your business goals.";
  if (t.includes("service")) return "We provide AI automation, marketing, and premium web solutions.";
  if (t.includes("contact")) return "You can contact us via email or our contact page.";
  return "Tell me more about your requirement.";
};

export default function ChatBotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsOpen(true), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "BotMate AI connected. How can I help you?",
          sender: "bot",
          time: getTime(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: input,
      sender: "user" as const,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: botReply(input),
        sender: "bot" as const,
        time: getTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-4">

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            className="chat-container flex flex-col"
          >

            {/* HEADER */}
            <div className="chat-header">
              <div className="flex items-center gap-3">
                <img src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777281719/RoboDino_Telecaller_bhpv3t.png" className="w-10 h-10 object-contain" />
                <div>
                  <p className="text-white text-xs font-bold tracking-wider">
                    BOTMATE AI
                  </p>
                  <span className="text-green-400 text-[10px]">● Online</span>
                </div>
              </div>

              <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} className="text-white/60 hover:text-white" />
              </button>
            </div>

            {/* BODY */}
            <div ref={scrollRef} className="chat-body">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={m.sender === "bot" ? "bot-msg" : "user-msg"}
                >
                  {m.text}
                  <div className="msg-time">{m.time}</div>
                </div>
              ))}

              {typing && (
                <div className="bot-msg opacity-60">Typing...</div>
              )}
            </div>

            {/* INPUT */}
            <div className="chat-input">
              <div className="chat-input-box">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask BotMate..."
                />
                <button onClick={sendMessage} className="chat-send">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-toggle"
      >
        <img src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777281719/RoboDino_Telecaller_bhpv3t.png" className="w-12 h-12 object-contain" />
      </button>

      {/* STYLES */}
      <style jsx>{`
        .chat-container {
          width: 360px;
          max-width: calc(100vw - 32px);
          height: 520px;
          max-height: 70vh;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(10, 15, 25, 0.85);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(0, 229, 255, 0.25);
          box-shadow: 0 0 30px rgba(0, 229, 255, 0.1);
          position: relative;
        }

        .chat-container::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
          opacity: 0.2;
        }

        .chat-header {
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: rgba(0,0,0,0.2);
        }

        .chat-body {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,229,255,0.2) transparent;
        }

        .bot-msg {
          background: rgba(255,255,255,0.05);
          padding: 10px 14px;
          border-radius: 16px 16px 16px 4px;
          color: white;
          max-width: 85%;
          font-size: 13px;
        }

        .user-msg {
          background: #00e5ff;
          color: black;
          padding: 10px 14px;
          border-radius: 16px 16px 4px 16px;
          align-self: flex-end;
          font-weight: 600;
          font-size: 13px;
          box-shadow: 0 4px 12px rgba(0,229,255,0.2);
        }

        .msg-time {
          font-size: 9px;
          opacity: 0.4;
          margin-top: 4px;
        }

        .chat-input {
          padding: 12px 14px;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: rgba(0,0,0,0.1);
        }

        .chat-input-box {
          display: flex;
          gap: 10px;
          align-items: center;
          background: rgba(255,255,255,0.05);
          border-radius: 14px;
          padding: 8px 12px;
        }

        .chat-input-box input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          outline: none;
          font-size: 13px;
        }

        .chat-send {
          background: #00e5ff;
          border-radius: 10px;
          padding: 6px;
          color: black;
          transition: transform 0.2s;
        }
        
        .chat-send:active {
          transform: scale(0.9);
        }

        .chat-toggle {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #0b0f14;
          border: 1px solid rgba(0,229,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .chat-toggle:hover {
          transform: scale(1.1);
          border-color: #00e5ff;
        }

        @media (max-width: 480px) {
          .chat-container {
            width: calc(100vw - 32px);
            height: 380px;
            bottom: 80px;
            right: 16px;
          }
          .chat-toggle {
            width: 50px;
            height: 50px;
            bottom: 16px;
            right: 16px;
          }
          .chat-header {
            padding: 12px 14px;
          }
          .chat-body {
            padding: 12px;
            gap: 10px;
          }
          .bot-msg, .user-msg {
            font-size: 12px;
            padding: 8px 12px;
          }
        }
      `}</style>
    </div>
  );
}