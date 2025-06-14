import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface XLButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const XLButton = ({ children, className, ...props }: XLButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-full text-white font-medium flex items-center justify-center h-12 min-w-[204px] px-5 text-base",
        className
      )}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

export default XLButton;