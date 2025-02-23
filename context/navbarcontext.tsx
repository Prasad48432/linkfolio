"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface NavbarContextType {
  isNavbarOpen: boolean;
  setIsNavbarOpen: (open: boolean) => void;
}

// Create context with default values
const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <NavbarContext.Provider value={{ isNavbarOpen, setIsNavbarOpen }}>
      {children}
    </NavbarContext.Provider>
  );
};

// Custom hook to use NavbarContext
export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};
