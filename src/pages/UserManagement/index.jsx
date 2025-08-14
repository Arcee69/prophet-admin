import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { TfiArrowCircleRight } from 'react-icons/tfi'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

import Kebab from "../../assets/svg/kebab.svg"
import SideModal from '../../components/sideModal'
import AddNewUser from './components/AddNewUser'
import UserDetails from './components/UserDetails'

const UserManagement = () => {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [category, setCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [openAddNewModal, setOpenAddNewModal] = useState(false)
  const [openDetailsModal, setOpenDetailsModal] = useState(false)
  const itemsPerPage = 3

  const users = [
    { name: "Lola Adesiye", email: "Mail@mail.com", dateCreated: "21/12/2022", role: "Admin", status: "Active" },
    { name: "Chukwuma Ciroma", email: "Mail@mail.com", dateCreated: "21/12/2022", role: "Admin", status: "Active" },
    { name: "Adekunle Danladi", email: "Mail@mail.com", dateCreated: "21/12/2022", role: "Super Admin", status: "Active" },
  ]

   // Filter users based on search, status, and category
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) &&
    (status === "" || user.status === status) &&
    (category === "" || category === "All")
  )

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className='flex flex-col gap-[57px]'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <p className='text-DARK-300 text-[30px] font-jost leading-[38px] font-semibold'>User Management</p>
          <p className='text-GREY-500 font-jost text-base leading-6'>Manage Users here</p>
        </div>
        <button
          type='button'
          className='w-[160px] p-4 rounded flex items-center justify-center gap-2 cursor-pointer bg-DARK-100'
          onClick={() => setOpenAddNewModal(true)}
        >
          <p className='text-white font-jost leading-[100%] text-[20px]'>Add New</p>
          <TfiArrowCircleRight className='mt-[1.5px] w-4 h-4 text-white' />
        </button>
      </div>

      <div className='w-full bg-white rounded-[15px] py-[30px] px-6 flex flex-col gap-[15px]'>
        <div className='bg-GREY-50 p-5 rounded-lg flex items-center gap-3'>
          <div className='flex flex-col gap-1.5'>
            <p className='text-GREY-300 font-jost text-sm '>Search for Users</p>
            <div className='w-[586px] lg:flex items-center border border-[#E4E7EC] bg-[#fff] rounded-lg h-[36px]'>
              <div className='bg-[#fff] h-full rounded-tl-lg rounded-bl-lg flex items-center p-2'>
                  <IoSearch className='w-4 h-4 text-[#00000066]' />
              </div>
              <input 
                  name='search'
                  value={search}
                  className='w-full bg-[#fff] font-jost h-full rounded-tr-lg rounded-br-lg p-2 outline-none'
                  placeholder='Search...'
                  onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className='flex flex-col gap-1.5'>
            <p className='text-GREY-300 font-jost text-sm'>Status</p>
            <div className='w-[192px] lg:flex justify-between items-center border p-2 border-[#E4E7EC] bg-[#fff] rounded-lg h-[36px]'>
              <select
                name='status'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className='appearance-none outline-none w-full'
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <IoIosArrowDown className='w-4 h-4 text-GREY-200' />
            </div>
          </div>
          <div className='flex flex-col gap-1.5'>
            <p className='text-GREY-300 font-jost text-sm'>Category</p>
            <div className='w-[192px] lg:flex justify-between items-center border p-2 border-[#E4E7EC] bg-[#fff] rounded-lg h-[36px]'>
              <select
                name='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='appearance-none outline-none w-full'
              >
                <option value="Active">All</option>
              </select>
              <IoIosArrowDown className='w-4 h-4 text-GREY-200' />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className='overflow-x-auto rounded-xl shadow'>
          <table className='w-full border-collapse '>
            <thead>
              <tr className='bg-NEUTRAL-200'>
                <th className='p-4 text-left'><input type='checkbox' /></th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Name</th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Email</th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Date Created</th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Role</th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Status</th>
                <th className='p-4 text-left text-sm font-jost text-DARK-500'></th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-GREY-50'}>
                  <td className='p-4'><input type='checkbox' /></td>
                  <td className='p-4 text-sm font-jost text-DARK-500'>{user.name}</td>
                  <td className='p-4 text-sm font-jost text-DARK-500'>{user.email}</td>
                  <td className='p-4 text-sm font-jost text-DARK-500'>{user.dateCreated}</td>
                  <td className='p-4 text-sm font-jost text-DARK-500'>{user.role}</td>
                  <td className='p-4'><span className='bg-GREEN-50 text-GREEN-700 text-xs font-medium px-2.5 py-2 rounded-lg'>{user.status}</span></td>
                  <td className='p-4'>
                    <img src={Kebab} alt='Kebab' className='cursor-pointer' onClick={() => setOpenDetailsModal(true)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-between items-center p-4 mt-4'>
            <button
              className='flex items-center gap-3 cursor-pointer'
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <FaArrowLeft className='w-4 h-4 text-GREY-200' />
              <p className='text-GREY-200 font-jost'>Previous</p>
            </button>
            <span className='px-4 py-2 bg-GREY-600 rounded-lg'>{currentPage}</span>
            <button
              className='flex items-center gap-3 cursor-pointer'
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <p className='text-GREY-200 font-jost'>Next</p>
              <FaArrowRight className='w-4 h-4 text-GREY-200' />
            </button>
          </div>
        </div>
      </div>

      <SideModal isOpen={openAddNewModal} onClose={() => setOpenAddNewModal(false)}>
        <AddNewUser handleClose={() => setOpenAddNewModal(false)}/>
      </SideModal>

      <SideModal isOpen={openDetailsModal} onClose={() => setOpenDetailsModal(false)}>
        <UserDetails handleClose={() => setOpenDetailsModal(false)}/>
      </SideModal>
    </div>
  )
}

export default UserManagement