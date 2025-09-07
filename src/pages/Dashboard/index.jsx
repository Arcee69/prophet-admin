import React, { useState } from 'react'

//Svgs
import ArrowUp from "../../assets/svg/arrow_up.svg"
import Chat from "../../assets/svg/chatb.svg"
import Pie from "../../assets/svg/pie.svg"
import Alert from "../../assets/svg/alert.svg"
import { AiOutlineWarning } from 'react-icons/ai'
import { FiPlus, FiThumbsUp } from 'react-icons/fi'
import { LuClipboardList, LuCreditCard } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { MdOutlineTrendingUp } from 'react-icons/md'
import { GoStop } from 'react-icons/go'


const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("Last 30 days")

  const navigate = useNavigate()

  // Bar Chart Data
  const channelData = [
      { name: 'Monthly', subscription: 1200 },
      { name: 'Quarterly', subscription: 800 },
      { name: 'Annual', subscription: 600},
      { name: 'Enterprise', subscription: 400 },
  ];

  const data = [
  {
    name: 'Jan',
    Transactions: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    Transactions: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    Transactions: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    Transactions: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    Transactions: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    Transactions: 3800,
    amt: 2500,
  },
];

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

        <div className='flex items-start gap-5'>
          <div className='bg-white h-[350px] flex flex-col gap-5 w-full rounded-3xl p-5'>
            <div className='flex items-center gap-4'>
              <MdOutlineTrendingUp className='w-5 h-5 text-[#E78020]'/>
              <p className='font-jost font-semibold text-[#6B7280] text-[18px] leading-6'>Transactions Trend</p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Transactions" stroke="#E78020" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full h-[350px] bg-white flex flex-col gap-5 rounded-3xl p-5">
            <div className='flex items-center gap-4'>
              <LuCreditCard className='w-5 h-5 text-[#E78020]'/>
              <p className='font-jost font-semibold text-[#6B7280] text-[18px] leading-6'>Subscription Distribution</p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="subscription" fill="#BDDAFF" name="Subscription" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='flex items-start gap-5'>
          <div className='py-[29px] bg-white rounded-3xl  w-full px-[25px] h-[350px] flex flex-col gap-[28px]'>
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
          
          <div className='py-[29px] bg-white rounded-3xl w-full px-[25px] h-[350px] flex flex-col gap-[28px]'>
            <p className='font-jost font-semibold text-[18px]  text-[#6B7280]'>
              Quick Actions
            </p>

            <div className="flex flex-col  gap-4 px-6">

              <div className="flex flex-col gap-4">
                <button onClick={() => navigate("/brand-management")} className="flex items-center gap-4 text-sm text-[#000] font-jost border border-[#E5E7EB] px-4 py-2 rounded-[10px] bg-[#F8FAFC]">
                  <FiPlus /> Add Brand
                </button>
                {/* <button className="flex items-center gap-4 text-sm text-[#000] font-jost border border-[#E5E7EB] px-4 py-2 rounded-[10px] bg-[#F8FAFC]">
                  <LuClipboardList /> Compare Brands
                </button>
                <button className="flex items-center gap-4 text-sm text-[#000] font-jost border border-[#E5E7EB] px-4 py-2 rounded-[10px] bg-[#F8FAFC]">
                  <FiThumbsUp /> Brand Health Check
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* <div className='bg-white rounded-3xl flex flex-col gap-6 w-full p-5'>
          <div className='flex items-center gap-4'>
            <GoStop className='w-5 h-5 text-[#E78020]' />
            <p className='font-jost font-semibold text-[#6B7280] text-[18px] leading-6'>Pending Brand Requests</p>
          </div>
          
        </div> */}

        <div className='bg-white rounded-3xl flex flex-col gap-6 w-full p-5'>
          <div className='flex items-center gap-4'>
            <GoStop className='w-5 h-5 text-[#E78020]' />
            <p className='font-jost font-semibold text-[#6B7280] text-[18px] leading-6'>Pending Brand Requests</p>
          </div>
          
          <div className="flex flex-col">
            <div className="grid grid-cols-4 bg-[#F1F3F9] px-4 py-2 font-jost text-[#667185] text-sm">
              <p>Name</p>
              <p>Requested By</p>
              <p>Date Created</p>
              <p></p>
            </div>
            <div className="grid grid-cols-4 px-4 py-3 border-b border-gray-200 items-center">
              <p className="text-[#101928] font-jost text-sm">Cocacola</p>
              <p className="text-[#101928] font-jost text-sm">Admin</p>
              <p className="text-[#101928] font-jost text-sm">21/12/2022</p>
              <div className="flex gap-2">
                <button className="bg-green-100 text-green-600 px-3 py-1 rounded-md flex items-center gap-1 font-jost text-sm">
                  ✓ Accept
                </button>
                <button className="bg-red-100 text-red-600 px-3 py-1 rounded-md flex items-center gap-1 font-jost text-sm">
                  ✕ Reject
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 px-4 py-3 border-b border-gray-200 items-center">
              <p className="text-[#101928] font-jost text-sm">Samsung PLC</p>
              <p className="text-[#101928] font-jost text-sm">System</p>
              <p className="text-[#101928] font-jost text-sm">21/12/2022</p>
              <div className="flex gap-2">
                <button className="bg-green-100 text-green-600 px-3 py-1 rounded-md flex items-center gap-1 font-jost text-sm">
                  ✓ Accept
                </button>
                <button className="bg-red-100 text-red-600 px-3 py-1 rounded-md flex items-center gap-1 font-jost text-sm">
                  ✕ Reject
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 px-4 py-3 border-b border-gray-200 items-center">
              <p className="text-[#101928] font-jost text-sm">Samsung PLC</p>
              <p className="text-[#101928] font-jost text-sm">Super Admin</p>
              <p className="text-[#101928] font-jost text-sm">21/12/2022</p>
              <div className="flex gap-2">
                <button className="bg-green-100 text-green-600 px-3 py-1 rounded-md flex items-center gap-1 font-jost text-sm">
                  ✓ Accept
                </button>
                <button className="bg-red-100 text-red-600 px-3 py-1 rounded-md flex items-center gap-1 font-jost text-sm">
                  ✕ Reject
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 px-4 py-3 items-center">
              <p className="text-[#101928] font-jost text-sm">Samsung PLC</p>
              <p className="text-[#101928] font-jost text-sm">Text</p>
              <p className="text-[#101928] font-jost text-sm">21/12/2022</p>
              <div className="flex gap-2">
                <button className="bg-green-100 text-green-600 px-3 py-1 rounded-md flex items-center gap-1 font-jost text-sm">
                  ✓ Accept
                </button>
                <button className="bg-red-100 text-red-600 px-3 py-1 rounded-md flex items-center gap-1 font-jost text-sm">
                  ✕ Reject
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