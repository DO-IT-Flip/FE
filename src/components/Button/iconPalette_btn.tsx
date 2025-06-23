import React from "react";
import clsx from "clsx";
import { COLORS as GRAY_COLORS } from "@assets/styles/gray_color/gray_color";

// 기본 아이콘 (예: 카메라) - 🛠 추후 다른 아이콘으로 교체 예정
import Camera from "@/components/Icon/tag/camera.svg";

interface IconButtonProps {
  icon?: React.ReactNode;           // 아이콘 (JSX)
  selected?: boolean;
  selectedColor?: string;           // 선택된 태그 색상 (배경색으로 사용)
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon = <Camera />,               // 🛠 기본 아이콘: 카메라 (변경 예정)
  selected = false,
  selectedColor,
  onClick,
}) => {
  const bgColor = selected ? selectedColor ?? GRAY_COLORS.gray1 : GRAY_COLORS.gray1;

  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center transition",
        "rounded-md",
        selected && "ring-2 ring-black"
      )}
      style={{
        backgroundColor: bgColor,
        padding: 8,
        border: "none",
        cursor: "pointer",
        width: 32,
        height: 32,
      }}
    >
      {icon}
    </button>
  );
};

export default IconButton;