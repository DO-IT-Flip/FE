import { useState } from "react";
import Calendar from "react-calendar";
import { FiX } from "react-icons/fi";
import { COLORS } from "../../../../assets/styles/gray_color/gray_color";
import "react-calendar/dist/Calendar.css";

interface CalendarModalProps {
  onClose: () => void;
  onSelect: (date: Date) => void;
}

export default function CalendarModal({ onClose, onSelect }: CalendarModalProps) {
  const [value, setValue] = useState<Date>(new Date());
  const today = new Date();

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const handleChange = (date: Date) => {
    setValue(date);
    onSelect(date);
    onClose();
  };

  return (
    <div
      style={{
        width: "356px",
        height: "434px",
        backgroundColor: COLORS.bg,
        borderRadius: "12px",
        padding: "20px",
      }}
      className="fixed z-50"
    >
      {/* 상단 타이틀 */}
      <div className="flex justify-between items-center mb-4">
        <h2 style={{ fontSize: "16px", fontWeight: "600", color: COLORS.gray2 }}>
          날짜 선택
        </h2>
        <button onClick={onClose}>
          <FiX color={COLORS.gray4} size={18} />
        </button>
      </div>

      {/* 캘린더 */}
      <Calendar
        onChange={handleChange}
        value={value}
        locale="ko-KR"
        next2Label={null}
        prev2Label={null}
        calendarType="gregory"
        navigationLabel={({ date }) =>
          `${date.getFullYear()}년 ${date.getMonth() + 1}월`
        }
        formatShortWeekday={(locale, date) =>
          ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
        }
        tileContent={({ date }) =>
          isSameDate(date, today) ? (
            <div
              style={{
                backgroundColor: COLORS.gray5,
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000000",
                fontWeight: 500,
                margin: "0 auto",
              }}
            >
              {date.getDate()}
            </div>
          ) : null
        }
        tileClassName={({ date }) =>
          !isSameDate(date, today) ? "text-sm text-gray-800" : ""
        }
      />
    </div>
  );
}
