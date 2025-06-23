// 날짜, 왼쪽 사이드바 아이콘 서클 36x36

import React from "react";
import { COLORS } from "@assets/styles/gray_color/gray_color";

interface M_CAProps {
  onClick?: () => void;
}

export default function M_CA({ onClick }: M_CAProps) {
  return (
    <button
      onClick={onClick}
      className="w-m_ca h-m_ca rounded-full"
      style={{
        backgroundColor: COLORS.gray3,
        border: "none",
        cursor: "pointer",
      }}
    />
  );
}