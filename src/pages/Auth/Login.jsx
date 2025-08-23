import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {  useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';

import Logo from "../../assets/svg/logo_black.svg"

import { loginUser } from '../../features/auth/loginSlice';

import PasswordField from '../../components/InputFields/PasswordField';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const formValidationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const submitForm = (values) => {
    setLoading(true);
    const data = {
      email: values?.email,
      password: values?.password,
    };

    // navigate("/dashboard")

    dispatch(loginUser(data))
      .then((res) => {
        console.log(res, "best");
        if (res?.type === "user/loginUser/fulfilled") {
          setLoading(false);
          navigate("/user-management");
          // navigate("/dashboard");
        } else {
          setLoading(false);
        }
      });
  };



  return (
    <div className='flex flex-col gap-[100px] w-full'>
      <div className='w-full p-[32px]'>
        <img src={Logo} alt='Logo' className='' />
      </div>

      <div className='flex flex-col  gap-8 w-[360px] mx-auto'>
        <div className='flex flex-col gap-3'>
          <p className='font-jost text-DARK-300 font-semibold text-[30px] leading-[38px]'>Log in</p>
          <p className='text-base font-jost text-GREY-200'>Welcome back! Please enter your details.</p>
        </div>

        <Formik
          initialValues={{ email: '', password: '', check: false }}
          validationSchema={formValidationSchema}
          onSubmit={(values) => {
            submitForm(values)
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-jost font-medium">Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="Your Work email"
                  value={values.email}
                  onChange={handleChange}
                  className="border font-jost rounded-lg px-3 py-2 h-[48px] outline-none "
                />
                {errors.email && touched.email && <div className="text-RED-100 text-xs">{errors.email}</div>}
              </div>

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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="check" onChange={handleChange} />
                  <span className='font-jost '>Remember me</span>
                </label>
                <p
                  onClick={() => { navigate("/forgot-password"); window.scrollTo(0, 0) }}
                  className="text-BLUE-100 font-jost cursor-pointer hover:underline"
                >
                  Forgot password?
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-black text-white w-full py-3 rounded-lg font-medium flex justify-center"
              >
                {loading ? <CgSpinner className="animate-spin text-lg" /> : 'Sign In'}
              </button>

            </Form>
          )}
        </Formik>
      </div>

    </div>
  )
}

export default Login