import { CalendarEvent } from "../event";

export interface CalendarDay {
  //하루에 해당하는 정보
  date: string; // "2025-01-02"
  events: CalendarEvent;
  isToday: boolean;
  isCurrentMonth: boolean;
}
