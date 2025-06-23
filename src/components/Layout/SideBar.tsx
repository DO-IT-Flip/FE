import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoIcon from "@logo/logo.svg?url";
import CalendarActive from "@icons/system/calendar_active.svg?url";
import CalendarEnabled from "@icons/system/calendar_enabled.svg?url";
import FlipActive from "@icons/system/flip_active.svg?url";
import FlipEnabled from "@icons/system/flip_enabled.svg?url";
import TagActive from "@icons/system/tag_active.svg?url";
import TagEnabled from "@icons/system/tag_enabled.svg?url";
import SettingActive from "@icons/system/setting_active.svg?url";
import SettingEnabled from "@icons/system/setting_enabled.svg?url";
import LogoutIcon from "@icons/system/logout.svg?url";
import DotIcon from "@icons/system/dot.svg?url";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* 전체 사이드바 컨테이너 */}
      <div className="absolute left-[2px] top-0 w-[118px] h-[1080px] bg flex flex-col justify-between items-center">
        
        {/* 상단 로고 */}
        <img
          src={LogoIcon}
          alt="logo"
          className="absolute left-[31px] top-[82px] w-[52px] h-[52px]"
        />
        
        {/* Dot 아이콘 → colorModal로 이동 */}
        <img
          src={DotIcon}
          alt="dot"
          className="absolute left-[87px] top-[98px] w-[4px] h-[20px] cursor-pointer"
          onClick={() => navigate("/color")}
        />

        {/* 중앙 네비게이션 아이콘 영역 */}
        <div className="absolute left-[45px] top-[437px] w-[32px] h-[206px] flex flex-col items-center justify-between">
          
          <img
            src={isActive("/calendar") ? CalendarActive : CalendarEnabled}
            alt="calendar"
            className={`w-[32px] ${isActive("/calendar") ? "h-[38px]" : "h-[32px]"} cursor-pointer`}
            onClick={() => navigate("/calendar")}
          />

          <img
            src={isActive("/home") ? FlipActive : FlipEnabled}
            alt="flip"
            className={`w-[32px] ${isActive("/home") ? "h-[38px]" : "h-[32px]"} cursor-pointer`}
            onClick={() => navigate("/home")}
          />

          <img
            src={isActive("/tag") ? TagActive : TagEnabled}
            alt="tag"
            className={`w-[32px] ${isActive("/tag") ? "h-[38px]" : "h-[32px]"} cursor-pointer`}
            onClick={() => navigate("/tag")}
          />

          <img
            src={isActive("/setting") ? SettingActive : SettingEnabled}
            alt="setting"
            className={`w-[32px] ${isActive("/setting") ? "h-[38px]" : "h-[32px]"} cursor-pointer`}
            onClick={() => navigate("/setting")}
          />
        </div>

        {/* 로그아웃 */}
        <div className="absolute left-[34.5px] top-[950px] w-[53px] h-[48px] flex flex-col items-center">
          <img
            src={LogoutIcon}
            alt="logout"
            className="w-full h-full cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
