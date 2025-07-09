import React from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";

interface Props {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
}: Props) {
  return (
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
        {/* 년도 */}
        <span style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray2 }}>
          {format(currentDate, "yyyy")}
        </span>

        {/* ← ● → 네비게이션 */}
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
  );
}
