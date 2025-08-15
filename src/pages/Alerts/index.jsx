import React, { useState } from 'react'
import { TfiArrowCircleRight } from 'react-icons/tfi'
import GlobalAlerts from './components/GlobalAlerts';
import FlaggedContent from './components/FlaggedContent';
import NotificationSettings from './components/NotificationSettings';

const Alerts = () => {
  const [activeTab, setActiveTab] = useState('globalAlerts');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='flex flex-col gap-[57px]'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
            <p className='text-DARK-300 text-[30px] font-jost leading-[38px] font-semibold'>Alert & Moderation</p>
            <p className='text-GREY-500 font-jost text-base leading-6'>Manage global alerts, moderate content, and control notifications</p>
        </div>
        <button
            type='button'
            className='w-[160px] p-4 rounded flex items-center justify-center gap-2 cursor-pointer bg-DARK-100'
            // onClick={() => setOpenAddNewModal(true)}
        >
            <p className='text-white font-jost leading-[100%] text-[20px]'>Add New</p>
            <TfiArrowCircleRight className='mt-[1.5px] w-4 h-4 text-white' />
        </button>
      </div>

      <div className='w-full bg-white rounded-[15px] pb-[30px]  flex flex-col gap-[15px]'>
        <div className='flex items-center border-b-[0.5px] border-BLUE-200 px-6 gap-4'>
          <button 
            className={`px-4 py-2 cursor-pointer font-jost ${activeTab === 'globalAlerts' ? 'border-b border-BLUE-300 text-BLUE-400' : 'text-GREY-1000'}`}
            onClick={() => handleTabChange('globalAlerts')}
          >
            Global Alerts
          </button>
          <button 
            className={`px-4 py-2 cursor-pointer font-jost ${activeTab === 'flaggedContent' ? 'border-b border-BLUE-300 text-BLUE-400' : 'text-GREY-1000'}`}
            // onClick={() => handleTabChange('flaggedContent')}
          >
            Flagged Content
          </button>
          <button 
            className={`px-4 py-2 cursor-pointer font-jost ${activeTab === 'notificationSettings' ? 'border-b border-BLUE-300 text-BLUE-400' : 'text-GREY-1000'}`}
            // onClick={() => handleTabChange('notificationSettings')}
          >
            Notification Settings
          </button>
        </div>

        {activeTab === 'globalAlerts' && <GlobalAlerts />}
        {activeTab === 'flaggedContent' && <FlaggedContent />}
        {activeTab === 'notificationSettings' && <NotificationSettings />}

      </div>

    </div>
  )
}

export default Alerts