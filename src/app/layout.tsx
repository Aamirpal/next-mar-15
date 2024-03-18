"use client";
import Footer from "./components/Footer";
import NavBar from "./components/TopNavBar";
import ClientTheme from "./context/ClientTheme";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";

import "./globals.css";
import { Inter } from "next/font/google";
import { createContext, use, useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <html lang="en">
      <body data-theme={theme}>{children}</body>
    </html>
  );
}
