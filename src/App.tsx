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
import SignupModal from "@components/Modal/SignupModal";
import LoginModal from "@components/Modal/LoginModal";
import { reissue } from "./api/auth";

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const isLoggedIn = !!localStorage.getItem("access");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// App 내부에서 location 사용하기 위한 서브 컴포넌트
function AppRoutes() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("access")
  );
  const location = useLocation();
  // 회원가입, 로그인 모달 상태
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/calendar") {
      setSelectedDate(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newToken = await reissue();
        if (!newToken) {
          localStorage.removeItem("access");
          setShowLogin(true);
        } else {
          setShowLogin(false);
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("access");
        setShowLogin(true);
      }
    };

    if (!isLoggedIn) {
      fetchData();
    } else {
      setShowLogin(false);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/flip" replace />} />
        <Route
          element={
            <MainLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        >
          <Route path="/flip" element={<Flip />} />
          <Route
            path="/stanby"
            element={
              <PrivateRoute>
                <Stanby />
              </PrivateRoute>
            }
          />
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

      {/* 회원가입 모달 */}
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSignUp={() => {
          alert("회원가입 성공!");
        }}
        onLogin={() => {
          setShowSignup(false);
          setShowLogin(true); // 로그인 모달 열기
        }}
      />
      {/* 로그인 모달 */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={({ id, password }) => {
          // 로그인 성공 시 처리
          setShowLogin(false);
        }}
        onSignUp={() => {
          // 회원가입 화면으로 다시 전환
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
    </>
  );
}

// Router는 가장 바깥
function App() {
  return (
    <div className="h-full">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
