import React from "react";
import { COLORS } from "@styles/gray_color";

type FlipCardProps = {
  children?: React.ReactNode;
  bgColor?: string;
  className?: string;
};

const FlipCard = ({ children, bgColor = COLORS.gray6, className = "" }: FlipCardProps) => {
  return (
    <div
      className={`w-[368px] h-[180px] rounded-[18px] flex items-center justify-center ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
};

export default FlipCard;