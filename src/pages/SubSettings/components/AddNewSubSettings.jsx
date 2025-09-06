import React from 'react';
import { Formik, Form } from 'formik';
import { CustomToolbar } from './CustomToolbar';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Chart from "../../../assets/svg/chart.svg";
import Buttons from '../../../components/Buttons';
import { useDispatch } from 'react-redux';
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import { toast } from 'react-toastify';

const AddNewSubSettings = ({ handleClose, fetchSubSettings }) => {
    const dispatch = useDispatch();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const PricingPlanData = {
                "name": values.pricingPlanName,
                "monthly_amount": values.monthlyAmount,
                "annual_amount": values.yearlyAmount,
                "features": values.description,
                "intened_users": values.planIntended
            };
            const res = await api.post(appUrls.SUBSCRIPTION_SETTINGS_URL, PricingPlanData);
            toast.success("Pricing plan Created Successfully");
            await dispatch(fetchSubSettings());
            handleClose();
        } catch (err) {
            console.log(err, "Admin Error");
            toast.error(`${err.data.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='flex flex-col gap-5'>
            <img src={Chart} alt='Chart' className='w-[48px] h-[48px]' />
            <div className='flex flex-col gap-2'>
                <p className='font-jost text-DARK-300 text-[18px] font-medium leading-7'>New Pricing Plan</p>
                <p className='font-jost text-GREY-200 leading-5 text-sm'>Add a new pricing plan here</p>
            </div>
            
            <Formik
                initialValues={{
                    pricingPlanName: "",
                    planIntended: "",
                    monthlyAmount: "",
                    yearlyAmount: "",
                    description: ""
                }}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    handleChange,
                    setFieldValue,
                    isSubmitting,
                    handleSubmit
                }) => (
                    <Form className='flex flex-col gap-5'>
                        <div className='flex gap-5 flex-col'>
                            <div className='flex flex-col gap-[5px]'>
                                <p className='font-jost text-base leading-[100%] text-DARK-400'>Name</p>
                                <div className='border-GREY-700 rounded-[8px] border h-[44px] p-2'>
                                    <input 
                                        name='pricingPlanName'
                                        type='text'
                                        placeholder='Enter Pricing Plan Name...'
                                        value={values.pricingPlanName}
                                        onChange={handleChange}
                                        className='w-full bg-transparent outline-none font-jost text-sm'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-[5px]'>
                                <p className='font-jost text-base leading-[100%] text-DARK-400'>Monthly Amount</p>
                                <div className='border-GREY-700 rounded-[8px] border h-[44px] p-2'>
                                    <input 
                                        name='monthlyAmount'
                                        type='text'
                                        placeholder='Enter Monthly Amount...'
                                        value={values.monthlyAmount}
                                        onChange={handleChange}
                                        className='w-full bg-transparent outline-none font-jost text-sm'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-[5px]'>
                                <p className='font-jost text-base leading-[100%] text-DARK-400'>Annual Amount</p>
                                <div className='border-GREY-700 rounded-[8px] border h-[44px] p-2'>
                                    <input 
                                        name='yearlyAmount'
                                        type='text'
                                        placeholder='Enter Annual Amount...'
                                        value={values.yearlyAmount}
                                        onChange={handleChange}
                                        className='w-full bg-transparent outline-none font-jost text-sm'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-[5px]'>
                                <p className='font-jost text-base leading-[100%] text-DARK-400'>Intented Users</p>
                                <div className='border-GREY-700 rounded-[8px] border h-[44px] p-2'>
                                    <input 
                                        name='planIntended'
                                        type='text'
                                        placeholder='Enter Pricing Plan Target Audience...'
                                        value={values.planIntended}
                                        onChange={handleChange}
                                        className='w-full bg-transparent outline-none font-jost text-sm'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="Content" className="font-euclid text-sm">Content</label>
                                <CustomToolbar />
                                <ReactQuill
                                    theme="snow"
                                    value={values.description}
                                    onChange={(value) => setFieldValue("description", value)}
                                    modules={modules}
                                    formats={formats}
                                    style={{ backgroundColor: "#fff", minHeight: "193px", border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}
                                    className="lg:w-full h-[10px] overflow-y-auto bg-white mt-1.5 outline-none"
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <Buttons 
                                className="w-6/12 border border-GREY-800"
                                text="Cancel"
                                action={handleClose}
                                textColor="text-GREY-300"
                                type="button"
                            />
                            <Buttons 
                                className="w-6/12 bg-DARK-100"
                                text="Create Pricing Plan"
                                action={handleSubmit}
                                textColor="text-white"
                                loading={isSubmitting}
                                type="submit"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const modules = {
    toolbar: {
        container: "#toolbar",
    }
};

const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'link', 'list'
];

export default AddNewSubSettings;