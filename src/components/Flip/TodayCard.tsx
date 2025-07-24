import React, { useMemo, useState, useEffect } from "react";
import LocationIcon from "@components/Icons/LocationIcon";
import GroupIcon from "@components/Icons/GroupIcon";
import PlusIcon from "@assets/icons/system/plus.svg?url";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";
import { fetchSchedulesByDay, ScheduleItem } from "@api/schedule";

const formatTimeRange = (
  start: string,
  end: string,
  mode: "eng" | "kor" = "eng"
): string => {
  const to12Hour = (time: string) => {
    const [hourStr, minute] = time.slice(0, 5).split(":");
    const hour = parseInt(hourStr, 10);
    const suffix =
      hour < 12 || hour === 24
        ? mode === "eng"
          ? "AM"
          : "오전"
        : mode === "eng"
        ? "PM"
        : "오후";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return { time: `${hour12}:${minute}`, suffix };
  };

  const parseTime = (time: string): number => {
    const [h, m] = time.slice(0, 5).split(":").map(Number);
    return h * 60 + m;
  };

  const startMinutes = parseTime(start);
  const endMinutes = parseTime(end);

  const startObj = to12Hour(start);
  const endObj = to12Hour(end);

  const sameSuffix = startObj.suffix === endObj.suffix;
  const isNextDay = endMinutes < startMinutes;

  if (sameSuffix && !isNextDay) {
    return `${startObj.time} ~ ${endObj.time} ${endObj.suffix}`;
  } else {
    return `${startObj.time} ${startObj.suffix} ~ ${endObj.time} ${endObj.suffix}`;
  }
};

const TodayCard = ({
  setIsAddModalOpen,
}: {
  setIsAddModalOpen?: (v: boolean) => void;
}) => {
  const today = useMemo(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const [todayEvents, setTodayEvents] = useState<ScheduleItem[]>([]);
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const fetchEvents = async () => {
      try {
        const data = await fetchSchedulesByDay(year, month, day);
        const sorted = [...data].sort((a, b) =>
          a.startTime.localeCompare(b.startTime)
        );
        setTodayEvents(sorted);
      } catch (err) {
        console.error("오늘 일정 조회 실패:", err);
      }
    };

    fetchEvents();
  }, []);

  const activeEvent = todayEvents[activeIndex];

  return (
    <div
      className="w-[1172px] h-[282px] rounded-[18px] flex justify-center items-center"
      style={{ backgroundColor: COLORS.gray1 }}
    >
      {todayEvents.length === 0 ? (
        // 일정이 없을 때
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <img
            src={PlusIcon}
            alt="일정 추가하기"
            style={{ width: "64px", height: "64px", cursor: "pointer" }}
            onClick={() => setIsAddModalOpen?.(true)}
          />
          <span style={{ ...TYPOGRAPHY.Headline2, color: COLORS.gray5 }}>
            일정 추가하기
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p style={{ ...TYPOGRAPHY.Body1, color: COLORS.gray6 }}>TODAY</p>

          <div className="flex items-center gap-[12px] mt-[8px]">
            <div className="flex items-center gap-[4px]">
              <LocationIcon />
              <span style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray4 }}>
                {activeEvent.location}
              </span>
            </div>
            <div className="flex items-center gap-[4px]">
              <GroupIcon />
              <span style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray4 }}>
                {activeEvent.participants || "참여자 없음"}
              </span>
            </div>
          </div>

          <div className="mt-[8px]">
            <span style={{ ...TYPOGRAPHY.Display, color: COLORS.bg }}>
              {activeEvent.title}
            </span>
          </div>

          <div>
            <span style={{ ...TYPOGRAPHY.Display, color: COLORS.gray6 }}>
              {formatTimeRange(
                activeEvent.startTime.slice(11, 16),
                activeEvent.endTime.slice(11, 16),
                "eng"
              )}
            </span>
          </div>

          {todayEvents.length > 1 && (
            <div className="flex gap-[6px] mt-[12px]">
              {todayEvents.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="w-[8px] h-[8px] rounded-full"
                  style={{
                    backgroundColor:
                      i === activeIndex ? COLORS.gray6 : COLORS.gray2,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodayCard;
