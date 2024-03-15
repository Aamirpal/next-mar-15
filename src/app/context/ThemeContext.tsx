"use client";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  changeTheme: (theme: string) => {},
  theme: "light",
});

import React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
    const storedTheme = window.localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  if (!isMounted)
    return (
      <>
        <div className="max-w-full">
          <div className="flex gap-4 items-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </>
    );

  const changeTheme = (theme: string) => {
    setTheme(theme);
    window.localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
