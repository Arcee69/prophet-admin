import React, { use } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PiUsersThree } from 'react-icons/pi'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegCircleUser } from 'react-icons/fa6'
import { AiOutlineGift } from 'react-icons/ai'

import { logout } from '../../features/auth/loginSlice'

import LogoBlack from "../../assets/png/logo.png"

const Sidebar = ({ closeSidebar }) => {

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userLogin);
  console.log(user, "user in sidebar")


    const handleLogout = () => {
        dispatch(logout());
        Cookies.remove("userProps");
        Cookies.remove("token");
        navigate("/"); 
    };

  return (
    <div className='bg-[#FFFFFF] border w-full flex flex-col  py-[18px] px-[14px] h-full border-l-0 overflow-y-auto overflow-x-hidden border-t-0 border-r-[#E5E5EA]'>
        <div className={`lg:flex hidden flex-col  gap-1`}>
            <img src={LogoBlack} alt='LogoBlack' className='w-[132px]' /> {/* h-[57.14px] */}
        </div>

        <div className={`mt-[80px] lg:mt-[43px] flex flex-col gap-2.5 h-screen relative`}>
            <div 
                className={`${location.pathname === "/dashboard" ? "bg-ORANGE-100" : "bg-white"} flex items-center px-4 py-2.5 gap-[5px] shadow w-[260px] cursor-pointer group hover:bg-ORANGE-100 rounded-[6px]`}
                onClick={() => navigate("/dashboard")}
            >
                <AiOutlineGift className={`${location.pathname === "/dashboard" ? "text-white" : "text-GREY-400"} w-5 h-5  group-hover:text-white`} />
                <p className={`${location.pathname === "/dashboard" ? "text-white" : "text-GREY-400"} font-jost text-sm group-hover:text-white`}>Dashboard</p>
            </div>
            <div 
                className={`${location.pathname === "/user-management" ? "bg-ORANGE-100" : "bg-white"} flex items-center px-4 py-2.5 gap-[5px] shadow w-[260px] cursor-pointer group hover:bg-ORANGE-100 rounded-[6px]`}
                onClick={() => navigate("/user-management")}
            >
                <AiOutlineGift className={`${location.pathname === "/user-management" ? "text-white" : "text-GREY-400"} w-5 h-5  group-hover:text-white`} />
                <p className={`${location.pathname === "/user-management" ? "text-white" : "text-GREY-400"} font-jost text-sm group-hover:text-white`}>User Management</p>
            </div>
            <div 
                className={`${location.pathname === "/admin-management" ? "bg-ORANGE-100" : "bg-white"} flex items-center px-4 py-2.5 gap-[5px] shadow w-[260px] cursor-pointer group hover:bg-ORANGE-100 rounded-[6px]`}
                onClick={() => navigate("/admin-management")}
            >
                <AiOutlineGift className={`${location.pathname === "/admin-management" ? "text-white" : "text-GREY-400"} w-5 h-5  group-hover:text-white`} />
                <p className={`${location.pathname === "/admin-management" ? "text-white" : "text-GREY-400"} font-jost text-sm group-hover:text-white`}>Admin Management</p>
            </div>
            <div 
                className={`${location.pathname === "/brand-management" ? "bg-ORANGE-100" : "bg-white"} flex items-center px-4 py-2.5 gap-[5px] shadow w-[260px] cursor-pointer group hover:bg-ORANGE-100 rounded-[6px]`}
                onClick={() => navigate("/brand-management")}
            >
                <AiOutlineGift className={`${location.pathname === "/brand-management" ? "text-white" : "text-GREY-400"} w-5 h-5  group-hover:text-white`} />
                <p className={`${location.pathname === "/brand-management" ? "text-white" : "text-GREY-400"} font-jost text-sm group-hover:text-white`}>Brand Management</p>
            </div>
            <div 
                className={`${location.pathname === "/report-management" ? "bg-ORANGE-100" : "bg-white"} flex items-center px-4 py-2.5 gap-[5px] shadow w-[260px] cursor-pointer group hover:bg-ORANGE-100 rounded-[6px]`}
                onClick={() => navigate("/report-management")}
            >
                <AiOutlineGift className={`${location.pathname === "/report-management" ? "text-white" : "text-GREY-400"} w-5 h-5  group-hover:text-white`} />
                <p className={`${location.pathname === "/report-management" ? "text-white" : "text-GREY-400"} font-jost text-sm group-hover:text-white`}>Report Management</p>
            </div>
            <div 
                className={`${location.pathname === "/content-management"  || location.pathname === "/add-blog" || location.pathname === "/edit-blog" || location.pathname === "/add-faq"  ? "bg-ORANGE-100" : "bg-white"} flex items-center px-4 py-2.5 gap-[5px] shadow w-[260px] cursor-pointer group hover:bg-ORANGE-100 rounded-[6px]`}
                onClick={() => navigate("/content-management")}
            >
                <AiOutlineGift className={`${location.pathname === "/content-management" || location.pathname === "/add-blog" || location.pathname === "/edit-blog" || location.pathname === "/add-faq"   ? "text-white" : "text-GREY-400"} w-5 h-5  group-hover:text-white`} />
                <p className={`${location.pathname === "/content-management" || location.pathname === "/add-blog" || location.pathname === "/edit-blog" || location.pathname === "/add-faq" ? "text-white" : "text-GREY-400"} font-jost text-sm group-hover:text-white`}>Content Management</p>
            </div>
            <div 
                className={`${location.pathname === "/transactions" ? "bg-ORANGE-100" : "bg-white"} flex items-center px-4 py-2.5 gap-[5px] shadow w-[260px] cursor-pointer group hover:bg-ORANGE-100 rounded-[6px]`}
                onClick={() => navigate("/transactions")}
            >
                <AiOutlineGift className={`${location.pathname === "/transactions" ? "text-white" : "text-GREY-400"} w-5 h-5  group-hover:text-white`} />
                <p className={`${location.pathname === "/transactions" ? "text-white" : "text-GREY-400"} font-jost text-sm group-hover:text-white`}>Transactions</p>
            </div>
            <div 
                className={`${location.pathname === "/subscriptions" ? "bg-ORANGE-100" : "bg-white"} flex items-center px-4 py-2.5 gap-[5px] shadow w-[260px] cursor-pointer group hover:bg-ORANGE-100 rounded-[6px]`}
                onClick={() => navigate("/subscriptions")}
            >
                <AiOutlineGift className={`${location.pathname === "/subscriptions" ? "text-white" : "text-GREY-400"} w-5 h-5  group-hover:text-white`} />
                <p className={`${location.pathname === "/subscriptions" ? "text-white" : "text-GREY-400"} font-jost text-sm group-hover:text-white`}>Subscriptions</p>
            </div>
            <div 
                className={`${location.pathname === "/one-time-payment" ? "bg-ORANGE-100" : "bg-white"} flex items-center px-4 py-2.5 gap-[5px] shadow w-[260px] cursor-pointer group hover:bg-ORANGE-100 rounded-[6px]`}
                onClick={() => navigate("/one-time-payment")}
            >
                <AiOutlineGift className={`${location.pathname === "/one-time-payment" ? "text-white" : "text-GREY-400"} w-5 h-5  group-hover:text-white`} />
                <p className={`${location.pathname === "/one-time-payment" ? "text-white" : "text-GREY-400"} font-jost text-sm group-hover:text-white`}>On Time Payment</p>
            </div>
            <div 
                className={`${location.pathname === "/pricing-settings" ? "bg-ORANGE-100" : "bg-white"} flex items-center px-4 py-2.5 gap-[5px] shadow w-[260px] cursor-pointer group hover:bg-ORANGE-100 rounded-[6px]`}
                onClick={() => navigate("/pricing-settings")}
            >
                <AiOutlineGift className={`${location.pathname === "/pricing-settings" ? "text-white" : "text-GREY-400"} w-5 h-5  group-hover:text-white`} />
                <p className={`${location.pathname === "/pricing-settings" ? "text-white" : "text-GREY-400"} font-jost text-sm group-hover:text-white`}>Pricing Settings</p>
            </div>
        </div>

    </div>
  )
}

export default Sidebar
