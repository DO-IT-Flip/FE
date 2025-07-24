import { ScheduleItem } from "./schedule";

// 응답 필드명 통일 유틸
export const normalizeScheduleItem = (raw: any): ScheduleItem => ({
  scheduleId: raw.scheduleId,
  title: raw.title,
  location: raw.location,
  participants: raw.participants,
  startDate: raw.startDate,
  endDate: raw.endDate,
  startTime: raw.startTime,
  endTime: raw.endTime,
  tagId: raw.tagId,
  iconId: raw.iconId,
  color: raw.color,
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt,
  isExistTag: raw.existTag ?? raw.isExistTag ?? false,
  isRepeat: raw.repeat ?? raw.isRepeat ?? false,
});

// 일정 리스트 전체 변환
export const normalizeScheduleList = (rawList: any[]): ScheduleItem[] => {
  return rawList.map(normalizeScheduleItem);
};