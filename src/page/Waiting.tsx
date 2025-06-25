import React, { useState } from "react";
import Sidebar from "@src/components/Layout/LeftSideBar";
import MainFlipView from "@src/components/containers/MainFlipView";
import RightScrollbar from "@src/components/Layout/RightScrollbar";
import BottomSearchBarContainer from "@src/components/Layout/BottomSearchBar";
import DotIcon from "@assets/icons/system/dot.svg?url";
import LocationIcon from "@assets/icons/system/location.svg?url";
import ParticipantIcon from "@assets/icons/system/group.svg?url";

export default function WaitingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );

  const todayEvent = {
    location: "정의관",
    participant: "최성현 교수님",
    title: "인적자원관리 강의 듣기",
    time: "1:00 ~ 2:30 PM",
  };

  return (
    <div className="flex w-full h-screen bg-white relative">
      <Sidebar />
    </div>
  );
}
