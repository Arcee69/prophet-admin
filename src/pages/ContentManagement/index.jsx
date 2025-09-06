import { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { TfiArrowCircleRight } from 'react-icons/tfi'
import Blogs from './components/Blog'
import Faqs from './components/Faq'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from '../../features/blogs/getBlogsSlice'
import { useNavigate } from 'react-router-dom'
import { fetchFaqs } from '../../features/faqs/getFaqsSlice'

const ContentMangement = () => {
  const [activeTab, setActiveTab] = useState("Blogs")
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [category, setCategory] = useState("")
  const [blogCurrentPage, setBlogCurrentPage] = useState(1)
  const [faqCurrentPage, setFaqCurrentPage] = useState(1)

  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()


  //Blogs
  useEffect(() => {
    dispatch(fetchBlogs(blogCurrentPage))
  }, [dispatch, blogCurrentPage])

  const { blogs, loading, pagination } = useSelector((state) => state.allBlogs)
  console.log(blogs, "data")


  // Filter users based on search, status, and category
  const filteredPost = blogs.data?.filter(blog => 
    blog.title.toLowerCase().includes(search.toLowerCase()) &&
    (status === "" || blog.status === status) &&
    (category === "" || category === "All")
  )

  const handleBlogPrevious = () => {
    if (pagination?.prevPageUrl) {
      setBlogCurrentPage(prev => prev - 1)
    }
  }
  
  const handleBlogNext = () => {
    if (pagination?.nextPageUrl) {
      console.log("next")
      setBlogCurrentPage(prev => prev + 1)
    }
  }
  
  useEffect(() => {
    setBlogCurrentPage(1)
  }, [search, status, category])


  //Faqs
  useEffect(() => {
    dispatch(fetchFaqs(faqCurrentPage))
  }, [dispatch, faqCurrentPage])

  const faqData = useSelector((state) => state.allFaqs)
  console.log(faqData, "faqData")


  // Filter users based on search, status, and category
  const filteredFaq = faqData.faqs.data?.filter(faq => 
    faq.question.toLowerCase().includes(search.toLowerCase()) &&
    (status === "" || faq.status === status) &&
    (category === "" || category === "All")
  )

  const handleFaqPrevious = () => {
    if (faqData?.pagination?.prevPageUrl) {
      setFaqCurrentPage(prev => prev - 1)
    }
  }
  
  const handleFaqNext = () => {
    if (faqData?.pagination?.nextPageUrl) {
      console.log("next")
      setFaqCurrentPage(prev => prev + 1)
    }
  }
  
  useEffect(() => {
    setFaqCurrentPage(1)
  }, [search, status, category])

  return (
    <div className='flex flex-col gap-[57px]'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <p className='text-DARK-300 text-[30px] font-jost leading-[38px] font-semibold'>Content Management</p>
          <p className='text-GREY-500 font-jost text-base leading-6'>Manage Brands here</p>
        </div>
        <div className='flex items-center gap-4'>
          <button
            type='button'
            className='w-[160px] p-4 rounded flex items-center justify-center gap-2 cursor-pointer bg-DARK-100'
            onClick={() => navigate("/add-blog")}
          >
            <p className='text-white font-jost leading-[100%] text-[20px]'>Add Blog</p>
            <TfiArrowCircleRight className='mt-[1.5px] w-4 h-4 text-white' />
          </button>
          <button
            type='button'
            className='w-[160px] p-4 rounded flex items-center justify-center gap-2 cursor-pointer bg-DARK-100'
            onClick={() => navigate('/add-faq')}
          >
            <p className='text-white font-jost leading-[100%] text-[20px]'>Add Faq</p>
            <TfiArrowCircleRight className='mt-[1.5px] w-4 h-4 text-white' />
          </button>
        </div>
      </div>

      <div className='w-full bg-white rounded-[15px] pb-[30px] flex flex-col gap-[15px]'>
        <div className='border-b border-[#A3AED0] w-full flex gap-3 items-center'>
          <div onClick={() => handleTabChange("Blogs")} className={`${activeTab === "Blogs" ? "border-b border-BLUE-300" : ""} cursor-pointer px-5 py-2.5`}>
            <p className={`${activeTab === "Blogs" ? "text-BLUE-400" : "text-GREY-1000"} font-lato text-[15px] leading-[22px]`}>Blogs</p>
          </div>
          <div onClick={() => handleTabChange("Faqs")} className={`${activeTab === "Faqs" ? "border-b border-BLUE-300" : ""} cursor-pointer px-5 py-2.5`}>
            <p className={`${activeTab === "Faqs" ? "text-BLUE-400" : "text-GREY-1000"} font-lato text-[15px] leading-[22px]`}>Faqs</p>
          </div>
        </div>

        <div className='bg-GREY-50 p-5 rounded-lg flex items-center gap-3'>
          <div className='flex flex-col gap-1.5'>
            <p className='text-GREY-300 font-jost text-sm '>Search for {activeTab === "Blogs" ? "Blogs" : "Faqs"}</p>
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
          {/* <div className='flex flex-col gap-1.5'>
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
          </div> */}
        </div>

        {activeTab === "Blogs" && 
          <Blogs 
            loading={loading} 
            filteredPost={filteredPost} 
            pagination={pagination}
            handleBlogPrevious={handleBlogPrevious}
            handleBlogNext={handleBlogNext}
            blogCurrentPage={blogCurrentPage}
          />
        }

        {activeTab === "Faqs" && 
          <Faqs 
            loading={faqData?.loading}
            filteredFaq={filteredFaq}
            pagination={faqData?.pagination}
            handleFaqPrevious={handleFaqPrevious}
            handleFaqNext={handleFaqNext}
            faqCurrentPage={faqCurrentPage}
          />
        }
      </div>

    </div>
  )
}

export default ContentMangement