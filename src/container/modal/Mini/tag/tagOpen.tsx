import type { ButtonHTMLAttributes, ReactNode } from "react";
import { COLORS } from "../../../../../assets/styles/gray_color/gray_color";

interface TagOpenButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

const TagOpenButton = ({
  children = "태그",
  className,
  ...props
}: TagOpenButtonProps) => {
  const defaultStyle: React.CSSProperties = {
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: 500,
    color: "#fff",
    padding: "6px 16px",
    backgroundColor: COLORS.gray4,
    border: "none",
    cursor: "pointer",
  };

  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type="button"
      {...props}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        ...defaultStyle,
        backgroundColor: isHover ? COLORS.gray3 : COLORS.gray4,
        ...(props.style || {}),
      }}
    >
      <span>{children}</span>
    </button>
  );
};

export default TagOpenButton;