import React, { useState } from "react";
import Calendar from "@pages/Calendar";

interface Props {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

export default function CalendarWrapper({ selectedDate, setSelectedDate }: Props) {
  return (
    <div className="relative">
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  );
}
