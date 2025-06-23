import React from "react";
import FlipCard from "@src/components/Flip/FlipCard";
import TodayCard from "@src/components/Flip/TodayCard";
import { mockEvents } from "@mocks/mockEvents";

export default function MainFlipView() {
  const today = new Date();
  const todayDateString = today.toISOString().split("T")[0];
  const todayEvent = mockEvents.find((e) => e.date === todayDateString);

  const weekday = today.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const month = today.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = String(today.getDate()).padStart(2, "0");
  const year = String(today.getFullYear());

  return (
    <div className="mt-[198px] w-[1172px] h-[684px] flex flex-col items-center">
      <div className="flex gap-10 mb-6">
        <FlipCard label={weekday} sublabel={year} />
        <FlipCard label={month} sublabel="DAY" />
        <FlipCard label={day} sublabel="DATE" />
      </div>

      {todayEvent && (
        <TodayCard
          title={todayEvent.title}
          location={todayEvent.location}
          professor={todayEvent.participants?.[0]?.name || ""}
          startTime={todayEvent.startTime}
          endTime={todayEvent.endTime}
        />
      )}
    </div>
  );
}
