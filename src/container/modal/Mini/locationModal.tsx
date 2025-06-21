import React, { useState, KeyboardEvent } from "react";
import { COLORS } from "../../../../assets/styles/gray_color/gray_color";

interface LocationModalProps {
  onClose: () => void;
  onSubmit: (location: string) => void;
}

export default function LocationModal({
  onClose,
  onSubmit,
}: LocationModalProps) {
  const [location, setLocation] = useState("");

  const isValid = location.trim() !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(location.trim());
    onClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      style={{
        width: 529,
        height: "auto",
        padding: "24px",
        backgroundColor: COLORS.bg,
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.gray2 }}>
          위치 추가
        </h2>
        <p style={{ fontSize: 14, marginTop: 10, color: COLORS.gray4 }}>
          일정 위치를 추가해보세요.
        </p>

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="연세대학교 미래캠퍼스"
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
          marginTop: 24,
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
        위치 추가
      </button>
    </div>
  );
}
