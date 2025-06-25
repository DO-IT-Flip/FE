import React from "react";
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
import LogoutIcon from "@icons/system/logout.svg?url";

export default function LeftSideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
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
      <div
        className="flex items-start justify-center"
        style={{
          gap: 8,
        }}
      >
        <img src={LogoIcon} alt="logo" width={52} height={52} />
        <img
          src={DotIcon}
          alt="dot"
          width={4}
          height={20}
          onClick={(e) => {
            e.stopPropagation();
            console.log("dot click"); //모달 트리거 자리
          }}
          style={{
            cursor: "pointer",
            marginTop: 16,
          }}
        />
      </div>

      {/* 네비게이션 아이콘 */}
      <div className="flex flex-col items-center gap-[20px]">
        {[
          {
            path: "/calendar",
            active: CalendarActive,
            enabled: CalendarEnabled,
            alt: "calendar",
          },
          {
            path: "/home",
            active: FlipActive,
            enabled: FlipEnabled,
            alt: "flip",
          },
          { path: "/tag", active: TagActive, enabled: TagEnabled, alt: "tag" },
          {
            path: "/setting",
            active: SettingActive,
            enabled: SettingEnabled,
            alt: "setting",
          },
        ].map(({ path, active, enabled, alt }) => {
          const isOn = isActive(path);
          const iconSrc = isOn ? active : enabled;

          return (
            <div
              key={path}
              style={{
                width: 32,
                height: 38, 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={iconSrc}
                alt={alt}
                width={32}
                height={32} 
                onClick={() => navigate(path)}
                style={{
                  cursor: "pointer",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 로그아웃 아이콘 */}
      <img
        src={LogoutIcon}
        alt="logout"
        width={53}
        height={48}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
