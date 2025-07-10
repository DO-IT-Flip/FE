// App.tsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@components/Layout/MainLayout";
import Calendar from "@src/pages/Calendar";
import RightSidebarWrapper from "@components/RightPanel/RightSidebarWrapper";
import "@styles/globals.css";
import "./assets/styles/index.css";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="h-screen min-h-0 relative">
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={
                <Calendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              }
            />
          </Routes>
        </MainLayout>

        {/* 사이드바는 MainLayout 바깥에서 조건부 렌더링 */}
        {selectedDate && <RightSidebarWrapper date={selectedDate} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
