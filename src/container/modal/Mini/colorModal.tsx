import React from "react";
import { FiX } from "react-icons/fi";
import { COLORS as GRAY_COLORS } from "../../../../assets/styles/gray_color/gray_color";
import { COLORS as TAG_COLORS, COLOR_KEYS } from "../../../../assets/styles/tag_color/tag_color";
import ColorPaletteButton from "./ColorPaletteButton";

interface MoodBoardModalProps {
  onClose: () => void;
  onSelect: (colorCode: string) => void;
  selectedColor?: string;
}

export default function MoodBoardModal({
  onClose,
  onSelect,
  selectedColor,
}: MoodBoardModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 50,
        backgroundColor: GRAY_COLORS.bg,
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        padding: 16,
        width: 345,
        height: 220,
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 600, color: GRAY_COLORS.gray2 }}>
          컬러
        </h2>
        <button
          onClick={onClose}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <FiX
            size={18}
            color={GRAY_COLORS.gray4}
            onMouseEnter={(e) => (e.currentTarget.style.color = GRAY_COLORS.gray2)}
            onMouseLeave={(e) => (e.currentTarget.style.color = GRAY_COLORS.gray4)}
          />
        </button>
      </div>

      <p style={{ fontSize: 14, color: GRAY_COLORS.gray4, marginBottom: 16 }}>
        플립의 컬러를 설정해보세요.
      </p>

      {/* 컬러 선택 버튼들 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
        {COLOR_KEYS.map((key) => {
          const color = TAG_COLORS[key];
          return (
            <ColorPaletteButton
              key={key}
              color={color}
              selected={selectedColor === color}
              onClick={() => onSelect(color)}
              padding={8}
            />
          );
        })}
      </div>
    </div>
  );
}