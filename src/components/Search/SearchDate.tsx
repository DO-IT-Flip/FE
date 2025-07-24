import React, { useMemo, useState } from "react";
import leftEnable from "@icons/system/left_enable.svg?url";
import leftDisable from "@icons/system/left_disable.svg?url";
import rightEnable from "@icons/system/right_enable.svg?url";
import rightDisable from "@icons/system/right_disable.svg?url";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";

interface Props {
  highlightedDates: Date[];
}

const SetDateModalSkeleton: React.FC<Props> = ({ highlightedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const startOfMonth = new Date(currentYear, currentMonth, 1);
  const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const startDay = startOfMonth.getDay();
  const totalDays = endOfMonth.getDate();

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const days: (number | null)[] = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (days.length % 7 !== 0) {
    days.push(null);
  }

  const isHighlighted = (day: number) => {
    return highlightedDates.some(
      (d) =>
        d.getFullYear() === currentYear &&
        d.getMonth() === currentMonth &&
        d.getDate() === day
    );
  };

  const availableMonths = useMemo(() => {
    const unique = new Set(
      highlightedDates.map((d) => `${d.getFullYear()}-${d.getMonth()}`)
    );
    return Array.from(unique)
      .map((key) => {
        const [y, m] = key.split("-").map(Number);
        return new Date(y, m);
      })
      .sort((a, b) => a.getTime() - b.getTime());
  }, [highlightedDates]);

  const currentIndex = availableMonths.findIndex(
    (d) =>
      d.getFullYear() === currentDate.getFullYear() &&
      d.getMonth() === currentDate.getMonth()
  );

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < availableMonths.length - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentDate(availableMonths[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentDate(availableMonths[currentIndex + 1]);
    }
  };

  return (
    <div>
      <div className="w-[400px] h-[4000] bg-white rounded-xl px-6 py-7">
        {/* 상단 년도 + 월 텍스트 + 인디케이터 */}
        <div className="flex items-center justify-between pb-3.5">
          <h3 style={{ ...TYPOGRAPHY.Headline2, color: COLORS.gray3 }}>
            {currentYear}년 {currentMonth + 1}월
          </h3>
          <div className="flex items-center justify-between w-[60px]">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`p-2 rounded ${
                canGoPrev ? "hover:bg-gray-100" : "cursor-not-allowed"
              }`}
            >
              <img
                src={canGoPrev ? leftEnable : leftDisable}
                alt="이전 월"
                className="w-4 h-4"
              />
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`p-2 rounded ${
                canGoNext ? "hover:bg-gray-100" : "cursor-not-allowed"
              }`}
            >
              <img
                src={canGoNext ? rightEnable : rightDisable}
                alt="다음 월"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>

        {/* 요일 */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((day) => (
            <div
              key={day}
              className="text-center"
              style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray4 }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            const showDot = day !== null && isHighlighted(day);
            return (
              <div
                key={idx}
                style={
                  day
                    ? {
                        width: 36,
                        height: 36,
                        borderRadius: "9999px",
                        backgroundColor: showDot ? COLORS.gray3 : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        ...TYPOGRAPHY.Subtitle,
                        color: showDot ? COLORS.bg : COLORS.gray4,
                      }
                    : undefined
                }
              >
                {day || ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetDateModalSkeleton;
