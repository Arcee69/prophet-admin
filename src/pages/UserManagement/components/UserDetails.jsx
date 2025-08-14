import React, { useState } from 'react'
import Chart from "../../../assets/svg/chart.svg"
import Buttons from '../../../components/Buttons'

const UserDetails = ({ handleClose }) => {
  

  return (
    <div className='flex flex-col gap-5'>
        <img src={Chart} alt='Chart' className='w-[48px] h-[48px]' />
        <div className='flex flex-col gap-2'>
            <p className='font-jost text-DARK-300 text-[18px] font-medium leading-7'>User details</p>
        </div>
        <div className='flex gap-5 flex-col'>
            <div className='flex items-center gap-5'>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>ID</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>7474848438</p>
                </div>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>Name</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>Banks Olajide</p>
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>Email</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>Name@email.com</p>
                </div>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>Role</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>Analyst</p>
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>Date Added</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>21/01/25</p>
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
                text="Edit User"
                action={handleClose}
                textColor="text-white"
            />
        </div>
    </div>
  )
}

export default UserDetails