import React from "react";

interface DotIconProps {
  color?: string;
 onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}

const DotIcon: React.FC<DotIconProps> = ({
  color = "#D8D8D8",
  onClick,
  style,
  className,
}) => {
  return (
    <svg
      width="4"
      height="20"
      viewBox="0 0 4 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={style}
      className={className}
    >
      <circle cx="2" cy="2" r="2" fill={color} />
      <circle cx="2" cy="10" r="2" fill={color} />
      <circle cx="2" cy="18" r="2" fill={color} />
    </svg>
  );
};

export default DotIcon;
