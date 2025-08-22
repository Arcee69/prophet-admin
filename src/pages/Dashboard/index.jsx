import React, { useState } from 'react'

//Svgs
import ArrowUp from "../../assets/svg/arrow_up.svg"
import Chat from "../../assets/svg/chatb.svg"
import Pie from "../../assets/svg/pie.svg"
import Alert from "../../assets/svg/alert.svg"
import { AiOutlineWarning } from 'react-icons/ai'
import { FiPlus, FiThumbsUp } from 'react-icons/fi'
import { LuClipboardList } from 'react-icons/lu'


const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("Last 30 days")

  return (
    <div className='flex flex-col gap-[57px]'>
      <div className='flex flex-col gap-1'>
        <p className='font-jost text-[#101928] font-semibold leading-[145%] text-[24px]'>Dashboard</p>
        <p className='text-[#667185] text-sm font-jost'>Welcome back! Here's what's happening on Prophet</p>
      </div>

      <div className='flex flex-col gap-[15px]'>
        {/* Small Stats Cards (Today Mentions, Total Mentions, etc.) */}
        <div className='flex gap-4'>

          <div className='bg-white rounded-[18px] p-4 w-3/12 shadow-sm flex flex-col gap-[45px]'>
            <div className='flex items-center justify-between'>
              <img src={ArrowUp} alt='ArrowUp' className='w-6 h-6' />
              <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className='font-jost text-[#98A2B3]  text-xs cursor-pointer bg-transparent border-none outline-none'
              >
                  {["Last 30 days", "Last 7 days"].map(year => (
                      <option key={year} value={year}>{year}</option>
                  ))}
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-[#667185] font-jost text-sm'>Today Brands</p>
              <div className='flex items-center gap-[14px]'>
                <h3 className='text-[#101928] font-inter text-[18px]  font-semibold'>247</h3>
                <div className='bg-[#E7F6EC] w-[40px] h-[17px] rounded-lg items-center flex justify-center p-2'>
                  <p className='text-[#036B26] font-inter text-xs font-medium'>+1.3%</p>
                </div>
              </div>
            </div>

          </div>

          <div className='bg-white rounded-[18px] p-4 w-3/12 shadow-sm flex flex-col gap-[45px]'>
            <div className='flex items-center justify-between'>
              <img src={Chat} alt='Chat' className='w-6 h-6' />
              <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className='font-jost text-[#98A2B3]  text-xs cursor-pointer bg-transparent border-none outline-none'
              >
                  {["Last 30 days", "Last 7 days"].map(year => (
                      <option key={year} value={year}>{year}</option>
                  ))}
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-[#667185] font-jost text-sm'>Registered Users</p>
              <div className='flex items-center gap-[14px]'>
                <h3 className='text-[#101928] font-inter text-[18px]  font-semibold'>3,024</h3>
                <div className='bg-[#E7F6EC] w-[40px] h-[17px] rounded-lg items-center flex justify-center p-2'>
                  <p className='text-[#036B26] font-inter text-xs font-medium'>+8%</p>
                </div>
              </div>
            </div>

          </div>

          <div className='bg-white rounded-[18px] p-4 w-3/12 shadow-sm flex flex-col gap-[45px]'>
            <div className='flex items-center justify-between'>
              <img src={Pie} alt='Pie' className='w-6 h-6' />
              <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className='font-jost text-[#98A2B3]  text-xs cursor-pointer bg-transparent border-none outline-none'
              >
                  {["Last 30 days", "Last 7 days"].map(year => (
                      <option key={year} value={year}>{year}</option>
                  ))}
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-[#667185] font-jost text-sm'>Active Subscriptions</p>
              <div className='flex items-center gap-[14px]'>
                <h3 className='text-[#101928] font-inter text-[18px]  font-semibold'>2,546</h3>
                <div className='bg-[#E7F6EC] w-[40px] h-[17px] rounded-lg items-center flex justify-center p-2'>
                  <p className='text-[#036B26] font-inter text-xs font-medium'>+2%</p>
                </div>
              </div>
            </div>
          </div>

        <div className='bg-white rounded-[18px] p-4 w-3/12 shadow-sm flex flex-col gap-[45px]'>
            <div className='flex items-center justify-between'>
              <img src={Alert} alt='Alert' className='w-6 h-6' />
              <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className='font-jost text-[#98A2B3]  text-xs cursor-pointer bg-transparent border-none outline-none'
              >
                  {["Last 30 days", "Last 7 days"].map(year => (
                      <option key={year} value={year}>{year}</option>
                  ))}
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-[#667185] font-jost text-sm'>Monthly Revenue</p>
              <div className='flex items-center gap-[14px]'>
                <h3 className='text-[#101928] font-inter text-[18px]  font-semibold'>$65,000</h3>
                <div className='bg-[#E7F6EC] w-[40px] h-[17px] rounded-lg items-center flex justify-center p-2'>
                  <p className='text-[#036B26] font-inter text-xs font-medium'>+2%</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className='bg-white rounded-3xl flex items-start justify-between'>
          <div className='py-[29px] w-full px-[25px] flex flex-col gap-[28px]'>
            <p className="text-[#6B7280] text-[18px] font-jost font-semibold">Recent Alerts</p>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: 'Sudden Spike',
                  time: '15 minutes ago',
                  desc: 'Unusual increase in mentions for Apple',
                },
                {
                  title: 'Sentiment Shift',
                  time: '2 hours ago',
                  desc: 'Negative sentiment growing for Samsung',
                },
                {
                  title: 'New Trend',
                  time: '5 hours ago',
                  desc: 'New hashtag trending: #AppleEvent',
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-[#FBFAF9] h-[68px] p-3 rounded-lg"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#D1A3520F] mt-1">
                    <AiOutlineWarning size={20} className='text-[#D1A352]' />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p className="font-medium text-sm font-jost text-[#0F1729]">
                      {alert.title}{' '}
                      <span className="font-normal text-[#65758B] text-xs ml-2">
                        {alert.time}
                      </span>
                    </p>
                    <p className="text-sm font-jost leading-5 text-[#0F1729]">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className='py-[29px] w-full px-[25px] flex flex-col gap-[28px]'>
            <p className='font-jost font-semibold text-[18px]  text-[#6B7280]'>
              Quick Actions
            </p>

            <div className="h-[294px] flex flex-col gap-4 px-6">

              <div className="flex flex-col gap-4">
                <button className="flex items-center gap-4 text-sm text-[#000] font-jost border border-[#E5E7EB] px-4 py-2 rounded-[10px] bg-[#F8FAFC]">
                  <FiPlus /> Add Brand to Track
                </button>
                <button className="flex items-center gap-4 text-sm text-[#000] font-jost border border-[#E5E7EB] px-4 py-2 rounded-[10px] bg-[#F8FAFC]">
                  <LuClipboardList /> Compare Brands
                </button>
                <button className="flex items-center gap-4 text-sm text-[#000] font-jost border border-[#E5E7EB] px-4 py-2 rounded-[10px] bg-[#F8FAFC]">
                  <FiThumbsUp /> Brand Health Check
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>


    </div>
  )
}

export default Dashboard