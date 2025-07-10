import React from "react";
import { COLORS } from "@styles/gray_color";
import { TYPOGRAPHY } from "@styles/typography";
import { CalendarEvent } from "@types/event"; 

interface Props {
  date: string;
  events: CalendarEvent[]; 
  colorOverride?: string;
}

const DailyEventList: React.FC<Props> = ({ date, events, colorOverride }) => {
  const visibleEvents = events.slice(0, 2);
  const hiddenCount = events.length - visibleEvents.length;

  const textColor = colorOverride || COLORS.gray3;

  return (
    <div style={{ color: textColor }}>
      <div className="pl-3 border-l" style={{ borderColor: textColor }}>
        {visibleEvents.map((event) => (
          <div key={event.id}>
            <div style={TYPOGRAPHY.Subtitle}>{event.title}</div>
            <div style={TYPOGRAPHY.Subtitle}>
              {event.startTime} ~ {event.endTime}
            </div>
          </div>
        ))}

        {hiddenCount > 0 && (
          <div style={TYPOGRAPHY.Subtitle} className="pt-1">+{hiddenCount}</div>
        )}
      </div>
    </div>
  );
};

export default DailyEventList;
