'use client';

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface EliteCardProps {
  imageUrl: string;
  title: string;
  body: string;
  result: string;
  className?: string;
}

export function EliteCard({
  imageUrl,
  title,
  body,
  result,
  className,
}: EliteCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={cn(
        "relative w-full max-w-sm overflow-hidden rounded-2xl",
        "border border-white/[0.06] hover:border-gold/30",
        "transition-colors duration-300",
        className
      )}
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Image with parallax hover */}
      <motion.div
        className="relative h-48 w-full overflow-hidden"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.45 }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
        {/* Fade gradient from image to content */}
        <div
          className="absolute bottom-0 h-24 w-full"
          style={{
            background:
              "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.85) 40%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-5 pb-5 pt-1">
        {/* Gold decorative bar */}
        <div className="w-7 h-0.5 rounded bg-gold mb-3" />

        <h3 className="text-foreground text-base font-bold tracking-[-0.01em] mb-2">
          {title}
        </h3>

        <p className="text-muted-foreground text-[13px] md:text-[14px] leading-[1.7] mb-3">
          {body}
        </p>

        <p className="text-gold text-xs font-medium">{result}</p>
      </div>
    </motion.div>
  );
}
