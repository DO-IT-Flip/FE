import React, { useEffect, useState } from "react";
import { COLORS } from "@styles/gray_color";
import { TYPOGRAPHY } from "@styles/typography";
import { TAG_COLOR } from "@styles/tag_color";
import { ScheduleItem } from "@api/schedule";
interface CalendarEvent {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  tagColor?: string;
}

interface Props {
  date: string; // YYYY-MM-DD
  isToday: boolean;
  allEvents: ScheduleItem[];
  onFetched?: (hasEvents: boolean) => void;
}

const DailyEventList: React.FC<Props> = ({
  date,
  isToday,
  allEvents,
  onFetched,
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const targetDate = new Date(date);

    const filtered = allEvents
      .filter((event) => {
        const eventDate = new Date(event.startDate);
        return (
          eventDate.getFullYear() === targetDate.getFullYear() &&
          eventDate.getMonth() === targetDate.getMonth() &&
          eventDate.getDate() === targetDate.getDate()
        );
      })
      .map((event) => {
        const toHHMM = (iso: string) => iso.slice(11, 16);

        return {
          id: event.scheduleId,
          title: event.title,
          startTime: toHHMM(event.startTime),
          endTime: toHHMM(event.endTime),
          tagColor: event.color,
        };
      });

    setEvents(filtered);
    onFetched?.(filtered.length > 0);
  }, [date, allEvents]);

  const sortedEvents = [...events].sort((a, b) =>
    a.startTime.localeCompare(b.startTime)
  );

  const visibleEvents = sortedEvents.slice(0, 2);
  const hiddenCount = events.length - visibleEvents.length;

  const formatTimeRange = (start: string, end: string): string => {
    const to12Hour = (time: string) => {
      const [hourStr, minute] = time.split(":");
      const hour = parseInt(hourStr, 10);
      const suffix = hour < 12 || hour === 24 ? "AM" : "PM";
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      return { time: `${hour12}:${minute}`, suffix };
    };

    const parseTime = (time: string): number => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    const startMinutes = parseTime(start);
    const endMinutes = parseTime(end);

    const startObj = to12Hour(start);
    const endObj = to12Hour(end);

    const sameSuffix = startObj.suffix === endObj.suffix;
    const isNextDay = endMinutes < startMinutes;

    if (sameSuffix && !isNextDay) {
      return `${startObj.time} ~ ${endObj.time} ${endObj.suffix}`;
    } else {
      return `${startObj.time} ${startObj.suffix} ~ ${endObj.time} ${endObj.suffix}`;
    }
  };

  return (
    <div style={{ color: COLORS.gray3 }}>
      <div className="flex flex-col gap-[8px]">
        {visibleEvents.map((event) => {
          const isAllDay =
            event.startTime === "00:00" && event.endTime === "24:00";

          const tagColorCode =
            isToday &&
            event.tagColor &&
            TAG_COLOR[event.tagColor as keyof typeof TAG_COLOR]
              ? TAG_COLOR[event.tagColor as keyof typeof TAG_COLOR]
              : COLORS.gray4;

          return (
            <div key={event.id} className="flex items-start gap-[8px]">
              <div
                style={{
                  width: 4,
                  height: 16,
                  borderRadius: 2,
                  backgroundColor: tagColorCode,
                  marginTop: 4,
                  flexShrink: 0,
                }}
              />
              <div className="flex flex-col">
                <div style={TYPOGRAPHY.Subtitle}>{event.title}</div>
                <div style={TYPOGRAPHY.Subtitle}>
                  {isAllDay
                    ? "하루종일"
                    : formatTimeRange(event.startTime, event.endTime)}
                </div>
              </div>
            </div>
          );
        })}

        {hiddenCount > 0 && (
          <div style={TYPOGRAPHY.Subtitle} className="pt-1 pl-[12px]">
            +{hiddenCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyEventList;
