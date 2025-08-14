import React from 'react'
import { Route, Routes } from "react-router-dom";

import { AuthProtectRoutes, ProtectRoutes } from './ProtectRoute';
import Login from '../pages/Auth/Login';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import VerifyOtp from '../pages/Auth/VerifyOtp';
// import ResetPassword from '../pages/Auth/ResetPassword';
import Dashboard from '../pages/Dashboard';
import Notify from '../pages/Auth/Notify';
import ResetPassword from '../pages/Auth/ResetPassword';


export default function Routers() {

  return (
    <div>
      <Routes>

        <Route element={<AuthProtectRoutes />}>
          <Route path='/' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/notify' element={<Notify />} />
          <Route path='/verify-otp' element={<VerifyOtp />} />
          <Route path='/reset-password' element={<ResetPassword />} />
    
        </Route>
        
         <Route element={<ProtectRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
        </Route>

    

       

      

      </Routes>
    </div>
  )
}
