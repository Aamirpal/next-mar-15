"use client";
import {Post} from "./model";
import {fetchPosts} from "./service";
import React, {useRef, useState, useEffect, Suspense} from 'react';


interface PostsPageProps {
    posts: Post[];
}

const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = date.getMonth(); // getMonth() is zero-based
    const monthName = monthNames[monthIndex];
    const year = date.getFullYear();

    return `${day}-${monthName}-${year}`;
}

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const searchInputRef = useRef(null);

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
        <div className="m-8 col-span-7">
            <h1 className="text-3xl font-bold">Posts</h1>
            {/*<input type="text" onChange={handleSearch}/>*/}
            <div className="m-4 flex justify-end">
                <label className="input input-bordered flex items-center gap-2" onChange={handleSearch}>
                    <input ref={searchInputRef} type="text" className="grow " placeholder="Search"/>
                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                </label>
            </div>

            {(isLoading ?
                    <div className="flex flex-col gap-4 w-full">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div> :
                    <table className="table bg-white m-6">
                        {/* head */}
                        <thead>
                        <tr>
                            {/*<th>*/}
                            {/*    <label>*/}
                            {/*        <input type="checkbox" className="checkbox"/>*/}
                            {/*    </label>*/}
                            {/*</th>*/}
                            <th></th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Created on</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {(posts ? posts.map(post => (
                            <tr>
                                <th></th>
                                {/*<th>*/}
                                {/*    <label>*/}
                                {/*        <input type="checkbox" className="checkbox"/>*/}
                                {/*    </label>*/}
                                {/*</th>*/}
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
                                <td>{formatDate(post.createdAt)}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                        )) : "No posts found.")}
                        </tbody>
                        {/* foot */}
                        <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Created on</th>
                            <th>Action</th>
                        </tr>
                        </tfoot>

                    </table>
            )}
            <div className="h-1/2">
                {(posts ? posts.map(post => (
                    // <div key={post.id} className="card w-96 bg-base-100 shadow-xl m-4">
                    //     <div className="card-body">
                    //         <h2 className="card-title">{post.title}</h2>
                    //         <p>{post.body}</p>
                    //     </div>
                    // </div>
                    <></>
                )) : "No posts found.")}
            </div>
        </div>
    );
};

// export default PostsPage;

// const Page = () => {
//     return (
//         <>
//             <Header/>
//             <section className="col-span-12 overflow-hidden bg-base-100 shadow-sm xl:col-span-12">
//                 <div className="card-body grow-0">
//                     <div className="flex justify-between gap-2">
//                         <h2 className="card-title grow">
//                             <a className="link-hover link">Recent user transactions</a>
//                         </h2>
//                         <button className="btn btn-sm">See all users</button>
//                         <button className="btn btn-sm">Settings</button>
//                     </div>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="table table-zebra h-full">
//                         <tbody>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?2"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Brice Swyre</div>
//                                         <div className="text-xs opacity-50">China</div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Sep 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_4"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 250 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?3"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Marjy Ferencz</div>
//                                         <div className="text-xs opacity-50">Russia</div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Sep 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_5"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 250 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?4"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Yancy Tear</div>
//                                         <div className="text-xs opacity-50">Brazil</div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Sep 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-down-right.svg"
//                                     className="inline-block h-5 w-5 text-error"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_6"
//                                 >
//                                     <path
//                                         d="M6.28 5.22a.75.75 0 00-1.06 1.06l7.22 7.22H6.75a.75.75 0 000 1.5h7.5a.747.747 0 00.75-.75v-7.5a.75.75 0 00-1.5 0v5.69L6.28 5.22z"/>
//                                 </svg>
//                                 250 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?5"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Marjy Ferencz</div>
//                                         <div className="text-xs opacity-50">Russia</div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Sep 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-down-right.svg"
//                                     className="inline-block h-5 w-5 text-error"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_7"
//                                 >
//                                     <path
//                                         d="M6.28 5.22a.75.75 0 00-1.06 1.06l7.22 7.22H6.75a.75.75 0 000 1.5h7.5a.747.747 0 00.75-.75v-7.5a.75.75 0 00-1.5 0v5.69L6.28 5.22z"/>
//                                 </svg>
//                                 250 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?6"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Jul 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_8"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 320 USD
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className="w-0">
//                                 <input type="checkbox" className="checkbox"/>
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-10 w-10">
//                                             <img
//                                                 src="https://picsum.photos/80/80?1"
//                                                 alt="Avatar Tailwind CSS Component"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-bold">Hart Hagerty</div>
//                                         <div className="text-xs opacity-50">
//                                             United States
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>Feb 2nd</td>
//                             <td>
//                                 <svg
//                                     data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
//                                     className="inline-block h-5 w-5 text-success"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     aria-hidden="true"
//                                     data-id="svg-loader_3"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 180 USD
//                             </td>
//                         </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </section>
//         </>
//     );
// };
//
// export default Page;