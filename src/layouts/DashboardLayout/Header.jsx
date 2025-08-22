import React, { useState, useRef, useEffect } from 'react'
import { IoSearch } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiUser } from 'react-icons/fi'
import { LuBell } from 'react-icons/lu'
import { IoIosArrowDown } from 'react-icons/io';

import Girl from "../../assets/png/girl.png"
import Chat from "../../assets/svg/chat.svg"
import { logout } from '../../features/auth/loginSlice';
import { useDispatch } from 'react-redux';

// import Note from "../../assets/svg/note.svg"
// import Bell from "../../assets/svg/bell.svg"



const Header = ({ toggleSidebar }) => {
    const [search, setSearch] = useState("")
    const [showLogout, setShowLogout] = useState(false)
    const logoutRef = useRef(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const location = useLocation()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (logoutRef.current && !logoutRef.current.contains(event.target)) {
                setShowLogout(false);
            }
        };

        if (showLogout) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showLogout]);

    const handleLogout = () => {
        dispatch(logout());
        Cookies.remove("userProps");
        Cookies.remove("token");
        navigate("/"); 
    };

  return (
    <div className='py-[18px] px-[28px] h-[72px]'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <GiHamburgerMenu className={`${location.pathname === "/report" ? "block" : "lg:hidden"} w-6 h-6 text-[#000]  cursor-pointer`} onClick={toggleSidebar} />
                {/* <img src={Note} alt='Note' className={`${location.pathname === "/report" ? "hidden" : "flex"} w-[28px] h-[28px]`}/> */}
                <p className='font-euclid text-[#00000066] cursor-pointer text-sm' onClick={() => {}}>
                    {location.pathname === "/report" ? "Report" : "Dashboard"}
                </p>
                <p className='font-euclid text-[#00000066] text-sm'>/</p>
                <p className='text-[#1C1C1C] font-euclid text-sm'>
                    {
                        location.pathname.includes("/users-management") ? "Users Management" : 
                        location.pathname.includes("/content-management") ? "Content Mangement" : 
                        location.pathname.includes("/transactions") ? "Transactions" : 
                        location.pathname.includes("/settings") ? "Settings" : "Overview"
                    }
                    
                </p>
            </div>

            {
                <div className='flex items-center gap-6'>
                    <div className='flex items-center gap-3'>
                        <div className='w-[450px] lg:flex items-center border border-[#E4E7EC] bg-[#fff] rounded-lg h-[36px] '>
                            <div className='bg-[#fff] h-full rounded-tl-lg rounded-bl-lg flex items-center p-2'>
                                <IoSearch className='w-4 h-4 text-[#00000066]' />
                            </div>
                            <input 
                                name='search'
                                value={search}
                                className='w-full bg-[#fff] font-jost h-full rounded-tr-lg rounded-br-lg p-2 outline-none'
                                placeholder='Search here...'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <LuBell className='w-5 h-5 text-[#9CA3AF]' />
                        <img src={Chat} alt='Chat' className='w-[25px] h-[25px]' />
                        <div ref={logoutRef} className='relative flex items-center gap-[7px] cursor-pointer' onClick={() => setShowLogout(!showLogout)}>
                            <img src={Girl} alt='Girl' className='w-[32px] h-[32px]' />
                            <IoIosArrowDown className='w-5 h-5 text-GREY-500' />
                            {showLogout && (
                                <div className='absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg p-2 z-10'>
                                    <button onClick={handleLogout} className='text-red-500 hover:text-red-700'>Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }


        </div>
    </div>
  )
}

export default Header
