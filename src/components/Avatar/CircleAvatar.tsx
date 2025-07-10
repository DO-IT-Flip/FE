import React from "react";
import { COLORS } from "@styles/gray_color";

interface CircleAvatarProps {
  selectedColor?: string;
  selectedIcon: React.ReactNode;
  size?: number | string; // 사용할 때마다 사이즈 지정
}

export default function CircleAvatar({
  selectedColor,
  selectedIcon,
  size = 78, // 기본값: 78px
}: CircleAvatarProps) {
  const dimension = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      className="rounded-full flex items-center justify-center"
      style={{
        backgroundColor: selectedColor || COLORS.gray4,
        width: dimension,
        height: dimension,
      }}
    >
      {selectedIcon}
    </div>
  );
}
