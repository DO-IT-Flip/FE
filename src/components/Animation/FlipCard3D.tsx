import React from "react";
import { motion } from "framer-motion";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";

interface FlipCardProps {
  frontText: string;
  backText: string;
  flipped: boolean;
  className?: string;
}

const FlipCard3D = ({
  frontText,
  backText,
  flipped,
  className = "",
}: FlipCardProps) => {
  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        animate={{ rotateX: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className={`relative w-[368px] h-[180px] rounded-[18px] ${className}`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Back (이전 날짜) */}
        <div
          className="absolute w-full h-full flex items-center justify-center rounded-[18px]"
          style={{
            backgroundColor: COLORS.gray6,
            backfaceVisibility: "hidden",
            transform: "rotateX(0deg)",
          }}
        >
        </div>

        {/* Front (현재 날짜) */}
        <div
          className="absolute w-full h-full flex items-center justify-center rounded-[18px]"
          style={{
            backgroundColor: COLORS.gray6,
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
        >
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard3D;
