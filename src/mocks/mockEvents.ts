import { CalendarEvent } from "../types/event";

export const mockEvents: CalendarEvent[] = [
  {
    id: "event1",
    title: "웹프로그래밍 강의",
    description: "React 상태관리 강의",
    date: "2025-06-24",
    startTime: "09:00",
    endTime: "10:50",
    location: "창조관 471호",
    participants: [
      { name: "최준삼 교수님" }
    ],
    tags: [
      { id: "tag5", name: "수업" }
    ]
  },
    {
    id: "event2",
    title: "운영체제 강의",
    description: "CPU 스케줄링 강의",
    date: "2025-06-24",
    startTime: "15:00",
    endTime: "15:50",
    location: "창조관 141호",
    participants: [
      { name: "윤상균 교수님" }
    ],
    tags: [
      { id: "tag5", name: "수업" }
    ]
  },
  {
    id: "event3",
    title: "DOIT 2팀 FE 회의",
    description: "UI 피드백 정리 및 우선순위 결정",
    date: "2025-06-24",
    startTime: "18:30",
    endTime: "20:00",
    location: "도서관 세미나실401",
    participants: [
      { name: "이가림 외 2명" },
    ],
    tags: [
      { id: "tag2", name: "공부" },
    ]
  },
  {
    id: "event4",
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
      { id: "tag6", name: "친구" }
    ]
  },
  {
    id: "event5",
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
