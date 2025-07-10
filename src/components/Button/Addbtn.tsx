import React from "react";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";
import editIcon from "@icons/system/edit.svg?url";

interface BlackButtonProps {
  onClick?: () => void;
  text?: string;
}

export default function BlackButton({ onClick, text = "일정추가" }: BlackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-10 py-3 rounded-full"
      style={{
                  backgroundColor: COLORS.gray2,
                  color: COLORS.bg,
                  cursor: "pointer",
                  ...TYPOGRAPHY.Subtitle,
                }}
    >
      <span>{text}</span>
      <img src={editIcon} alt="icon" style={{ width: 16, height: 16 }} />
    </button>
  );
}
