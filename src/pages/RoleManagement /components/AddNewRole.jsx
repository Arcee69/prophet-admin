import React, { useState } from 'react'
import Chart from "../../../assets/svg/chart.svg"
import { IoIosArrowDown } from 'react-icons/io'
import Buttons from '../../../components/Buttons'
import { IoSearch } from 'react-icons/io5'
import { api } from '../../../services/api'
import { appUrls } from '../../../services/urls'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const AddNewRole = ({ handleClose, fetchAdmins }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()


    const addAdmin = async () => {
        setLoading(true)
        const adminData = {
            "name": name,
            "email": email,
            "role": role
        }
        try {
            const res = await api.post(`${appUrls.USERS_URL}/create/admin`, adminData)
            console.log(res, "master")
            toast.success("Admin Created Successfully")
            await dispatch(fetchAdmins())
            handleClose()
        } catch (err) {
            console.log(err, "Admin Error")
            toast.error(`${err.data.message}`)
        } finally {
            setLoading(false)
        }
    }


    const permissions = [
        "Ability to Log in and Log out",
        "Ability to manage database",
        "Ability to recover password",
        "Ability to update personal profile",
        "Ability to add/Enable users",
        "Ability to view",
        "Ability to view room",
        "Ability to view room",
        "Ability to view room",
    ];

  return (
    <div className='flex flex-col gap-5'>
        <img src={Chart} alt='Chart' className='w-[48px] h-[48px]' />
        <div className='flex flex-col gap-2'>
            <p className='font-jost text-DARK-300 text-[18px] font-medium leading-7'>New Admin</p>
            <p className='font-jost text-GREY-200 leading-5 text-sm'>Add a new Admin here</p>
        </div>
        <div className='flex gap-5 flex-col'>
            <div className='flex flex-col gap-[5px]'>
                <p className='font-jost text-base leading-[100%] text-DARK-400'>Name</p>
                <div className='border-GREY-700 rounded-[8px] border h-[44px] p-2'>
                    <input 
                        name='name'
                        type='text'
                        placeholder='Enter Admin Name...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full bg-transparent outline-none font-jost text-sm'
                    />
                </div>
            </div>
            <div className='flex flex-col gap-[5px]'>
                <p className='font-jost text-base leading-[100%] text-DARK-400'>Email</p>
                <div className='border-GREY-700 rounded-[8px] border h-[44px] p-2'>
                    <input 
                        name='email'
                        type='text'
                        placeholder='Enter Email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full bg-transparent outline-none font-jost text-sm'
                    />
                </div>
            </div>
            <div className='flex flex-col gap-[5px]'>
                <p className='font-jost text-base leading-[100%] text-DARK-400'>Role</p>
                <div className='border-GREY-700 flex items-center  rounded-[8px] border h-[44px] p-2'>
                    <select
                        name='role'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='appearance-none outline-none font-jost w-full'
                    >
                        <option value="">Select Role</option>
                        <option value="sub_admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                        <option value="content_admin">Content Admin</option>
                    </select>
                    <IoIosArrowDown className='w-4 h-4 text-GREY-200' />
                </div>
            </div>

            <div className='flex flex-col gap-[5px]'>
                <p className='font-jost text-base leading-[100%] text-DARK-400'>Permissions</p>
                <div className='flex flex-col gap-5 border py-5 rounded-lg border-GREY-900 shadow'>
                    <div className='flex items-center px-5 gap-2'>
                        <div className='border-GREY-900 rounded-[8px] border w-[598px] h-[44px] p-2 flex items-center gap-3'>
                            <IoSearch className='w-4 h-4 text-[#00000066]' />
                            <input
                                type='text'
                                placeholder='Search Permissions'
                                className='outline-none font-jost text-sm'
                            />
                        </div>
                        <button 
                            type='button'
                            className='bg-DARK-100 cursor-pointer text-white rounded-[8px] w-[102px] font-jost h-[44px] px-4'
                        >
                            Search
                        </button>
                    </div>
                    <div className='flex flex-col'>
                        <div className='bg-GREY-50 px-8 py-4'>
                            <p className='text-GREY-200 font-jost text-sm'>Role has access to 0 Permissions</p>
                        </div>
                        <div className='grid grid-cols-3 '>
                            {permissions.map((perm, index) => (
                                <div key={index} className='flex items-center gap-2 border-t border-GREY-50 p-5'>
                                    <input type='checkbox' className='w-4 h-4' />
                                    <label className='font-jost whitespace-normal text-sm'>{perm}</label>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </div>

        </div>
        <div className='flex items-center w-full gap-5'>
            <Buttons 
                className="w-full border border-GREY-800"
                text="Cancel"
                action={handleClose}
                textColor="text-GREY-300"
                
            />
            <Buttons 
                className="w-full bg-DARK-100"
                text="Save Role"
                action={addAdmin}
                textColor="text-white"
                loading={loading}
            />
        </div>
    </div>
  )
}

export default AddNewRole