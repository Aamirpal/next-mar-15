"use client";
import {Post} from "./model";
import {fetchPosts} from "./service";
import React, {useRef, useState, useEffect, Suspense} from 'react';
import SortingIcon from "@/components/Table/TableSortingIcon";
import Pagination from "@/components/Table/Pagination";
import {FaRegEye} from "react-icons/fa";
import {IoDocumentTextOutline} from "react-icons/io5";
import Drawer from "@/components/Drawer";
import {BsFilterCircle} from "react-icons/bs";
import {IoMdMore} from "react-icons/io";
import {TfiDownload} from "react-icons/tfi";
import {BiColumns} from "react-icons/bi";
import ColumnsAdjust from "@/components/Modals/ColumnsAdjust";
import {IoFilter} from "react-icons/io5";


interface PostsPageProps {
    posts: Post[];
}

interface SortingState {
    column: string | null;
    direction: 'asc' | 'desc' | null;
}


export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sorting, setSorting] = useState<SortingState>({column: null, direction: null});
    const searchInputRef = useRef(null);

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);

        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthIndex = date.getMonth(); // getMonth() is zero-based
        const monthName = monthNames[monthIndex];
        const year = date.getFullYear();

        return `${day}-${monthName}-${year}`;
    }

    const getTable = (posts: any[]) => {
        return !posts ?
            <div role="alert" className="alert shadow-lg bg-amber-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     className="stroke-info shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                    <h3 className="font-bold">No customers found!</h3>
                    <div className="text-xs">Create new customer to see the list</div>
                </div>
            </div>
            :
            <div className="overflow-x-auto">
                <table className="table bg-white table-xs min-w-full">
                    <thead style={{borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem'}}
                           className="text-base h-12 bg-primary text-white">

                    <tr>
                        <th></th>
                        <th onClick={() => handleSorting("name")}>
                            Name
                            <SortingIcon direction={sorting.column === 'name' ? sorting.direction : null}/>
                        </th>
                        <th onClick={() => handleSorting("city")}>
                            City
                            <SortingIcon direction={sorting.column === 'city' ? sorting.direction : null}/>
                        </th>
                        <th>
                            Contact
                            <SortingIcon direction="asc"/>
                        </th>
                        <th>
                            Admin User
                            <SortingIcon direction={null}/>
                        </th>
                        <th>Subscription Amount<SortingIcon direction={null}/></th>
                        <th>Customer Status<SortingIcon direction={null}/></th>
                        <th>Registered On<SortingIcon direction={null}/></th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {(posts.map(post => (
                        <tr key={post.id}>
                            <th></th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img
                                                src={`https://avatar.iran.liara.run/public/boy?username=${post.name}`}
                                                alt="Avatar Tailwind CSS Component"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{post.name}</div>
                                        <div className="text-sm opacity-50">{post.color}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {post.title}
                                <br/>
                                <span className="badge badge-ghost badge-sm">{post.body}</span>
                            </td>
                            <td>
                                <div className="badge badge-success rounded-sm">Active</div>
                            </td>
                            <td>{formatDate(post.createdAt)}</td>
                            <td>$1250.96</td>
                            <td>{formatDate(post.createdAt)}</td>
                            <td>{formatDate(post.createdAt)}</td>
                            <th>
                                <div className="flex items-center space-x-2">
                                    <FaRegEye className="text-base"/>
                                    <IoDocumentTextOutline className="text-base"/>
                                </div>
                            </th>
                        </tr>
                    )))}
                    </tbody>
                    {/* foot */}
                    {/*<tfoot>*/}
                    {/*<tr>*/}
                    {/*    <th></th>*/}
                    {/*    <th>Name</th>*/}
                    {/*    <th>City</th>*/}
                    {/*    <th>Contact</th>*/}
                    {/*    <th>Admin User</th>*/}
                    {/*    <th>Subscription Amount</th>*/}
                    {/*    <th>Customer Status</th>*/}
                    {/*    <th>Registered On</th>*/}
                    {/*    <th>Action</th>*/}
                    {/*</tr>*/}
                    {/*</tfoot>*/}
                </table>
                <div className="flex justify-between items-center">
                    <div className="badge badge-ghost">1-15 (Total 500 records)</div>
                    <Pagination/>
                </div>

            </div>;
    }


    useEffect(() => {
        const loadPosts = async () => {
            setIsLoading(true);
            // Include sorting parameters in the fetchPosts call
            const data = await fetchPosts();
            setPosts(data);
            setIsLoading(false);
        };

        loadPosts();
    }, [sorting]); // Re-fetch posts when sorting state changes

    const handleSorting = (column: string) => {
        setSorting(prev => ({
            column,
            direction: prev.column === column ? (prev.direction === 'asc' ? 'desc' : 'asc') : 'asc'
        }));
    };

    useEffect(() => {
        function handleKeyDown(event) {
            // Check if 'K' is pressed along with Cmd on Mac or Ctrl on other systems
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault(); // Prevent the default action to avoid any conflict with browser shortcuts
                searchInputRef.current.focus(); // Focus on the search input
                searchInputRef.current.select(); // Select the text inside the input
            }
        }

        // Add the event listener to the whole document
        document.addEventListener('keydown', handleKeyDown);

        // Remove the event listener on cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // The empty dependency array ensures the effect runs only once

    useEffect(() => {
        const loadPosts = async () => {
            const data = await fetchPosts();
            setPosts(data);
        };
        loadPosts().then(setIsLoading(false));
    }, []);

    const handleSearch = async (event: { target: { search: { value: String | undefined; }; }; }) => {
        setIsLoading(true);
        const data = await fetchPosts(event.target.value);
        setPosts(data);
        setIsLoading(false);
    };


    return (
        <div className="col-span-8">
            <Drawer/>
            <ColumnsAdjust
                columns={["Name", "City", "Contact", "Admin", "Subscription", "Customer", "Registered", "Action"]}/>
            {/*<input type="text" onChange={handleSearch}/>*/}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl m-4 ml-0">Customers</h1>
                </div>
                <div className="flex items-center gap-2">
                    <label className="input input-bordered flex items-center gap-4 "
                           onChange={handleSearch}>
                        <input ref={searchInputRef} type="text" className="grow" placeholder="Search"/>
                        <kbd className="kbd kbd-sm">⌘</kbd>
                        <kbd className="kbd kbd-sm">K</kbd>
                    </label>
                    
                    <div className="dropdown dropdown-bottom dropdown-end ">
                        <div tabIndex={0} role="button" className="btn">
                            <label htmlFor="my-drawer-4" className="drawer-button text-2xl"><IoFilter/></label>
                        </div>
                    </div>

                    <div className="dropdown dropdown-bottom dropdown-end ">
                        <div tabIndex={0} role="button" className="btn"><IoMdMore className='text-2xl'/></div>
                        <ul tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a><TfiDownload/>Export to Excel</a></li>
                            <li><a><TfiDownload/>Export to CSV</a></li>
                            <li><a onClick={() => document.getElementById('my_modal_3').showModal()}><BiColumns/>Config
                                columns</a></li>
                        </ul>
                    </div>
                </div>
            </div>


            {(isLoading ?
                    <div className="flex flex-col gap-4 w-full">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div> :
                    getTable(posts)
            )}
        </div>
    );
};
