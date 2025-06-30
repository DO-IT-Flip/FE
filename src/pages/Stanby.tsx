import React, { useMemo } from "react";
import FlipCard from "@components/Flip/FlipCard";
import PhraseCard from "@components/Flip/PhraseCard";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";
import SymbolLogo from "@logo/Symbol_logo.svg?url";
import FlipLogo from "@logo/Flip_logo.svg?url";
import { mockEvents } from "@mocks/mockEvents";
import locationIcon from "@icons/system/location.svg?url";
import groupIcon from "@icons/system/group.svg?url";
import { formatTimeRange } from "@types/time";
import { getRandomPhrase } from "@types/title";

// 날짜 필터링
const today = "2025-06-24";
const todayEvents = mockEvents
  .filter((e) => e.date === today)
  .sort((a, b) => a.startTime.localeCompare(b.startTime));
const firstEvent = todayEvents[0];

const StanBy = () => {
  const phrase = useMemo(() => getRandomPhrase(), []);

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
              style={{
                width: "154.37px",
                height: "198px",
              }}
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
              style={{
                width: "260px",
                height: "150px",
              }}
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
                      firstEvent.startTime,
                      firstEvent.endTime,
                      "eng"
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
                      <img
                        src={locationIcon}
                        alt="location"
                        className="w-[16px] h-[16px]"
                      />
                      <span
                        style={{
                          ...TYPOGRAPHY.Subtitle,
                          color: COLORS.gray4,
                        }}
                      >
                        {firstEvent.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                      <img
                        src={groupIcon}
                        alt="group"
                        className="w-[16px] h-[16px]"
                      />
                      <span
                        style={{
                          ...TYPOGRAPHY.Subtitle,
                          color: COLORS.gray4,
                        }}
                      >
                        {firstEvent.participants.map((p) => p.name).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none w-[804px] h-[8px]" />
      </div>

      {/* PhraseCard에 랜덤 문구 전달 */}
      <PhraseCard mainText={phrase.ko} subText={phrase.en} />
    </div>
  );
};

export default StanBy;
