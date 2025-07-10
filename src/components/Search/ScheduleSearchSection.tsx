import React from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";
import SearchInput from "./SearchInput";
import AddBtn from "@components/Button/Addbtn";

interface ScheduleSearchSectionProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onAddClick?: () => void;
}

export default function ScheduleSearchSection({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onAddClick,
}: ScheduleSearchSectionProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-[14px]">
        {/* 월 + 일 */}
        <div
          style={{
            ...TYPOGRAPHY.Big_Headline,
            color: COLORS.gray1,
            margin: 0,
          }}
        >
          {format(currentDate, "MMM dd")}
        </div>

        {/* 년도 + 네비게이션 */}
        <div className="flex items-center gap-[140px]">
          <span style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray2 }}>
            {format(currentDate, "yyyy")}
          </span>

          <div className="flex items-center gap-[8px]">
            <button onClick={onPrevMonth}>
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

            <button onClick={onNextMonth}>
              <ChevronRight size={20} color={COLORS.gray2} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <SearchInput />
        <AddBtn text="일정 추가하기" onClick={onAddClick} />
      </div>
    </div>
  );
}
