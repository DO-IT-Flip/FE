import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlipCard from "@components/Flip/FlipCard";
import TodayCard from "@components/Flip/TodayCard";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";

const INACTIVITY_TIMEOUT = 5 * 1000; // 5초 (테스트용)

const Flip = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        navigate("/stanby");
      }, INACTIVITY_TIMEOUT);
    };

    const events = ["mousemove", "keydown", "mousedown", "touchstart"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer(); // 최초 실행

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center pt-[198px] pb-[198px] gap-[34px] relative">
      {/* 카드들 렌더링 */}
      <div className="flex flex-col gap-[8px] relative">
        <div className="flex flex-row gap-[34px]">
          {/* 요일 */}
          <div className="flex flex-col gap-[8px] relative items-center justify-center">
            <FlipCard />
            <FlipCard />
            <span
              style={{
                ...TYPOGRAPHY.point_text2,
                color: COLORS.gray1,
                position: "absolute",
              }}
            >
              WED
            </span>
            <div className="absolute w-full bg-white z-10 h-[8px]" />
            <span
              style={{
                ...TYPOGRAPHY.point_text4,
                color: COLORS.gray4,
                position: "absolute",
                top: "calc(50% + 133px)",
              }}
            >
              2025
            </span>
          </div>

          {/* 월 */}
          <div className="flex flex-col gap-[8px] relative items-center justify-center">
            <FlipCard />
            <FlipCard />
            <span
              style={{
                ...TYPOGRAPHY.point_text2,
                color: COLORS.gray1,
                position: "absolute",
              }}
            >
              JAN
            </span>
            <div className="absolute w-full bg-white z-10 h-[8px]" />
            <span
              style={{
                ...TYPOGRAPHY.point_text4,
                color: COLORS.gray4,
                position: "absolute",
                top: "calc(50% + 133px)",
              }}
            >
              MONTH
            </span>
          </div>

          {/* 일 */}
          <div className="flex flex-col gap-[8px] relative items-center justify-center">
            <FlipCard />
            <FlipCard />
            <span
              style={{
                ...TYPOGRAPHY.point_text1,
                color: COLORS.gray1,
                position: "absolute",
              }}
            >
              02
            </span>
            <div className="absolute w-full bg-white z-10 h-[8px]" />
            <span
              style={{
                ...TYPOGRAPHY.point_text4,
                color: COLORS.gray4,
                position: "absolute",
                top: "calc(50% + 133px)",
              }}
            >
              DATE
            </span>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none w-[804px] h-[8px]" />
      </div>

      <TodayCard />
    </div>
  );
};

export default Flip;
