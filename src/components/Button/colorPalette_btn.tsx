import React from "react";

interface ColorPaletteButtonProps {
  color: string;                 // 버튼 배경색
  selected?: boolean;            // 선택 여부
  onClick?: () => void;          // 클릭 핸들러
  padding?: number;              // 버튼 내부 여백
}

export default function ColorPaletteButton({
  color,
  selected = false,
  onClick,
  padding = 8,
}: ColorPaletteButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding,
        backgroundColor: color,
        borderRadius: "50%",
        border: "none",
        outline: selected ? "1.5px solid #D8D8D8" : "none",
        cursor: "pointer",
        transition: "outline 0.2s ease",
        width: "auto",
        height: "auto",
      }}
    />
  );
}