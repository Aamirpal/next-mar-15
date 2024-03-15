"use client";

import { createContext, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ClientTheme({ children }) {
  const { theme } = useContext(ThemeContext);
  //   return <div className={`theme-${theme}`}>{children}</div>;
  return <div data-theme={theme}>{children}</div>;
}
