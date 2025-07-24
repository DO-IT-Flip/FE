import React, { useState, useEffect, useRef } from "react";
import closeIcon from "../../assets/icons/system/close2.svg?url";
import dropDown from "../../assets/icons/system/dropdown.svg?url";
import trashCan from "../../assets/icons/system/trashcan.svg?url";
import { TYPOGRAPHY } from "@src/assets/styles/typography";
import { COLORS } from "@src/assets/styles/gray_color";
import SetColorModal from "./setColor";
import SetIconModal from "./setIcon";
import { createTag, updateTag, deleteTag } from "@src/api/tag";

// 아이콘 파일들 import
import alcoholIcon from "../../assets/icons/tag/alcohol.svg?url";
import studyIcon from "../../assets/icons/tag/study.svg?url";
import flipIcon from "../../assets/icons/tag/flip.svg?url";
import sportsIcon from "../../assets/icons/tag/sports.svg?url";
import coffeeIcon from "../../assets/icons/tag/coffee.svg?url";
import documentIcon from "../../assets/icons/tag/document.svg?url";
import friendsIcon from "../../assets/icons/tag/friends.svg?url";
import hairsalonIcon from "../../assets/icons/tag/hairsalon.svg?url";
import hospitalIcon from "../../assets/icons/tag/hospital.svg?url";
import mealIcon from "../../assets/icons/tag/meal.svg?url";
import schoolIcon from "../../assets/icons/tag/school.svg?url";
import shoppingIcon from "../../assets/icons/tag/shopping.svg?url";
import { TAG_COLOR } from "@src/assets/styles/tag_color";
import ModalWrapper from "./ModalWrapper ";

interface Tag {
  tagId: number;
  name: string;
  color: string;
  iconId: number;
}

interface AddTagModalProps {
  tagId?: number;
  isOpen: boolean;
  onClose: () => void;
  editTag?: Tag | null;
  onAdd?: (tag: { name: string; color: string; iconId: number }) => void;
  defaultData?: any;
}

const AddTagModal: React.FC<AddTagModalProps> = ({
  tagId,
  isOpen,
  onClose,
  editTag,
  onAdd,
}) => {
  const [tagName, setTagName] = useState("");
  const [selectedIconId, setSelectedIconId] = useState<number>(1);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string>("");

  const [showColorModal, setShowColorModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);

  const isEditMode = editTag !== null && editTag !== undefined;

  const iconMap: { [key: string]: string } = {
    tagIcon1: flipIcon,
    tagIcon2: mealIcon,
    tagIcon3: hairsalonIcon,
    tagIcon4: hospitalIcon,
    tagIcon5: alcoholIcon,
    tagIcon6: coffeeIcon,
    tagIcon7: friendsIcon,
    tagIcon8: studyIcon,
    tagIcon9: shoppingIcon,
    tagIcon10: documentIcon,
    tagIcon11: sportsIcon,
    tagIcon12: schoolIcon,
  };

  //Modal 위치 관리
  const colorButtonRef = useRef<HTMLButtonElement>(null);
  const [colorModalPos, setColorModalPos] = useState({ top: 0, left: 0 });
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const [iconModalPos, setIconModalPos] = useState({ top: 0, left: 0 });

  const openColorModal = () => {
    const rect = colorButtonRef.current?.getBoundingClientRect();
    if (rect) {
      setColorModalPos({ top: rect.bottom + 10, left: rect.left });
      setShowColorModal(true);
    }
  };
  const openIconModal = () => {
    const rect = iconButtonRef.current?.getBoundingClientRect();
    if (rect) {
      setIconModalPos({ top: rect.bottom + 10, left: rect.left });
      setShowIconModal(true);
    }
  };

  useEffect(() => {
    if (isEditMode && editTag) {
      setTagName(editTag.name);
      setSelectedColor(editTag.color);
      setSelectedIconId(editTag.iconId);
      setSelectedIcon(`tagIcon${editTag.iconId}`);
    } else {
      setTagName("");
      setSelectedColor("");
      setSelectedIconId(1);
      setSelectedIcon("");
    }
  }, [isEditMode, editTag]);

  const handleSubmit = async () => {
    if (tagName.trim() && selectedColor && selectedIconId !== null) {
      const tagData = {
        name: tagName.trim(),
        color: selectedColor,
        iconId: selectedIconId,
      };

      try {
        if (isEditMode && editTag) {
          await updateTag(editTag.tagId, tagData);
        } else {
          await createTag(tagData);
          onAdd?.(tagData);
        }

        setTagName("");
        setSelectedColor("");
        setSelectedIconId(1);
        onClose();
      } catch (error) {
        console.error("태그 저장 실패:", error);
        alert("태그 저장에 실패했습니다.");
      }
    }
  };

  const handleDelete = async () => {
    if (isEditMode && editTag) {
      const confirmed = window.confirm(
        `"${editTag.name}" 태그를 삭제하시겠습니까?`
      );
      if (!confirmed) return;

      try {
        await deleteTag(editTag.tagId);
        onClose();
      } catch (error) {
        console.error("태그 삭제 실패:", error);
        alert("태그 삭제에 실패했습니다.");
      }
    }
  };

  const handleClose = () => {
    setTagName("");
    setSelectedColor("");
    setSelectedIconId(1);
    setSelectedIcon("");
    onClose();
  };

  const isFormValid = Boolean(
    tagName.trim() && selectedColor && selectedIconId !== null
  );
  useEffect(() => {
    console.log("📌 입력값 상태 변경됨:");
    console.log("tagName:", tagName, "| typeof:", typeof tagName);
    console.log(
      "selectedColor:",
      selectedColor,
      "| typeof:",
      typeof selectedColor
    );
    console.log(
      "selectedIconId:",
      selectedIconId,
      "| typeof:",
      typeof selectedIconId
    );
    console.log("isFormValid:", isFormValid, "| typeof:", typeof isFormValid);
    console.log("isNaN(selectedIconId):", Number.isNaN(selectedIconId));
  }, [tagName, selectedColor, selectedIconId]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
        onClick={onClose}
      >
        <ModalWrapper isOpen={isOpen} onClose={handleClose}>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[529px] h-[392px] px-8 pt-6 pb-8 rounded-xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-end">
                <button onClick={handleClose} aria-label="닫기">
                  <img src={closeIcon} alt="close" className="w-8 h-8" />
                </button>
              </div>

              <p style={{ ...TYPOGRAPHY.Display, color: COLORS.gray2 }}>
                {isEditMode ? "태그 편집" : "태그 추가"}
              </p>
              <p style={{ ...TYPOGRAPHY.Body1, color: COLORS.gray4 }}>
                {isEditMode
                  ? "태그 정보를 수정해주세요."
                  : "일정,할일,메모를 그룹핑하여 관리할 수 있는 기능입니다."}
              </p>
            </div>

            <div className="pt-[30px] pb-[70px]">
              <input
                type="text"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="태그 이름"
                className="w-full border-b-2 outline-none"
                style={{
                  ...TYPOGRAPHY.Headline1,
                  color: tagName.trim() ? COLORS.gray2 : COLORS.gray5,
                  borderBottomColor: tagName.trim()
                    ? COLORS.gray3
                    : COLORS.gray5,
                }}
              />
              <div className="flex items-center justify-between pt-[12.5px]">
                <div className="w-[133px] flex items-center justify-between">
                  {/* 컬러 버튼 */}
                  <button
                    className="h-[28px] px-2.5 py-1 rounded-2xl flex items-center justify-between"
                    style={{
                      ...TYPOGRAPHY.Body3,
                      backgroundColor:
                        TAG_COLOR[selectedColor as keyof typeof TAG_COLOR] ||
                        COLORS.gray5,
                      color: COLORS.bg,
                    }}
                    ref={colorButtonRef}
                    onClick={openColorModal}
                  >
                    컬러
                    <img src={dropDown} alt="dropdown" className="pl-1" />
                  </button>
                  {/* 아이콘 버튼 */}
                  <button
                    className="h-[28px] min-w-[55px] px-2.5 py-1 rounded-2xl flex items-center justify-between"
                    style={{
                      ...TYPOGRAPHY.Body3,
                      backgroundColor:
                        selectedIcon && selectedColor
                          ? TAG_COLOR[selectedColor as keyof typeof TAG_COLOR]
                          : selectedIcon
                          ? COLORS.gray3
                          : COLORS.gray5,
                      color: COLORS.bg,
                    }}
                    ref={iconButtonRef}
                    onClick={openIconModal}
                  >
                    {selectedIcon && iconMap[selectedIcon] ? (
                      <div className="flex items-center">
                        <img
                          src={iconMap[selectedIcon]}
                          alt="selected icon"
                          className="w-4 h-4"
                        />
                        <img src={dropDown} alt="dropdown" className="pl-1" />
                      </div>
                    ) : (
                      <>
                        아이콘
                        <img src={dropDown} alt="dropdown" className="pl-1" />
                      </>
                    )}
                  </button>
                </div>

                {isEditMode && (
                  <button
                    className="flex items-center justify-center"
                    onClick={handleDelete}
                  >
                    <img src={trashCan} className="px-1" />
                    <p style={{ ...TYPOGRAPHY.Body2, color: COLORS.gray5 }}>
                      태그 삭제하기
                    </p>
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full py-3 rounded-full text-sm font-medium transition"
              style={{
                ...TYPOGRAPHY.Subtitle,
                backgroundColor: isFormValid ? COLORS.gray2 : COLORS.gray4,
                color: COLORS.bg,
                cursor: isFormValid ? "pointer" : "not-allowed",
              }}
            >
              {isEditMode ? "태그 수정" : "태그 추가"}
            </button>
          </div>
        </ModalWrapper>
      </div>

      {showColorModal && (
        <SetColorModal
          isOpen
          isPopup
          onClose={() => setShowColorModal(false)}
          onSelect={(color) => {
            setSelectedColor(color);
            setShowColorModal(false);
          }}
          containerStyle={{
            position: "fixed",
            top: colorModalPos.top,
            left: colorModalPos.left,
            zIndex: 9999,
          }}
        />
      )}

      {showIconModal && (
        <SetIconModal
          isOpen
          isPopup
          onClose={() => setShowIconModal(false)}
          onSelect={(iconId) => {
            setSelectedIconId(iconId);
            setSelectedIcon(`tagIcon${iconId}`);
            setShowIconModal(false);
          }}
          containerStyle={{
            position: "fixed",
            top: iconModalPos.top,
            left: iconModalPos.left,
            zIndex: 9999,
          }}
        />
      )}
    </>
  );
};

export default AddTagModal;
