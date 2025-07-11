import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "@src/components/Layout/LeftSideBar";
import RightScrollBar from "@src/components/Layout/RightScrollbar";
import BottomSearchBar from "@components/Layout/BottomSearchBar";

interface MainLayoutProps {
  bgColor?: string;
}

export default function MainLayout({ bgColor = "white" }: MainLayoutProps) {
  return (
    <div className="flex w-full h-screen" style={{ backgroundColor: bgColor }}>
      <RightScrollBar /> 
      <SideBar />
      <div className="grid grid-rows-[1fr_auto] flex-1 h-full min-h-0 pl-[114px] pr-[114px]">
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
        <BottomSearchBar />
      </div>
    </div>
  );
}

