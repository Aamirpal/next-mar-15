import Link from "next/link";
import React from "react";
import {IoMdNotificationsOutline} from "react-icons/io";
import {CgMenuGridR} from "react-icons/cg";
import {VscOrganization} from "react-icons/vsc";
import {GrUserSettings} from "react-icons/gr";
import {IoSettingsSharp} from "react-icons/io5";
import {PiUsersFourFill} from "react-icons/pi";
import {GrDocumentConfig} from "react-icons/gr";
import {MdNotificationImportant} from "react-icons/md";
import {ImParagraphRight} from "react-icons/im";
import {FaWpforms} from "react-icons/fa";


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
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><a>Home</a></li>
                        <li>Customers</li>
                    </ul>
                </div>
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
                        <div className="grid w-5 h-5 place-items-center">
                            <CgMenuGridR className="text-2xl"/>
                        </div>
                    </div>
                </div>
                <div>
                    <ul tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box grid grid-cols-2 gap-3"
                        style={{width: '550px'}}>
                        {/* Repeat for each <li> */}
                        <li>
                            <div className="border-2 flex items-start px-2 menu-div">
                                <Link href="" className="flex items-center">
                                    <VscOrganization className="text-2xl mr-2"/>
                                    <span className="truncate" style={{maxWidth: 'calc(100% - 2rem)'}}>Organization Profile</span> {/* Inline style for max-width */}
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="border-2 flex items-start px-2 menu-div">
                                <Link href="" className="flex items-center">
                                    <GrUserSettings className="text-2xl mr-2"/>
                                    <span className="truncate"
                                          style={{maxWidth: 'calc(100% - 2rem)'}}>Roles & Users</span>
                                </Link>
                            </div>
                        </li>

                        <li>
                            <div className="border-2 flex items-start px-2 menu-div">
                                <Link href="" className="flex items-center">
                                    <IoSettingsSharp className="text-2xl mr-2"/>
                                    <span className="truncate"
                                          style={{maxWidth: 'calc(100% - 2rem)'}}>Billing Settings</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="border-2 flex items-start px-2 menu-div">
                                <Link href="" className="flex items-center">
                                    <PiUsersFourFill className="text-2xl mr-2"/>
                                    <span className="truncate"
                                          style={{maxWidth: 'calc(100% - 2rem)'}}>Manage Clients</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="border-2 flex items-start px-2 menu-div">
                                <Link href="" className="flex items-start">
                                    <GrDocumentConfig className="text-2xl mr-2"/>
                                    <span className="truncate"
                                          style={{maxWidth: 'calc(100% - 2rem)'}}>Other Config</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="border-2 flex items-start px-2 menu-div">
                                <Link href="" className="flex items-center">
                                    <MdNotificationImportant className="text-2xl mr-2"/>
                                    <span className="truncate" style={{maxWidth: 'calc(100% - 2rem)'}}>System notifications</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="border-2 flex items-start px-2 menu-div">
                                <Link href="" className="flex items-center">
                                    <ImParagraphRight className="text-2xl mr-2"/>
                                    <span className="truncate"
                                          style={{maxWidth: 'calc(100% - 2rem)'}}>Report Templates</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="border-2 flex items-start px-2 menu-div">
                                <Link href="" className="flex items-center">
                                    <FaWpforms className="text-2xl mr-2"/>
                                    <span className="truncate"
                                          style={{maxWidth: 'calc(100% - 2rem)'}}>Form Builder</span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>

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
