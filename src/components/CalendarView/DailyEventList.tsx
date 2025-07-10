import React from "react";
import { COLORS } from "@styles/gray_color";
import { TYPOGRAPHY } from "@styles/typography";
import { CalendarEvent } from "@types/event";
import { TAG_COLOR } from "@styles/tag_color";

interface Props {
  date: string;
  events: CalendarEvent[];
  isToday: boolean;
}

const DailyEventList: React.FC<Props> = ({ date, events, isToday }) => {
  const visibleEvents = events.slice(0, 2);
  const hiddenCount = events.length - visibleEvents.length;

  return (
    <div style={{ color: COLORS.gray3 }}>
      <div className="flex flex-col gap-[8px]">
        {visibleEvents.map((event) => {
          const isAllDay =
            event.startTime === "00:00" && event.endTime === "24:00";

          const tagColorCode =
            isToday && event.tagColor
              ? TAG_COLOR[event.tagColor]
              : COLORS.gray4;

          return (
            <div key={event.id} className="flex items-start gap-[8px]">
              {/* 색상 바 */}
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
              {/* 일정 정보 */}
              <div className="flex flex-col">
                <div style={TYPOGRAPHY.Subtitle}>{event.title}</div>
                <div style={TYPOGRAPHY.Subtitle}>
                  {isAllDay
                    ? "하루종일"
                    : `${event.startTime} ~ ${event.endTime}`}
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
