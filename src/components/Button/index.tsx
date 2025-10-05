import React from "react";
import "./styles.scss";
import type { ButtonProps } from "../../types/components";

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", ...props }) => {
  return (
    <button className={`ui-btn ${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
