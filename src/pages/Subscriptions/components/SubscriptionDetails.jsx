import React, { useState } from 'react'
import Chart from "../../../assets/svg/chart.svg"
import Buttons from '../../../components/Buttons'

const SubscriptionDetails = ({ handleClose, subscriptionData }) => {
  
    console.log(subscriptionData, "subscriptionData")

  return (
    <div className='flex flex-col gap-5'>
        <img src={Chart} alt='Chart' className='w-[48px] h-[48px]' />
        <div className='flex flex-col gap-2'>
            <p className='font-jost text-DARK-300 text-[18px] font-medium leading-7'>Subscription details</p>
        </div>
        <div className='flex gap-5 w-[382px] flex-col'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] font-medium text-NEUTRAL-500'>Name</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>{subscriptionData.name || "N/A"}</p>
                </div>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] font-medium text-NEUTRAL-500'>Email</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>{subscriptionData.email || "N/A"}</p>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-[5px]'>
                    <p className='font-jost text-base font-medium leading-[100%] text-NEUTRAL-500'>Amount Paid</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>{subscriptionData.type === 'monthly' ? subscriptionData.monthly_amount : subscriptionData.annual_amount}</p>
                </div>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base font-medium leading-[100%] text-NEUTRAL-500'>Subscription Plan</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>{subscriptionData.subscription_plan.name}</p>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base font-medium leading-[100%] text-NEUTRAL-500'>Billing Cycle</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>{subscriptionData.type}</p>
                </div>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base font-medium leading-[100%] text-NEUTRAL-500'>Start Date</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>{subscriptionData.start_date}</p>
                </div>
            </div>
             <div className='flex items-center gap-5'>
                <div className='flex flex-col w-[133px] gap-[5px]'>
                    <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>End Date</p>
                    <p className='font-jost text-DARK-600 text-sm leading-[21px]'>{subscriptionData.end_date}</p>
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

export default SubscriptionDetails