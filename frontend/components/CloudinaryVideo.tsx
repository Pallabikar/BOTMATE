"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CloudinaryVideoProps {
  src: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  colors?: {
    base?: string;
    accent?: string;
    text?: string;
  };
  logo?: boolean;
}

export default function CloudinaryVideo({
  src,
  width = "100%",
  height = "auto",
  className,
  colors = { base: "#000000", accent: "#3b82f6", text: "#ffffff" },
  logo = false,
}: CloudinaryVideoProps) {
  return (
    <div className={cn("overflow-hidden rounded-2xl shadow-2xl", className)}>
      <CldVideoPlayer
        width={width}
        height={height}
        src={src}
        colors={colors}
        logo={logo}
        fontFace="Inter"
      />
    </div>
  );
}
