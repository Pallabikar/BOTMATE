import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BOTMATE | Premium AI Agency",
  description: "AI-driven growth strategies for the future of business.",
};

import CustomCursor from "@/components/CustomCursor";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import ChatBotPopup from "@/components/ChatBotPopup";
import BackToTop from "@/components/BackToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CustomCursor />
        <Navbar />
        {children}
        <ChatBotPopup />
        <WhatsAppPopup />
        <BackToTop />
      </body>
    </html>
  );
}
