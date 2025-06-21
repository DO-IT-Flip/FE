import React, { useRef, useEffect, useState } from "react";
import PageScrollBar from "./pageScrollBar";

interface ScrollAreaWrapperProps {
  children: React.ReactNode[];
  selectedColor?: string;       // 선택된 색상 전달용
}

export default function ScrollAreaWrapper({
  children,
  selectedColor,
}: ScrollAreaWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // 스크롤 위치에 따라 현재 페이지 계산
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const pageHeight = containerRef.current.clientHeight;
      const newPage = Math.round(scrollTop / pageHeight);
      setCurrentPage(newPage);
    }
  };

  // 페이지 개수
  const totalPages = children.length;

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* 스크롤 가능한 영역 */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
        }}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            style={{
              height: "100vh",
              scrollSnapAlign: "start",
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* 페이지 스크롤 바 */}
      <PageScrollBar
        currentPage={currentPage}
        totalPages={totalPages}
        selectedColor={selectedColor}
      />
    </div>
  );
}