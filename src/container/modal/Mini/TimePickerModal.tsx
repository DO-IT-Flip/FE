import { useState } from "react";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";
import { COLORS } from "../../../../assets/styles/gray_color/gray_color";
import { TIME_LABELS, TIME_LIMITS } from "@/constants/time";

interface TimePickerModalProps {
  onClose: () => void;
  onSubmit: (time: { meridiem: "AM" | "PM"; hour: number; minute: number }) => void;
}

export default function TimePickerModal({ onClose, onSubmit }: TimePickerModalProps) {
  const [meridiem, setMeridiem] = useState<"AM" | "PM">(TIME_LABELS.meridiem as "AM" | "PM");
  const [hour, setHour] = useState<number | null>(null);
  const [minute, setMinute] = useState<number | null>(null);

  const isComplete = hour !== null && minute !== null;

  const getColor = (field: "meridiem" | "hour" | "minute") => {
    if (field === "meridiem") return isComplete ? GRAYS.done : GRAYS.unset;
    if (field === "hour") return hour !== null ? GRAYS.input : GRAYS.unset;
    if (field === "minute") return minute !== null ? GRAYS.input : GRAYS.unset;
  };

  const increase = (field: "hour" | "minute") => {
    const limit = TIME_LIMITS[field];
    const prev = field === "hour" ? hour : minute;
    const set = field === "hour" ? setHour : setMinute;
    set(prev === null ? limit.default : Math.min(prev + limit.step, limit.max));
  };

  const decrease = (field: "hour" | "minute") => {
    const limit = TIME_LIMITS[field];
    const prev = field === "hour" ? hour : minute;
    const set = field === "hour" ? setHour : setMinute;
    set(prev === null ? limit.min : Math.max(prev - limit.step, limit.min));
  };

  const handleSubmit = () => {
    if (!isComplete) return;
    onSubmit({
      meridiem,
      hour: hour ?? 0,
      minute: minute ?? 0,
    });
    onClose();
  };

  return (
    <div className="fixed z-50 bg-white rounded-xl shadow-md p-4 w-[293px] h-[496px] flex flex-col justify-between">
      {/* 상단 */}
      <div>
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold">시간선택</h2>
          <button onClick={onClose}>
            <FiX className="text-gray-400 hover:text-black" />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-[10px]">일정 시간을 선택해주세요.</p>
      </div>

      {/* 시간 선택 */}
      <div className="flex flex-col gap-6 items-center mt-4">
        {/* Meridiem */}
        <div className="flex items-center gap-3">
          <button onClick={() => setMeridiem("AM")}>
            <FiMinus />
          </button>
          <span style={{ color: getColor("meridiem") }} className="text-3xl font-bold">
            {meridiem}
          </span>
          <button
            className={`p-1 rounded-full transition ${
              isComplete ? "bg-[#333333] text-white" : "bg-gray-300 text-black"
            } hover:bg-gray-500`}
            onClick={() => setMeridiem(meridiem === "AM" ? "PM" : "AM")}
          >
            <FiPlus />
          </button>
        </div>

        {/* Hour */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <button onClick={() => decrease("hour")}>
              <FiMinus />
            </button>
            <span style={{ color: getColor("hour") }} className="text-4xl font-semibold">
              {hour !== null ? String(hour).padStart(2, "0") : "00"}
            </span>
            <button onClick={() => increase("hour")}>
              <FiPlus />
            </button>
          </div>
          <span className="text-xs text-gray-400">{TIME_LABELS.hourLabel}</span>
        </div>

        {/* Minute */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <button onClick={() => decrease("minute")}>
              <FiMinus />
            </button>
            <span style={{ color: getColor("minute") }} className="text-4xl font-semibold">
              {minute !== null ? String(minute).padStart(2, "0") : "00"}
            </span>
            <button onClick={() => increase("minute")}>
              <FiPlus />
            </button>
          </div>
          <span className="text-xs text-gray-400">{TIME_LABELS.minuteLabel}</span>
        </div>
      </div>

      {/* 제출 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={!isComplete}
        className={`w-full py-3 rounded-full mt-6 font-medium text-white transition ${
          isComplete ? "bg-[#333333] hover:bg-[#2a2a2a]" : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        일정 추가하기
      </button>
    </div>
  );
}