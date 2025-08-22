import React, { useRef, useState } from 'react'
import Chart from "../../../assets/svg/chart.svg"
import { IoIosArrowDown } from 'react-icons/io'
import Buttons from '../../../components/Buttons'
import { useDispatch } from 'react-redux'
import { api } from '../../../services/api'
import { appUrls } from '../../../services/urls'
import { toast } from 'react-toastify'

const AddBulkBrand = ({ handleClose, fetchBrands }) => {
    const fileInputRefs = useRef(null);
    const [fileName, setFileName] = useState('');
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            let text = e.target.result;

            text = text.replace(/[^\w\s,]/g, '');

            const items = text?.split(',').map(item => item.trim());
            setBrands(items);
        };
        reader.readAsText(file);
    };

    
    const removeBrands = (brand) => {
        const newBrands = brands.filter((old) => old !== brand);
        setBrands(newBrands);
    };

    const addBrand = async () => {
        setLoading(true)
        const BrandData = {
            "names": brands.join(', '),
        }
        try {
            const res = await api.post(`${appUrls.BRANDS_URL}/bulk/create`, BrandData)
            console.log(res, "master")
            toast.success("Brand Created Successfully")
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
            <p className='font-jost text-DARK-300 text-[18px] font-medium leading-7'>New Brand</p>
            <p className='font-jost text-GREY-200 leading-5 text-sm'>Add a new brand(s) here</p>
        </div>
        <div className='flex flex-col gap-[5px]'>
            <label htmlFor='uploadFile'>Name</label>
            <div className='flex items-center mb-4 justify-between w-full border p-2 border-[#EDEDED] rounded-lg'>
                <div className='flex items-center flex-1'>
                    <input
                        type='text'
                        className='placeholder:text-[#D4D4D4] text-base font-jost w-full opacity-1 outline-none'
                        value={fileName}
                        placeholder='Upload csv file'
                        readOnly
                    />
                    <input
                        type='file'
                        className='hidden opacity-0 outline-none'
                        ref={fileInputRefs}
                        onChange={handleFileChange}
                        id='uploadFile'
                    />
                </div>
                <button
                    type="button"
                    onClick={() => fileInputRefs.current.click()}
                    className='bg-[#EDEDED] w-[116px] p-2 text-center font-inter text-base rounded'
                >
                    {fileName ? 'Remove' : 'Choose File'}
                </button>
            </div>
            {fileName && (
                <div className='w-full border rounded-lg border-grey-100 max-h-[312px] overflow-y-scroll p-5 flex flex-wrap gap-2'>
                    { 
                        brands?.map((item, index) => (
                            <div key={index} className='h-9 rounded-lg font-jost bg-[#EDEDED] px-4 flex items-center gap-[13.7px]'>
                                {item}
                                <svg className='cursor-pointer' onClick={() => removeBrands(item)} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.0007 5.5865L11.9504 0.636719L13.3646 2.05093L8.4149 7.0007L13.3646 11.9504L11.9504 13.3646L7.0007 8.4149L2.05093 13.3646L0.636719 11.9504L5.5865 7.0007L0.636719 2.05093L2.05093 0.636719L7.0007 5.5865Z" fill="black" />
                                </svg>
                            </div>
                        ))  
                    }
                </div>
            )}
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
                text="Create Brand"
                action={addBrand}
                textColor="text-white"
                loading={loading}
            />
        </div>
    </div>
  )
}

export default AddBulkBrand