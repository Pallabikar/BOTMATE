"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CloudinaryImageProps extends Omit<CldImageProps, "alt"> {
  alt: string;
  containerClassName?: string;
}

export default function CloudinaryImage({
  alt,
  src,
  width,
  height,
  className,
  containerClassName,
  ...props
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800",
        containerClassName,
        isLoading ? "animate-pulse" : ""
      )}
    >
      <CldImage
        {...props}
        src={src}
        width={width || 800}
        height={height || 600}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
          className
        )}
      />
    </div>
  );
}
