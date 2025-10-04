import { useState, useEffect, useRef } from 'react'
import Cookies from "js-cookie"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { IoSearch } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReports } from '../../features/reports/getReportsSlice'
import { api } from '../../services/api'
import { appUrls } from '../../services/urls'
import axios from 'axios'
import Kebab from "../../assets/svg/kebab.svg"
import { toast } from 'react-toastify'

const ReportManagement = () => {
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [fileReport, setFileReport] = useState()
    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const [openDetailsModal, setOpenDetailsModal] = useState(false)
    const [selectedReportId, setSelectedReportId] = useState(null)
    const [uploadReportId, setUploadReportId] = useState(null)
    const fileInputRef = useRef(null)

    const dispatch = useDispatch()

    let URL = import.meta.env.VITE_APP_API_URL;
    const token = Cookies.get('token');

    const { reports, pagination, loading: reportsLoading } = useSelector((state) => state.allReports)
    console.log(reports, "reports")

    const uploadReport = async (id) => {
        if (!fileReport) {
            console.log("No file selected");
            return;
        }
        setLoading(true)
        const formData = new FormData()
        formData.append('file', fileReport)
        try {
            const res = await axios.post(`${URL}/v1/reports/upload-report/${id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(res, "res")
            toast.success(`${res.data.message}`)
            dispatch(fetchReports({ page: currentPage }))
            setFileReport(null) // Reset file
            setUploadReportId(null)
        } catch (err) {
            console.log(err, "err")
            toast.error(`${err.data.message}`)
        } finally {
            setLoading(false)
        }
    }

    const updateStatusToDone = async (id) => {
        try {
            const res = await api.patch(appUrls?.REPORTS_URL + `/mark-as-done/${id}`)
            console.log(res, "res")
            toast.success(`${res.data.message}`)
            dispatch(fetchReports({ page: currentPage }))
        } catch (err) {
            console.log(err, "err")
            toast.error(`${err.data.message}`)
        } 
    }

    // Filter users based on search, status, and category
    const filteredReports = reports.data?.filter(item =>
        item.subject.toLowerCase().includes(search.toLowerCase()) ||
        item.report_type.toLowerCase().includes(search.toLowerCase()) ||
        item.region.toLowerCase().includes(search.toLowerCase())
    ) || []

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

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file && uploadReportId) {
            setFileReport(file)
            // Automatically upload after selection (or add confirmation if needed)
            uploadReport(uploadReportId)
        }
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    useEffect(() => {
        dispatch(fetchReports({ page: currentPage }))
    }, [currentPage, search, dispatch])

    const getStatusColor = (status) => {
        const text = status === null ? 'Pending' : status
        let bgColor = 'bg-[#FDE68A]'
        let textColor = 'text-[#92400E]'
        if (status === 'done') {
            bgColor = 'bg-[#A7F3D0]'
            textColor = 'text-[#065F46]'
        } else if (status === 'failed') {
            bgColor = 'bg-[#FECACA]'
            textColor = 'text-[#991B1B]'
        }
        return { text, bgColor, textColor }
    }

    return (
        <div className='flex flex-col gap-[57px]'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <p className='text-DARK-300 text-[30px] font-jost leading-[38px] font-semibold'>Report Management</p>
                    <p className='text-GREY-500 font-jost text-base leading-6'>Manage Reports here</p>
                </div>
            </div>

            <div className='w-full bg-white rounded-[15px] py-[30px] px-6 flex flex-col gap-[15px]'>
                <div className='bg-GREY-50 p-5 rounded-lg flex items-center gap-3'>
                    <div className='flex flex-col gap-1.5'>
                        <p className='text-GREY-300 font-jost text-sm '>Search for Reports</p>
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
          
                </div>

                {/* Hidden file input for upload */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept=".pdf,.doc,.docx,.png,.jpg" // Adjust as needed
                />

                {/* Table */}
                <div className='overflow-x-auto rounded-xl shadow'>
                    <table className='w-full border-collapse '>
                        <thead>
                            <tr className='bg-NEUTRAL-200'>
                                <th className='p-4 text-left'><input type='checkbox' /></th>
                                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Title</th>
                                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Type</th>
                                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Description</th>
                                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Region</th>
                                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Status</th>
                                <th className='p-4 text-left text-sm font-jost text-DARK-500'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportsLoading ? (
                                <tr>
                                    <td colSpan="7" className='p-4 text-center text-GREY-200 font-jost'>
                                        Loading Data...
                                    </td>
                                </tr>
                            ) : filteredReports?.length > 0 ? filteredReports?.map((item) => {
                                const { text, bgColor, textColor } = getStatusColor(item.status)
                                return (
                                <tr key={item.id || item.subject} className={Math.random() > 0.5 ? 'bg-white' : 'bg-GREY-50'}> {/* Use item.id for key; fallback to subject */}
                                    <td className='p-4'><input type='checkbox' /></td>
                                    <td className='p-4 text-sm capitalize font-jost text-DARK-500'>{item.subject}</td>
                                    <td className='p-4 text-sm capitalize font-jost text-DARK-500'>{item.report_type}</td>
                                    <td className='p-4 text-sm font-jost text-DARK-500'>{item.request || "Not Available"}</td>
                                    <td className='p-4 text-sm font-jost text-DARK-500'>{item.region}</td>
                                    <td className='p-4 font-jost text-DARK-500'>
                                        <span className={`inline-flex px-2 py-1 text-sm capitalize font-jost rounded-full ${bgColor} ${textColor}`}>
                                            {text}
                                        </span>
                                    </td>
                                    <td className='p-4'>
                                        <div className='flex relative'>
                                            <img
                                                src={Kebab}
                                                alt='Kebab'
                                                className='cursor-pointer'
                                                onClick={() => setOpenMenuIndex(openMenuIndex === item.id ? null : item.id)}
                                            />
                                            {openMenuIndex === item.id && (
                                                <div className='absolute top-full w-[150px] flex flex-col gap-3 right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg  z-10'>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedReportId(item.id)
                                                            setOpenDetailsModal(true)
                                                            setOpenMenuIndex(null)
                                                        }}
                                                        className='font-jost hover:bg-[#f6f6f6] w-full py-2'
                                                    >
                                                        Mark as Done
                                                    </button>
                                                    <button 
                                                        className='font-jost hover:bg-[#f6f6f6] w-full py-2'
                                                        onClick={() => {
                                                            setUploadReportId(item.id)
                                                            fileInputRef.current?.click()
                                                            setOpenMenuIndex(null)
                                                        }}
                                                    >
                                                        Upload Report
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}) : (
                                <tr>
                                    <td colSpan="7" className='p-4 text-center text-GREY-200 font-jost'>
                                        No Record Found
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
                            disabled={!pagination?.nextPageUrl}
                        >
                            <p className='text-GREY-200 font-jost'>Next</p>
                            <FaArrowRight className='w-4 h-4 mt-[1px] text-GREY-200' />
                        </button>
                    </div>

                </div>
            </div>

            {openDetailsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 min-w-[200px]">
                        <div className="flex flex-col items-center">
                            <p className="text-sm font-jost text-gray-700 mb-4">Update Status</p>
                            <button onClick={() => {updateStatusToDone(selectedReportId); setOpenDetailsModal(false); }}>Mark as Done</button>
                            <button onClick={() => setOpenDetailsModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ReportManagement