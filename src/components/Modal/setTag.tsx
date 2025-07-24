import React, { useState, useEffect, useRef } from "react";
import closeIcon from "../../assets/icons/system/close2.svg?url";
import edit from "../../assets/icons/system/edit_modal.svg?url";
import plus from "../../assets/icons/system/plus_modal.svg?url";
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

import { TYPOGRAPHY } from "@src/assets/styles/typography";
import { COLORS } from "@src/assets/styles/gray_color";
import { getTags, updateTag, deleteTag } from "@src/api/tag";
import AddTagModal from "./addTag";
import { TAG_COLOR } from "@src/assets/styles/tag_color";
import ModalWrapper from "./ModalWrapper ";

interface Tag {
  tagId: number;
  name: string;
  color: string;
  iconId: number;
}

interface SetTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tag: Tag) => void;
  onAddTag?: () => void;
  onEditTag?: (tag: Tag) => void;
  containerStyle?: React.CSSProperties;
  isPopup?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
}

const SetTagModal: React.FC<SetTagModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  containerStyle,
  isPopup,
  innerRef,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // AddTagModal 상태 관리
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const [isSetTagVisible, setIsSetTagVisible] = useState(true);
  const [editTag, setEditTag] = useState<Tag | null>(null);

  const iconMap: { [key: number]: string } = {
    1: tagIcon1,
    2: tagIcon2,
    3: tagIcon3,
    4: tagIcon4,
    5: tagIcon5,
    6: tagIcon6,
    7: tagIcon7,
    8: tagIcon8,
    9: tagIcon9,
    10: tagIcon10,
    11: tagIcon11,
    12: tagIcon12,
  };

  const fetchTags = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTags();
      setTags(data);
    } catch (err) {
      console.error("태그 불러오기 실패:", err);
      setError("태그를 불러오는데 실패했습니다.");
      setTags([
        { tagId: 1, name: "식사", color: "#3FA9F5", iconId: 2 },
        { tagId: 2, name: "운동", color: "#FDBE60", iconId: 11 },
        { tagId: 3, name: "운동", color: "#FDBE60", iconId: 9 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTags();
    }
  }, [isOpen]);

  const handleOpenAddTag = () => {
    setEditTag(null);
    setIsAddTagOpen(true);
    setIsSetTagVisible(false);
  };

  const handleEditTag = (tag: Tag) => {
    setEditTag(tag);
    setIsAddTagOpen(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {isSetTagVisible && (
        <div ref={innerRef} className="absolute z-50" onClick={onClose}>
          <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <div
              className="relative w-[345px] min-h-[270px] p-6 rounded-xl bg-white"
              style={containerStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex justify-between pb-0.5">
                  <p style={{ ...TYPOGRAPHY.Headline1, color: COLORS.gray2 }}>
                    태그
                  </p>
                  <button onClick={onClose} aria-label="닫기">
                    <img src={closeIcon} alt="close" className="w-8 h-8" />
                  </button>
                </div>
                <p style={{ ...TYPOGRAPHY.Body1, color: COLORS.gray4 }}>
                  태그를 사용해 일정을 정리하세요.
                </p>
              </div>

              <button
                className="flex items-center justify-between w-[297px] pt-6 pb-5"
                onClick={handleOpenAddTag}
              >
                <p style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray5 }}>
                  태그추가
                </p>
                <img src={plus} alt="태그 추가" />
              </button>

              {error && (
                <div className="flex justify-center py-4">
                  <p style={{ ...TYPOGRAPHY.Body2, color: "#ef4444" }}>
                    {error}
                  </p>
                </div>
              )}

              {loading && !error && (
                <div className="flex justify-center py-4">
                  <p style={{ ...TYPOGRAPHY.Body2, color: COLORS.gray4 }}>
                    태그를 불러오는 중...
                  </p>
                </div>
              )}

              {!loading && !error && tags.length === 0 && (
                <div className="flex justify-center py-4">
                  <p style={{ ...TYPOGRAPHY.Body2, color: COLORS.gray4 }}>
                    등록된 태그가 없습니다.
                  </p>
                </div>
              )}

              {!loading &&
                tags.map((tag, index) => (
                  <div
                    key={tag.tagId}
                    className={`flex items-center justify-between w-[297px] ${
                      index === 0 ? "" : "pt-4"
                    } ${index === tags.length - 1 ? "pb-2" : ""}`}
                  >
                    <button
                      className="flex items-center"
                      onClick={() => onSelect(tag)}
                    >
                      <div
                        className="w-8 h-8 rounded-3xl flex items-center justify-center"
                        style={{
                          backgroundColor:
                            TAG_COLOR[tag.color as keyof typeof TAG_COLOR],
                        }}
                      >
                        {iconMap[tag.iconId] && (
                          <img
                            src={iconMap[tag.iconId]}
                            alt={tag.name}
                            className="w-8 h-8"
                          />
                        )}
                      </div>
                      <p
                        className="pl-1.5"
                        style={{
                          ...TYPOGRAPHY.Subtitle,
                          color: TAG_COLOR[tag.color as keyof typeof TAG_COLOR],
                        }}
                      >
                        {tag.name}
                      </p>
                    </button>
                    <button
                      onClick={() => handleEditTag(tag)}
                      aria-label={`${tag.name} 태그 편집`}
                    >
                      <img src={edit} alt="편집" />
                    </button>
                  </div>
                ))}
            </div>
          </ModalWrapper>
        </div>
      )}

      {/* 추가 및 수정용 모달 */}
      <AddTagModal
        isOpen={isAddTagOpen}
        onClose={() => {
          setIsAddTagOpen(false);
          setIsSetTagVisible(true); // 다시 보여줌
          fetchTags(); // 모달 닫힐 때 태그 목록 갱신
        }}
        editTag={editTag}
      />
    </>
  );
};

export default SetTagModal;
