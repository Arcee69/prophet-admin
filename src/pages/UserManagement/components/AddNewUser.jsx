import React, { useState } from 'react'
import Chart from "../../../assets/svg/chart.svg"
import { IoIosArrowDown } from 'react-icons/io'
import Buttons from '../../../components/Buttons'

const AddNewUser = ({ handleClose }) => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [loading, setLoading] = useState(false)


  return (
    <div className='flex flex-col gap-5'>
        <img src={Chart} alt='Chart' className='w-[48px] h-[48px]' />
        <div className='flex flex-col gap-2'>
            <p className='font-jost text-DARK-300 text-[18px] font-medium leading-7'>New User</p>
            <p className='font-jost text-GREY-200 leading-5 text-sm'>Add a new User here</p>
        </div>
        <div className='flex gap-5 flex-col'>
            <div className='flex flex-col gap-[5px]'>
                <p className='font-jost text-base leading-[100%] text-DARK-400'>Name</p>
                <div className='border-GREY-700 rounded-[8px] border h-[44px] p-2'>
                    <input 
                        name='userName'
                        type='text'
                        placeholder='Enter Name...'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className='w-full bg-transparent outline-none font-jost text-sm'
                    />
                </div>
            </div>
            <div className='flex flex-col gap-[5px]'>
                <p className='font-jost text-base leading-[100%] text-DARK-400'>Role</p>
                <div className='border-GREY-700 flex items-center  rounded-[8px] border h-[44px] p-2'>
                    <select
                        name='role'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='appearance-none outline-none font-jost w-full'
                    >
                        <option value="Admin">Social Media Manager</option>
                        <option value="Super Admin">Brand Manager</option>
                    </select>
                    <IoIosArrowDown className='w-4 h-4 text-GREY-200' />
                </div>
            </div>
            <div className='flex flex-col gap-[5px]'>
                <p className='font-jost text-base leading-[100%] text-DARK-400'>Email</p>
                <div className='border-GREY-700 rounded-[8px] border h-[44px] p-2'>
                    <input 
                        name='email'
                        type='text'
                        placeholder='Enter Email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full bg-transparent outline-none font-jost text-sm'
                    />
                </div>
            </div>
        </div>
        <div className='flex items-center gap-5'>
            <Buttons 
                className="w-6/12 border border-GREY-800"
                text="Cancel"
                action={handleClose}
                textColor="text-GREY-300"
            />
            <Buttons 
                className="w-6/12 bg-DARK-100"
                text="Save User"
                action={handleClose}
                textColor="text-white"
                loading={loading}
            />
        </div>
    </div>
  )
}

export default AddNewUser