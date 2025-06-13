export interface CalendarEvent {
  //일정 하나에 대한 정보
  id: string; //일정 구분을 위한 식별자
  title: string;
  description: string; //일정의 상세 설명
  start: string; // 날짜 문자열 e.g., "2025-01-02T10:00:00"
  end: string;
  allDay: boolean;
  category: string;
}
