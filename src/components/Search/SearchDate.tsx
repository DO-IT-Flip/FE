import React from "react";
import leftDisable from "@icons/system/left_disable.svg?url";
import rightEnable from "@icons/system/right_enable.svg?url";

const SetDateModalSkeleton: React.FC = () => {
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const days = [
    null,
    null,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    null,
    null,
    null,
  ];

  return (
    <div>
      <div className="w-[356px] bg-white rounded-xl px-6 py-7">
        <div className="flex items-center justify-between pb-3.5">
          <h3 className="font-semibold text-gray-700 text-xl">
            2025년 {months[6]}
          </h3>
          <div className="flex items-center justify-between w-[60px]">
            <button disabled className="p-2 rounded cursor-not-allowed">
              <img src={leftDisable} alt="이전 월" className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <img src={rightEnable} alt="다음 월" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((day) => (
            <div
              key={day}
              className="text-center text-gray-400 text-sm font-medium"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => (
            <button
              key={idx}
              disabled={!day}
              className={`h-10 w-10 rounded-3xl transition-colors
                ${
                  day
                    ? "bg-gray-100 text-gray-600 cursor-pointer"
                    : "bg-transparent text-transparent cursor-default"
                }
              `}
            >
              {day || ""}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetDateModalSkeleton;
