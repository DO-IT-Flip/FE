import { CalendarEvent } from "../calendar_event";

export interface CalendarDay {
  date: string; // "2025-01-02"
  events: CalendarEvent;
  isToday?: boolean;
  isCurrentMonth?: boolean;
}
