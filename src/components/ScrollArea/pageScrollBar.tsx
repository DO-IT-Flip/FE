import React from "react";
import { COLORS } from "@/assets/styles/gray_color/gray_colors";

interface PageScrollBarProps {
  page: number; // 현재 페이지
  totalPages: number; // 총 페이지 수 (고정값: 5)
  color?: string; // 👉 MoodBoard에서 선택된 색상 전달 (없으면 기본 색)
}

export default function PageScrollBar({ page, totalPages, color }: PageScrollBarProps) {
  const barHeight = 92; // 전체 스크롤 영역 높이 (디자인 기준)
  const barWidth = 30;
  const indicatorHeight = barHeight / totalPages; // 각 페이지 높이 계산
  const topOffset = indicatorHeight * page; // 현재 페이지 위치 계산

  return (
    <div
      style={{
        position: "absolute",
        right: 16, // 👉 오른쪽에서 16px padding
        top: 0,
        width: barWidth,
        height: barHeight,
        backgroundColor: COLORS.gray3,
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: indicatorHeight,
          backgroundColor: color ?? COLORS.gray2, // 👉 무드보드 선택 색상 또는 기본색
          borderRadius: 4,
          marginTop: topOffset,
          transition: "all 0.2s ease",
        }}
      />
    </div>
  );
}