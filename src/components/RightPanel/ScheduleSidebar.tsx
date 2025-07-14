import React, { useState, useMemo, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import AddScheduleModal from "@components/Modal/addSchedule";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";
import { TAG_COLOR } from "@styles/tag_color";
import { mockEvents } from "@mocks/mockEvents";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LocationIcon from "@components/Icons/LocationIcon";
import GroupIcon from "@components/Icons/GroupIcon";
import PlusIcon from "@assets/icons/system/plus.svg?url";
import DotIcon from "@assets/icons/system/dot_horizontal.svg?url";
import TimelineConnectorIcon from "@assets/icons/system/timeline_connector.svg?url";

interface Props {
  date: Date;
}

const formatTime = (time: string) => {
  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr);
  const isAM = hour < 12;
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const period = isAM ? "오전" : "오후";
  return `${period} ${formattedHour}:${minuteStr}`;
};

const ScheduleSidebar = ({ date }: Props) => {
  const [currentDate, setCurrentDate] = useState(dayjs(date));

  useEffect(() => {
    setCurrentDate(dayjs(date));
  }, [date]);

  const handlePrev = () => setCurrentDate((prev) => prev.subtract(1, "day"));
  const handleNext = () => setCurrentDate((prev) => prev.add(1, "day"));

  const formattedMonth = currentDate.format("MMMM").toUpperCase();
  const formattedDay = currentDate.format("DD");
  const dateKey = currentDate.format("YYYY-MM-DD");

  const todayEvents = useMemo(() => {
    return mockEvents
      .filter((event) => event.date === dateKey)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [dateKey]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div
      style={{
        width: "464px",
        height: "100vh",
        backgroundColor: "#FFFFFF",
        padding: "32px 28px",
        boxShadow: "0 0 16px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderTopLeftRadius: "18px",
        borderBottomLeftRadius: "18px",
      }}
    >
      {/* 날짜 + 네비게이션 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <span style={{ ...TYPOGRAPHY.point_text4, color: COLORS.gray2 }}>
          {formattedMonth} {formattedDay}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button onClick={handlePrev}>
            <ChevronLeft size={20} color={COLORS.gray2} />
          </button>
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "2px",
              backgroundColor: COLORS.gray2,
            }}
          />
          <button onClick={handleNext}>
            <ChevronRight size={20} color={COLORS.gray2} />
          </button>
        </div>
      </div>

      {/* 구분선 */}
      <div
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: COLORS.gray6,
          borderRadius: "2px",
          marginBottom: "48px",
        }}
      />

      {/* 일정 추가 아이콘 + 텍스트 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          marginBottom: "44px",
        }}
      >
        <img
          src={PlusIcon}
          alt="일정 추가하기"
          style={{ width: "64px", height: "64px", cursor: "pointer" }}
          onClick={() => setIsAddModalOpen(true)}
        />
        <span style={{ ...TYPOGRAPHY.Headline2, color: COLORS.gray5 }}>
          일정 추가하기
        </span>
      </div>

      {/* 일정 아이템 목록 */}
      <div
        id="scroll-area"
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE, Edge
        }}
      >
        {todayEvents.map((event, index) => {
          const tagColorCode = event.tagColor
            ? TAG_COLOR[event.tagColor]
            : COLORS.gray3;

          return (
            <div
              key={event.id}
              id={`section-${index}`}
              style={{ display: "flex", gap: "20px" }}
            >
              {/* 왼쪽: 아이콘 서클 + 연결선 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "6px",
                }}
              >
                <div
                  style={{
                    width: 78,
                    height: 78,
                    borderRadius: "50%",
                    backgroundColor: tagColorCode,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    opacity: 0.5,
                  }}
                >
                  {event.tagIcon && (
                    <img
                      src={event.tagIcon}
                      alt={event.category}
                      style={{ width: 32, height: 32, opacity: 1 }}
                    />
                  )}
                </div>
                {index < todayEvents.length - 1 && (
                  <img
                    src={TimelineConnectorIcon}
                    alt="일정 연결선"
                    style={{ height: 52, marginTop: 24 }}
                  />
                )}
              </div>

              {/* 오른쪽: 일정 정보 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray3 }}
                    >
                      {formatTime(event.startTime)} ~{" "}
                      {formatTime(event.endTime)}
                    </span>
                    <span
                      style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray3 }}
                    >
                      {event.category}
                    </span>
                  </div>
                  <img
                    src={DotIcon}
                    alt="옵션"
                    style={{ width: 18, height: 4 }}
                  />
                </div>

                <span style={{ ...TYPOGRAPHY.Headline2, color: COLORS.gray2 }}>
                  {event.title}
                </span>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <LocationIcon />
                    <span
                      style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray4 }}
                    >
                      {event.location}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <GroupIcon />
                    <span
                      style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray4 }}
                    >
                      {event.participants}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 최하단에 모달 렌더링 */}
      <AddScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(tagName) => {
          console.log("추가된 태그 이름:", tagName); // 추후 실제 데이터 저장 로직으로 변경 가능
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};

export default ScheduleSidebar;
