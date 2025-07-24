import React, { useState } from "react";
import closeIcon from "../../assets/icons/system/close2.svg?url";
import { TYPOGRAPHY } from "@src/assets/styles/typography";
import { COLORS } from "@src/assets/styles/gray_color";

import tagIcon1 from "../../assets/icons/tag/tagIcon1.svg?url";
import tagIcon2 from "../../assets/icons/tag/tagIcon2.svg?url";
import tagIcon3 from "../../assets/icons/tag/tagIcon3.svg?url";
import tagIcon4 from "../../assets/icons/tag/tagIcon4.svg?url";
import tagIcon5 from "../../assets/icons/tag/tagIcon5.svg?url";
import tagIcon6 from "../../assets/icons/tag/tagIcon6.svg?url";
import tagIcon7 from "../../assets/icons/tag/tagIcon7.svg?url";
import tagIcon8 from "../../assets/icons/tag/tagIcon8.svg?url";
import tagIcon9 from "../../assets/icons/tag/tagIcon9.svg?url";
import tagIcon10 from "../../assets/icons/tag/tagIcon10.svg?url";
import tagIcon11 from "../../assets/icons/tag/tagIcon11.svg?url";
import tagIcon12 from "../../assets/icons/tag/tagIcon12.svg?url";
import ModalWrapper from "./ModalWrapper ";

interface SetIconModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (iconId: number) => void;
  isPopup?: boolean;
  containerStyle?: React.CSSProperties;
}

const ICONS = [
  { id: 1, src: tagIcon1 },
  { id: 2, src: tagIcon2 },
  { id: 3, src: tagIcon3 },
  { id: 4, src: tagIcon4 },
  { id: 5, src: tagIcon5 },
  { id: 6, src: tagIcon6 },
  { id: 7, src: tagIcon7 },
  { id: 8, src: tagIcon8 },
  { id: 9, src: tagIcon9 },
  { id: 10, src: tagIcon10 },
  { id: 11, src: tagIcon11 },
  { id: 12, src: tagIcon12 },
];

const SetIconModal: React.FC<SetIconModalProps> = ({
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
              아이콘
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
            태그의 아이콘를 설정해보세요.
          </p>
        </div>

        <div className="grid grid-cols-6 gap-2 px-0.5 py-2">
          {ICONS.map(({ id, src }) => (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="w-[42px] h-[42px] rounded-md"
              style={{
                backgroundColor: COLORS.gray5,
              }}
              aria-label={`아이콘 선택 ${id}`}
            >
              <img src={src} alt={`tagIcon${id}`} className="w-[42px] h-[42px]" />
            </button>
          ))}
        </div>
      </div>
      </ModalWrapper>
    </div>
  );
};

export default SetIconModal;
