import { useState } from "react";
import { COLORS } from "../../../../assets/styles/gray_color/gray_color";
import TimePickerModal from "@/components/MiniModal/TimePicker/TimePickerModal";
import CalendarModal from "@/components/MiniModal/Calendar/CalendarModal";
import TagModal from "@/components/MiniModal/Tag/TagModal";
import LocationModal from "@/components/MiniModal/Location/LocationModal";
import ParticipantModal from "@/components/MiniModal/Participant/ParticipantModal";

interface ScheduleAddModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function ScheduleAddModal({
  onClose,
  onSubmit,
}: ScheduleAddModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<{
    meridiem: string;
    hour: number;
    minute: number;
  } | null>(null);

  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(false);

  const isValid = title.trim() !== "" && date !== null && time !== null;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({ title, date, time });
    onClose();
  };

  const inputStyle = {
    borderBottom: `1px solid ${COLORS.gray5}`,
    color: COLORS.gray2,
    backgroundColor: "transparent",
    fontSize: 14,
    padding: "8px 0",
    width: "100%",
    outline: "none",
  };

  return (
    <>
           {" "}
      <Modal onClose={onClose}>
               {" "}
        <div
          style={{
            width: 529,
            height: 565,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
                   {" "}
          <div>
                       {" "}
            <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.gray2 }}>
              일정추가
            </h2>
                       {" "}
            <p style={{ fontSize: 14, color: COLORS.gray4, marginTop: 8 }}>
                            일정을 추가하기 위해 아래 내용을 작성해주세요.      
                   {" "}
            </p>
                        {/* 날짜 선택 */}           {" "}
            <div style={{ marginTop: 24 }}>
                           {" "}
              <span style={{ fontSize: 14, fontWeight: 500 }}>날짜 선택</span> 
                         {" "}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                               {" "}
                <button
                  onClick={() => setShowDateModal(true)}
                  style={{
                    color: COLORS.gray2,
                    fontWeight: 600,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                                   {" "}
                  {date ? date.toLocaleDateString() : "날짜 선택"}             
                   {" "}
                </button>
                               {" "}
                <label
                  style={{
                    fontSize: 12,
                    color: COLORS.gray4,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                                    <input type="checkbox" />                 
                  매주 반복                {" "}
                </label>
                             {" "}
              </div>
                         {" "}
            </div>
                        {/* 시간 선택 */}           {" "}
            <div style={{ marginTop: 20 }}>
                           {" "}
              <span style={{ fontSize: 14, fontWeight: 500 }}>시간 선택</span> 
                         {" "}
              <div style={{ marginTop: 4 }}>
                               {" "}
                <button
                  onClick={() => setShowTimeModal(true)}
                  style={{
                    color: COLORS.gray2,
                    fontWeight: 600,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                                   {" "}
                  {time
                    ? `${time.meridiem} ${String(time.hour).padStart(
                        2,
                        "0"
                      )} : ${String(time.minute).padStart(2, "0")}`
                    : "시간 선택"}
                                 {" "}
                </button>
                             {" "}
              </div>
                         {" "}
            </div>
                        {/* 일정 제목 */}           {" "}
            <div style={{ marginTop: 24 }}>
                           {" "}
              <span style={{ fontSize: 14, fontWeight: 500 }}>일정 제목</span>
                           {" "}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="일정 제목을 입력해주세요."
                style={inputStyle}
              />
                         {" "}
            </div>
                        {/* 태그/위치/참여자 */}           {" "}
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                           {" "}
              <button
                style={{
                  backgroundColor: COLORS.gray6,
                  fontSize: 14,
                  padding: "4px 12px",
                  borderRadius: 9999,
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setShowTagModal(true)}
              >
                                태그              {" "}
              </button>
                           {" "}
              <button
                style={{
                  backgroundColor: COLORS.gray6,
                  fontSize: 14,
                  padding: "4px 12px",
                  borderRadius: 9999,
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setShowLocationModal(true)}
              >
                                위치              {" "}
              </button>
                           {" "}
              <button
                style={{
                  backgroundColor: COLORS.gray6,
                  fontSize: 14,
                  padding: "4px 12px",
                  borderRadius: 9999,
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setShowParticipantModal(true)}
              >
                                참여자              {" "}
              </button>
                         {" "}
            </div>
                     {" "}
          </div>
                    {/* 제출 버튼 */}         {" "}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            style={{
              width: "100%",
              padding: "12px 0",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 9999,
              color: "#fff",
              backgroundColor: isValid ? COLORS.gray2 : COLORS.gray5,
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
                        일정추가          {" "}
          </button>
                 {" "}
        </div>
             {" "}
      </Modal>
            {/* 연결되는 미니모달 */}     {" "}
      {showDateModal && (
        <CalendarModal
          onClose={() => setShowDateModal(false)}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            setShowDateModal(false);
          }}
        />
      )}
           {" "}
      {showTimeModal && (
        <TimePickerModal
          onClose={() => setShowTimeModal(false)}
          onSubmit={(selected) => {
            setTime(selected);
            setShowTimeModal(false);
          }}
        />
      )}
           {" "}
      {showTagModal && <TagModal onClose={() => setShowTagModal(false)} />}     {" "}
      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onSubmit={() => setShowLocationModal(false)}
        />
      )}
           {" "}
      {showParticipantModal && (
        <ParticipantModal
          onClose={() => setShowParticipantModal(false)}
          onSubmit={() => setShowParticipantModal(false)}
        />
      )}
         {" "}
    </>
  );
}
