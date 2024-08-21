"use client";

import { useParams } from "next/navigation";
import { ValidatedNavigationProvider } from "@/contexts/ValidatedNavigationContext";

interface ClientValidatedNavigationWrapperProps {
  children: React.ReactNode;
}

const ClientValidatedNavigationWrapper: React.FC<
  ClientValidatedNavigationWrapperProps
> = ({ children }) => {
  const params = useParams();
  const roomId = params.roomId as string;

  return (
    <ValidatedNavigationProvider roomId={roomId}>
      {children}
    </ValidatedNavigationProvider>
  );
};

export default ClientValidatedNavigationWrapper;
