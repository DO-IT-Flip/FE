import { ComponentType } from "react";

export interface Tag {
  id: string;
  name: string; // 예: "식사", "운동"
  color: string; // 예: "#FFA94D"
  colorName: string; // 예: "orange"
  iconComponent: ComponentType; // React 컴포넌트 타입
}
