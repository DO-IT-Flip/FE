// 오른쪽 사이드 바 생성 시 아이콘 서클 (78x78)

import React from "react";

interface xl_CAProps {
  selectedColor: string;          // 태그 컬러 피커에서 선택된 색상
  selectedIcon: React.ReactNode;  // 태그 아이콘 피커에서 선택된 아이콘
}

export default function xl_CA({ selectedColor, selectedIcon }: xl_CAProps) {
  return (
    <div
      className="w-xl_ca h-xl_ca rounded-full flex items-center justify-center"
      style={{ backgroundColor: selectedColor }}
    >
      {selectedIcon}
    </div>
  );
}