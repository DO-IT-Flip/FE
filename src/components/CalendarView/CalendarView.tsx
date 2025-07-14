import React, { useEffect, useRef, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import SearchInput from "@components/Search/SearchInput";
import AddBtn from "@components/Button/Addbtn";
import AddScheduleModal from "@components/Modal/addSchedule";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

export default function CalendarView({ selectedDate, setSelectedDate }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handlePrevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const handleDateClick = (date: Date) => {
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      // 같은 날짜를 다시 클릭하면 사이드바 닫기
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  const handleAddSchedule = (schedule: {
    title: string;
    date: Date | null;
    startTime: string;
    endTime: string;
    tag?: string;
    color?: string;
    icon?: string;
  }) => {
    console.log("새 일정 추가:", schedule);
    // 여기에 실제 일정 추가 로직을 구현
  };

  // 날짜 셀 외 클릭 시 사이드바 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      const clicked = e.target as HTMLElement;

      const isCalendarCell = clicked.closest("[data-calendar-cell]");
      if (!isCalendarCell) {
        setSelectedDate(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSelectedDate]);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full px-[52px] pt-[52px] grid grid-rows-[auto_auto_1fr] relative"
    >
      {/* 상단: 월 네비게이션 */}
      <div className="mb-[52px] flex justify-between items-start">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        <div className="flex flex-col items-end gap-3">
          <SearchInput />
          <AddBtn text="일정 추가하기" onClick={() => setShowAddModal(true)} />
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="mb-[4px]">
        <div className="grid grid-cols-7 text-left">
          {days.map((day) => (
            <div key={day} className="px-[8px]">
              <span
                style={{
                  ...TYPOGRAPHY.Body2,
                  color: COLORS.gray5,
                  display: "inline-block",
                }}
              >
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 달력 본문 */}
      <div
        id="scroll-area"
        className="overflow-y-auto"
        style={{
          height: "calc(100vh - 260px)",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <CalendarBody currentDate={currentDate} onDateClick={handleDateClick} />
      </div>

      {/* 일정 추가 모달 */}
      <AddScheduleModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddSchedule}
      />
    </div>
  );
}
