import { useState } from "react";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import TagAddModal from "./tagAdd";
import { COLORS } from "../../../../../assets/styles/gray_color/gray_color";

interface Tag {
  id: number;
  name: string;
  color: string; // HEX 색상
  icon: React.ReactNode;
}

interface TagModalProps {
  onClose: () => void;
}

const mockTags: Tag[] = [
  {
    id: 1,
    name: "식사",
    color: "#4DABF7", // 파랑
    icon: <span style={{ color: "#ffffff" }}>🍽️</span>,
  },
  {
    id: 2,
    name: "운동",
    color: "#FFA94D", // 주황
    icon: <span style={{ color: "#ffffff" }}>💪</span>,
  },
];

export default function TagModal({ onClose }: TagModalProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <>
             {" "}
      <div
        style={{
          width: 345,
          height: 270,
          padding: 16,
        }}
      >
                  {/* 제목 */}         {" "}
        <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.gray2 }}>
          태그
        </h2>
                 {" "}
        <p style={{ fontSize: 14, marginTop: 4, color: COLORS.gray4 }}>
                      태그를 사용해 일정을 정리하세요.          {" "}
        </p>
                  {/* 태그 추가 비활성 input */}         {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
                     {" "}
          <input
            disabled
            placeholder="태그추가"
            style={{
              backgroundColor: "transparent",
              borderBottom: `1px solid ${COLORS.gray5}`,
              color: COLORS.gray4,
              fontSize: 14,
              width: "100%",
              marginRight: 8,
              cursor: "not-allowed",
            }}
          />
                     {" "}
          <button
            onClick={() => setIsAddOpen(true)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
                          <FiPlus size={18} color={COLORS.gray4} />           {" "}
          </button>
                   {" "}
        </div>
                  {/* 태그 리스트 */}         {" "}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
                     {" "}
          {mockTags.map((tag) => (
            <div
              key={tag.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
                             {" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 8px",
                  backgroundColor: tag.color,
                  borderRadius: 9999,
                  color: "#fff",
                  fontSize: 14,
                }}
              >
                                  {tag.icon}                  {tag.name}       
                       {" "}
              </div>
                             {" "}
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                                  <FiEdit2 size={14} color={COLORS.gray4} />   
                           {" "}
              </button>
                           {" "}
            </div>
          ))}
                   {" "}
        </div>
               {" "}
      </div>
            {/* 태그 추가 모달 */}     {" "}
      {isAddOpen && (
        <TagAddModal
          onClose={() => setIsAddOpen(false)}
          onSubmit={(newTag) => {
            console.log("새 태그 추가됨", newTag);
            setIsAddOpen(false);
          }}
        />
      )}
         {" "}
    </>
  );
}
