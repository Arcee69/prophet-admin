import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { FiArrowUpRight } from 'react-icons/fi'

const Blogs = ({
    loading, 
    filteredPost, 
    pagination, 
    handleBlogPrevious, 
    handleBlogNext, 
    blogCurrentPage
}) => {
  return (
    <div>
        <div className={`${filteredPost?.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]" :  "flex items-center justify-center"}`}>
            {loading ? 
                <p className=' text-GREY-200 font-jost text-center font-medium'>Loading Blog...</p> :
                filteredPost?.length > 0 ?
                filteredPost?.map((item) => (
                    <div key={item.id} className='flex cursor-pointer flex-col gap-[32px]' onClick={() => {navigate(`/view-post/${item.slug}`, {state: item}), window.scrollTo(0,0)}} >
                        <img src={item.image} alt="event" className='rounded-lg w-[384px] h-[240px]' />
                        <div className='flex flex-col gap-3'>
                            <p className='font-inter text-[#E78020] font-semibold leading-5 text-sm'>{new Date(item.created_at).toDateString()}</p>
                            <div className='flex items-start gap-1'>
                                <p className='font-semibold font-hanken w-[344px] text-[#101828] text-[20px] lg:text-[24px] leading-[32px]'>{item.title}</p>
                                <FiArrowUpRight className='w-5 h-5 mt-2 text-[#101828]' />
                            </div>
                            <p className='text-base text-[#667085] leading-6 font-inter'>
                                {item.content}
                            </p>
                        </div>

                    </div>
                )) : 
                <p className=' text-GREY-200 font-jost text-center font-medium'>No Blog Available</p>
            }
        </div>
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
            // disabled={!pagination?.nextPageUrl}
            >
                <p className='text-GREY-200 font-jost'>Next</p>
                <FaArrowRight className='w-4 h-4 text-GREY-200' />
            </button>
        </div>
    </div>
  )
}

export default Blogs