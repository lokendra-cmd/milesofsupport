"use client"
import { React, useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useDispatch,useSelector } from 'react-redux';
import { getData } from '@/app/actions/userAction';
import { setUser } from '@/app/StateManagment/Slices/currentUserSlice';
import { setSelectedUser } from '../StateManagment/Slices/selectedUserSlice';



const Navbar = () => {
    const { data: session } = useSession()
    const router = useRouter();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser)
    const [showDropdown, setshowDropdown] = useState(false)

    const handleSignout = () => {
        signOut().catch((error) => console.error("Error signing out", error));

    }

    useEffect(() => {
        if (session) {
            getData(session.user.email)
                .then((data) => {
                    let user={
                        name:data.name,
                        address:data.address,
                        topic:data.topic,
                        email:data.email,
                        username:data.username,
                    }
                    dispatch(setUser(user));
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    },[session])




return (
    <>

        <div className='grid grid-cols-[auto_auto] h-[10vh]  text-white items-center justify-between'>
            <div className="logo font-bold text-2xl ml-[4vw]">

            </div>
            <nav>
                <ul className='flex space-x-[4vw] mr-[4vw] font-semibold items-center justify-center'>
                    <li className='list-none '>
                        <form className="w-[30vw]">
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-1 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-[1vh] ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Creator, Topic..." required />
                                <button type="submit" className="text-white absolute end-0 top-0 font-medium rounded-lg text-sm px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ">Search</button>
                            </div>
                        </form>
                    </li>
                    <li className='list-none font-bold cursor-pointer hover:transform hover:scale-105'><Link href="/">Home</Link></li>
                    <li className='list-none font-bold cursor-pointer hover:transform hover:scale-105'><Link href="/about">About</Link></li>
                    {session && <li className='list-none font-bold cursor-pointer hover:transform hover:scale-105' onClick={() => {router.push(`/${currentUser.username}`) }}>Projects</li>}
                    {session && <li className='list-none font-bold cursor-pointer hover:transform hover:scale-105'><Link href="/dashboard">Dashboard</Link></li>}
                    {!session && <li className='list-none font-bold cursor-pointer hover:transform hover:scale-105'><Link href="/login">Login</Link></li>}
                    {!session && <li className='list-none font-bold cursor-pointer hover:transform hover:scale-105'><Link href="/login">Register</Link></li>}
                    {session && <li className='list-none font-bold cursor-pointer hover:transform hover:scale-105'>

                        <button onClick={() => setshowDropdown(!showDropdown)} onBlur={() => { setTimeout(() => { setshowDropdown(false) }, 1000); }} id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" type="button">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 me-2 rounded-full" src={session.user.image} alt="user photo" />
                            {session.user.name}
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        <div id="dropdownAvatarName" className={`z-10 ${showDropdown ? "" : "hidden"} absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div className="font-bold ">Login As</div>
                                <div className="truncate font-normal">{session.user.email}</div>
                            </div>


                            <div onClick={handleSignout} className="w-[100%] block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</div>

                        </div>

                    </li>}
                </ul>
            </nav>
        </div>



        {/* <div className='grid grid-cols-[auto_auto] h-[10vh]  text-white items-center justify-between'>
                    <div className="logo font-bold text-2xl ml-[4vw]">

                    </div>
                    <nav>
                        <ul className='flex space-x-[4vw] mr-[4vw] font-semibold'>
                            <li className='list-none font-bold cursor-pointer hover:transform hover:scale-105'><Link href="/">Home</Link></li>
                            <li className='list-none font-bold cursor-pointer hover:transform hover:scale-105'><Link href="/about">About</Link></li>
                            <li className='list-none font-bold cursor-pointer hover:transform hover:scale-105'><Link href="/projects">Projects</Link></li>
                            <li className='list-none font-bold cursor-pointer hover:transform hover:scale-105'><Link href="/login">Login</Link></li>
                            <li className='list-none font-bold cursor-pointer hover:transform hover:scale-105'><Link href="/login">Register</Link></li>
                        </ul>
                    </nav>
                </div> */}


    </>

)
}

export default Navbar;