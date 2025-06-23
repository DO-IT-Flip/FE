import React from "react";

interface FlipCardProps {
  label: string;
  sublabel: string;
}

export default function FlipCard({ label, sublabel }: FlipCardProps) {
  return (
    <div className="w-[240px] h-[200px] bg-[#F5F5F5] rounded-lg flex flex-col items-center justify-center">
      <div className="text-point_text3 font-point_text3">{label}</div>
      <div className="text-Caption mt-2">{sublabel}</div>
    </div>
  );
}
