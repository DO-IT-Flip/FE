import React from "react";

interface S_BtnProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export default function S_Btn({
  text,
  icon,
  onClick,
  className = "",
  style,
  textStyle,
}: S_BtnProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9999,
        padding: "8px 21px",
        gap: 4,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: textStyle?.fontSize || "12px",
        fontWeight: textStyle?.fontWeight || 500,
        color: textStyle?.color || "#000000",
        ...style,
      }}
      className={className}
    >
      {text}
      {icon}
    </button>
  );
}
