import React, { useState } from 'react'
import Chart from "../../../assets/svg/chart.svg"
import Buttons from '../../../components/Buttons'

const SubSettingsDetails = ({ handleClose, subSettingsData }) => {
  
    console.log(subSettingsData, "subSettingsData")

  return (
    <div className='flex flex-col gap-5'>
        <img src={Chart} alt='Chart' className='w-[48px] h-[48px]' />
        <div className='flex flex-col gap-2'>
            <p className='font-jost text-DARK-300 text-[18px] font-medium leading-7'>Pricing Plan details</p>
        </div>
        <div className='flex gap-5 flex-col'>
            <div className='flex items-center gap-5'>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>ID</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>{subSettingsData.id?.slice(0, 8)}</p>
                </div>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>Name</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>{subSettingsData.name}</p>
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>Monthly Amount</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>${subSettingsData.monthly_amount}</p>
                </div>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>Yearly Amount</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>${subSettingsData.annual_amount}</p>
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>Date Added</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>{new Date(subSettingsData.created_at).toLocaleDateString()}</p>
                </div>
            </div>
        
        </div>
        <div className='flex items-center gap-5'>
            <Buttons 
                className="w-full border border-GREY-800"
                text="Close"
                action={handleClose}
                textColor="text-GREY-300"
            />
            {/* <Buttons 
                className="w-6/12 bg-DARK-100"
                text="Edit User"
                action={handleClose}
                textColor="text-white"
            /> */}
        </div>
    </div>
  )
}

export default SubSettingsDetails