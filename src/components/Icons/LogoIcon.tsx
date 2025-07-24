import React from "react";

interface LogoIconProps {
  color?: string; // 기준색 (진한 쪽)
  style?: React.CSSProperties;
  className?: string;
}

function lightenColor(hex: string, amount = 0.3): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.round(((num >> 16) & 0xff) + 255 * amount));
  const g = Math.min(255, Math.round(((num >> 8) & 0xff) + 255 * amount));
  const b = Math.min(255, Math.round((num & 0xff) + 255 * amount));
  return `rgb(${r}, ${g}, ${b})`;
}

const LogoIcon: React.FC<LogoIconProps> = ({
  color,
  style,
  className,
}) => {
  const base = color ?? "#3A3A3A"; // 기본값
  const highlight = lightenColor(base, 0.4); // 접힌면용 밝은 색상

  return (
    <svg
      width="30"
      height="38"
      viewBox="0 0 30 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <rect
        x="0.375"
        y="0.3125"
        width="11.375"
        height="37.375"
        rx="1"
        fill={base}
      />
      <path
        d="M29.6246 11.6878L14.7155 26.1978C14.3205 26.5822 13.6801 26.5833 13.2838 26.2002L4.76443 17.9665C4.36611 17.5815 4.36542 16.955 4.76289 16.5692L17.8488 3.86752C18.2105 3.51643 18.7843 3.48206 19.1876 3.78732L29.6246 11.6878Z"
        fill={highlight}
      />
      <path
        d="M29.625 11.6875H0.374659V1.3125C0.374659 0.760215 0.822374 0.3125 1.37466 0.3125H25.5218C25.9651 0.3125 26.3555 0.604363 26.4809 1.02956L29.625 11.6875Z"
        fill={base}
      />
    </svg>
  );
};

export default LogoIcon;
