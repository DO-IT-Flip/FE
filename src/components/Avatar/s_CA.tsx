// 태그 안 서클, 업로드 서클(화살표 들어간) 32x32

import React from "react";
import clsx from "clsx";
import { COLORS } from "@/assets/styles/gray_color/gray_colors";

// props 정의
interface s_CAProps {
  selectedColor?: string;    // 무드보드에서 선택된 컬러
  onClick?: () => void;      // 클릭 핸들러
}

export default function s_CA({
  selectedColor,
  onClick,
}: s_CAProps) {
  const backgroundColor = selectedColor ?? COLORS.gray4;

  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-s_ca h-s_ca rounded-full transition-colors"
      )}
      style={{
        backgroundColor,
      }}
    />
  );
}