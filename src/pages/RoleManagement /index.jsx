import { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { TfiArrowCircleRight } from 'react-icons/tfi'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAdmins } from '../../features/admins/getAdminsSlice'

import Kebab from "../../assets/svg/kebab.svg"
import SideModal from '../../components/sideModal'
import AddNewRole from './components/AddNewRole'
import RoleDetails from './components/RoleDetails'
import ModalPop from '../../components/modalPop'
import DeleteAdmin from './components/DeleteAdmin'

const RoleManagement = () => {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [category, setCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [openAddNewModal, setOpenAddNewModal] = useState(false)
  const [openDetailsModal, setOpenDetailsModal] = useState(false)
  const [openDeleteAdmin, setOpenDeleteAdmin] = useState(false)
  const [adminData, setAdminData] = useState([])
  const [openMenuIndex, setOpenMenuIndex] = useState(null) // New state to track which row's menu is open

  const itemsPerPage = 10

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAdmins())
  }, [])

  const { admins, loading } = useSelector((state) => state.allAdmins)
  console.log(admins, "data")


  // Filter users based on search, status, and category
  const filteredAdmins = admins.data?.filter(admin => 
    admin.role.toLowerCase().includes(search.toLowerCase()) &&
    (status === "" || admin.status === status) &&
    (category === "" || category === "All")
  )

  // Calculate pagination
  // const indexOfLastItem = currentPage * itemsPerPage
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage
  // const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem)
  // const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage)

  // const handlePrevious = () => {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1)
  // }

  // const handleNext = () => {
  //   if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  // }

  return (
    <div className='flex flex-col gap-[57px]'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <p className='text-DARK-300 text-[30px] font-jost leading-[38px] font-semibold'>Role Management</p>
          <p className='text-GREY-500 font-jost text-base leading-6'>Manage Admin Roles and their Permissions here</p>
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
            <p className='text-GREY-300 font-jost text-sm '>Search for Roles</p>
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
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Role</th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Name</th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Email</th>
                {/* <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Status</th> */}
                <th className='p-4 text-left text-sm font-jost text-DARK-500'></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className='p-4 text-center text-GREY-200 font-jost'>
                    Loading Data...
                  </td>
                </tr>
              ) : filteredAdmins.length > 0 ? filteredAdmins.map((admin, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-GREY-50'}>
                  <td className='p-4'><input type='checkbox' /></td>
                  <td className='p-4 text-sm font-jost text-DARK-500'>{admin.role}</td>
                  <td className='p-4 text-sm font-jost text-DARK-500'>{admin.name}</td>
                  <td className='p-4 text-sm font-jost text-DARK-500'>{admin.email}</td>
                  {/* <td className='p-4'><span className='bg-GREEN-50 text-GREEN-700 text-xs font-medium px-2.5 py-2 rounded-lg'>{admin.status}</span></td> */}
                  <td className='p-4'>
                    <div className='flex relative'>
                      <img 
                        src={Kebab} 
                        alt='Kebab' 
                        className='cursor-pointer' 
                        onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)} 
                      />
                      {openMenuIndex === index && (
                        <div className='absolute top-full w-[100px] flex flex-col gap-3 right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg p-2 z-10'>
                          <button 
                            onClick={() => { 
                              setOpenDetailsModal(true); 
                              setOpenMenuIndex(null); 
                            }} 
                            className='font-jost text-green-400'
                          >
                            View
                          </button>
                          <button 
                            onClick={() => { 
                              setOpenDeleteAdmin(true); 
                              setAdminData(admin); 
                              setOpenMenuIndex(null); 
                            }} 
                            className='text-red-500 font-jost hover:text-red-700'
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className='p-4 text-center text-GREY-200 font-jost'>
                    No Admins Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className='flex justify-between items-center p-4 mt-4'>
            <button
              className='flex items-center gap-3 cursor-pointer'
              // onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <FaArrowLeft className='w-4 h-4 text-GREY-200' />
              <p className='text-GREY-200 font-jost'>Previous</p>
            </button>
            <span className='px-4 py-2 bg-GREY-600 rounded-lg'>{currentPage}</span>
            <button
              className='flex items-center gap-3 cursor-pointer'
              // onClick={handleNext}
              // disabled={currentPage === totalPages}
            >
              <p className='text-GREY-200 font-jost'>Next</p>
              <FaArrowRight className='w-4 h-4 text-GREY-200' />
            </button>
          </div>
        </div>
      </div>

      <SideModal isOpen={openAddNewModal} onClose={() => setOpenAddNewModal(false)} width={"md:w-[887px]"}>
        <AddNewRole handleClose={() => setOpenAddNewModal(false)} fetchAdmins={fetchAdmins}/>
      </SideModal>

      <SideModal isOpen={openDetailsModal} onClose={() => setOpenDetailsModal(false)} width={"md:w-[887px]"}>
        <RoleDetails handleClose={() => setOpenDetailsModal(false)}/>
      </SideModal>

      <ModalPop isOpen={openDeleteAdmin}>
        <DeleteAdmin 
          handleClose={() => setOpenDeleteAdmin(false)}
          adminData={adminData}
          fetchAdmins={fetchAdmins}
        />
      </ModalPop>
    </div>
  )
}

export default RoleManagement