// src/components/flip/TodayCard.tsx
import React from "react";
import { FiMapPin, FiUser } from "react-icons/fi";

interface TodayCardProps {
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  professor?: string;
}

export default function TodayCard({ title, location, startTime, endTime, professor }: TodayCardProps) {
  return (
    <div className="w-full bg-black rounded-xl text-white py-6 px-10 flex flex-col items-center">
      <div className="text-Caption mb-2">TODAY</div>
      <div className="flex gap-3 items-center text-Body3">
        <FiMapPin className="w-4 h-4" /> {location}
        {professor && (
          <>
            <FiUser className="w-4 h-4" /> {professor}
          </>
        )}
      </div>
      <div className="text-Headline1 mt-4">{title}</div>
      <div className="text-Body2 mt-1">
        {startTime} ~ {endTime}
      </div>
    </div>
  );
}