import Link from "next/link";
import React from "react";
import {IoMdNotificationsOutline} from "react-icons/io";


const Header: React.FC = () => {
    return (
        <header className="col-span-12 flex items-center gap-2 lg:gap-4 m-4">
            <label
                htmlFor="my-drawer"
                className="btn btn-square btn-ghost drawer-button lg:hidden"
            >
                <svg
                    data-src="https://unpkg.com/heroicons/20/solid/bars-3.svg"
                    className="h-5 w-5"
                />
            </label>
            <div className="grow">
                {/*<h1 className="lg:text-2xl lg:font-light">Dashboard</h1>*/}
            </div>
            <div>
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Global Search"*/}
                {/*    className="input input-sm max-sm:w-24"*/}
                {/*/>*/}
            </div>


            <div className="dropdown dropdown-end z-10">
                <div tabIndex={0} className="btn btn-circle btn-ghost">
                    <div className="indicator">
                        <span className="indicator-item badge badge-error"></span>
                        <div className="grid w-5 h-5 place-items-center">
                            <IoMdNotificationsOutline className="text-2xl"/>
                        </div>
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-3 w-80 rounded-box bg-base-100 p-2 shadow-2xl"
                >
                    <li>
                        <a className="gap-4">
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img src="https://avatar.iran.liara.run/public/boy?username=Green"/>
                                </div>
                            </div>
                            <span>
                      <b>Reminder</b>
                      <br/>
                      Your meeting is at 10am
                    </span>
                        </a>
                    </li>
                    <li>
                        <a className="gap-4">
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img src="https://avatar.iran.liara.run/public/boy?username=Mfd"/>
                                </div>
                            </div>
                            <span>
                      <b>New payment</b>
                      <br/>
                      Received $2500 from John Doe
                    </span>
                        </a>
                    </li>
                    <li>
                        <a className="gap-4">
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img src="https://avatar.iran.liara.run/public/boy?username=test"/>
                                </div>
                            </div>
                            <span>
                      <b>New payment</b>
                      <br/>
                      Received $1900 from Alice
                    </span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="dropdown-end dropdown z-10">
                <div tabIndex={0} className="avatar btn btn-circle btn-ghost">
                    <div className="w-10 rounded-full">
                        <img src="https://avatar.iran.liara.run/public/boy?username=Miriam Green"
                             alt="Profile picture"/>
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow-2xl"
                >
                    <li>
                        <a>Profile</a>
                    </li>
                    <li>
                        <a>
                            Inbox
                            <span className="badge badge-success">12</span>
                        </a>
                    </li>
                    <li>
                        <a>Settings</a>
                    </li>
                    <li>
                        <Link href="/public">Logout</Link>
                    </li>
                </ul>
            </div>
            {/* /dropdown */}
        </header>
    );
};

export default Header;
