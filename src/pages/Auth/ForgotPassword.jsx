import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FaArrowLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

import Logo from "../../assets/svg/logo_black.svg"
import Key from "../../assets/svg/key.svg"

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)

    const formValidationSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
    });

    const navigate = useNavigate()

    const submitForm = (values) => {
        localStorage.setItem("userEmail", values.email)
        navigate("/notify")
    }

  return (
    <div className='flex flex-col gap-[100px] w-full'>
        <div className='w-full p-[32px]'>
            <img src={Logo} alt='Logo' className='' />
        </div>

        <div className='flex flex-col gap-8 w-[360px] mx-auto'>
            <div className='flex flex-col items-center gap-3'>
                <img src={Key} alt='Key' className='' />
                <p className='font-jost text-DARK-300 font-semibold text-[30px] leading-[38px]'>Reset password</p>
                <p className='text-base font-jost whitespace-nowrap text-GREY-200'>As a first time user we’ll send you reset instructions.</p>
            </div>

            <Formik
                initialValues={{ email: '', }}
                validationSchema={formValidationSchema}
                onSubmit={(values) => {
                    submitForm(values)
                }}
            >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                    <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                        {/* Email Input */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-jost text-GREY-300 font-medium">Email</label>
                            <input
                                name="email"
                                type="text"
                                placeholder="Enter your email"
                                value={values.email}
                                onChange={handleChange}
                                className="border font-jost rounded-lg px-3 py-2 h-[48px] outline-none "
                            />
                            {errors.email && touched.email && <div className="text-RED-100 text-xs">{errors.email}</div>}
                        </div>


                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-black text-white w-full py-3 rounded-lg font-medium flex justify-center"
                        >
                            {loading ? <CgSpinner className="animate-spin text-lg" /> : 'Reset Password'}
                        </button>

                    </Form>
                )}
            </Formik>

            <div className='flex items-center gap-2 justify-center cursor-pointer' onClick={() => navigate("/")}>
                <FaArrowLeft className="w-5 h-5 text-GREY-200" />
                <p className='font-jost font-medium text-GREY-200 text-base'>Back to log in</p>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword