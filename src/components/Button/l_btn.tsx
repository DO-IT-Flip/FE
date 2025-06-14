import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface LButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const LButton = ({ children, className, ...props }: LButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-full text-white font-medium flex items-center justify-center h-12 min-w-[180px] px-4 text-base",
        className
      )}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

export default LButton;