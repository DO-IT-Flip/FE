import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlipCard from "@components/Flip/FlipCard";
import PhraseCard from "@components/Flip/PhraseCard";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";
import SymbolLogo from "@logo/Symbol_logo.svg?url";
import FlipLogo from "@logo/Flip_logo.svg?url";
import LocationIcon from "@components/Icons/LocationIcon";
import GroupIcon from "@components/Icons/GroupIcon";
import { getRandomQuote } from "@api/quote";
import { fetchSchedulesByDay, ScheduleItem } from "@api/schedule";


const formatTimeRange = (
  start: string,
  end: string,
  mode: "eng" | "kor" = "eng"
): string => {
  const to12Hour = (time: string) => {
    const [hourStr, minute] = time.slice(0, 5).split(":");
    const hour = parseInt(hourStr, 10);
    const suffix =
      hour < 12 || hour === 24
        ? mode === "eng"
          ? "AM"
          : "오전"
        : mode === "eng"
        ? "PM"
        : "오후";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return { time: `${hour12}:${minute}`, suffix };
  };

  const parseTime = (time: string): number => {
    const [h, m] = time.slice(0, 5).split(":").map(Number);
    return h * 60 + m;
  };

  const startMinutes = parseTime(start);
  const endMinutes = parseTime(end);

  const startObj = to12Hour(start);
  const endObj = to12Hour(end);

  const sameSuffix = startObj.suffix === endObj.suffix;
  const isNextDay = endMinutes < startMinutes;

  // 한국어 모드일 땐 오전/오후 둘 다 출력
  if (mode === "kor") {
    return `${startObj.suffix} ${startObj.time} ~ ${endObj.suffix} ${endObj.time}`;
  }

  // 영어 모드일 땐 동일 suffix 시 뒤에만 출력
  if (sameSuffix && !isNextDay) {
    return `${startObj.time} ~ ${endObj.time} ${endObj.suffix}`;
  } else {
    return `${startObj.time} ${startObj.suffix} ~ ${endObj.time} ${endObj.suffix}`;
  }
};

interface Quote {
  krContent: string;
  enContent: string;
}

const StanBy = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [firstEvent, setFirstEvent] = useState<ScheduleItem | null>(null);
  const navigate = useNavigate();

  // 명언 API 호출
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const data = await getRandomQuote();
        setQuote(data);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
        setQuote({
          krContent: "명언을 불러오는 데 실패했습니다.",
          enContent: "Failed to load quote.",
        });
      }
    };

    fetchQuote();
  }, []);

  // 오늘 일정 API 호출
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const fetchFirstEvent = async () => {
      try {
        const events = await fetchSchedulesByDay(year, month, day);
        const sorted = [...events].sort((a, b) =>
          a.startTime.localeCompare(b.startTime)
        );
        setFirstEvent(sorted[0] || null);
      } catch (err) {
        console.error("오늘 일정 조회 실패:", err);
      }
    };

    fetchFirstEvent();
  }, []);

  // 사용자 반응 감지 → 플립 페이지 이동
  useEffect(() => {
    const handleWakeUp = () => {
      navigate("/flip");
    };

    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, handleWakeUp));

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleWakeUp)
      );
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center pt-[198px] pb-[198px] gap-[34px] relative">
      {/* FlipCard 상단+하단 */}
      <div className="flex flex-col gap-[8px] relative">
        <div className="flex flex-row gap-[34px]">
          {/* Symbol 로고 */}
          <div className="flex flex-col gap-[8px] relative items-center justify-center">
            <FlipCard bgColor={COLORS.gray1} />
            <FlipCard bgColor={COLORS.gray1} />
            <img
              src={SymbolLogo}
              alt="symbol logo"
              className="absolute"
              style={{ width: "154.37px", height: "198px" }}
            />
          </div>

          {/* Flip 로고 */}
          <div className="flex flex-col gap-[8px] relative items-center justify-center">
            <FlipCard bgColor={COLORS.gray1} />
            <FlipCard bgColor={COLORS.gray1} />
            <img
              src={FlipLogo}
              alt="flip logo"
              className="absolute"
              style={{ width: "260px", height: "150px" }}
            />
          </div>

          {/* Standby 텍스트 + 일정 카드 */}
          <div className="flex flex-col gap-[8px] relative items-center justify-center">
            <span
              style={{
                ...TYPOGRAPHY.Subtitle,
                color: COLORS.gray4,
                position: "absolute",
                top: "50px",
                width: "146.24px",
                height: "28px",
                textAlign: "center",
                zIndex: 20,
              }}
            >
              대기모드를 해제하려면
            </span>
            <span
              style={{
                ...TYPOGRAPHY.Display,
                color: COLORS.gray4,
                position: "absolute",
                top: "82px",
                width: "229.95px",
                height: "48px",
                textAlign: "center",
                zIndex: 20,
              }}
            >
              아무키나 누르세요
            </span>
            <FlipCard bgColor={COLORS.gray1} />
            <div className="relative">
              <FlipCard bgColor={COLORS.gray1} />
              {firstEvent && (
                <div className="absolute top-[41px] left-[57.5px] right-[57.5px] flex flex-col items-center gap-[4px] z-20">
                  <span style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray3 }}>
                    {formatTimeRange(
                      firstEvent.startTime.slice(11, 16),
                      firstEvent.endTime.slice(11, 16),
                      "kor"
                    )}
                  </span>
                  <span
                    style={{
                      ...TYPOGRAPHY.Headline2,
                      color: COLORS.gray6,
                      textAlign: "center",
                    }}
                  >
                    {firstEvent.title}
                  </span>
                  <div className="flex items-center gap-[12px]">
                    <div className="flex items-center gap-[4px]">
                      <LocationIcon />
                      <span
                        style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray4 }}
                      >
                        {firstEvent.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                      <GroupIcon />
                      <span
                        style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray4 }}
                      >
                        {Array.isArray(firstEvent.participants)
                          ? firstEvent.participants.map((p) => p.name).join(", ")
                          : firstEvent.participants || "참여자 없음"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 가로선 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none w-[804px] h-[8px]" />
      </div>

      {/* 명언 카드 */}
      <PhraseCard
        mainText={quote ? quote.krContent : "로딩 중..."}
        subText={quote ? quote.enContent : "Loading..."}
      />
    </div>
  );
};

export default StanBy;
