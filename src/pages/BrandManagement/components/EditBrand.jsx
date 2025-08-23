import React, { useState } from 'react'
import Chart from "../../../assets/svg/chart.svg"
import { IoIosArrowDown } from 'react-icons/io'
import Buttons from '../../../components/Buttons'
import { useDispatch } from 'react-redux'
import { api } from '../../../services/api'
import { appUrls } from '../../../services/urls'
import { toast } from 'react-toastify'

const EditBrand = ({ handleClose, fetchBrands, brandData }) => {
    const [brandName, setBrandName] = useState(brandData?.name)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const addBrand = async () => {
        setLoading(true)
        const BrandData = {
            "name": brandName,
        }
        try {
            const res = await api.put(`${appUrls.BRANDS_URL}/${brandData.id}` , BrandData)
            console.log(res, "master")
            toast.success("Brand Updated Successfully")
            await dispatch(fetchBrands())
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
            <p className='font-jost text-DARK-300 text-[18px] font-medium leading-7'>Edit Brand</p>
            <p className='font-jost text-GREY-200 leading-5 text-sm'>Edit brand here</p>
        </div>
        <div className='flex gap-5 flex-col'>
            <div className='flex flex-col gap-[5px]'>
                <p className='font-jost text-base leading-[100%] text-DARK-400'>Name</p>
                <div className='border-GREY-700 rounded-[8px] border h-[44px] p-2'>
                    <input 
                        name='brandName'
                        type='text'
                        placeholder='Enter Brand Name...'
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
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
                text="Update Brand"
                action={addBrand}
                textColor="text-white"
                loading={loading}
            />
        </div>
    </div>
  )
}

export default EditBrand