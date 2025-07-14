import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LogoIcon from "@logo/logo.svg?url";
import DotIcon from "@icons/system/dot.svg?url";
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

export default function LeftSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSetCustomModalOpen, setIsSetCustomModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleTagAdd = (tagName: string) => {
    console.log("추가된 태그 이름:", tagName);
    setIsTagModalOpen(false);
  };

  const handleLogin = (credentials: { id: string; password: string }) => {
    console.log("로그인 시도:", credentials);
    setIsLoginModalOpen(false);
  };

  const handleSignUp = () => {
    console.log("회원가입 클릭");
  };

  const handleColorSelect = (color: string) => {
    console.log("선택된 색상:", color);
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
          <img src={LogoIcon} alt="logo" width={52} height={52} />
          <img
            src={DotIcon}
            alt="dot"
            width={4}
            height={20}
            onClick={(e) => {
              e.stopPropagation();
              setIsSetCustomModalOpen(true);
            }}
            style={{ cursor: "pointer", marginTop: 16 }}
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
              onClick: () => navigate("/setting"),
            },
          ].map(({ path, active, enabled, alt, onClick }) => {
            const isOn = isActive(path);
            const iconSrc = isOn ? active : enabled;

            return (
              <div
                key={path}
                onClick={onClick}
                className="w-[32px] h-[38px] flex items-start justify-center cursor-pointer"
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

        {/* 로그인 아이콘 (로그인 완료되면 아이콘이 로그아웃으로 바뀌는 기능 추가하기)*/}
        <img
          src={LoginIcon}
          alt="login"
          width={53}
          height={48}
          style={{ cursor: "pointer" }}
          onClick={() => setIsLoginModalOpen(true)}
        />
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

      {/* LogoIcon 기준 10px 아래 배치 */}
      {isSetCustomModalOpen && (
        <div
          className="fixed z-50"
          style={{
            top: 82 + 52 + 10, // paddingTop + LogoIcon height + 10px
            left: 29 + 26, // paddingLeft + (LogoIcon width / 2) - (modal width / 2)
          }}
        >
          <SetCustomModal
            isOpen={isSetCustomModalOpen}
            onClose={() => setIsSetCustomModalOpen(false)}
            onSelect={handleColorSelect}
          />
        </div>
      )}
    </>
  );
}