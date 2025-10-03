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
import RoleManagement from '../pages/RoleManagement ';
import BrandManagement from '../pages/BrandManagement';
import Subscriptions from '../pages/Subscriptions';
import AddBlog from '../pages/ContentManagement/components/Blog/AddBlog';
import AddFaq from '../pages/ContentManagement/components/Faq/AddFaq';
import SubSettings from '../pages/SubSettings';
import EditFaq from '../pages/ContentManagement/components/Faq/EditFaq';
import EditBlog from '../pages/ContentManagement/components/Blog/EditBlog';
import OneTimePayment from '../pages/OneTimePayment';
import ReportManagement from '../pages/ReportManagement';


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
          <Route path='/admin-management' element={<RoleManagement />} />
          <Route path='/brand-management' element={<BrandManagement />} />
          <Route path='/alerts' element={<Alerts />} />
          <Route path='/content-management' element={<ContentMangement />} />
          <Route path='/add-blog' element={<AddBlog />} />
          <Route path='/edit-blog/:id' element={<EditBlog />} />
          <Route path='/add-faq' element={<AddFaq />} />
          <Route path='/edit-faq/:id' element={<EditFaq />} />
          <Route path='/activity-logs' element={<ActivityLogs />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/subscriptions' element={<Subscriptions />} />
          <Route path='/report-management' element={<ReportManagement />} />
          <Route path='/pricing-settings' element={<SubSettings />} />
          <Route path='/one-time-payment' element={<OneTimePayment />} />
        </Route>

    

       

      

      </Routes>
    </div>
  )
}
