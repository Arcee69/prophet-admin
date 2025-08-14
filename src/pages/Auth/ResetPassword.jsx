import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {  useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';

import Logo from "../../assets/svg/logo_black.svg"

import PasswordField from '../../components/InputFields/PasswordField';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const formValidationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  });

  const submitForm = (values) => {
    setLoading(true);
    const data = {
      password: values?.password,
      confirmPassword: values?.confirmPassword,
    };
    navigate("/")

  };



  return (
    <div className='flex flex-col gap-[100px] w-full'>
      <div className='w-full p-[32px]'>
        <img src={Logo} alt='Logo' className='' />
      </div>

      <div className='flex flex-col  gap-8 w-[360px] mx-auto'>
        <div className='flex flex-col gap-3'>
          <p className='font-jost text-DARK-300 font-semibold text-[30px] leading-[38px]'>Reset Password</p>
          <p className='text-base font-jost text-GREY-200'>Enter New Password.</p>
        </div>

        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={formValidationSchema}
          onSubmit={(values) => {
            submitForm(values)
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
             
              {/* Password Input */}
              <div className="flex flex-col">
                <label className="text-sm font-jost font-medium">Password</label>
                <PasswordField
                  name="password"
                  value={values.password}
                  placeholder="Password"
                  className="border w-full h-[48px] font-jost rounded-lg outline-none text-gray-700"
                  onChange={handleChange}
                />
                {errors.password && touched.password && <div className="text-RED-100 text-xs">{errors.password}</div>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-jost font-medium">Confirm Password</label>
                <PasswordField
                  name="confirmPassword"
                  value={values.confirmPassword}
                  placeholder="Confirm Password"
                  className="border w-full h-[48px] font-jost rounded-lg outline-none text-gray-700"
                  onChange={handleChange}
                />
                {errors.confirmPassword && touched.confirmPassword && <div className="text-RED-100 text-xs">{errors.confirmPassword}</div>}
              </div>


              {/* Submit Button */}
              <button
                type="submit"
                className="bg-black text-white w-full py-3 rounded-lg font-medium flex justify-center"
              >
                {loading ? <CgSpinner className="animate-spin text-lg" /> : 'Submit'}
              </button>

            </Form>
          )}
        </Formik>
      </div>

    </div>
  )
}

export default ResetPassword