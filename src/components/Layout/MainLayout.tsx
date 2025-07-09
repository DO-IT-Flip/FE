import React from "react";
import { ReactNode } from "react";
import SideBar from "@src/components/Layout/LeftSideBar";
import RightScrollBar from "@src/components/Layout/RightScrollbar";
import BottomSearchBar from "@components/Layout/BottomSearchBar";

interface MainLayoutProps {
  children: ReactNode;
  bgColor?: string;
}

export default function MainLayout({
  children,
  bgColor = "white",
}: MainLayoutProps) {
  return (
    <div className="flex w-full h-screen" style={{ backgroundColor: bgColor }}>
      <SideBar />
      <div className="grid grid-rows-[1fr_auto] flex-1 h-full min-h-0 pl-[114px] pr-[114px]">
        {/* === 페이지 본문 === */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
        {/* === 하단 검색 바 === */}
        <BottomSearchBar />
      </div>

      <RightScrollBar />
    </div>
  );
}
