import React, { useState } from "react";
import { COLORS } from "@src/assets/styles/gray_color";
import { TYPOGRAPHY } from "@styles/typography";
import ScheduleSearchSection from "../components/Search/ScheduleSearchSection";
import SearchResultItem from "../components/Search/SearchResultItem";
import SearchDate from "../components/Search/SearchDate";

export default function SearchPage() {
  // 날짜 상태 추가
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  return (
    <div className="ml-[154px] mr-[98px] mt-[54px]">
      <ScheduleSearchSection
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onAddClick={() => console.log("일정 추가")}
      />

      <div className="flex mt-12">
        <div
          className="
            flex flex-col flex-1 
            overflow-y-auto 
            pr-8 
            max-h-[calc(100vh-200px)]
            scrollbar-hide
          "
        >
          <div className="mb-6 flex flex-col">
            <a
              className=""
              style={{
                color: COLORS.gray5,
                ...TYPOGRAPHY.Headline2,
              }}
            >
              검색결과 6건
            </a>
            <a
              className="text-[32px] font-semibold text-gray-700"
              style={{
                color: COLORS.gray2,
                ...TYPOGRAPHY.Display,
              }}
            >
              인적
            </a>
          </div>

          <div
            className="
              flex flex-col flex-1
              overflow-y-auto
              pr-8 pb-[82px]
              max-h-[calc(100vh-242px)]
              scrollbar-hide
            "
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <SearchResultItem
                key={i}
                date="JAN"
                tag="수업"
                title="인적"
                time="AM 11:00 ~ PM 12:00"
                location="단계동"
                with="홍길동 외 2명"
              />
            ))}
          </div>
        </div>

        <div className="flex-none w-[350px] sticky top-[80px]">
          <SearchDate />
        </div>
      </div>
    </div>
  );
}
