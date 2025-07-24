import React, { useState, useMemo, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import AddScheduleModal from "@components/Modal/addSchedule";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";
import { TAG_COLOR } from "@styles/tag_color";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LocationIcon from "@components/Icons/LocationIcon";
import GroupIcon from "@components/Icons/GroupIcon";
import PlusIcon from "@assets/icons/system/plus.svg?url";
import DotIcon from "@assets/icons/system/dot_horizontal.svg?url";
import TimelineConnectorIcon from "@assets/icons/system/timeline_connector.svg?url";
import ScheduleActionModal from "@components/Modal/scheduleAction";
import {
  updateSchedule,
  deleteSchedule,
  fetchSchedulesByDay,
} from "@api/schedule";

import alcoholIcon from "../../assets/icons/tag/tagIcon5.svg?url";
import studyIcon from "../../assets/icons/tag/tagIcon8.svg?url";
import flipIcon from "../../assets/icons/tag/tagIcon1.svg?url";
import sportsIcon from "../../assets/icons/tag/tagIcon11.svg?url";
import coffeeIcon from "../../assets/icons/tag/tagIcon6.svg?url";
import documentIcon from "../../assets/icons/tag/tagIcon10.svg?url";
import friendsIcon from "../../assets/icons/tag/tagIcon7.svg?url";
import hairsalonIcon from "../../assets/icons/tag/tagIcon3.svg?url";
import hospitalIcon from "../../assets/icons/tag/tagIcon4.svg?url";
import mealIcon from "../../assets/icons/tag/tagIcon2.svg?url";
import schoolIcon from "../../assets/icons/tag/tagIcon12.svg?url";
import shoppingIcon from "../../assets/icons/tag/tagIcon9.svg?url";

interface Props {
  date: Date;
  tagIcon?: string;
}

const ScheduleSidebar = ({ date }: Props) => {
  const [currentDate, setCurrentDate] = useState(dayjs(date));
  const isToday = dayjs().isSame(dayjs(date), "day");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionPosition, setActionPosition] = useState<
    { x: number; y: number } | undefined
  >();
  const [todayEvents, setTodayEvents] = useState<any[]>([]);
  const formattedMonth = currentDate.format("M월");
  const formattedDay = currentDate.format("D일");

  const iconMap: { [key: string]: string } = {
    tagIcon1: flipIcon,
    tagIcon2: mealIcon,
    tagIcon3: hairsalonIcon,
    tagIcon4: hospitalIcon,
    tagIcon5: alcoholIcon,
    tagIcon6: coffeeIcon,
    tagIcon7: friendsIcon,
    tagIcon8: studyIcon,
    tagIcon9: shoppingIcon,
    tagIcon10: documentIcon,
    tagIcon11: sportsIcon,
    tagIcon12: schoolIcon,
  };

  const handlePrev = () => {
    const prevDate = currentDate.subtract(1, "day");
    setCurrentDate(prevDate);
  };

  const handleNext = () => {
    const nextDate = currentDate.add(1, "day");
    setCurrentDate(nextDate);
  };

  useEffect(() => {
    setCurrentDate(dayjs(date));

    const fetchEvents = async () => {
      try {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const data = await fetchSchedulesByDay(year, month, day);
        setTodayEvents(data);
      } catch (error) {
        console.error("일정 조회 실패:", error);
      }
    };

    fetchEvents();
  }, [date]);

  const sortedEvents = useMemo(() => {
    return [...todayEvents].sort((a, b) =>
      a.startTime.localeCompare(b.startTime)
    );
  }, [todayEvents]);

  const visibleEvents = sortedEvents.slice(0, 2);
  const hiddenCount = todayEvents.length - visibleEvents.length;

  const formatTimeRange = (start: string, end: string): string => {
    const to12Hour = (time: string) => {
      const [hourStr, minute] = time.split(":");
      const hour = parseInt(hourStr, 10);
      const suffix = hour < 12 || hour === 24 ? "AM" : "PM";
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      return { time: `${hour12}:${minute}`, suffix };
    };

    const startObj = to12Hour(start);
    const endObj = to12Hour(end);

    if (startObj.suffix === endObj.suffix) {
      return `${startObj.time} ~ ${endObj.time} ${endObj.suffix}`;
    } else {
      return `${startObj.time} ${startObj.suffix} ~ ${endObj.time} ${endObj.suffix}`;
    }
  };

  const formatTime = (iso: string) => {
    const [hourStr, minuteStr] = iso.slice(11, 16).split(":");
    const hour = parseInt(hourStr, 10);
    const isAM = hour < 12;
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const period = isAM ? "오전" : "오후";
    return `${period} ${formattedHour}:${minuteStr}`;
  };

  const getTagIconPath = (iconId: number) => {
    return `/icons/tag/tagIcon${iconId}.svg`;
  };

  return (
    <div
      data-sidebar
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
          const tagColorCode =
            isToday &&
            event.color &&
            TAG_COLOR[event.color as keyof typeof TAG_COLOR]
              ? TAG_COLOR[event.color as keyof typeof TAG_COLOR]
              : COLORS.gray4;

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
                  <img
                    src={iconMap[`tagIcon${event.iconId}`]}
                    alt={event.category}
                    style={{ width: 70, height: 70, opacity: 1 }}
                  />
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
                    style={{ width: 18, height: 4, cursor: "pointer" }}
                    onClick={(e) => {
                      console.log("Dot 아이콘 클릭됨");
                      const rect = (
                        e.target as HTMLElement
                      ).getBoundingClientRect();
                      setActionPosition({ x: rect.right, y: rect.top });
                      setSelectedEvent(event);
                      setActionModalOpen(true);
                    }}
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
      {/* 일정 추가/수정 모달 */}
      <AddScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditMode(false);
        }}
        isEditMode={isEditMode}
        defaultData={selectedEvent}
        onAdd={() => {
          setIsAddModalOpen(false);
        }}
        onEdit={(updatedData) => {
          updateSchedule(selectedEvent.id, updatedData).then(() => {
            console.log("일정 수정 완료");
            setIsAddModalOpen(false);
            setIsEditMode(false);
          });
        }}
      />

      <ScheduleActionModal
        isOpen={actionModalOpen}
        onClose={() => setActionModalOpen(false)}
        onEdit={() => {
          setIsAddModalOpen(true);
          setIsEditMode(true);
        }}
        onDeleted={() => {
          console.log("일정 삭제 완료");
          setActionModalOpen(false);
          // 필요하면 여기서 일정 refetch() 호출 가능
        }}
        position={actionPosition}
        scheduleId={selectedEvent?.id}
      />
    </div>
  );
};

export default ScheduleSidebar;
