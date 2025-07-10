import React, { useState, useEffect } from 'react';
import closeIcon from '../../assets/icons/system/close2.svg?url'
import leftEnable from '../../assets/icons/system/left_enable.svg?url'
import leftDisable from '../../assets/icons/system/left_disable.svg?url'
import rightEnable from '../../assets/icons/system/right_enable.svg?url'
import rightDisable from '../../assets/icons/system/right_disable.svg?url'
import { TYPOGRAPHY } from '@src/assets/styles/typography';
import { COLORS } from '@src/assets/styles/gray_color';

interface SetDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
}

const SetDateModal: React.FC<SetDateModalProps> = ({ isOpen, onClose, onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(selectedDate);

  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  // 모달이 열릴 때 현재 월을 선택된 날짜의 월로 설정
  useEffect(() => {
    if (isOpen) {
      const dateToShow = selectedDate || new Date();
      setCurrentMonth(new Date(dateToShow.getFullYear(), dateToShow.getMonth(), 1));
      setTempSelectedDate(selectedDate);
    }
  }, [isOpen, selectedDate]);

  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // 이전 달의 빈 칸들
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const handleDateClick = (day: number | null): void => {
    if (day && !isPastDate(day)) {
      const picked = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      onDateSelect(picked);
      onClose();
    }
  };

  const handlePrevMonth = () => {
    if (!isPrevButtonDisabled()) {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (day: number | null): boolean => {
    if (!day) return false;
    const today = new Date();
    return currentMonth.getFullYear() === today.getFullYear() && 
           currentMonth.getMonth() === today.getMonth() && 
           day === today.getDate();
  };

  const isSelected = (day: number | null): boolean => {
    if (!day || !tempSelectedDate) return false;
    return currentMonth.getFullYear() === tempSelectedDate.getFullYear() && 
           currentMonth.getMonth() === tempSelectedDate.getMonth() && 
           day === tempSelectedDate.getDate();
  };

  const isPastDate = (day: number | null): boolean => {
    if (!day) return false;
    const today = new Date();
    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return dateToCheck < todayStart;
  };

  const isPrevButtonDisabled = (): boolean => {
    const today = new Date();
    return currentMonth.getFullYear() === today.getFullYear() && 
           currentMonth.getMonth() === today.getMonth();
  };

  const days = getDaysInMonth(currentMonth);

  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
      onClick={handleBackdropClick}
    >
      <div className="w-[356px] bg-white rounded-xl px-6 py-7">
        <div className="flex items-center justify-between pb-3.5">
          <h3
            className="font-semibold"
            style={{
              ...TYPOGRAPHY.Headline1,
              color: COLORS.gray2
            }}
          >
            {currentMonth.getFullYear()}년 {months[currentMonth.getMonth()]}
          </h3>
          <div className="flex items-center justify-between w-[60px]">
            <button
              onClick={handlePrevMonth}
              className={`p-2 rounded ${isPrevButtonDisabled() ? 'cursor-not-allowed' : 'hover:bg-gray-100'}`}
              disabled={isPrevButtonDisabled()}
            >
              <img 
                src={isPrevButtonDisabled() ? leftDisable : leftEnable} 
                alt="이전 월" 
                className="w-4 h-4" 
              />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <img src={rightEnable} alt="다음 월" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((day) => (
            <div
              key={day}
              className="text-center"
              style={{
                ...TYPOGRAPHY.Body2,
                color: COLORS.gray4
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={!day || isPastDate(day)}
              className={"h-10 w-10 rounded-3xl transition-colors"}
              style={{
                ...TYPOGRAPHY.Subtitle,
                // day 가 있을 때만 색을 주고, 빈칸은 투명 처리
                backgroundColor: day
                  ? isSelected(day)
                    ? COLORS.gray2    // 선택된 날
                    : COLORS.bg       // 일반 날짜
                  : 'transparent',     // 빈 칸
                color: day
                  ? isSelected(day)
                    ? COLORS.bg       // 선택된 날의 글자색
                    : COLORS.gray4    // 일반 날짜의 글자색
                  : 'transparent',     // 빈 칸은 글자 안 보이게
                cursor: !day || isPastDate(day)
                  ? 'not-allowed'
                  : 'pointer',
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetDateModal;