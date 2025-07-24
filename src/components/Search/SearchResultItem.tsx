import React, { useState } from "react";
import LocationIcon from "@icons/system/location_disable.svg";
import GroupIcon from "@icons/system/group_disable.svg";
import DotIcon from "@icons/system/dot_horizontal.svg?url";
import CircleAvatar from "@components/Avatar/CircleAvatar";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";
import { format, parseISO } from "date-fns";
import ScheduleActionModal from "@components/Modal/scheduleAction";
import AddScheduleModal from "@components/Modal/addSchedule";

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

interface SearchResultItemProps {
  date: string;
  category: string;
  title: string;
  time: string;
  location: string;
  with: string;
  iconId: number;
  tagId?: number;
  color? : string;
  keyword?: string;
  onDeleted?: () => void;
  scheduleId: number;
}

export default function SearchResultItem({
  date,
  category,
  title,
  time,
  location,
  with: withText,
  iconId,
  keyword = "",
  onDeleted,
  scheduleId,
  tagId,
  color,
}: SearchResultItemProps) {

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

  const [isActionOpen, setIsActionOpen] = React.useState(false);
  const [actionPosition, setActionPosition] = React.useState<{
    x: number;
    y: number;
  }>();

  const parsedDate = parseISO(date);
  const formattedDate = `${format(parsedDate, "MMM").toUpperCase()} ${format(
    parsedDate,
    "dd"
  )}`;

  const highlightedTitle = highlightKeyword(title, keyword);

  // 수정 모달
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);

  const formattedTime = time
    .split("~")
    .map((t) => formatTime(t.trim()))
    .join(" ~ ");

  return (
    <div className="mt-[21px]">
      {/* 콘텐츠 영역 */}
      <div className="flex justify-between">
        {/* 왼쪽: 아이콘 + 텍스트 */}
        <div className="flex">
          <div className="mr-4">
            <CircleAvatar
              size={92}
              selectedIcon={
                <img
                  src={iconMap[`tagIcon${iconId}`]}
                  alt="태그 아이콘"
                  className="w-40 h-40 block translate-y-[0px]"
                />
              }
            />
          </div>

          <div className="flex flex-col">
            {/* 날짜 + 카테고리 */}
            <div
              className="flex gap-x-2"
              style={{ ...TYPOGRAPHY.Headline2, color: COLORS.gray2 }}
            >
              <span>{formattedDate}</span>
              <span>{category}</span>
            </div>

            {/* 제목 */}
            <p className="mb-1" style={{ ...TYPOGRAPHY.Headline1 }}>
              {highlightedTitle}
            </p>

            {/* 시간 */}
            <span style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray5 }}>
              {formattedTime}
            </span>
          </div>
        </div>

        {/* 오른쪽: 버튼 + 위치/참여자 */}
        <div className="flex flex-col items-end justify-between shrink-0 text-right w-[300px]">
          {/* 점 버튼 */}
          <button
            type="button"
            aria-label="메뉴 열기"
            className="flex items-center justify-center w-8 h-8"
            onClick={(e) => {
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              setActionPosition({ x: rect.right, y: rect.top });
              setIsActionOpen(true);
            }}
          >
            <img
              src={DotIcon}
              alt="메뉴 아이콘"
              className="w-5 h-5 pointer-events-none"
            />
          </button>

          {/* 위치 + 참여자 */}
          <div className="flex items-center gap-[8px] whitespace-nowrap justify-end mt-auto">
            {/* 위치 */}
            <div className="flex items-center gap-[4px]">
              <LocationIcon
                width={20}
                height={20}
                fill={COLORS.gray5}
                className="shrink-0"
              />
              <span style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray5 }}>
                {location}
              </span>
            </div>

            {/* 구분점 */}
            <span style={{ color: COLORS.gray5 }}>·</span>

            {/* 참여자 */}
            <div className="flex items-center gap-[4px]">
              <GroupIcon
                width={20}
                height={20}
                fill={COLORS.gray5}
                className="shrink-0"
              />
              <span style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray5 }}>
                {withText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 회색 bar */}
      <div
        className="mt-[24px] px-[24px]"
        style={{
          height: "2px",
          backgroundColor: COLORS.gray6,
        }}
      />

      {/* ScheduleActionModal 연결 */}
      {isActionOpen && (
        <ScheduleActionModal
          isOpen={isActionOpen}
          onClose={() => setIsActionOpen(false)}
          onEdit={() => {
            setSelectedSchedule({
              title,
              date,
              startTime: time.split("~")[0].trim(),
              endTime: time.split("~")[1].trim(),
              tagId,
              color,
              iconId,
              location,
              participants: withText,
              scheduleId,
            });
            console.log("편집 클릭됨");
            setEditModalOpen(true);
            setIsActionOpen(false);
          }}
          onDeleted={() => {
            console.log("삭제 완료됨");
            setIsActionOpen(false);
            onDeleted?.();
          }}
          scheduleId={scheduleId}
          position={actionPosition}
        />
      )}
      {/* 일정 수정 모달 */}
      {editModalOpen && selectedSchedule && (
        <AddScheduleModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedSchedule(null);
          }}
          isEditMode={true}
          defaultData={selectedSchedule}
          onEdit={() => {
            setEditModalOpen(false);
            setSelectedSchedule(null);
            onDeleted?.(); // 리프레시용으로 재사용
          }}
        />
      )}
    </div>
  );
}

// 검색어 하이라이트
function highlightKeyword(text: string, keyword: string) {
  if (!keyword) {
    return <span style={{ color: COLORS.gray4 }}>{text}</span>;
  }

  const parts = text.split(new RegExp(`(${keyword})`, "gi"));
  return (
    <>
      {parts.map((part, i) => (
        <span
          key={i}
          style={{
            color:
              part.toLowerCase() === keyword.toLowerCase()
                ? COLORS.gray2
                : COLORS.gray4,
          }}
        >
          {part}
        </span>
      ))}
    </>
  );
}

// 시간 포맷
function formatTime(time: string): string {
  const cleanTime = time.length > 5 ? time.slice(11, 16) : time;
  const [h, m] = cleanTime.split(":").map(Number);
  const hour = h % 12 || 12;
  const meridiem = h < 12 ? "AM" : "PM";
  return `${meridiem} ${String(hour).padStart(2, "0")}:${String(m).padStart(
    2,
    "0"
  )}`;
}
