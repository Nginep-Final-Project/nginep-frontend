import useValidatedNavigation from "@/hooks/booking/useValidatedNavigation";
import React, { createContext, useContext, ReactNode } from "react";

type ValidatedNavigationContextType = ReturnType<
  typeof useValidatedNavigation
> | null;

const ValidatedNavigationContext =
  createContext<ValidatedNavigationContextType>(null);

interface ValidatedNavigationProviderProps {
  roomId?: string;
  children: ReactNode;
}

export const ValidatedNavigationProvider: React.FC<
  ValidatedNavigationProviderProps
> = ({ roomId, children }) => {
  const navigation = useValidatedNavigation(roomId);

  return (
    <ValidatedNavigationContext.Provider value={navigation}>
      {children}
    </ValidatedNavigationContext.Provider>
  );
};

export const useValidatedNavigationContext = () => {
  const context = useContext(ValidatedNavigationContext);
  if (!context) {
    throw new Error(
      "useValidatedNavigationContext must be used within a ValidatedNavigationProvider"
    );
  }
  return context;
};