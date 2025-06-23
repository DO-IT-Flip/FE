import React from "react";

export default function RightScrollbar() {
  return (
    <div className="w-[62px] h-full flex flex-col items-center justify-center gap-3">
      {[...Array(4)].map((_, idx) => (
        <div
          key={idx}
          className="w-1.5 h-6 bg-[#D9D9D9] rounded-full opacity-40"
        />
      ))}
    </div>
  );
}