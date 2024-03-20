"use client";
import Link from "next/link";
import React from "react";
import LeftNavBar from "@/components/Navigation/LeftNavBar";
import Header from "@/components/Navigation/Header";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
    return (
        <>
            <div className="drawer min-h-screen bg-base-200 lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
                <main className="drawer-content">
                    <Header/>
                    <div className="grid grid-cols-8 grid-rows-[min-content] gap-y-12 p-4 lg:gap-x-12 lg:p-10">
                        {children}
                    </div>
                </main>
                <LeftNavBar/>
            </div>
        </>
    );
};
