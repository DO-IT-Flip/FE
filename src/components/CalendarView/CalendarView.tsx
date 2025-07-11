import React from "react";
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
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [showAddModal, setShowAddModal] = React.useState(false);

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
      // 새로운 날짜 선택
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
    // 여기에 실제 일정 추가 로직을 구현하세요
    // 예: API 호출, 상태 업데이트 등
  };

  return (
    <div className="w-full h-full px-[52px] pt-[52px] grid grid-rows-[auto_auto_1fr] relative">
      {/* 상단: 월 네비게이션 */}
      <div className="mb-[52px] flex justify-between items-start">
        {/* 왼쪽: 날짜 + 네비게이션 */}
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        {/* 오른쪽: 검색 + 버튼 */}
        <div className="flex flex-col items-end gap-3">
          <SearchInput />
          <AddBtn 
            text="일정 추가하기" 
            onClick={() => setShowAddModal(true)} 
          />
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
        id="calendar-scroll-container"
        className="overflow-y-auto"
        style={{
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

      {/* 사이드바는 App.tsx에서 조건부 렌더링됨 */}
    </div>
  );
}