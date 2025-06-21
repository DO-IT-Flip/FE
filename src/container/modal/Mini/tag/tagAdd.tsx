import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { COLORS } from "../../../../../assets/styles/gray_color/gray_color";

import TagColorPickerModal from "@/components/MiniModal/TagColorPickerModal";
import TagIconPickerModal from "@/components/MiniModal/TagIconPickerModal";

interface TagAddModalProps {
  onClose: () => void;
  onSubmit: (tag: { name: string; color: string; icon: string }) => void;
  onDelete?: () => void;
}

export default function TagAddModal({
  onClose,
  onSubmit,
  onDelete,
}: TagAddModalProps) {
  const [tagName, setTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string>("Document");

  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isIconOpen, setIsIconOpen] = useState(false);
  const [hoverDelete, setHoverDelete] = useState(false);

  const isValid = tagName.trim() !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({
      name: tagName.trim(),
      color: selectedColor ?? COLORS.red,
      icon: selectedIcon,
    });
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
    onClose();
  };

  return (
    <>
           {" "}
      <Modal onClose={onClose}>
               {" "}
        <div
          style={{
            width: 529,
            height: 392,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
                   {" "}
          <div>
                       {" "}
            <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.gray2 }}>
              태그추가
            </h2>
                       {" "}
            <p style={{ fontSize: 14, marginTop: 10, color: COLORS.gray4 }}>
                            일정, 할일, 메모를 그룹핑하여 관리할 수 있는
              기능입니다.            {" "}
            </p>
                        {/* 입력창 */}
                       {" "}
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="태그이름"
              style={{
                marginTop: 24,
                width: "100%",
                borderBottom: `1px solid ${COLORS.gray5}`,
                backgroundColor: "transparent",
                color: isValid ? COLORS.gray2 : COLORS.gray3,
                fontSize: 14,
                padding: "8px 0",
                outline: "none",
              }}
            />
                        {/* 컬러 & 아이콘 버튼 */}           {" "}
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                           {" "}
              <button
                style={{
                  backgroundColor: COLORS.blue,
                  color: "#fff",
                  fontSize: 14,
                  padding: "4px 12px",
                  borderRadius: 9999,
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setIsColorOpen(true)}
              >
                                컬러 ▾              {" "}
              </button>
                           {" "}
              <button
                style={{
                  backgroundColor: COLORS.gray1,
                  color: COLORS.gray4,
                  fontSize: 14,
                  padding: "4px 12px",
                  borderRadius: 9999,
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setIsIconOpen(true)}
              >
                                아이콘 ▾              {" "}
              </button>
                         {" "}
            </div>
                        {/* 삭제 버튼 */}           {" "}
            <div
              onClick={handleDelete}
              onMouseEnter={() => setHoverDelete(true)}
              onMouseLeave={() => setHoverDelete(false)}
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                color: hoverDelete ? COLORS.gray1 : COLORS.gray4,
                cursor: "pointer",
              }}
            >
                            <FiTrash2 size={16} />              태그 삭제      
                   {" "}
            </div>
                     {" "}
          </div>
                    {/* 추가 버튼 */}         {" "}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            style={{
              marginTop: 24,
              width: "100%",
              padding: "12px 0",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 9999,
              color: "#fff",
              backgroundColor: isValid ? COLORS.gray2 : COLORS.gray4,
              cursor: isValid ? "pointer" : "not-allowed",
              border: "none",
            }}
          >
                        태그추가          {" "}
          </button>
                 {" "}
        </div>
             {" "}
      </Modal>
           {" "}
      {isColorOpen && (
        <TagColorPickerModal
          selectedColor={selectedColor ?? ""}
          onClose={() => setIsColorOpen(false)}
          onSelect={(color) => {
            setSelectedColor(color);
            setIsColorOpen(false);
          }}
        />
      )}
           {" "}
      {isIconOpen && (
        <TagIconPickerModal
          selectedIcon={selectedIcon}
          onSelect={(iconId) => {
            setSelectedIcon(iconId);
            setIsIconOpen(false);
          }}
          onClose={() => setIsIconOpen(false)}
        />
      )}
         {" "}
    </>
  );
}
