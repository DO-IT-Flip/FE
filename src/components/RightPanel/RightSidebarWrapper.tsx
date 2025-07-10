import React from "react";
import ScheduleSidebar from "./ScheduleSidebar";
import FlipLogoBar from "./FlipLogoBar";

interface Props {
  date: Date;
}

const RightSidebarWrapper = ({ date }: Props) => {
  return (
    <div
      className="flex h-screen absolute right-0 top-0 z-50"
      style={{ width: 526 }}
    >
      <ScheduleSidebar date={date} />
      <FlipLogoBar />
    </div>
  );
};

export default RightSidebarWrapper;
