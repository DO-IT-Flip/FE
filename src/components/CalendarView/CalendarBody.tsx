import React from "react";
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
import { mockEvents } from "@mocks/mockEvents";
import DailyEventList from "@components/CalendarView/DailyEventList";

interface Props {
  currentDate: Date;
  onDateClick?: (date: Date) => void;
}

const getEventsForDate = (date: Date) => {
  const yyyy = format(date, "yyyy");
  const mm = format(date, "MM");
  const dd = format(date, "dd");
  return mockEvents.filter((event) => event.date === `${yyyy}-${mm}-${dd}`);
};

export default function CalendarBody({ currentDate, onDateClick }: Props) {
  const today = new Date();

  const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start, end });

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

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
            const events = getEventsForDate(day);
            const hasEvents = events.length > 0;

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
                {/* 상단 회색 bar */}
                <div
                  style={{
                    width: "180px",
                    height: "2px",
                    backgroundColor: COLORS.gray5,
                    marginBottom: "4px",
                  }}
                />

                {/* 날짜 숫자 + TODAY 표시 */}
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

                {/* 일정 렌더링 */}
                <div style={{ marginTop: "8px" }}>
                  <DailyEventList
                    date={format(day, "dd")}
                    events={events}
                    isToday={isToday}
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