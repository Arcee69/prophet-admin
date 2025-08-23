import React, { useState } from 'react'
import { CustomToolbar } from './CustomToolbar'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Form, Formik } from 'formik';
import { MdClose } from 'react-icons/md';
import * as Yup from 'yup'
import { toast } from 'react-toastify';

import Upload from "../../../../assets/svg/uploadIcon.svg"

import { api } from '../../../../services/api';
import { appUrls } from '../../../../services/urls';
import { CgSpinner } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const formValidationSchema = Yup.object().shape({
        title: Yup.string().required("Blog Title is Required"),
        imageDoc: Yup.mixed().required('Blog Image is required'),
        description: Yup.mixed().required("Contest Description is Required")
    });

    const submitForm = async (values, actions) => {
        setLoading(true)
        const formData = new FormData()
        formData.append("title", values?.title);
        formData.append("status", "publish");
        formData.append("body", values?.description);
        formData.append("image", values?.imageDoc);
        // formData.append("category", values?.category);

        await api.post(appUrls?.BLOGS_URL, formData)
            .then((res) => {
                toast("Blog created Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                })
                setLoading(false)
                actions.resetForm()
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
            <p className='font-lato text-[20px] text-GREY-1150'>Create Blog</p>
            <div className='w-full'>
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        category: "",
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

                                <div className='flex flex-col w-full gap-6'>
                                    {values?.imageDoc
                                        ?
                                        <div className="pt-0 " >
                                            <img alt="upload" width={"300px"} height={"100px"} src={URL.createObjectURL(values?.imageDoc)} />
                                        </div>

                                        :
                                        <label className="flex flex-col xs:w-full  h-56 py-4 px-0  border-2 bg-[#FAFCFF] border-BLUE-_200 border-dashed">
                                            <div className="flex flex-col my-auto items-center">
                                                <img src={Upload} alt="upload" className='text-black'/>
                                                <div className="text-center font-medium text-sm text-black">
                                                    Click to upload Thumbnails <span className='block text-black'>PNG or JPG (max 5mb)</span>
                                                </div>
                                            </div>
                                            <input
                                                type="file"
                                                name="imageDoc"
                                                value={values?.imageDoc}
                                                className="opacity-0"
                                                onChange={(e) => { setFieldValue("imageDoc", e.target.files[0]) }}
                                                id="upload"
                                                accept={"image/*"}
                                                multiple={false}
                                            />
                                        </label>
                                    }
                                    {errors.imageDoc && touched.imageDoc ?
                                        <div className='text-RED-_100'>{errors.imageDoc}</div>
                                        : null
                                    }
                                </div>


                                <div className="flex flex-col ">
                                    <label htmlFor="Topic" className="font-euclid text-sm">Title</label>
                                    <input
                                        name="title"
                                        placeholder="Type title here..."
                                        type="text"
                                        value={values.title}
                                        onChange={handleChange}
                                        className="rounded-lg border-[#E5E5EA] bg-white font-jost text-[#3A3A3C] outline-none w-full mt-1.5 h-[56px] border-solid  p-2 border"
                                    />
                                    {errors.title && touched.title ? (
                                        <div className='text-RED-_100 text-xs'>{errors.title}</div>
                                    ) : null}
                                </div>
                              
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="Content" className="font-euclid text-sm">Content</label>
                                    <CustomToolbar />
                                    <ReactQuill
                                        theme="snow"
                                        value={values.description}
                                        onChange={(e) => setFieldValue("description", e)}
                                        modules={modules}
                                        formats={formats}
                                        style={{ backgroundColor: "#fff", minHeight: "193px", border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}
                                        className="lg:w-full h-[50vh] bg-white mt-1.5 outline-none"
                                    />

                                    {errors.description && touched.description ?
                                        <div className='text-RED-_100'>{errors.description}</div>
                                        : null
                                    }
                                </div>

                            </div>

                            <div className='flex items-center gap-10 justify-between'>
                                <button
                                    className="border border-[#CBD6E0] bg-white mt-5 text-[#fff] rounded-lg p-3 cursor-pointer w-full h-[54px] flex flex-col items-center justify-center"
                                    type="button"
                                    onClick={() => navigate("/content-management")}
                                >
                                    <p className='text-[#3F434A] text-sm font-jost text-center  font-medium'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : 'Cancel'}</p>
                                </button>
                                <button
                                    className="bg-ORANGE-100 mt-5 text-[#fff] rounded-lg p-3 cursor-pointer w-full h-[54px] flex flex-col items-center justify-center"
                                    type="submit"
                                >
                                    <p className='text-[#fff] text-sm font-jost  text-center  font-medium'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : 'Create'}</p>
                                </button>

                            </div>
                  
                    
                        </Form>
                    )}
            </Formik>
        </div>
        </div >
     
    )
}

const modules = {
    toolbar: {
        container: "#toolbar",
    }
};

const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'link', 'image', 'video', 'list'
];

export default AddBlog