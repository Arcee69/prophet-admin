import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { CgSpinner } from 'react-icons/cg';
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import { useDispatch } from 'react-redux';


const DeleteSubSettings = ({ handleClose, subSettingsData, fetchSubSettings }) => {

    const [loading, setLoading] = useState(false)

    console.log(subSettingsData, "mask")

    const dispatch = useDispatch()


    const submitForm = async () => {
        setLoading(true);
        try {
            const res = await api.delete(appUrls?.SUBSCRIPTION_SETTINGS_URL + `/${subSettingsData?.id}`)
            console.log(res, "maga")
            toast.success(`${res.data.message}`)
            await dispatch(fetchSubSettings())
            handleClose()
        } catch (error) {
            console.error('Error deleting pricing plan:', error);
            toast.error('Failed to delete pricing plan. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='bg-[#fff] w-[300px] h-[200px] shadow-md mt-[100px] flex flex-col items-center p-8 gap-8 rounded-lg'>
            <p className='text-center text-lg font-medium font-jost text-DARK-500 '>Are you sure you want to delete this pricing plan?</p>
            <div className='flex justify-between gap-8'>
                <button className='border w-[100px] h-[50px] rounded-lg border-[#EB5757] bg-[#fff] text' onClick={handleClose}>
                    <p className='font-jost font-bold text-base text-[#EB5757]'>Cancel</p>
                </button>
                <button onClick={submitForm} className='bg-[#F4003D] w-[140px] border-none flex items-center justify-center p-2 rounded-lg'>
                    <p className='text-[#fff] text-base  font-jost text-center  font-medium'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> :  "Yes, Delete"}</p>

                </button>
            </div>
        </div>
    )
}

export default DeleteSubSettings