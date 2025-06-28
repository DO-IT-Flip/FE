import React, { useMemo, useState } from "react";
import locationIcon from "@icons/system/location.svg?url";
import groupIcon from "@icons/system/group.svg?url";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";
import { mockEvents } from "@mocks/mockEvents";
import { EventItem } from "@types/event";

const TodayCard = () => {
  const today = "2025-06-24";
  const [activeIndex, setActiveIndex] = useState(0);

  const todayEvents: EventItem[] = useMemo(() => {
    return mockEvents
      .filter((e) => e.date === today)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, []);
  const activeEvent = todayEvents[activeIndex];

  if (!activeEvent) return null;

  return (
    <div className="w-[1172px] px-[39px] py-[28px] bg-[#1D1D1D] rounded-[18px] flex flex-col items-center gap-[10px]">
      {/* TODAY 텍스트 */}
      <p style={{ ...TYPOGRAPHY.Body1, color: COLORS.gray6 }}>TODAY</p>

      {/* 위치 + 참여자 */}
      <div className="flex items-center gap-[12px]">
        <div className="flex items-center gap-[4px]">
          <img src={locationIcon} alt="location" className="w-[16px] h-[16px]" />
          <span style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray4 }}>
            {activeEvent.location}
          </span>
        </div>
        <div className="flex items-center gap-[4px]">
          <img src={groupIcon} alt="participant" className="w-[16px] h-[16px]" />
          <span style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray4 }}>
            {activeEvent.participants.map((p) => p.name).join(", ")}
          </span>
        </div>
      </div>

      {/* 제목 */}
      <div className="mt-[8px]">
        <span style={{ ...TYPOGRAPHY.Display, color: COLORS.bg }}>
          {activeEvent.title}
        </span>
      </div>

      {/* 시간 */}
      <div>
        <span style={{ ...TYPOGRAPHY.Display, color: COLORS.gray6 }}>
          {`${activeEvent.startTime} ~ ${activeEvent.endTime}`}
        </span>
      </div>

      {/* Dot 네비게이션 */}
      <div className="flex gap-[6px] mt-[12px]">
        {todayEvents.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="w-[8px] h-[8px] rounded-full"
            style={{
              backgroundColor: i === activeIndex ? COLORS.gray6 : COLORS.gray2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayCard;
