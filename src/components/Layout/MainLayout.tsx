import React from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "@src/components/Layout/LeftSideBar";
import RightScrollBar from "@src/components/Layout/RightScrollbar";
import BottomSearchBar from "@src/components/Layout/BottomScheduleBar";

interface MainLayoutProps {
  bgColor?: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

export default function MainLayout({
  bgColor = "white",
  isLoggedIn,
  setIsLoggedIn,
}: MainLayoutProps) {
  return (
    <div className="flex w-full h-screen" style={{ backgroundColor: bgColor }}>
      <RightScrollBar containerId="scroll-area"/>
      <LeftSideBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="grid grid-rows-[1fr_auto] flex-1 h-full min-h-0 pl-[114px] pr-[114px]">
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
        <BottomSearchBar />
      </div>
    </div>
  );
}
