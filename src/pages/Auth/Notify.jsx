import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { FaArrowLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

import Logo from "../../assets/svg/logo_black.svg"
import Mail from "../../assets/svg/mail.svg"

const Notify = () => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const userEmail = localStorage.getItem("userEmail")

  return (
    <div className='flex flex-col gap-[100px] w-full'>
        <div className='w-full p-[32px]'>
            <img src={Logo} alt='Logo' className='' />
        </div>

        <div className='flex flex-col gap-8 w-[360px] mx-auto'>
            <div className='flex flex-col items-center gap-3'>
                <img src={Mail} alt='Mail' className='' />
                <p className='font-jost text-DARK-300 font-semibold text-[30px] leading-[38px]'>Check your email</p>
                <p className='text-base font-jost text-center text-GREY-200'>We sent a password reset link to <br /> {userEmail || "Not Available"}</p>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-black text-white w-full py-3 rounded-lg font-jost text-base font-medium flex justify-center"
                onClick={() => navigate("/verify-otp")}
            >
                {loading ? <CgSpinner className="animate-spin text-lg" /> : 'Enter code manually'}
            </button>

            <div className='flex items-center gap-2 justify-center cursor-pointer' onClick={() => navigate("/")}>
                <FaArrowLeft className="w-5 h-5 text-GREY-200" />
                <p className='font-jost font-medium text-GREY-200 text-base'>Back to log in</p>
            </div>
        </div>
    </div>
  )
}

export default Notify