import React, { useEffect, useRef, useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { FiArrowUpRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import ModalPop from '../../../../components/modalPop'
import DeleteBlog from './DeleteBlog'

const Blogs = ({
    loading, 
    filteredPost, 
    pagination, 
    handleBlogPrevious, 
    handleBlogNext, 
    blogCurrentPage
}) => {
    const navigate = useNavigate()
    const [openMenuId, setOpenMenuId] = useState(null)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteData, setDeleteData] = useState([])
    const menuRef = useRef(null)

     // Helper to strip HTML tags from body for plain text content preview
    const stripHtml = (html) => {
        return html.replace(/<[^>]*>/g, '').trim()
    }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMenuToggle = (id, event) => {
    event.stopPropagation()
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const handleEdit = (blog, event) => {
    event.stopPropagation()
    setOpenMenuId(null)
    navigate(`/edit-blog/${blog.id}`, { state: blog })
  }

  const handleDelete = (blog, event) => {
    event.stopPropagation()
    console.log('Delete blog:', blog)
    setOpenMenuId(null)
    setOpenDeleteModal(true)
    setDeleteData(blog)
  }
  return (
    <div>
        <div
            ref={menuRef}
            className={`${filteredPost?.length > 0
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]"
                : "flex items-center justify-center"}`}
        >
            {loading ? (
                <p className='text-GREY-200 font-jost text-center font-medium'>
                    Loading Blogs...
                </p>
            ) : filteredPost?.length > 0 ? (
                filteredPost.map((item) => (
                    <div
                        key={item.id}
                        className='flex cursor-pointer shadow p-4 flex-col gap-[32px] relative'
                    >
                        <img src={item.image} alt="event" className='rounded-lg w-[384px] h-[240px]' />
                        <div className='flex flex-col gap-3'>
                            <p className='font-inter text-[#E78020] font-semibold leading-5 text-sm'>
                                {new Date(item.created_at).toDateString()}
                            </p>
                            <div className='flex items-start gap-1'>
                                <p className='font-semibold font-hanken w-[344px] text-[#101828] text-[20px] lg:text-[24px] leading-[32px]'>
                                    {item.title}
                                </p>
                            </div>
                            <p className='text-base truncate text-[#667085] leading-6 font-inter'>
                               {stripHtml(item.body)}
                            </p>
                            <div className='flex justify-end relative'>
                                <CiMenuKebab
                                    className='w-6 h-6'
                                    onClick={(e) => handleMenuToggle(item.id, e)}
                                />
                                {openMenuId === item?.id && (
                                    <div className="absolute bottom-8 right-0 bg-white shadow-lg rounded-md z-10 w-32">
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={(e) => handleEdit(item, e)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            onClick={(e) => handleDelete(item, e)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className='text-GREY-200 font-jost text-center font-medium'>
                    No Blog Available
                </p>
            )}
        </div>

        {/* Pagination */}
        <div className='flex justify-between items-center p-4 mt-4'>
            <button
                className='flex items-center gap-3 cursor-pointer'
                onClick={handleBlogPrevious}
                disabled={!pagination?.prevPageUrl}
            >
                <FaArrowLeft className='w-4 h-4 text-GREY-200' />
                <p className='text-GREY-200 font-jost'>Previous</p>
            </button>
            <span className='px-4 py-2 bg-GREY-600 rounded-lg'>
                {blogCurrentPage}
            </span>
            <button
                className='flex items-center gap-3 cursor-pointer'
                onClick={handleBlogNext}
                disabled={!pagination?.nextPageUrl}
            >
                <p className='text-GREY-200 font-jost'>Next</p>
                <FaArrowRight className='w-4 h-4 text-GREY-200' />
            </button>
        </div>

        <ModalPop isOpen={openDeleteModal}>
            <DeleteBlog
                handleClose={() => setOpenDeleteModal(false)}
                deleteData={deleteData}
            />
        </ModalPop>
    </div>

  )
}

export default Blogs