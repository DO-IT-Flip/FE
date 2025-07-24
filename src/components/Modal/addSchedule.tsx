import React, { useEffect, useState, useRef } from "react";
import { createSchedule, updateSchedule } from "@api/schedule";
import closeIcon from "../../assets/icons/system/close2.svg?url";
import dropDown from "../../assets/icons/system/dropdown.svg?url";
import groupIcon from "../../assets/icons/system/group.svg?url";
import groupDisableIcon from "../../assets/icons/system/group_disable.svg?url";
import locationIcon from "../../assets/icons/system/location.svg?url";
import locationDisableIcon from "../../assets/icons/system/location_disable.svg?url";
// 아이콘 파일들 import
import alcoholIcon from "../../assets/icons/tag/alcohol.svg?url";
import studyIcon from "../../assets/icons/tag/study.svg?url";
import flipIcon from "../../assets/icons/tag/flip.svg?url";
import sportsIcon from "../../assets/icons/tag/sports.svg?url";
import coffeeIcon from "../../assets/icons/tag/coffee.svg?url";
import documentIcon from "../../assets/icons/tag/document.svg?url";
import friendsIcon from "../../assets/icons/tag/friends.svg?url";
import hairsalonIcon from "../../assets/icons/tag/hairsalon.svg?url";
import hospitalIcon from "../../assets/icons/tag/hospital.svg?url";
import mealIcon from "../../assets/icons/tag/meal.svg?url";
import schoolIcon from "../../assets/icons/tag/school.svg?url";
import shoppingIcon from "../../assets/icons/tag/shopping.svg?url";
import { TYPOGRAPHY } from "@src/assets/styles/typography";
import { COLORS } from "@src/assets/styles/gray_color";

import SetDateModal from "../Modal/setDate";
import TimePickerModal from "./TimePickerModal";
import SetTagModal from "./setTag";
import SetColorModal from "./setColor";
import SetIconModal from "./setIcon";
import AddLocationModal from "./addLocation";
import AddParticipantModal from "./addParticipant";
import { TAG_COLOR } from "@src/assets/styles/tag_color";
import ModalWrapper from "./ModalWrapper ";

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode?: boolean;
  defaultData?: any;
  onAdd?: (schedule: any) => void;
  onEdit?: (schedule: any) => void;
}

const AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  isOpen,
  onClose,
  isEditMode = false,
  defaultData,
  onAdd,
  onEdit,
}) => {
  // 아이콘 매핑 객체
  const iconMap: { [key: string]: string } = {
    tagIcon1: flipIcon,
    tagIcon2: mealIcon,
    tagIcon3: hairsalonIcon,
    tagIcon4: hospitalIcon,
    tagIcon5: alcoholIcon,
    tagIcon6: coffeeIcon,
    tagIcon7: friendsIcon,
    tagIcon8: studyIcon,
    tagIcon9: shoppingIcon,
    tagIcon10: documentIcon,
    tagIcon11: sportsIcon,
    tagIcon12: schoolIcon,
  };
  // 기본 시간을 동적으로 생성하는 함수
  const getDefaultTimes = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const nextHour = currentHour + 1;

    // 시작 시간
    const startMeridiem = currentHour >= 12 ? "오후" : "오전";
    const startDisplayHour =
      currentHour === 0
        ? 12
        : currentHour > 12
        ? currentHour - 12
        : currentHour;
    const startTime = `${startMeridiem} ${startDisplayHour
      .toString()
      .padStart(2, "0")}:00`;

    // 종료 시간 (1시간 후)
    const endMeridiem = nextHour >= 12 ? "오후" : "오전";
    const endDisplayHour =
      nextHour === 0
        ? 12
        : nextHour > 12
        ? nextHour - 12
        : nextHour === 24
        ? 12
        : nextHour;
    const endTime = `${endMeridiem} ${endDisplayHour
      .toString()
      .padStart(2, "0")}:00`;

    return { start: startTime, end: endTime };
  };

  const [title, setTitle] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerMode, setTimePickerMode] = useState<"start" | "end">(
    "start"
  );

  // 현재 날짜로 기본값 설정
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  // 시간을 동적 기본값으로 설정
  const [selectedTime, setSelectedTime] = useState<{
    start: string;
    end: string;
  }>(getDefaultTimes());

  // 사용자가 실제로 선택했는지 추적하는 상태
  const [isDateUserSelected, setIsDateUserSelected] = useState(false);
  const [isTimeUserSelected, setIsTimeUserSelected] = useState(false);

  // 각 모달 열림 상태 추가
  const [showTagModal, setShowTagModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(false);

  // 선택된 값들 상태 - Tag 타입으로 변경
  const [selectedTag, setSelectedTag] = useState<number>(0); // Tag 객체 전체 저장
  const [selectedColor, setSelectedColor] = useState<string>("gray");
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedParticipants, setSelectedParticipants] = useState<string>("");

  // 모달 위치 관리
  const tagButtonRef = useRef<HTMLButtonElement>(null);
  const [tagModalPosition, setTagModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const colorButtonRef = useRef<HTMLButtonElement>(null);
  const [colorModalPos, setColorModalPos] = useState({ top: 0, left: 0 });
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const [iconModalPos, setIconModalPos] = useState({ top: 0, left: 0 });
  const dateButtonRef = useRef<HTMLButtonElement>(null);
  const [dateModalPos, setDateModalPos] = useState({ top: 0, left: 0 });
  const startTimeRef = useRef<HTMLButtonElement>(null);
  const endTimeRef = useRef<HTMLButtonElement>(null);
  const [timeModalPos, setTimeModalPos] = useState({ top: 0, left: 0 });

  const handleOpenTagModal = () => {
    if (tagButtonRef.current) {
      const rect = tagButtonRef.current.getBoundingClientRect();
      setTagModalPosition({
        top: rect.bottom + 10,
        left: rect.left,
      });
    }
    setShowTagModal(true);
  };
  const openColorModal = () => {
    const rect = colorButtonRef.current?.getBoundingClientRect();
    if (rect) {
      setColorModalPos({ top: rect.bottom + 10, left: rect.left });
      setShowColorModal(true);
    }
  };
  const openIconModal = () => {
    const rect = iconButtonRef.current?.getBoundingClientRect();
    if (rect) {
      setIconModalPos({ top: rect.bottom + 10, left: rect.left });
      setShowIconModal(true);
    }
  };
  const openDateModal = () => {
    const rect = dateButtonRef.current?.getBoundingClientRect();
    if (rect) {
      setDateModalPos({ top: rect.bottom + 10, left: rect.left });
      setShowDatePicker(true);
    }
  };

  const handleTimePickerOpen = (mode: "start" | "end") => {
    setTimePickerMode(mode);

    const targetRef = mode === "start" ? startTimeRef : endTimeRef;
    const rect = targetRef.current?.getBoundingClientRect();

    if (rect) {
      setTimeModalPos({ top: rect.bottom + 10, left: rect.left });
    }

    setShowTimePicker(true);
  };

  //time을 객체로 변환
  const parseTimeStringToObject = (timeStr: string) => {
    const match = timeStr.match(/^(오전|오후)\s(\d{1,2}):(\d{2})$/);
    if (!match) {
      return { hour: 0, minute: 0, second: 0, nano: 0 };
    }

    const [, meridiem, hourStr, minuteStr] = match;
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (meridiem === "오후" && hour !== 12) hour += 12;
    if (meridiem === "오전" && hour === 12) hour = 0;

    return {
      hour,
      minute,
      second: 0,
    };
  };
  const parseTimeToString = (timeStr: string) => {
    const match = timeStr.match(/^(오전|오후)\s(\d{1,2}):(\d{2})$/);
    if (!match) {
      return "00:00:00";
    }

    const [, meridiem, hourStr, minuteStr] = match;
    let hour = hourStr;
    const minute = minuteStr;

    if (meridiem === "오후" && hour !== "12")
      hour = `${parseInt(hour, 10) + 12}`;

    return `${hour}:${minute}:00`;
  };

  useEffect(() => {
    if (isEditMode && defaultData) {
      setTitle(defaultData.title || "");
      setSelectedDate(new Date(defaultData.date));
      setSelectedTime({
        start: formatTime(defaultData.startTime),
        end: formatTime(defaultData.endTime),
      });
      setSelectedTag(defaultData.tagId ?? 0);
      setSelectedColor(defaultData.color || "gray");
      setSelectedIcon(`tagIcon${defaultData.iconId}` || "");
      setSelectedLocation(defaultData.location || "");
      setSelectedParticipants(defaultData.participants || "");
    }
  }, [isEditMode, defaultData]);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    const payload = {
      title: title.trim(),
      startDate:
        (selectedDate &&
          new Date(selectedDate.getTime() + 9 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0]) ||
        "",
      endDate:
        (selectedDate &&
          new Date(selectedDate.getTime() + 9 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0]) ||
        "",
      startTime: parseTimeToString(selectedTime.start),
      endTime: parseTimeToString(selectedTime.end),
      location: selectedLocation,
      participants: selectedParticipants,
      tagId: selectedTag,
      iconId: parseInt((selectedIcon ?? "").match(/\d+/)?.[0] ?? "0", 10),
      color: selectedColor,
      isExistTag: !!selectedTag,
      isRepeat: false,
    };

    try {
      if (isEditMode && defaultData?.scheduleId) {
        const updated = await updateSchedule(defaultData.scheduleId, payload);
        onEdit?.(updated);
      } else if (onAdd) {
        const created = await createSchedule(payload);
        onAdd(created);
      }
      onClose();
    } catch (error) {
      console.error(isEditMode ? "일정 수정 실패:" : "일정 생성 실패:", error);
      alert(
        isEditMode
          ? "일정 수정 중 오류가 발생했습니다."
          : "일정 생성 중 오류가 발생했습니다."
      );
    }
  };

  if (!isOpen) return null;

  const handleAdd = async () => {
    if (title.trim()) {
      try {
        await createSchedule({
          title: title.trim(),
          startDate: selectedDate?.toISOString().split("T")[0] ?? "",
          endDate: selectedDate?.toISOString().split("T")[0] ?? "",
          startTime: parseTimeToString(selectedTime.start),
          endTime: parseTimeToString(selectedTime.end),
          location: selectedLocation,
          participants: selectedParticipants, // ← string으로 변환
          tagId: selectedTag,
          iconId: Number(selectedIcon) ?? 0,
          color: selectedColor,
          isExistTag: selectedTag ? true : false,
          isRepeat: false,
        });

        // 상태 초기화 및 모달 닫기
        const defaultTimes = getDefaultTimes();
        setTitle("");
        setSelectedDate(new Date());
        setSelectedTime(defaultTimes);
        setIsDateUserSelected(false);
        setIsTimeUserSelected(false);
        setSelectedTag(0);
        setSelectedColor("gray");
        setSelectedIcon("");
        setSelectedLocation("");
        setSelectedParticipants("");
        onClose();
      } catch (error) {
        console.error("일정 생성 실패:", error);
        alert("일정 생성 중 오류가 발생했습니다.");
      }
    }
  };
  const handleClose = () => {
    onClose();
  };

  // 날짜 형식을 "7월 09일 (수)" 형식으로 변환하는 함수
  const formatDate = (date: Date | null): string => {
    if (!date) return "—월 —일 (—)";
    const month = date.getMonth() + 1;
    const day = date.getDate().toString().padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];

    return `${month}월 ${day}일 (${weekday})`;
  };

  // 시간을 파싱하는 유틸 함수
  const parseTimeString = (timeString: string) => {
    const match = timeString.match(/^(오전|오후)\s(\d{1,2}):(\d{2})$/);
    if (!match) return null;

    const [, meridiem, hours, minutes] = match;
    return {
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      meridiem: meridiem === "오전" ? ("AM" as const) : ("PM" as const),
    };
  };

  const formatTime = (iso: string) => {
    const [hourStr, minuteStr] = iso.slice(11, 16).split(":");
    const hour = parseInt(hourStr, 10);
    const isAM = hour < 12;
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const period = isAM ? "오전" : "오후";
    return `${period} ${formattedHour}:${minuteStr}`;
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
        onClick={onClose}
      >
        <ModalWrapper isOpen={isOpen} onClose={handleClose}>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[529px] h-[565px] px-8 pt-6 pb-8 rounded-xl bg-white"
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
                {isEditMode ? "일정 수정" : "일정 추가"}
              </p>
              <p
                style={{
                  ...TYPOGRAPHY.Body1,
                  color: COLORS.gray4,
                }}
              >
                {isEditMode ? "일정을 수정하기 위해 아래 내용을 작성해주세요." : "일정을 추가하기 위해 아래 내용을 작성해주세요."}
                
              </p>
            </div>

            <div className="pt-6 pb-6">
              <div>
                <p style={{ ...TYPOGRAPHY.Body1, color: COLORS.gray5 }}>
                  날짜 선택
                </p>
                <button
                  ref={dateButtonRef}
                  className="flex flex-col items-start"
                  onClick={openDateModal}
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
                    onClick={() => handleTimePickerOpen("start")}
                    ref={startTimeRef}
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
                    onClick={() => handleTimePickerOpen("end")}
                    ref={endTimeRef}
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
                  ref={tagButtonRef}
                  className="h-[28px] px-2.5 py-1 rounded-2xl flex items-center justify-between"
                  style={{
                    ...TYPOGRAPHY.Body3,
                    backgroundColor: selectedTag ? COLORS.gray2 : COLORS.gray5,
                    color: COLORS.bg,
                  }}
                  onClick={handleOpenTagModal}
                >
                  태그
                  <img src={dropDown} alt="dropdown" className="pl-1" />
                </button>
                {/* 컬러 버튼 */}
                <button
                  className="h-[28px] px-2.5 py-1 rounded-2xl flex items-center justify-between"
                  style={{
                    ...TYPOGRAPHY.Body3,
                    backgroundColor:
                      TAG_COLOR[selectedColor as keyof typeof TAG_COLOR] ||
                      COLORS.gray5,
                    color: COLORS.bg,
                  }}
                  ref={colorButtonRef}
                  onClick={openColorModal}
                >
                  컬러
                  <img src={dropDown} alt="dropdown" className="pl-1" />
                </button>
                {/* 아이콘 버튼 */}
                <button
                  className="h-[28px] min-w-[55px] px-2.5 py-1 rounded-2xl flex items-center justify-between"
                  style={{
                    ...TYPOGRAPHY.Body3,
                    backgroundColor:
                      (selectedIcon &&
                        TAG_COLOR[selectedColor as keyof typeof TAG_COLOR]) ||
                      COLORS.gray5,
                    color: COLORS.bg,
                  }}
                  ref={iconButtonRef}
                  onClick={openIconModal}
                >
                  {selectedIcon && iconMap[selectedIcon] ? (
                    <div className="flex items-center">
                      <img
                        src={iconMap[selectedIcon]}
                        alt="selected icon"
                        className="w-4 h-4"
                      />
                      <img src={dropDown} alt="dropdown" className="pl-1" />
                    </div>
                  ) : (
                    <>
                      아이콘
                      <img src={dropDown} alt="dropdown" className="pl-1" />
                    </>
                  )}
                </button>
              </div>
              <button
                className="flex items-center justify-center pt-6 pb-4"
                onClick={() => setShowLocationModal(true)}
              >
                <img
                  src={
                    selectedLocation.trim() ? locationIcon : locationDisableIcon
                  }
                  alt="location"
                />
                <p
                  className="pl-1"
                  style={{
                    ...TYPOGRAPHY.Body3,
                    // 위치가 실제로 추가되었을 때만 gray2, 그렇지 않으면 gray5
                    color: selectedLocation.trim()
                      ? COLORS.gray2
                      : COLORS.gray5,
                  }}
                >
                  {selectedLocation || "위치"}
                </p>
              </button>
              <button
                className="flex items-center justify-center"
                onClick={() => setShowParticipantModal(true)}
              >
                <img
                  src={
                    selectedParticipants.length > 0
                      ? groupIcon
                      : groupDisableIcon
                  }
                  alt="group"
                />
                <p
                  className="pl-1"
                  style={{
                    ...TYPOGRAPHY.Body3,
                    // 참여자가 실제로 추가되었을 때만 gray2, 그렇지 않으면 gray5
                    color:
                      selectedParticipants.length > 0
                        ? COLORS.gray2
                        : COLORS.gray5,
                  }}
                >
                  {selectedParticipants.trim() || "참여자"}
                </p>
              </button>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!title.trim()}
              className="w-full py-3 rounded-full text-sm font-medium transition"
              style={{
                ...TYPOGRAPHY.Subtitle,
                backgroundColor: title.trim() ? COLORS.gray2 : COLORS.gray4,
                color: COLORS.bg,
                cursor: title.trim() ? "pointer" : "not-allowed",
              }}
            >
              {isEditMode ? "일정 수정" : "일정 추가"}
            </button>
          </div>
        </ModalWrapper>
      </div>

      {/* 모달들 */}
      {showDatePicker && (
        <SetDateModal
          isOpen
          isPopup
          onClose={() => setShowDatePicker(false)}
          onDateSelect={(date) => {
            setSelectedDate(date);
            setIsDateUserSelected(true);
            setShowDatePicker(false);
          }}
          selectedDate={selectedDate}
          containerStyle={{
            position: "fixed",
            top: dateModalPos.top,
            left: dateModalPos.left,
            zIndex: 9999,
          }}
        />
      )}

      {showTimePicker && (
        <TimePickerModal
          isOpen={showTimePicker}
          isPopup
          onClose={() => setShowTimePicker(false)}
          mode={timePickerMode}
          currentStartTime={
            timePickerMode === "end"
              ? parseTimeString(selectedTime.start) || undefined
              : undefined
          }
          onConfirm={({ hours, minutes, meridiem }) => {
            const formatted = `${meridiem === "AM" ? "오전" : "오후"} ${hours
              .toString()
              .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

            setSelectedTime((prev) => ({
              ...prev,
              [timePickerMode]: formatted,
            }));
            setIsTimeUserSelected(true);
            setShowTimePicker(false);
          }}
          containerStyle={{
            position: "fixed",
            top: timeModalPos.top,
            left: timeModalPos.left,
            zIndex: 9999,
          }}
        />
      )}

      {showTagModal && (
        <SetTagModal
          isOpen={true}
          onClose={() => setShowTagModal(false)}
          onSelect={(tag) => {
            setSelectedTag(tag.tagId);
            setShowTagModal(false);
          }}
          onAddTag={() => {
            console.log("태그 추가 버튼 클릭");
            setShowTagModal(false);
          }}
          onEditTag={(tag) => {
            console.log("태그 편집:", tag);
            setShowTagModal(false);
          }}
          isPopup
          containerStyle={{
            position: "fixed",
            top: tagModalPosition.top,
            left: tagModalPosition.left,
            zIndex: 9999,
          }}
        />
      )}

      {showColorModal && (
        <SetColorModal
          isOpen
          isPopup
          onClose={() => setShowColorModal(false)}
          onSelect={(color) => {
            setSelectedColor(color);
            setShowColorModal(false);
          }}
          containerStyle={{
            position: "fixed",
            top: colorModalPos.top,
            left: colorModalPos.left,
            zIndex: 9999,
          }}
        />
      )}

      {showIconModal && (
        <SetIconModal
          isOpen={true}
          isPopup
          onClose={() => setShowIconModal(false)}
          onSelect={(iconId) => {
            setSelectedIcon(`tagIcon${iconId}`);
            setShowIconModal(false);
          }}
          containerStyle={{
            position: "fixed",
            top: iconModalPos.top,
            left: iconModalPos.left,
            zIndex: 9999,
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
            setSelectedParticipants(participant);
            setShowParticipantModal(false);
          }}
        />
      )}
    </>
  );
};

export default AddScheduleModal;
