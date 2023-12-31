import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface WidgetContainerProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({
  onClick,
  children,
  className = "",
}) => {
  const defaultClasses = twMerge(
    "flex justify-center flex-col items-center border border-[1px] border-white rounded-[26px] transition-all duration-300 ease-in-out hover:border-mpink hover:-translate-y-[3px]",
    className,
  );

  return (
    <div onClick={onClick} className={defaultClasses}>
      {children}
    </div>
  );
};

export default WidgetContainer;
