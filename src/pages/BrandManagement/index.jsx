import { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { TfiArrowCircleRight } from 'react-icons/tfi'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBrands } from '../../features/brands/getBrandsSlice'

import Kebab from "../../assets/svg/kebab.svg"
import SideModal from '../../components/sideModal'
// import RoleDetails from './components/RoleDetails'
// import ModalPop from '../../components/modalPop'
// import DeleteAdmin from './components/DeleteAdmin'
import AddNewBrand from './components/AddNewBrand'
import AddBulkBrand from './components/AddBulkBrand'
import DeleteBrand from './components/DeleteBrand'
import ModalPop from '../../components/modalPop'
import EditBrand from './components/EditBrand'

const BrandManagement = () => {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [category, setCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [openAddNewModal, setOpenAddNewModal] = useState(false)
  const [openAddBulkModal, setOpenAddBulkModal] = useState(false)
  const [openEditBrandModal, setOpenEditBrandModal] = useState(false)
  const [openDeleteBrand, setOpenDeleteBrand] = useState(false)
  const [brandData, setBrandData] = useState([])
  const [openMenuIndex, setOpenMenuIndex] = useState(null) // State to track which row's menu is open


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBrands())
  }, [])

  const { brands, loading } = useSelector((state) => state.allBrands)
  console.log(brands, "data")


  // Filter users based on search, status, and category
  const filteredBrands = brands.data?.filter(brand => 
    brand.name.toLowerCase().includes(search.toLowerCase()) &&
    (status === "" || brand.status === status) &&
    (category === "" || category === "All")
  )

  // Calculate pagination
  // const indexOfLastItem = currentPage * itemsPerPage
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage
  // const currentAdmins = filteredBrands.slice(indexOfFirstItem, indexOfLastItem)
  // const totalPages = Math.ceil(filteredBrands.length / itemsPerPage)

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
          <p className='text-DARK-300 text-[30px] font-jost leading-[38px] font-semibold'>Brand Management</p>
          <p className='text-GREY-500 font-jost text-base leading-6'>Manage Brands here</p>
        </div>
        <div className='flex items-center gap-4'>
            <button
                type='button'
                className='w-[160px] p-4 rounded flex items-center justify-center gap-2 cursor-pointer bg-DARK-100'
                onClick={() => setOpenAddBulkModal(true)}
            >
            <p className='text-white font-jost leading-[100%] text-[20px]'>Add Bulk</p>
                <TfiArrowCircleRight className='mt-[1.5px] w-4 h-4 text-white' />
            </button>
            <button
                type='button'
                className='w-[160px] p-4 rounded flex items-center justify-center gap-2 cursor-pointer bg-DARK-100'
                onClick={() => setOpenAddNewModal(true)}
            >
            <p className='text-white font-jost leading-[100%] text-[20px]'>Add New</p>
                <TfiArrowCircleRight className='mt-[1.5px] w-4 h-4 text-white' />
            </button>
        </div>
      </div>

      <div className='w-full bg-white rounded-[15px] py-[30px] px-6 flex flex-col gap-[15px]'>
        <div className='bg-GREY-50 p-5 rounded-lg flex items-center gap-3'>
          <div className='flex flex-col gap-1.5'>
            <p className='text-GREY-300 font-jost text-sm '>Search for Brands</p>
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
          <div className='flex-col hidden gap-1.5'>
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
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Brand ID</th>
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Name</th>
                {/* <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Requested By</th> */}
                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Date Created</th>
                {/* <th className='p-4 text-left text-sm font-jost text-DARK-500'>Status</th> */}
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
              ) : filteredBrands?.length > 0 ? filteredBrands?.map((brand, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-GREY-50'}>
                  <td className='p-4'><input type='checkbox' /></td>
                  <td className='p-4 text-sm font-jost text-DARK-500'>{brand.id}</td>
                  <td className='p-4 text-sm font-jost capitalize text-DARK-500'>{brand.name}</td>
                  {/* <td className='p-4 text-sm font-jost text-DARK-500'>{brand.requestedBy}</td> */}
                  <td className='p-4 text-sm font-jost text-DARK-500'>{new Date(brand.created_at).toLocaleDateString()}</td>
                  {/* <td className='p-4'><span className='bg-GREEN-50 text-GREEN-700 text-xs font-medium px-2.5 py-2 rounded-lg'>{brand.status}</span></td> */}
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
                            className='font-jost hidden text-green-400'
                          >
                            View
                          </button>
                          <button 
                            onClick={() => { 
                              setOpenEditBrandModal(true); 
                              setBrandData(brand); 
                              setOpenMenuIndex(null); 
                            }} 
                            className='text-gray-500 font-jost hover:text-gray-700'
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => { 
                              setOpenDeleteBrand(true); 
                              setBrandData(brand); 
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
                    No Brands Found
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

      <SideModal isOpen={openAddNewModal} onClose={() => setOpenAddNewModal(false)} width={"md:w-[546px]"}>
        <AddNewBrand handleClose={() => setOpenAddNewModal(false)} fetchBrands={fetchBrands}/>
      </SideModal>

      <SideModal isOpen={openEditBrandModal} onClose={() => setOpenEditBrandModal(false)} width={"md:w-[546px]"}>
        <EditBrand handleClose={() => setOpenEditBrandModal(false)} brandData={brandData} fetchBrands={fetchBrands}/>
      </SideModal>

      <SideModal isOpen={openAddBulkModal} onClose={() => setOpenAddBulkModal(false)} width={"md:w-[546px]"}>
        <AddBulkBrand handleClose={() => setOpenAddBulkModal(false)} fetchBrands={fetchBrands}/>
      </SideModal>


      <ModalPop isOpen={openDeleteBrand}>
        <DeleteBrand 
          handleClose={() => setOpenDeleteBrand(false)}
          brandData={brandData}
          fetchBrands={fetchBrands}
        />
      </ModalPop>
    </div>
  )
}

export default BrandManagement