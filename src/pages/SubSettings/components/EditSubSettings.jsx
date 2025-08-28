import React, { useState } from 'react'
import Chart from "../../../assets/svg/chart.svg"
import { IoIosArrowDown } from 'react-icons/io'
import Buttons from '../../../components/Buttons'
import { useDispatch } from 'react-redux'
import { api } from '../../../services/api'
import { appUrls } from '../../../services/urls'
import { toast } from 'react-toastify'

const EditSubSettings = ({ handleClose, fetchSubSettings, subSettingsData }) => {
    const [loading, setLoading] = useState(false)
    const [pricingPlanName, setPricingPlanName] = useState(subSettingsData?.name)
    const [monthlyAmount, setMonthlyAmount] = useState(subSettingsData?.monthly_amount)
    const [yearlyAmount, setYearlyAmount] = useState(subSettingsData?.annual_amount)

    const dispatch = useDispatch()

    const updatePricingPlan = async () => {
        setLoading(true)
        const PricingPlanData = {
            "name": pricingPlanName,
            "monthly_amount": monthlyAmount,
            "annual_amount": yearlyAmount,
        }
        try {
            const res = await api.put(`${appUrls.SUBSCRIPTION_SETTINGS_URL}/${subSettingsData?.id}`, PricingPlanData)
            console.log(res, "master")
            toast.success("Pricing plan Updated Successfully")
            await dispatch(fetchSubSettings())
            handleClose()
        } catch (err) {
            console.log(err, "Admin Error")
            toast.error(`${err.data.message}`)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex flex-col gap-5'>
        <img src={Chart} alt='Chart' className='w-[48px] h-[48px]' />
        <div className='flex flex-col gap-2'>
            <p className='font-jost text-DARK-300 text-[18px] font-medium leading-7'>Edit Pricing Plan</p>
            <p className='font-jost text-GREY-200 leading-5 text-sm'>Edit pricing plan here</p>
        </div>
        <div className='flex gap-5 flex-col'>
            <div className='flex flex-col gap-[5px]'>
                <p className='font-jost text-base leading-[100%] text-DARK-400'>Name</p>
                <div className='border-GREY-700 rounded-[8px] border h-[44px] p-2'>
                    <input 
                        name='pricingPlanName'
                        type='text'
                        placeholder='Enter Pricing Plan Name...'
                        value={pricingPlanName}
                        onChange={(e) => setPricingPlanName(e.target.value)}
                        className='w-full bg-transparent outline-none font-jost text-sm'
                    />
                </div>
            </div>
            <div className='flex flex-col gap-[5px]'>
                <p className='font-jost text-base leading-[100%] text-DARK-400'>Monthly Amount</p>
                <div className='border-GREY-700 rounded-[8px] border h-[44px] p-2'>
                    <input 
                        name='monthlyAmount'
                        type='text'
                        placeholder='Enter Monthly Amount...'
                        value={monthlyAmount}
                        onChange={(e) => setMonthlyAmount(e.target.value)}
                        className='w-full bg-transparent outline-none font-jost text-sm'
                    />
                </div>
            </div>
            <div className='flex flex-col gap-[5px]'>
                <p className='font-jost text-base leading-[100%] text-DARK-400'>Annual Amount</p>
                <div className='border-GREY-700 rounded-[8px] border h-[44px] p-2'>
                    <input 
                        name='annualAmount'
                        type='text'
                        placeholder='Enter Annual Amount...'
                        value={yearlyAmount}
                        onChange={(e) => setYearlyAmount(e.target.value)}
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
                text="Update Pricing Plan"
                action={updatePricingPlan}
                textColor="text-white"
                loading={loading}
            />
        </div>
    </div>
  )
}

export default EditSubSettings