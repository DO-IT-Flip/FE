import { FiX } from "react-icons/fi";
import { COLORS } from "../../../../../assets/styles/gray_color/gray_color";
import { TAG_ICON_IDS, TagIconId } from "@/constants/tag_icon_list";

// 버튼 컴포넌트 
import IconPaletteButton from "@/components/Button/IconPaletteButton";

// SVG 아이콘 컴포넌트
import Camera from "@/components/Icon/tag/camera.svg"; 
import Meal from "@/components/Icon/tag/meal.svg";
import Hairsalon from "@/components/Icon/tag/hairsalon.svg";
import Hospital from "@/components/Icon/tag/hospital.svg";
import Alcohol from "@/components/Icon/tag/alcohol.svg";
import Coffee from "@/components/Icon/tag/coffee.svg";
import Friends from "@/components/Icon/tag/friends.svg";
import Study from "@/components/Icon/tag/study.svg";
import Shopping from "@/components/Icon/tag/shopping.svg";
import Document from "@/components/Icon/tag/document.svg";
import Sports from "@/components/Icon/tag/sports.svg";
import School from "@/components/Icon/tag/school.svg";

const ICON_COMPONENTS: Record<TagIconId, JSX.Element> = {
  camera: <Camera />,
  meal: <Meal />,
  hairsalon: <Hairsalon />,
  hospital: <Hospital />,
  alcohol: <Alcohol />,
  coffee: <Coffee />,
  friends: <Friends />,
  study: <Study />,
  shopping: <Shopping />,
  document: <Document />,
  sports: <Sports />,
  school: <School />,
};

interface TagIconPickerModalProps {
  selectedIcon: string | null;
  onSelect: (iconId: string) => void;
  onClose: () => void;
  selectedColor?: string; // 👉 선택된 색상 (배경색용)
}

export default function TagIconPickerModal({
  selectedIcon,
  onSelect,
  onClose,
  selectedColor,
}: TagIconPickerModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 50,
        backgroundColor: COLORS.bg,
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        padding: 16,
        width: 345,
        height: 220,
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 600, color: COLORS.gray2 }}>아이콘</h2>
        <button
          onClick={onClose}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <FiX
            size={18}
            color={COLORS.gray4}
            onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.gray2)}
            onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.gray4)}
          />
        </button>
      </div>

      <p style={{ fontSize: 14, color: COLORS.gray4, marginBottom: 16 }}>
        태그의 아이콘을 설정해보세요.
      </p>

      {/* 아이콘 목록 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 8,
        }}
      >
        {TAG_ICON_IDS.map((id) => (
          <IconPaletteButton
            key={id}
            icon={ICON_COMPONENTS[id]}
            selected={selectedIcon === id}
            selectedColor={selectedColor}
            onClick={() => onSelect(id)}
          />
        ))}
      </div>
    </div>
  );
}