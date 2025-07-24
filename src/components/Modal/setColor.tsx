import React, { useState } from "react";
import closeIcon from "../../assets/icons/system/close2.svg?url";
import { TYPOGRAPHY } from "@src/assets/styles/typography";
import { COLORS } from "@src/assets/styles/gray_color";
import { TAG_COLOR } from "@styles/tag_color";
import ModalWrapper from "./ModalWrapper ";

interface SetColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (color: string) => void;
  containerStyle: React.CSSProperties;
  isPopup?: boolean;
}

const SetColorModal: React.FC<SetColorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  containerStyle,
  isPopup,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={
        isPopup
          ? "absolute z-50"
          : "fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
      }
      onClick={isPopup ? undefined : onClose}
    >
      <ModalWrapper isOpen={isOpen} onClose={onClose}>
        <div
          className="relative w-[345px] h-[220px] p-6 rounded-xl bg-white"
          style={containerStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex justify-between pb-0.5">
              <p
                style={{
                  ...TYPOGRAPHY.Headline1,
                  color: COLORS.gray2,
                }}
              >
                컬러
              </p>
              <button onClick={onClose} aria-label="닫기">
                <img src={closeIcon} alt="close" className="w-8 h-8" />
              </button>
            </div>

            <p
              style={{
                ...TYPOGRAPHY.Body1,
                color: COLORS.gray4,
              }}
            >
              태그의 컬러를 설정해보세요.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-2 px-0.5 py-2">
            {Object.entries(TAG_COLOR).map(([name, color]) => (
              <button
                key={name}
                onClick={() => onSelect(name)}
                className="w-[42px] h-[42px] rounded-md"
                style={{ backgroundColor: color }}
                aria-label={`색상 선택 ${name}`}
              />
            ))}
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default SetColorModal;
