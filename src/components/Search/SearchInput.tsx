import React, { ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";
import SearchIcon from "@icons/system/search.svg?url";

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const navigate = useNavigate();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = value.trim();
      if (trimmed) {
        navigate(`/search?query=${encodeURIComponent(trimmed)}`);
      }
    }
  };

  return (
    <div className="relative w-[424px] h-12">
      <img
        src={SearchIcon}
        alt="검색 아이콘"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
      />

      <input
        aria-label="일정 검색"
        type="text"
        placeholder="일정을 검색해보세요."
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={`
          w-full h-full rounded-full pl-12
          focus:outline-none
          transition-colors duration-200
          placeholder:text-[#D8D8D8]
        `}
        style={{
          ...(value ? TYPOGRAPHY.Subtitle : TYPOGRAPHY.Body1),
          color: value ? COLORS.gray4 : COLORS.gray5,
        }}
      />
    </div>
  );
}
