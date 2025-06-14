// components/button/m_btn.tsx
import React from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface MButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const MButton = ({ children, icon, className, ...props }: MButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-full text-white font-medium flex items-center justify-center h-[52px] min-w-[192px] px-4 text-[14px] gap-2",
        className
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default MButton;
