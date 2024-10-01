import React from "react";
import Button from "../Button/Button";

interface BookingNavigationButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

const BookingNavigationButton: React.FC<BookingNavigationButtonProps> = ({
  onClick,
  isLoading = false,
  children,
}) => {
  return (
    <Button onClick={onClick} disabled={isLoading}>
      {isLoading ? "Processing..." : children}
    </Button>
  );
};

export default BookingNavigationButton;
