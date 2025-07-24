import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LogoIcon from "@assets/logo/logo.svg";
import DotIcon from "@assets/icons/system/dot.svg";
import CalendarActive from "@icons/system/calendar_active.svg?url";
import CalendarEnabled from "@icons/system/calendar_enabled.svg?url";
import FlipActive from "@icons/system/flip_active.svg?url";
import FlipEnabled from "@icons/system/flip_enabled.svg?url";
import TagActive from "@icons/system/tag_active.svg?url";
import TagEnabled from "@icons/system/tag_enabled.svg?url";
import SettingActive from "@icons/system/setting_active.svg?url";
import SettingEnabled from "@icons/system/setting_enabled.svg?url";
import LoginIcon from "@icons/system/login.svg?url";
import LogoutIcon from "@icons/system/logout.svg?url";
import AddTagModal from "@components/Modal/addTag";
import LoginModal from "@components/Modal/LoginModal";
import SetCustomModal from "@components/Modal/customColor";
import SettingModal from "@components/Modal/SettingModal";
import { logout } from "@api/auth";
import axiosInstance from "@src/api/axios";

interface LeftSideBarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

export default function LeftSideBar({
  isLoggedIn,
  setIsLoggedIn,
}: LeftSideBarProps) {
  const [customColor, setCustomColor] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSetCustomModalOpen, setIsSetCustomModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleTagAdd = (tagData: {
    name: string;
    color: string;
    iconId: number;
  }) => {
    console.log("추가된 태그 데이터:", tagData);
    setIsTagModalOpen(false);
  };

  const handleLogin = (credentials: { id: string; password: string }) => {
    console.log("로그인 시도:", credentials);
    setIsLoggedIn(true); // 전역 상태 업데이트
    setIsLoginModalOpen(false);
  };

  const handleSignUp = () => {
    console.log("회원가입 클릭");
  };

  const handleLogout = async () => {
    try {
      await logout();

      // 토큰 제거
      localStorage.removeItem("access");

      // axios instance 초기화
      delete axiosInstance.defaults.headers.common["Authorization"];

      // 리다이렉트 or 상태 초기화
      navigate("/"); // 또는 window.location.reload()
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  const handleColorSelect = (color: string) => {
    setCustomColor(color);
    setIsSetCustomModalOpen(false);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 flex flex-col items-center justify-between"
        style={{
          width: 118,
          height: "100vh",
          paddingTop: 82,
          paddingBottom: 82,
          paddingLeft: 29,
          paddingRight: 29,
        }}
      >
        {/* logo + dot 아이콘 */}
        <div className="flex items-start justify-center gap-2">
          <LogoIcon
            color={customColor ?? undefined}
            style={{ width: 52, height: 52 }}
          />

          <DotIcon
            color={customColor || undefined}
            onClick={(e) => {
              e.stopPropagation();
              setIsSetCustomModalOpen(true);
            }}
            style={{
              width: 4,
              height: 20,
              marginTop: 16,
              cursor: "pointer",
            }}
          />
        </div>

        {/* 네비게이션 아이콘 */}
        <div className="flex flex-col items-center gap-[24px]">
          {[
            {
              path: "/calendar",
              active: CalendarActive,
              enabled: CalendarEnabled,
              alt: "calendar",
              onClick: () => navigate("/calendar"),
            },
            {
              path: "/flip",
              active: FlipActive,
              enabled: FlipEnabled,
              alt: "flip",
              onClick: () => navigate("/flip"),
            },
            {
              path: "/tag",
              active: TagActive,
              enabled: TagEnabled,
              alt: "tag",
              onClick: () => setIsTagModalOpen(true),
            },
            {
              path: "/setting",
              active: SettingActive,
              enabled: SettingEnabled,
              alt: "setting",
              onClick: () => setIsSettingModalOpen(true),
            },
          ].map(({ path, active, enabled, alt, onClick }) => {
            const isOn = isActive(path);
            const iconSrc = isOn ? active : enabled;

            return (
              <div
                key={path}
                onClick={onClick}
                className="w-[32px] h-[38px] flex items-start justify-center cursor-pointer"
                style={{
                  backgroundColor: customColor ?? undefined, // 선택된 색 적용
                }}
              >
                <img
                  src={iconSrc}
                  alt={alt}
                  className="w-full h-auto object-contain pointer-events-none"
                />
              </div>
            );
          })}
        </div>

        {/* 로그인 / 로그아웃 아이콘 */}
        {isLoggedIn ? (
          <img
            src={LogoutIcon}
            alt="logout"
            width={53}
            height={48}
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          />
        ) : (
          <img
            src={LoginIcon}
            alt="login"
            width={53}
            height={48}
            style={{ cursor: "pointer" }}
            onClick={() => setIsLoginModalOpen(true)}
          />
        )}
      </div>

      {/* 모달 렌더링 */}
      <AddTagModal
        isOpen={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
        onAdd={handleTagAdd}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />

      {/* SetCustomModal 위치 */}
      {isSetCustomModalOpen && (
        <SetCustomModal
          isOpen={isSetCustomModalOpen}
          onClose={() => setIsSetCustomModalOpen(false)}
          onSelect={handleColorSelect}
          containerStyle={{
            position: "fixed",
            top: 82 + 52 + 10,
            left: 29 + 26,
            zIndex: 9999,
          }}
        />
      )}
      <SettingModal
        isOpen={isSettingModalOpen}
        onClose={() => setIsSettingModalOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
}
