// 일정추가하기 상단 플러스 서클 (52x52)

import React from "react";
import clsx from "clsx";
import { COLORS } from "@/assets/styles/gray_color/gray_colors";

interface l_CAProps {
  selectedColor?: string;   // 무드보드에서 선택한 색상
  onClick?: () => void;     // 클릭 핸들러
}

export default function l_CA({
  selectedColor,
  onClick,
}: l_CAProps) {
  const backgroundColor = selectedColor ?? COLORS.gray4;

  return (
    <button
      onClick={onClick}
      className={clsx("rounded-full w-l_ca h-l_ca transition-colors")}
      style={{
        backgroundColor,
      }}
    />
  );
}