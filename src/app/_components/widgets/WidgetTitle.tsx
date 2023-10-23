import React, { ReactNode } from "react";

interface WidgetTitleProps {
  children: ReactNode;
  className?: string; // for any additional styles you might want to add later
}

const WidgetTitle: React.FC<WidgetTitleProps> = ({
  children,
  className = "",
}) => {
  const defaultClasses = `text-2xl font-light ${className}`;

  return <div className={defaultClasses}>{children}</div>;
};

export default WidgetTitle;
