import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
