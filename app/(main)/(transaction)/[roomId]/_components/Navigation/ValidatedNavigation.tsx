import React, { ReactNode } from "react";
import { BookingData } from "@/types/bookingData";
import { useValidatedNavigationContext } from "@/contexts/ValidatedNavigationContext";

interface ValidatedNavigationProps {
  to: string;
  requiredFields?: (keyof BookingData)[];
  children: ReactNode;
  useRoomId?: boolean;
}

const ValidatedNavigation: React.FC<ValidatedNavigationProps> = ({
  to,
  requiredFields = [],
  children,
  useRoomId = false,
}) => {
  const { navigate } = useValidatedNavigationContext();

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(useRoomId ? to : `/${to}`, requiredFields);
  };

  return (
    <div onClick={handleNavigation} style={{ cursor: "pointer" }}>
      {children}
    </div>
  );
};

export default ValidatedNavigation;
