"use client";
import Link from "next/link";
import React, {useContext} from "react";
import {ThemeContext} from "../app/context/ThemeContext";
import {redirect} from "next/navigation";

const NavBar = () => {
    const {changeTheme} = useContext(ThemeContext);
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <div className="flex gap-12">
                            <button className="btn" onClick={() => changeTheme("light")}>
                                Light
                            </button>
                            <button
                                className="btn bg-gray-800 text-white"
                                onClick={() => changeTheme("dark")}
                            >
                                Dark
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => changeTheme("corporate")}
                            >
                                Corporate
                            </button>
                        </div>
                    </div>
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered w-24 md:w-auto"
                        />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a href="/public">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
