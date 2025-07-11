import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import MainLayout from "@components/Layout/MainLayout";
import Flip from "@pages/Flip";
import Stanby from "@pages/Stanby";
import CalendarWrapper from "@pages/CalendarWrapper";
import Search from "@pages/Search";
import RightSidebarWrapper from "@components/RightPanel/RightSidebarWrapper";

// App 내부에서 location 사용하기 위한 서브 컴포넌트
function AppRoutes() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/calendar") {
      setSelectedDate(null);
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/flip" replace />} />
        <Route element={<MainLayout />}>
          <Route path="/flip" element={<Flip />} />
          <Route path="/stanby" element={<Stanby />} />
          <Route
            path="/calendar"
            element={
              <CalendarWrapper
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            }
          />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>

      {selectedDate && <RightSidebarWrapper date={selectedDate} />}
    </>
  );
}

// Router는 가장 바깥
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
