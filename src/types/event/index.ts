export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string; // ISO 날짜 문자열 e.g., "2025-01-02T10:00:00"
  end: string; // ISO 날짜 문자열
  allDay?: boolean;
  category?: string; // 개인/업무/기타 등 분류
}
