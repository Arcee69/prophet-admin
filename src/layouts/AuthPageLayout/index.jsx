import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthBanner from "../../assets/png/auth_banner.png"


const AuthPageLayout = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-[#FFF] flex items-start">
      <div className="w-6/12">
        <Outlet />
      </div>
      <div className='w-6/12'>
        <img src={AuthBanner} alt='AuthBanner' className='' />
      </div>
    </div>
  );
};

export default AuthPageLayout;
