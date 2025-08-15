import React, { useState } from 'react'
import Chart from "../../../assets/svg/chart.svg"
import Buttons from '../../../components/Buttons'

const RoleDetails = ({ handleClose }) => {
  
    const permissions = [
        "Ability to Log in and Log out",
        "Ability to manage database",
        "Ability to recover password",
        "Ability to update personal profile",
        "Ability to add/Enable users",
        "Ability to view",
        "Ability to view room",
        "Ability to view room",
        "Ability to view room",
    ];

  return (
    <div className='flex flex-col gap-5'>
        <img src={Chart} alt='Chart' className='w-[48px] h-[48px]' />
        <div className='flex flex-col gap-2'>
            <p className='font-jost text-DARK-300 text-[18px] font-medium leading-7'>Role details</p>
             <p className='font-jost text-GREY-200 leading-5 text-sm'>View Role Details here</p>
        </div>
        <div className='flex gap-3 flex-col'>
            <div className='flex flex-col w-full gap-2'>
                <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>Role</p>
                <p className='font-jost text-DARK-600 text-sm leading-[21px]'>Analyst</p>
            </div>
            <div className='flex flex-col w-full gap-2'>
                <p className='font-jost text-base leading-[100%] text-NEUTRAL-500'>Description</p>
                <p className='font-jost text-DARK-600 text-sm leading-[21px]'>
                    The Banking sector encompasses a wide range of financial institutions that provide services 
                    such as accepting deposits, offering loans, wealth management, currency exchange, and 
                    investment services. This sector includes retail banks, commercial banks, investment banks, 
                    and savings and loan associations. Banks play a crucial role in the economy by facilitating 
                    financial transactions, providing credit to individuals and businesses, and offering various 
                    financial products to meet the needs of their customers. The sector is highly regulated to 
                    ensure stability and protect the interests of depositors and investors.
                </p>
            </div>
            <div className='flex flex-col rounded-lg border-GREY-900 shadow border'>
                <div className='bg-GREY-50 px-8 py-4'>
                    <p className='text-GREY-200 font-jost text-sm'>Role has access to 0 Permissions</p>
                </div>
                <div className='grid grid-cols-3 '>
                    {permissions.map((perm, index) => (
                        <div key={index} className='flex items-center gap-2 border-t border-GREY-50 p-5'>
                            <input type='checkbox' className='w-4 h-4' />
                            <label className='font-jost whitespace-normal text-sm'>{perm}</label>
                        </div>
                    ))}

                </div>
            </div>
        </div>
        <div className='flex items-center gap-5'>
            <Buttons 
                className="w-full border border-GREY-800"
                text="Cancel"
                action={handleClose}
                textColor="text-GREY-300"
            />
            <Buttons 
                className="w-full bg-DARK-100"
                text="Edit Role"
                action={handleClose}
                textColor="text-white"
            />
        </div>
    </div>
  )
}

export default RoleDetails