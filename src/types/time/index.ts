// 상수 선언
export const TIME_PERIOD = {
  AM: "오전",
  PM: "오후",
} as const;

export const TIME_PERIOD_EN = {
  AM: "AM",
  PM: "PM",
} as const;

export type TimePeriod = keyof typeof TIME_PERIOD; // AM / PM

// 0~12시 → AM, 13~24시 → PM
export function getTimePeriodByHour(hour: number): TimePeriod {
  return hour <= 12 ? "AM" : "PM";
}

// 시간 문자열 분해
export function parseTimeString(time: string): { hour: number; minute: number } {
  const [hourStr, minuteStr] = time.split(":");
  return {
    hour: parseInt(hourStr, 10),
    minute: parseInt(minuteStr, 10),
  };
}

// 24시간 -> 12시간 형식 변환
export function formatTime(hour: number, minute: number): string {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const mm = String(minute).padStart(2, "0");
  return `${h}:${mm}`;
}

type PeriodFormat = "kor" | "eng";

/**
 * @param periodFormat - "kor": 오전/오후, "eng": AM/PM
 */
// 시간 범위 포맷 함수
export function formatTimeRange(
  startTimeStr: string,
  endTimeStr: string,
  periodFormat: PeriodFormat = "kor"
): string {
  const { hour: startHour, minute: startMin } = parseTimeString(startTimeStr);
  const { hour: endHour, minute: endMin } = parseTimeString(endTimeStr);

  const startPeriod = getTimePeriodByHour(startHour);
  const endPeriod = getTimePeriodByHour(endHour);

  const startFormatted = formatTime(startHour, startMin);
  const endFormatted = formatTime(endHour, endMin);

  const LABELS = periodFormat === "eng" ? TIME_PERIOD_EN : TIME_PERIOD;

  if (startPeriod === endPeriod) {
    return `${startFormatted} ~ ${endFormatted} ${LABELS[endPeriod]}`;
  } else {
    return `${startFormatted} ${LABELS[startPeriod]} ~ ${endFormatted} ${LABELS[endPeriod]}`;
  }
}
