import React, { useState } from "react";
import UploadIcon from "@icons/system/upload.svg?url";
import FilterIcon from "@icons/system/filter.svg?url";
import { COLORS } from "@src/assets/styles/gray_color";
import { TYPOGRAPHY } from "@styles/typography";
import AddTagModal from "@components/Modal/addTag";

export default function BottomSearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const parseInput = (text: string) => {
    const [month, day, time, ...titleArr] = text.split("/");
    return {
      date: `2025-${month}-${day}`,
      time: time,
      title: titleArr.join("/"),
    };
  };

  const handleUpload = () => {
    const parsed = parseInput(inputValue);
    console.log("업로드 준비 데이터:", parsed);
  };

  // 태그 모달 핸들러들
  const handleTagModalOpen = () => {
    setIsTagModalOpen(true);
  };

  const handleTagModalClose = () => {
    setIsTagModalOpen(false);
  };

  const handleTagAdd = (tagName: string) => {
    console.log("새 태그 추가:", tagName);
    // 여기서 태그 추가 로직을 구현하세요
    handleTagModalClose();
  };

  return (
    <>
      <div className="w-full p-8 flex items-center">
        {/* 좌측 */}
        <div className="flex-1 justify-start">{/*공백*/}</div>
        {/* 중앙 */}
        <div className="flex-1 justify-center">
          <div
            className="w-[744px] px-4 py-2 rounded-4xl flex items-center"
            style={{
              backgroundColor: COLORS.gray6,
            }}
          >
            <input
              type="text"
              placeholder="EX) 05월/01일/15시50분/커피챗"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                ...TYPOGRAPHY.Subtitle,
                backgroundColor: "transparent",
                color: COLORS.gray1,
                marginLeft: 12,
                border: "none",
                outline: "none",
                flex: 1,
              }}
            />
            <img
              src={UploadIcon}
              alt="upload"
              onClick={handleUpload}
              style={{
                width: 32,
                height: 32,
                marginLeft: 8,
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        {/* 우측 */}
        <div className="flex-1 justify-end">
          {/* 태그 버튼 */}
          <button
            className="px-[21px] py-2 rounded-4xl flex gap-1 items-center justify-center justify-self-end"
            style={{
              backgroundColor: COLORS.gray4,
              color: COLORS.bg,
              cursor: "pointer",
              ...TYPOGRAPHY.Body3,
            }}
            onClick={handleTagModalOpen} // 클릭 핸들러 추가
          >
            <span>태그</span>
            <img src={FilterIcon} alt="icon" style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </div>

      {/* AddTagModal 추가 */}
      <AddTagModal
        isOpen={isTagModalOpen}
        onClose={handleTagModalClose}
        onAdd={handleTagAdd}
      />
    </>
  );
}