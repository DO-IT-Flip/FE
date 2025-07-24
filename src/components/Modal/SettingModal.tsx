import React, { useState } from "react";
import closeIcon from "@assets/icons/system/close2.svg?url";
import LogoIcon from "@components/Icons/LogoIcon";
import { TYPOGRAPHY } from "@src/assets/styles/typography";
import { COLORS } from "@src/assets/styles/gray_color";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative w-[529px] h-[392px] px-8 pt-6 pb-8 rounded-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-end">
          <button onClick={onClose} aria-label="닫기">
            <img src={closeIcon} alt="close" className="w-8 h-8" />
          </button>
        </div>

        {/* 타이틀 */}
        <p
          style={{
            ...TYPOGRAPHY.Display,
            color: COLORS.gray2,
          }}
          className="mb-[58.5px] text-center"
        >
          계정 설정
        </p>

        {/* 사용자 정보 박스 (로고+이름 / 탈퇴하기 버튼) */}
        <div className="flex items-center w-full mb-[84px]">
          {/* 왼쪽: 로고 + 텍스트 */}
          <div className="flex items-center gap-3 pl-12">
            {/* 로고 아이콘 */}
            <LogoIcon style={{ width: 32, height: 32 }} />
            <div className="flex flex-col">
              <span
                style={{
                  ...TYPOGRAPHY.Headline2,
                  color: COLORS.gray2,
                }}
              >
                김플립
              </span>
              <span
                style={{
                  ...TYPOGRAPHY.Body1,
                  color: COLORS.gray5,
                }}
              >
                flip12345
              </span>
            </div>
          </div>

          {/* 오른쪽: 탈퇴하기 */}
          <button
            className="ml-[200px]"
            style={{
              ...TYPOGRAPHY.Body2,
              color: COLORS.gray4,
            }}
          >
            탈퇴하기
          </button>
        </div>

        {/* 로그아웃 버튼 */}
        <button
          onClick={onLogout}
          className="w-full py-3 rounded-full transition"
          style={{
            ...TYPOGRAPHY.Subtitle,
            backgroundColor: COLORS.gray3,
            color: COLORS.bg,
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default SettingModal;
