import React from "react";
import { FiPlus } from "react-icons/fi"; 

interface BlackButtonProps {
  onClick?: () => void;
  text?: string;
}

export default function BlackButton({ onClick, text = "일정추가" }: BlackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-black text-white px-10 py-3 rounded-full text-[16px] font-bold"
    >
      <span>{text}</span>
      <FiPlus className="w-5 h-5" />
    </button>
  );
}