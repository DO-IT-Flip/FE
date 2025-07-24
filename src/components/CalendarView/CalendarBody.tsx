import React, { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  format,
} from "date-fns";

import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";
import { fetchSchedulesByMonth } from "@api/schedule";
import { ScheduleItem } from "@api/schedule";
import DailyEventList from "@components/CalendarView/DailyEventList";

interface Props {
  currentDate: Date;
  onDateClick?: (date: Date) => void;
}

export default function CalendarBody({ currentDate, onDateClick }: Props) {
  const today = new Date();

  const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start, end });

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // 날짜별 일정 유무 상태 관리
  const [eventMap, setEventMap] = useState<Record<string, boolean>>({});
  const [monthlyEvents, setMonthlyEvents] = useState<ScheduleItem[]>([]);

  // 콜백: 일정 유무를 부모에게 전달
  const handleEventStatus = (date: string, hasEvents: boolean) => {
    setEventMap((prev) => ({ ...prev, [date]: hasEvents }));
  };

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    fetchSchedulesByMonth(year, month)
      .then((data) => {
        setMonthlyEvents(data);
      })
      .catch((err) => console.error("월간 일정 불러오기 실패", err));
  }, [currentDate]);

  return (
    <div className="flex flex-col gap-[48px]">
      {weeks.map((week, weekIdx) => (
        <section
          key={weekIdx}
          id={`section-${weekIdx}`}
          className="grid grid-cols-7 gap-x-0"
        >
          {week.map((day, idx) => {
            const isToday = isSameDay(day, today);
            const inMonth = isSameMonth(day, currentDate);

            const dateKey = format(day, "yyyy-MM-dd");
            const hasEvents = eventMap[dateKey] || false;

            const dateColor = isToday
              ? COLORS.gray2
              : hasEvents
              ? COLORS.gray4
              : COLORS.gray5;

            return (
              <div
                key={idx}
                data-calendar-cell
                onClick={() => onDateClick?.(day)}
                className={`h-[254px] px-[8px] py-[12px] cursor-pointer ${
                  inMonth ? "bg-white" : ""
                } ${isToday ? "bg-gray-100" : ""}`}
              >
                <div
                  style={{
                    width: "180px",
                    height: "2px",
                    backgroundColor: COLORS.gray5,
                    marginBottom: "4px",
                  }}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      ...TYPOGRAPHY.point_text3,
                      lineHeight: "1.2",
                      color: dateColor,
                    }}
                  >
                    {format(day, "dd")}
                  </div>
                  {isToday && (
                    <div
                      style={{
                        ...TYPOGRAPHY.Body1,
                        color: COLORS.gray3,
                        marginLeft: "6px",
                      }}
                    >
                      TODAY
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "8px" }}>
                  <DailyEventList
                    date={dateKey}
                    isToday={isToday}
                    allEvents={monthlyEvents}
                    onFetched={(hasEvents) =>
                      handleEventStatus(dateKey, hasEvents)
                    }
                  />
                </div>
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
