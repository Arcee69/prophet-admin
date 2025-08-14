import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const location = useLocation()
  const path = location.pathname

  return (
    <div className="flex h-screen  overflow-hidden">
      {/* Sidebar */}
      
      <div className={`fixed top-0 left-0 h-full bg-[#fff] z-50 transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } ${path === "/report" ? "" : "lg:translate-x-0 lg:w-[20%]"} `}>
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className={`${path === "/report" ? "" : "lg:w-[80%] lg:ml-[20%]"} flex flex-col w-full  h-full`}>
        {/* Fixed Header */}
        <div className={`${path === "/report" ? "" : "lg:w-[80%]" } fixed top-0 w-full  z-50 bg-white shadow-sm`}>
          <Header toggleSidebar={toggleSidebar} />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 mt-[72px] bg-[#fcfcfc] overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
