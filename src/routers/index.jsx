import React from 'react'
import { Route, Routes } from "react-router-dom";

import { AuthProtectRoutes, ProtectRoutes } from './ProtectRoute';
import Login from '../pages/Auth/Login';
// import ForgotPassword from '../pages/Auth/ForgotPassword';
// import VerifyOtp from '../pages/Auth/VerifyOtp';
// import ResetPassword from '../pages/Auth/ResetPassword';
// import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard';


export default function Routers() {

  return (
    <div>
      <Routes>

        <Route element={<AuthProtectRoutes />}>
          <Route path='/login' element={<Login />} />
          {/* <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/verify-otp' element={<VerifyOtp />} /> */}
    
        </Route>
        
         <Route element={<ProtectRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
        </Route>

    

       

      

      </Routes>
    </div>
  )
}
