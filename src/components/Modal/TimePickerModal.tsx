import React, { useState, useEffect } from "react";
import closeIcon from "../../assets/icons/system/close2.svg?url";
import { TYPOGRAPHY } from "@src/assets/styles/typography";
import { COLORS } from "@src/assets/styles/gray_color";
import ModalWrapper from "./ModalWrapper ";

interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (time: {
    hours: number;
    minutes: number;
    meridiem: "AM" | "PM";
  }) => void;
  mode?: "start" | "end"; // 시작시간인지 종료시간인지 구분
  currentStartTime?: { hours: number; minutes: number; meridiem: "AM" | "PM" }; // 시작시간 정보 (종료시간 설정시 참고용)
  containerStyle: React.CSSProperties;
  isPopup?: boolean;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  mode = "start",
  currentStartTime,
  containerStyle,
  isPopup,
}) => {
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [meridiem, setMeridiem] = useState<"AM" | "PM">("AM");

  // 현재 시간 기반 기본값 설정
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const currentHour = now.getHours();

      if (mode === "start") {
        // 시작 시간: 현재 시간으로 설정 (분은 00분)
        const displayHour =
          currentHour === 0
            ? 12
            : currentHour > 12
            ? currentHour - 12
            : currentHour;
        const currentMeridiem = currentHour >= 12 ? "PM" : "AM";

        setHours(displayHour);
        setMinutes(0); // 00분으로 설정
        setMeridiem(currentMeridiem);
      } else if (mode === "end" && currentStartTime) {
        // 종료 시간: 시작 시간의 1시간 후로 설정
        let endHour = currentStartTime.hours + 1;
        let endMeridiem = currentStartTime.meridiem;

        // 12시간 형식 처리
        if (endHour > 12) {
          endHour = 1;
          endMeridiem = endMeridiem === "AM" ? "PM" : "AM";
        } else if (endHour === 12 && currentStartTime.hours === 11) {
          endMeridiem = endMeridiem === "AM" ? "PM" : "AM";
        }

        setHours(endHour);
        setMinutes(0); // 00분으로 설정
        setMeridiem(endMeridiem);
      } else if (mode === "end") {
        // 시작 시간 정보가 없는 경우 현재 시간의 1시간 후
        const nextHour = currentHour + 1;
        const displayHour =
          nextHour === 0
            ? 12
            : nextHour > 12
            ? nextHour - 12
            : nextHour === 24
            ? 12
            : nextHour;
        const nextMeridiem = nextHour >= 12 ? "PM" : "AM";

        setHours(displayHour);
        setMinutes(0); // 00분으로 설정
        setMeridiem(nextMeridiem);
      }
    }
  }, [isOpen, mode, currentStartTime]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm({ hours, minutes, meridiem });
    onClose();
  };

  const adjustHours = (increment: boolean) => {
    if (increment) {
      setHours((prev) => (prev === 12 ? 1 : prev + 1));
    } else {
      setHours((prev) => (prev === 1 ? 12 : prev - 1));
    }
  };

  const adjustMinutes = (increment: boolean) => {
    if (increment) {
      setMinutes((prev) => (prev === 59 ? 0 : prev + 1));
    } else {
      setMinutes((prev) => (prev === 0 ? 59 : prev - 1));
    }
  };

  const toggleMeridiem = () => {
    setMeridiem((prev) => (prev === "AM" ? "PM" : "AM"));
  };

  return (
    <div
      className={
        isPopup
          ? "absolute z-50"
          : "fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
      }
      onClick={isPopup ? undefined : onClose}
    >
      <ModalWrapper isOpen={isOpen} onClose={onClose}>
        <div
          className="relative w-full max-w-[293px] h-[496px] p-6 rounded-xl bg-white mx-4 sm:w-[293px] sm:mx-0"
          onClick={(e) => e.stopPropagation()}
          style={containerStyle}
        >
          {/* 헤더 */}
          <div>
            <div className="flex items-start justify-between">
              <h2
                style={{
                  ...TYPOGRAPHY.Headline1,
                  color: COLORS.gray2,
                }}
              >
                {mode === "start" ? "시작시간" : "종료시간"}
              </h2>
              <button onClick={onClose} aria-label="닫기">
                <img src={closeIcon} alt="close2" />
              </button>
            </div>
            <p
              style={{
                ...TYPOGRAPHY.Body2,
                color: COLORS.gray4,
              }}
              className="pt-0.5"
            >
              일정 시간을 선택해주세요.
            </p>
          </div>

          {/* 시간 선택 영역 */}
          <div className="flex flex-col items-center flex-1 justify-center space-y-3.5 py-6 px-4.5">
            {/* AM/PM 선택 */}
            <div className="flex flex-col items-center ">
              {/* AM과 버튼들 - justify-between으로 양 끝 배치 */}
              <div className="w-[209px] h-[62px] flex items-center justify-between">
                {" "}
                {/* justify-between 추가, 적당한 너비 설정 */}
                <button
                  onClick={toggleMeridiem}
                  className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors group"
                  style={{
                    backgroundColor: COLORS.gray6,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.gray2;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.gray6;
                  }}
                >
                  <span className="text-xl font-light text-gray-400 group-hover:text-white">
                    −
                  </span>
                </button>
                <div
                  style={{
                    ...TYPOGRAPHY.point_text3,
                    color: COLORS.gray2,
                    fontSize: "52px",
                  }}
                  className="text-center"
                >
                  {meridiem}
                </div>
                <button
                  onClick={toggleMeridiem}
                  className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors group"
                  style={{
                    backgroundColor: COLORS.gray6,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.gray2;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.gray6;
                  }}
                >
                  <span className="text-xl font-light text-gray-400 group-hover:text-white">
                    +
                  </span>
                </button>
              </div>

              {/* 라벨은 따로 아래쪽에 */}
              <div
                style={{
                  ...TYPOGRAPHY.Caption,
                  color: COLORS.gray5,
                }}
                className="pt-0.5"
              >
                Meridiem Indicators
              </div>
            </div>

            <div className="flex flex-col items-center ">
              <div className="w-[209px] h-[62px] flex items-center justify-between">
                <button
                  onClick={() => adjustHours(false)}
                  className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors group"
                  style={{
                    backgroundColor: COLORS.gray6,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.gray2;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.gray6;
                  }}
                >
                  <span className="text-xl font-light text-gray-400 group-hover:text-white">
                    −
                  </span>
                </button>

                <div
                  style={{
                    ...TYPOGRAPHY.point_text3,
                    color: COLORS.gray2,
                    fontSize: "52px",
                  }}
                  className="text-center"
                >
                  {hours.toString().padStart(2, "0")}
                </div>

                <button
                  onClick={() => adjustHours(true)}
                  className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors group"
                  style={{
                    backgroundColor: COLORS.gray6,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.gray2;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.gray6;
                  }}
                >
                  <span className="text-xl font-light text-gray-400 group-hover:text-white">
                    +
                  </span>
                </button>
              </div>

              {/* 라벨은 따로 아래쪽에 */}
              <div
                style={{
                  ...TYPOGRAPHY.Caption,
                  color: COLORS.gray5,
                }}
                className="pt-0.5"
              >
                Time
              </div>
            </div>

            <div className="flex flex-col items-center ">
              <div className="w-[209px] h-[62px] flex items-center justify-between">
                <button
                  onClick={() => adjustMinutes(false)}
                  className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors group"
                  style={{
                    backgroundColor: COLORS.gray6,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.gray2;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.gray6;
                  }}
                >
                  <span className="text-xl font-light text-gray-400 group-hover:text-white">
                    −
                  </span>
                </button>

                <div
                  style={{
                    ...TYPOGRAPHY.point_text3,
                    color: COLORS.gray2,
                    fontSize: "52px",
                  }}
                  className="text-center"
                >
                  {minutes.toString().padStart(2, "0")}
                </div>

                <button
                  onClick={() => adjustMinutes(true)}
                  className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors group"
                  style={{
                    backgroundColor: COLORS.gray6,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.gray2;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.gray6;
                  }}
                >
                  <span className="text-xl font-light text-gray-400 group-hover:text-white">
                    +
                  </span>
                </button>
              </div>

              {/* 라벨은 따로 아래쪽에 */}
              <div
                style={{
                  ...TYPOGRAPHY.Caption,
                  color: COLORS.gray5,
                }}
                className="pt-0.5"
              >
                Minutes
              </div>
            </div>
          </div>

          {/* 확인 버튼 */}
          <div>
            <button
              onClick={handleConfirm}
              className="w-[168px] px-10 py-3 rounded-full transition mx-auto block"
              style={{
                ...TYPOGRAPHY.Subtitle,
                backgroundColor: COLORS.gray5,
                color: COLORS.bg,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.gray2;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.gray5;
              }}
            >
              시간 설정하기
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default TimePickerModal;
