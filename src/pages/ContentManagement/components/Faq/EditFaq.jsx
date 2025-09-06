import React, { useState } from 'react'
import 'react-quill-new/dist/quill.snow.css';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import { toast } from 'react-toastify';

import { api } from '../../../../services/api';
import { appUrls } from '../../../../services/urls';
import { CgSpinner } from 'react-icons/cg';
import { useLocation, useNavigate } from 'react-router-dom';


const EditFaq = () => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const formValidationSchema = Yup.object().shape({
        question: Yup.string().required("Question is Required"),
        answer: Yup.mixed().required("Answer is Required")
    });

    const { state } =  useLocation()

    const submitForm = async (values, actions) => {
        setLoading(true)
        const data = {
            "question": values.question,
            "answer": values.answer
        }
        await api.put(appUrls?.FAQ_URL + `/${state.id}`, data)
            .then((res) => {
                toast("Faq updated Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                })
                setLoading(false)
                actions.resetForm()
                navigate('/content-management')
            })
            .catch((err) => {
                console.log(err, "soso")
                toast(`${err?.data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                })
                setLoading(false)
            })

    }



    return (
        <div className='flex flex-col gap-5'>
            <p className='font-lato text-[20px] text-GREY-1150'>Edit Faq</p>
            <div className='w-full'>
                <Formik
                    initialValues={{
                        question: state.question || "",
                        answer: state.answer || "",
                        // category: "",
                    }}
                    validationSchema={formValidationSchema}
                    onSubmit={(values, action) => {
                        window.scrollTo(0, 0)
                        submitForm(values, action)
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        dirty,
                        isValid,
                        setFieldValue,
                        errors,
                        touched,
                        values,
                    }) => (
                        <Form onSubmit={handleSubmit} className="flex flex-col">
                            <div className='flex flex-col gap-6'>


                                <div className="flex flex-col ">
                                    <label htmlFor="Question" className="font-euclid text-sm">Question</label>
                                    <input
                                        name="question"
                                        placeholder="Type question here..."
                                        type="text"
                                        value={values.question}
                                        onChange={handleChange}
                                        className="rounded-lg border-[#909090] bg-white font-jost text-[#3A3A3C] outline-none w-full mt-1.5 h-[56px] border-solid  p-2 border"
                                    />
                                    {errors.question && touched.question ? (
                                        <div className='text-RED-_100 text-xs'>{errors.question}</div>
                                    ) : null}
                                </div>

                                <div className="flex flex-col ">
                                    <label htmlFor="Answer" className="font-euclid text-sm">Answer</label>
                                    <textarea
                                        name="answer"
                                        placeholder="Type answer here..."
                                        type="text"
                                        value={values.answer}
                                        onChange={handleChange}
                                        className="rounded-lg border-[#909090] bg-white font-jost text-[#3A3A3C] outline-none w-full mt-1.5 h-[200px] border-solid  p-2 border"
                                    ></textarea>
                                    {errors.answer && touched.answer ? (
                                        <div className='text-RED-_100 text-xs'>{errors.answer}</div>
                                    ) : null}
                                </div>
                              

                            </div>

                            <div className='flex items-center gap-10 justify-between'>
                                <button
                                    className="border border-[#CBD6E0] bg-white mt-5 text-[#fff] rounded-lg p-3 cursor-pointer w-full h-[54px] flex flex-col items-center justify-center"
                                    type="button"
                                    onClick={() => navigate("/content-management")}
                                >
                                    <p className='text-[#3F434A] text-sm font-jost text-center  font-medium'>Cancel</p>
                                </button>
                                <button
                                    className="bg-ORANGE-100 mt-5 text-[#fff] rounded-lg p-3 cursor-pointer w-full h-[54px] flex flex-col items-center justify-center"
                                    type="submit"
                                >
                                    <p className='text-[#fff] text-sm font-jost  text-center  font-medium'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : 'Update'}</p>
                                </button>

                            </div>
                  
                    
                        </Form>
                    )}
            </Formik>
        </div>
        </div >
     
    )
}

export default EditFaq