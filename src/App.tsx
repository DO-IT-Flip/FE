import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@components/Layout/MainLayout";
import Calendar from "@src/pages/Calendar";
import Search from "@src/pages/Search";
import RightSidebarWrapper from "@components/RightPanel/RightSidebarWrapper";
import "@styles/globals.css";
import "./assets/styles/index.css";

function App() {
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 캘린더페이지 관련 코드 주석처리

  return (
    <div className="h-screen min-h-0 relative">
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </MainLayout>

        {/* 사이드바 제거 */}
        {/* {selectedDate && <RightSidebarWrapper date={selectedDate} />} */}
      </BrowserRouter>
    </div>
  );
}

export default App;