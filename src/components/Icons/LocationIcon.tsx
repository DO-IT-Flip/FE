import React from "react";
import LocationIcon from "@icons/system/location.svg";
import { COLORS } from "@styles/gray_color";

interface Props {
  color?: string;
  className?: string;
}

export default function locationIcon({
  color = COLORS.gray4,
  className,
}: Props) {
  return <LocationIcon fill={color} className={className} />;
}
