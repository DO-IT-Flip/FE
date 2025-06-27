import React from "react";
import { ReactNode } from "react";
import SideBar from "@src/components/Layout/LeftSideBar";
import RightScrollbar from "@components/Layout/RightScrollbar";
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

      {/* 콘텐츠 + 하단바 */}
      <div className="flex flex-col w-full pl-[114px] pr-[114px] self-end relative">
        <div className="flex-1">{children}</div> {/* ✅ 페이지 본문 유지 */}
        <BottomSearchBar /> {/* ✅ 공통 하단바 */}
      </div>

      <RightScrollbar />
    </div>
  );
}
