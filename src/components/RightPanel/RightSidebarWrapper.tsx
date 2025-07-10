import React from "react";
import ScheduleSidebar from "./ScheduleSidebar";
import FlipLogoBar from "./FlipLogoBar";

interface Props {
  date: Date;
}

const RightSidebarWrapper = ({ date }: Props) => {
  return (
    <div
      className="flex h-screen fixed right-0 top-0 z-[999]"
      style={{ width: 526 }}
    >
      <ScheduleSidebar date={date} />
      <FlipLogoBar />
    </div>
  );
};

export default RightSidebarWrapper;
