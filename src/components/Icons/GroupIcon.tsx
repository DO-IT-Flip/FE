import React from "react";
import GroupIcon from "@icons/system/group.svg";
import { COLORS } from "@styles/gray_color";

interface Props {
  color?: string;
  className?: string;
}

export default function groupIcon({
  color = COLORS.gray4,
  className,
}: Props) {
  return <GroupIcon fill={color} className={className} />;
}
