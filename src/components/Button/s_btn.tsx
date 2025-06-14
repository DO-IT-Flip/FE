import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface SButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const SButton = ({ children, icon, className, ...props }: SButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-full text-white font-medium flex items-center justify-center h-8 min-w-[84px] px-3 text-sm gap-1",
        className
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default SButton;