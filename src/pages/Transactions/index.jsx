import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { TfiArrowCircleRight } from 'react-icons/tfi'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

import Kebab from "../../assets/svg/kebab.svg"
import SideModal from '../../components/sideModal'

import { useDispatch, useSelector } from 'react-redux'
// import { fetchUsers } from '../../features/users/getUsersSlice'

import { BiExport } from 'react-icons/bi'
import TransactionsDetails from './components/TransactionsDetails'


const Transactions = () => {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [category, setCategory] = useState("")
  const [transactionData, setTransactionData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [openAddNewModal, setOpenAddNewModal] = useState(false)
  const [openDetailsModal, setOpenDetailsModal] = useState(false)
  const [openMenuIndex, setOpenMenuIndex] = useState(null) // state to track which row's menu is open
  const [openBlockUser, setOpenBlockUser] = useState(false)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchUsers(currentPage))
  // }, [dispatch, currentPage])


  const transactions = [
    {
      id: "234567AD",
      name: "Shalewa Oguntoyinbo",
      email: "Shaguntyimb@ymail.com",
      plan: "Custom",
      amount: "20,000",
      created_at: "21/12/2022",
      status: true
    },
    {
      id: "234567AD",
      name: "Shalewa Oguntoyinbo",
      email: "Shaguntyimb@ymail.com",
      plan: "Basic",
      amount: "10,000",
      created_at: "21/12/2022",
      status: true
    },
    {
      id: "234567AD",
      name: "Shalewa Oguntoyinbo",
      email: "Shaguntyimb@ymail.com",
      plan: "Premium",
      amount: "100,000",
      created_at: "21/12/2022",
      status: true
    },
  ]

  const { loading, pagination } = useSelector((state) => state.allUsers)
  // console.log(users, "data")


  // Filter users based on search, status, and category
  const filteredTransactions = transactions?.filter(txn =>
    txn.name.toLowerCase().includes(search.toLowerCase()) &&
    (status === "" || txn.status === status) &&
    (category === "" || category === "All")
  )


  const handlePrevious = () => {
    if (pagination?.prevPageUrl) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if (pagination?.nextPageUrl) {
      console.log("next")
      setCurrentPage(prev => prev + 1)
    }
  }

  useEffect(() => {
  setCurrentPage(1)
}, [search, status, category])

  return (
    <div className='flex flex-col gap-[57px]'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <p className='text-DARK-300 text-[30px] font-jost leading-[38px] font-semibold'>Transactions</p>
          <p className='text-GREY-500 font-jost text-base leading-6'>Manage Transactions here</p>
        </div>
        <button
          type='button'
          className='w-[160px] p-4 rounded flex items-center justify-center gap-2 cursor-pointer bg-DARK-100'
          // onClick={() => setOpenAddNewModal(true)}
        >
          <p className='text-white font-jost leading-[100%] text-[20px]'>Export</p>
          <BiExport className='mt-[1.5px] w-5 h-5 text-white' />
        </button>
      </div>

      <div className='w-full bg-white rounded-[15px] py-[30px] px-6 flex flex-col gap-[15px]'>
        <div className='bg-GREY-50 p-5 rounded-lg flex items-center gap-3'>
          <div className='flex flex-col gap-1.5'>
            <p className='text-GREY-300 font-jost text-sm '>Search for Transactions</p>
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
                <option value="active">Active</option>
                <option value="inactive">Blocked</option>
              </select>
              <IoIosArrowDown className='w-4 h-4 text-GREY-200' />
            </div>
          </div>
          <div className='flex flex-col gap-1.5'>
            <p className='text-GREY-300 font-jost text-sm'>Types</p>
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
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Transaction ID</th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>User ID + Email</th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Subscription Plan</th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Amount Paid</th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Date Created</th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Status</th>
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
              ) : filteredTransactions?.length > 0 ? filteredTransactions?.map((txn, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-GREY-50'}>
                  <td className='p-4'><input type='checkbox' /></td>
                  <td className='p-4 text-sm font-jost text-DARK-500'>{txn.id}</td>
                  <td className='p-4'>
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm font-jost text-DARK-500'>{txn.name}</p>
                      <p className='text-[10px] font-jost text-DARK-500'>{txn.email}</p>
                    </div> 
                  </td>
                  <td className='p-4 text-sm font-jost text-DARK-500'>{txn.plan}</td>
                  <td className='p-4 text-sm font-jost text-DARK-500'>{txn.amount}</td>
                  <td className='p-4 text-sm font-jost text-DARK-500'>{txn.created_at}</td>
                  <td className='p-4'>
                    <span className={`${txn.status ? "bg-GREEN-50 text-GREEN-700" : "bg-red-100 text-red-500 "} text-xs font-medium px-2.5 py-2 rounded-lg`}>{txn.status  ? "Successful" : "Failed"}</span>
                  </td>
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
                              setTransactionData(txn);
                              setOpenMenuIndex(null);
                            }}
                            className='font-jost text-green-400'
                          >
                            View
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className='p-4 text-center text-GREY-200 font-jost'>
                    No Transaction Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className='flex justify-between items-center p-4 mt-4'>
            <button
              className='flex items-center gap-3 cursor-pointer'
              onClick={handlePrevious}
              disabled={!pagination?.prevPageUrl}
            >
              <FaArrowLeft className='w-4 h-4 text-GREY-200' />
              <p className='text-GREY-200 font-jost'>Previous</p>
            </button>
            <span className='px-4 py-2 bg-GREY-600 rounded-lg'>
              {currentPage}
            </span>
            <button
              className='flex items-center gap-3 cursor-pointer'
              onClick={handleNext}
              // disabled={!pagination?.nextPageUrl}
            >
              <p className='text-GREY-200 font-jost'>Next</p>
              <FaArrowRight className='w-4 h-4 mt-[1px] text-GREY-200' />
            </button>
          </div>

        </div>
      </div>

      <SideModal isOpen={openDetailsModal} onClose={() => setOpenDetailsModal(false)} width={"md:w-[546px]"}>
        <TransactionsDetails handleClose={() => setOpenDetailsModal(false)}   transactionData={transactionData} />
      </SideModal>


    </div>
  )
}

export default Transactions