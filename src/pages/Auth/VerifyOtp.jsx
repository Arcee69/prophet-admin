import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FaArrowLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

import Logo from "../../assets/svg/logo_black.svg"
import Mail from "../../assets/svg/mail.svg"

const VerifyOtp = () => {
    const [loading, setLoading] = useState(false)

    const formValidationSchema = Yup.object().shape({
        otp: Yup.string().required('Otp is required'),
    });
    


    const navigate = useNavigate()

    const userEmail = localStorage.getItem("userEmail")

    const submitForm = () => {
        localStorage.removeItem("userEmail")
        navigate("/reset-password")
    }


  return (
    <div className='flex flex-col gap-[100px] w-full'>
            <div className='w-full p-[32px]'>
            <img src={Logo} alt='Logo' className='' />
        </div>

        <div className='flex flex-col gap-8 w-[360px] mx-auto'>
            <div className='flex flex-col items-center gap-3'>
                <img src={Mail} alt='Mail' className='' />
                <p className='font-jost text-DARK-300 font-semibold text-[30px] leading-[38px]'>Verify OTP</p>
                <p className='text-base font-jost text-center text-GREY-200'>Enter the otp sent to <br /> {userEmail || "Not Available"}</p>
            </div>

            <Formik
                initialValues={{ otp: '', }}
                validationSchema={formValidationSchema}
                onSubmit={(values) => {
                    submitForm(values)
                }}
            >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                    {/* Email Input */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-jost text-GREY-300 font-medium">OTP</label>
                        <input
                            name="otp"
                            type="text"
                            placeholder="Enter your otp"
                            value={values.otp}
                            onChange={handleChange}
                            className="border font-jost rounded-lg px-3 py-2 h-[48px] outline-none "
                        />
                        {errors.otp && touched.otp && <div className="text-RED-100 text-xs">{errors.otp}</div>}
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-black text-white w-full py-3 rounded-lg font-medium flex justify-center"
                    >
                        {loading ? <CgSpinner className="animate-spin text-lg" /> : 'Verify email'}
                    </button>

                </Form>
                )}
            </Formik>

            <div className='flex items-center justify-center gap-1'>
                <p className='font-jost text-GREY-200 text-sm leading-5'>Didn’t receive the email?</p>
                <p className='font-jost font-medium text-sm cursor-pointer'>Click to resend</p>
            </div>

            <div className='flex items-center gap-2 justify-center cursor-pointer' onClick={() => navigate("/")}>
                <FaArrowLeft className="w-5 h-5 text-GREY-200" />
                <p className='font-jost font-medium text-GREY-200 text-base'>Back to log in</p>
            </div>
        </div>
    </div>
  )
}

export default VerifyOtp