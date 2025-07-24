import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlipCard from "@components/Flip/FlipCard";
import TodayCard from "@components/Flip/TodayCard";
import FlipCard3D from "@src/components/Animation/FlipCard3D";
import AddScheduleModal from "@components/Modal/addSchedule";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";

const INACTIVITY_TIMEOUT = 5 * 1000;

const getFormattedDate = () => {
  const today = new Date();
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return {
    day: String(today.getDate()).padStart(2, "0"),
    month: months[today.getMonth()],
    weekday: weekdays[today.getDay()],
    year: today.getFullYear().toString(),
  };
};

const formatDateInfo = (date: Date) => {
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: months[date.getMonth()],
    weekday: weekdays[date.getDay()],
    year: date.getFullYear().toString(),
  };
};

const Flip = () => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [flipped, setFlipped] = useState(false);
  const [prevDateInfo, setPrevDateInfo] = useState(formatDateInfo(currentDate));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // ✅ 모달 상태 추가

  const dateInfo = formatDateInfo(currentDate);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        navigate("/stanby");
      }, INACTIVITY_TIMEOUT);
    };

    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setFlipped(true);

      setTimeout(() => {
        setCurrentDate((prev) => {
          const newDate = new Date(prev);
          newDate.setDate(newDate.getDate() + (e.deltaY > 0 ? 1 : -1));
          return newDate;
        });
        setFlipped(false);
      }, 600);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center pt-[198px] pb-[198px] gap-[34px] relative">
        {/* 카드 영역 */}
        <div className="flex flex-col gap-[8px] relative">
          <div className="flex flex-row gap-[34px]">
            {/* 요일 */}
            <div className="flex flex-col gap-[8px] relative items-center justify-center">
              <FlipCard3D frontText={dateInfo.weekday} backText={prevDateInfo.weekday} flipped={flipped} />
              <FlipCard3D frontText={dateInfo.weekday} backText={prevDateInfo.weekday} flipped={flipped} />
              <span style={{ ...TYPOGRAPHY.point_text2, color: COLORS.gray1, position: "absolute" }}>
                {dateInfo.weekday}
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
                {dateInfo.year}
              </span>
            </div>

            {/* 월 */}
            <div className="flex flex-col gap-[8px] relative items-center justify-center">
              <FlipCard3D frontText={dateInfo.weekday} backText={prevDateInfo.weekday} flipped={flipped} />
              <FlipCard3D frontText={dateInfo.weekday} backText={prevDateInfo.weekday} flipped={flipped} />
              <span style={{ ...TYPOGRAPHY.point_text2, color: COLORS.gray1, position: "absolute" }}>
                {dateInfo.month}
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
              <FlipCard3D frontText={dateInfo.weekday} backText={prevDateInfo.weekday} flipped={flipped} />
              <FlipCard3D frontText={dateInfo.weekday} backText={prevDateInfo.weekday} flipped={flipped} />
              <span style={{ ...TYPOGRAPHY.point_text1, color: COLORS.gray1, position: "absolute" }}>
                {dateInfo.day}
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

        {/* 오늘 카드 + PlusIcon → 모달 열기 */}
        <TodayCard setIsAddModalOpen={setIsAddModalOpen} />
      </div>

      {/* 추가 일정 모달 */}
      {isAddModalOpen && (
        <AddScheduleModal
          isOpen
          onClose={() => setIsAddModalOpen(false)}
          onAdd={(newSchedule) => {
            console.log("추가된 일정:", newSchedule);
            setIsAddModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Flip;
