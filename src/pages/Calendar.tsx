// Calendar.tsx
import React from "react";
import CalendarView from "@components/CalendarView/CalendarView";

interface Props {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

export default function Calendar({ selectedDate, setSelectedDate }: Props) {
  return (
    <main className="w-full h-full">
      <CalendarView
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </main>
  );
}
