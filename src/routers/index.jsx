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
import UserManagement from '../pages/UserManagement';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthPageLayout from '../layouts/AuthPageLayout';
import Alerts from '../pages/Alerts';
import ContentMangement from '../pages/ContentManagement';
import ActivityLogs from '../pages/ActivityLogs';
import Transactions from '../pages/Transactions';
import Settings from '../pages/Settings';
import RoleManagement from '../pages/RoleManagement ';


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
            <Route path='/user-management' element={<UserManagement />} />
            <Route path='/role-management' element={<RoleManagement />} />
            <Route path='/alerts' element={<Alerts />} />
            <Route path='/content-management' element={<ContentMangement />} />
            <Route path='/activity-logs' element={<ActivityLogs />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/settings' element={<Settings />} />
        </Route>

    

       

      

      </Routes>
    </div>
  )
}
