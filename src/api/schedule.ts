import axios from "@src/api/axios";
import { normalizeScheduleList } from "@api/normalizeSchedule";

export const formatTimeObject = (time: {
  hour: number;
  minute: number;
  second: number;
}): string => {
  const hour = time.hour.toString().padStart(2, "0");
  const minute = time.minute.toString().padStart(2, "0");
  const second = time.second?.toString().padStart(2, "0") ?? "00";

  return `${hour}:${minute}:${second}`;
};

// 공통 타입 정의
export interface ScheduleItem {
  scheduleId: number;
  title: string;
  location: string;
  participants: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  tagId: number;
  iconId: number;
  color: string;
  createdAt: string;
  updatedAt: string;
  isExistTag: boolean;
  isRepeat: boolean;
}

// 응답 변환 유틸
const normalizeScheduleItem = (raw: any): ScheduleItem => ({
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

// 일정 조회 api
export const fetchSchedulesByMonth = async (year: number, month: number) => {
  try {
    const response = await axios.get("/api/schedules", {
      params: { year, month },
    });
    return response.data;
  } catch (error) {
    console.error("월간 일정 불러오기 실패:", error);
    throw error;
  }
};
export const fetchSchedulesByDay = async (year: number, month: number, day:number) => {
  try {
    const response = await axios.get("/api/schedules", {
      params: { year, month, day },
    });
    return response.data;
  } catch (error) {
    console.error("일간 일정 불러오기 실패:", error);
    throw error;
  }
};

export const fetchSchedulesByUserId = async () => {
  try {
    const response = await axios.get("/api/schedules");
    return response.data;
  } catch (error) {
    console.error("유저 일정 불러오기 실패:", error);
    throw error;
  }
};

// 일정 생성 api
export const createSchedule = async (
  data: Omit<ScheduleItem, "scheduleId" | "createdAt" | "updatedAt">
): Promise<ScheduleItem> => {
  const response = await axios.post("/api/schedules", data);
  return normalizeScheduleItem(response.data);
};

// 일정 삭제 api
export const deleteSchedule = async (scheduleId: number): Promise<void> => {
  try {
    await axios.delete(`/api/schedules/${scheduleId}`);
  } catch (error) {
    console.error("일정 삭제 실패:", error);
    throw error;
  }
};

// 일정 수정 api
export const updateSchedule = async (
  scheduleId: number,
  data: Omit<ScheduleItem, "scheduleId" | "createdAt" | "updatedAt">
): Promise<ScheduleItem> => {
  const response = await axios.patch(`/api/schedules/${scheduleId}`, data);
  return normalizeScheduleItem(response.data);
};

// 일정 검색 api
export const searchSchedules = async (
  keyword: string
): Promise<ScheduleItem[]> => {
  const response = await axios.get("/api/schedules/search", {
    params: { keyword },
  });
  return normalizeScheduleList(response.data);
};
