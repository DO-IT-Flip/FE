import React from "react";
import FlipCard from "@components/Flip/FlipCard";
import TodayCard from "@components/Flip/TodayCard";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";

const Waiting = () => {
  return (
    <div className="flex flex-col items-center pt-[198px] pb-[170px] gap-[34px] relative">
      {/* FlipCard 상단+하단 */}
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

        {/* 흰색 바 오버레이 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none w-[804px] h-[8px]" />
      </div>

      {/* TodayCard */}
      <TodayCard />
    </div>
  );
};

export default Waiting;
