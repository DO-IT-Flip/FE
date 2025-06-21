import React, { useState, KeyboardEvent } from "react";
import { COLORS } from "../../../../assets/styles/gray_color/gray_color";

interface ParticipantModalProps {
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function ParticipantModal({
  onClose,
  onSubmit,
}: ParticipantModalProps) {
  const [participant, setParticipant] = useState("");

  const isValid = participant.trim() !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(participant.trim());
    onClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      style={{
        width: 529,
        height: 340,
        padding: 24,
        boxSizing: "border-box",
        backgroundColor: COLORS.bg,
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.gray2 }}>
          참여자 추가
        </h2>
        <p style={{ fontSize: 14, marginTop: 10, color: COLORS.gray4 }}>
          일정 참여자를 추가해보세요.
        </p>
        <input
          type="text"
          value={participant}
          onChange={(e) => setParticipant(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="일정 참여자"
          style={{
            marginTop: 24,
            width: "100%",
            borderBottom: `1px solid ${COLORS.gray5}`,
            backgroundColor: "transparent",
            color: isValid ? COLORS.gray2 : COLORS.gray3,
            fontSize: 14,
            padding: "8px 0",
            outline: "none",
          }}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        style={{
          marginTop: 59,
          width: "100%",
          padding: "12px 0",
          borderRadius: 9999,
          fontSize: 14,
          fontWeight: 500,
          color: "#fff",
          backgroundColor: isValid ? COLORS.gray2 : COLORS.gray4,
          cursor: isValid ? "pointer" : "not-allowed",
        }}
      >
        참여자 추가
      </button>
    </div>
  );
}
