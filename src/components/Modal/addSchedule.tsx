import React, { useState } from "react";
import closeIcon from "../../assets/icons/system/close2.svg?url";
import dropDown from "../../assets/icons/system/dropdown.svg?url";
import groupIcon from "../../assets/icons/system/group.svg?url";
import locationIcon from "../../assets/icons/system/location.svg?url";
import { TYPOGRAPHY } from "@src/assets/styles/typography";
import { COLORS } from "@src/assets/styles/gray_color";

import SetDateModal from "../Modal/setDate";
import TimePickerModal from "./TimePickerModal";
import SetTagModal from "./setTag";
import SetColorModal from "./setColor";
import SetIconModal from "./setIcon";
import AddLocationModal from "./addLocation";
import AddParticipantModal from "./addParticipant";

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (schedule: {
    title: string;
    date: Date | null;
    startTime: string;
    endTime: string;
    tag?: string;
    color?: string;
    icon?: string;
  }) => void;
}

const AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerMode, setTimePickerMode] = useState<'start' | 'end'>('start');

  // 현재 날짜로 기본값 설정
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  // 시간을 기본값 설정
  const [selectedTime, setSelectedTime] = useState<{
    start: string;
    end: string;
  }>({
    start: "오후 12:00",
    end: "오후 01:00",
  });

  // 사용자가 실제로 선택했는지 추적하는 상태
  const [isDateUserSelected, setIsDateUserSelected] = useState(false);
  const [isTimeUserSelected, setIsTimeUserSelected] = useState(false);

  // 각 모달 열림 상태 추가
  const [showTagModal, setShowTagModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(false);

  // 선택된 값들 상태
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        date: selectedDate,
        startTime: selectedTime.start,
        endTime: selectedTime.end,
        tag: selectedTag,
        color: selectedColor,
        icon: selectedIcon,
      });
      // 상태 초기화
      setTitle("");
      setSelectedDate(new Date());
      setSelectedTime({
        start: "오후 12:00",
        end: "오후 01:00",
      });
      setIsDateUserSelected(false);
      setIsTimeUserSelected(false);
      setSelectedTag("");
      setSelectedColor("");
      setSelectedIcon("");
      setSelectedLocation("");
      setSelectedParticipants([]);
      onClose();
    }
  };

  // 날짜 형식을 "7월 09일 (수)" 형식으로 변환하는 함수
  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate().toString().padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];

    return `${month}월 ${day}일 (${weekday})`;
  };

  const handleTimePickerOpen = (mode: 'start' | 'end') => {
    setTimePickerMode(mode);
    setShowTimePicker(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
        onClick={onClose}
      >
        <div
          className="relative w-[529px] h-[565px] px-8 pt-6 pb-8 rounded-xl bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex justify-end">
              <button onClick={onClose} aria-label="닫기">
                <img src={closeIcon} alt="close" className="w-8 h-8" />
              </button>
            </div>

            <p
              style={{
                ...TYPOGRAPHY.Display,
                color: COLORS.gray2,
              }}
            >
              일정 추가
            </p>
            <p
              style={{
                ...TYPOGRAPHY.Body1,
                color: COLORS.gray4,
              }}
            >
              일정을 추가하기 위해 아래 내용을 작성해주세요.
            </p>
          </div>

          <div className="pt-6 pb-6">
            <div>
              <p style={{ ...TYPOGRAPHY.Body1, color: COLORS.gray5 }}>
                날짜 선택
              </p>
              <button
                className="flex flex-col items-start"
                onClick={() => setShowDatePicker(true)}
                style={{
                  ...TYPOGRAPHY.Headline1,
                  color: isDateUserSelected ? COLORS.gray2 : COLORS.gray5,
                }}
              >
                {selectedDate ? formatDate(selectedDate) : "—월 —일 (—)"}
              </button>
            </div>
            <div className="py-4">
              <p style={{ ...TYPOGRAPHY.Body1, color: COLORS.gray5 }}>
                시간 선택
              </p>
              <div className="flex items-start">
                <button 
                  onClick={() => handleTimePickerOpen('start')} 
                  className=""
                >
                  <p
                    style={{
                      ...TYPOGRAPHY.Subtitle,
                      color: isTimeUserSelected ? COLORS.gray2 : COLORS.gray5,
                    }}
                    className="text-left"
                  >
                    {selectedTime?.start || "—:—"}
                  </p>
                </button>
                <span
                  className="px-1"
                  style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray5 }}
                >
                  ~
                </span>
                <button 
                  onClick={() => handleTimePickerOpen('end')} 
                  className=""
                >
                  <p
                    style={{
                      ...TYPOGRAPHY.Subtitle,
                      color: isTimeUserSelected ? COLORS.gray2 : COLORS.gray5,
                    }}
                    className="text-left"
                  >
                    {selectedTime?.end || "—:—"}
                  </p>
                </button>
              </div>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="일정 제목"
              className="w-full border-b-2 outline-none py-2"
              style={{
                ...TYPOGRAPHY.Headline1,
                color: title.trim() ? COLORS.gray2 : COLORS.gray5,
                borderBottomColor: title.trim() ? COLORS.gray3 : COLORS.gray5,
              }}
            />
            <div className="flex items-center justify-between w-[190px] pt-3">
              {/* 태그 버튼 */}
              <button
                className="w-[55px] h-[28px] px-2.5 py-1 rounded-2xl flex items-center justify-between"
                style={{
                  ...TYPOGRAPHY.Body3,
                  backgroundColor: selectedTag ? COLORS.gray2 : COLORS.gray5,
                  color: COLORS.bg,
                }}
                onClick={() => setShowTagModal(true)}
              >
                태그
                <img src={dropDown} alt="dropdown" />
              </button>
              {/* 컬러 버튼 */}
              <button
                className="w-[55px] h-[28px] px-2.5 py-1 rounded-2xl flex items-center justify-between"
                style={{
                  ...TYPOGRAPHY.Body3,
                  backgroundColor: selectedColor ? COLORS.gray2 : COLORS.gray5,
                  color: COLORS.bg,
                }}
                onClick={() => setShowColorModal(true)}
              >
                컬러
                <img src={dropDown} alt="dropdown" />
              </button>
              {/* 아이콘 버튼 */}
              <button
                className="w-[66px] h-[28px] px-2.5 py-1 rounded-2xl flex items-center justify-between"
                style={{
                  ...TYPOGRAPHY.Body3,
                  backgroundColor: selectedIcon ? COLORS.gray2 : COLORS.gray5,
                  color: COLORS.bg,
                }}
                onClick={() => setShowIconModal(true)}
              >
                아이콘
                <img src={dropDown} alt="dropdown" />
              </button>
            </div>
            <button 
              className="flex items-center justify-center pt-6 pb-4"
              onClick={() => setShowLocationModal(true)}
            >
              <img src={locationIcon} alt="location" />
              <p
                className="pl-1"
                style={{
                  ...TYPOGRAPHY.Body3,
                  color: selectedLocation ? COLORS.gray2 : COLORS.gray5,
                }}
              >
                {selectedLocation || "위치"}
              </p>
            </button>
            <button 
              className="flex items-center justify-center"
              onClick={() => setShowParticipantModal(true)}
            >
              <img src={groupIcon} alt="group" />
              <p
                className="pl-1"
                style={{
                  ...TYPOGRAPHY.Body3,
                  color: selectedParticipants.length > 0 ? COLORS.gray2 : COLORS.gray5,
                }}
              >
                {selectedParticipants.length > 0 ? `참여자 ${selectedParticipants.length}명` : "참여자"}
              </p>
            </button>
          </div>
          <button
            onClick={handleAdd}
            disabled={!title.trim()}
            className="w-full py-3 rounded-full text-sm font-medium transition"
            style={{
              ...TYPOGRAPHY.Subtitle,
              backgroundColor: title.trim() ? COLORS.gray2 : COLORS.gray4,
              color: COLORS.bg,
              cursor: title.trim() ? "pointer" : "not-allowed",
            }}
          >
            일정 추가
          </button>
        </div>
      </div>

      {/* 모달들 */}
      {showDatePicker && (
        <SetDateModal
          isOpen={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onDateSelect={(date) => {
            setSelectedDate(date);
            setIsDateUserSelected(true);
            setShowDatePicker(false);
          }}
          selectedDate={selectedDate}
        />
      )}

      {showTimePicker && (
        <TimePickerModal
          isOpen={showTimePicker}
          onClose={() => setShowTimePicker(false)}
          onConfirm={({ hours, minutes, meridiem }) => {
            const formatted = `${
              meridiem === "AM" ? "오전" : "오후"
            } ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
            
            setSelectedTime((prev) => ({
              ...prev,
              [timePickerMode]: formatted,
            }));
            setIsTimeUserSelected(true);
            setShowTimePicker(false);
          }}
        />
      )}

      {showTagModal && (
        <SetTagModal
          isOpen={showTagModal}
          onClose={() => setShowTagModal(false)}
          onSelect={(tagId) => {
            setSelectedTag(tagId);
            setShowTagModal(false);
          }}
        />
      )}

      {showColorModal && (
        <SetColorModal
          isOpen={showColorModal}
          onClose={() => setShowColorModal(false)}
          onSelect={(color) => {
            setSelectedColor(color);
            setShowColorModal(false);
          }}
        />
      )}

      {showIconModal && (
        <SetIconModal
          isOpen={showIconModal}
          onClose={() => setShowIconModal(false)}
          onSelect={(iconId) => {
            setSelectedIcon(iconId);
            setShowIconModal(false);
          }}
        />
      )}

      {showLocationModal && (
        <AddLocationModal
          isOpen={showLocationModal}
          onClose={() => setShowLocationModal(false)}
          onAdd={(location) => {
            setSelectedLocation(location);
            setShowLocationModal(false);
          }}
        />
      )}

      {showParticipantModal && (
        <AddParticipantModal
          isOpen={showParticipantModal}
          onClose={() => setShowParticipantModal(false)}
          onAdd={(participant) => {
            setSelectedParticipants(prev => [...prev, participant]);
            setShowParticipantModal(false);
          }}
        />
      )}
    </>
  );
};

export default AddScheduleModal;