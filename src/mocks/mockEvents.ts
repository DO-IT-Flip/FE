import { CalendarEvent } from "../types/event";

export const mockEvents: CalendarEvent[] = [
  {
    id: "event1",
    title: "웹프로그래밍 강의",
    description: "React 상태관리 수업 듣기",
    date: "2025-06-24",
    startTime: "09:00",
    endTime: "10:30",
    location: "창조관 471호",
    participants: [
      { name: "김빨강" }
    ],
    tags: [
      { id: "tag5", name: "수업" }
    ]
  },
  {
    id: "event2",
    title: "앱 개발팀 회의",
    description: "UI 피드백 정리 및 우선순위 결정",
    date: "2025-06-26",
    startTime: "16:30",
    endTime: "18:00",
    location: "도서관 4층 세미나실401",
    participants: [
      { name: "김초록" },
      { name: "박하늘" },
      { name: "정주황" }
    ],
    tags: [
      { id: "tag2", name: "공부" },
      { id: "tag6", name: "친구" }
    ]
  },
  {
    id: "event3",
    title: "카페에서 수다 타임",
    description: "노랑이랑 종강 기념 수다 ☕",
    date: "2025-06-30",
    startTime: "18:00",
    endTime: "19:30",
    location: "어웨이크비",
    participants: [
      { name: "김빨강" },
      { name: "황검정" }
    ],
    tags: [
      { id: "tag4", name: "카페" },
      { id: "tag6", name: "친구" }
    ]
  },
  {
    id: "event4",
    title: "운동하기",
    description: "헬스장 가서 등 운동",
    date: "2025-06-20",
    startTime: "19:30",
    endTime: "20:30",
    location: "스포츠센터",
    participants: [
      { name: "신연두" }
    ],
    tags: [
      { id: "tag2", name: "운동" }
    ]
  }
];
