import React, { use } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PiUsersThree } from 'react-icons/pi'
import Cookies from 'js-cookie'



import { logout } from '../../features/auth/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegCircleUser } from 'react-icons/fa6'

// import { logout } from '../../features/auth/loginSlice'

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
   <div className=''>

   </div>
  )
}

export default Sidebar
