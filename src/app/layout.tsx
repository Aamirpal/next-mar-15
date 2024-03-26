"use client";
import {ThemeContext, ThemeProvider} from "./context/ThemeContext";

import "./globals.css";
import {Inter} from "next/font/google";
import {Montserrat} from "next/font/google";
import {createContext, use, useContext} from "react";

const inter = Inter({subsets: ["latin"]});
const montserrat = Montserrat({subsets: ["latin"]});


interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    const {theme} = useContext(ThemeContext);
    return (
        <html lang="en" className={montserrat.className}>
        <body data-theme="light" className="">
        {children}
        </body>
        </html>
    );
}
