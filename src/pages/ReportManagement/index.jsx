import { useState, useEffect, useRef, useCallback } from 'react'
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
import ModalPop from '../../components/modalPop'
import DetailsModal from './components/DetailsModal'

const ReportManagement = () => {
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [fileReport, setFileReport] = useState()
    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const [openMarkDoneModal, setOpenMarkDoneModal] = useState(false)
    const [openViewModal, setOpenViewModal] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)
    const [actionLoading, setActionLoading] = useState({ type: null, id: null })
    const fileInputRef = useRef(null)


    const dispatch = useDispatch()

    let URL = import.meta.env.VITE_APP_API_URL;
    const token = Cookies.get('token');

    const { reports, pagination, loading: reportsLoading } = useSelector((state) => state.allReports)

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close menu when clicking outside any kebab or dropdown
            if (!event.target.closest(".menu-wrapper")) {
                setOpenMenuIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    // const uploadReport = async (id, file) => {
    //     if (!file) {
    //         toast.error("Please select a file first");
    //         return;
    //     }

    //     setActionLoading({ type: 'upload', id });
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     try {
    //         const res = await axios.post(`${URL}/v1/reports/upload-report/${id}`, formData, {
    //             headers: {
    //                 "Authorization": `Bearer ${token}`,
    //                 "Content-Type": "multipart/form-data"
    //             }
    //         });

    //         toast.success(res.data.message || "File uploaded successfully");
    //         dispatch(fetchReports({ page: currentPage }));
    //     } catch (err) {
    //         console.log(err, "err");
    //         const errorMessage = err.data?.message || "Failed to upload report";
    //         toast.error(errorMessage);
    //     } finally {
    //         setActionLoading({ type: null, id: null });
    //         setFileReport(null);
    //     }
    // };


    const uploadReport = async (id, file) => {
        if (!file) {
            toast.error("Please select a file first");
            return;
        }

        // Start loading indicator
        setActionLoading({ type: 'upload', id });
        const formData = new FormData();
        formData.append('file', file);

        // Show persistent loading toast
        const toastId = toast.loading("Uploading report...");

        try {
            const res = await axios.post(`${URL}/v1/reports/upload-report/${id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    toast.update(toastId, { render: `Uploading report... ${percent}%`, isLoading: true });
                },
            });

            // Success
            toast.update(toastId, {
                render: res.data.message || "File uploaded successfully ✅",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            dispatch(fetchReports({ page: currentPage }));

            // Auto-close menu or modal
            setOpenMenuIndex(null);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Failed to upload report";
            toast.update(toastId, {
                render: errorMessage,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setActionLoading({ type: null, id: null });
            setFileReport(null);

            // Reset file input (so user can upload same file again)
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };



    const updateStatusToDone = async (id) => {
        setActionLoading({ type: 'mark-done', id })
        try {
            const res = await api.patch(appUrls?.REPORTS_URL + `/mark-as-done/${id}`)
            toast.success(`${res.data.message}`)
            dispatch(fetchReports({ page: currentPage }))
            setOpenMarkDoneModal(false)
        } catch (err) {
            console.log(err, "err")
            const errorMessage = err.data?.message || "Failed to update status"
            toast.error(errorMessage)
        } finally {
            setActionLoading({ type: null, id: null })
        }
    }

    // Debounced search with useCallback
    const handleSearch = useCallback((value) => {
        setSearch(value)
    }, [])

    // Filter reports based on search (fallback if server doesn't filter perfectly)
    const filteredReports = reports.data?.filter(item =>
        item.subject?.toLowerCase().includes(search.toLowerCase()) ||
        item.report_type?.toLowerCase().includes(search.toLowerCase()) ||
        item.region?.toLowerCase().includes(search.toLowerCase())
    ) || []

    const handlePrevious = () => {
        if (pagination?.prevPageUrl) {
            setCurrentPage(prev => prev - 1)
            setOpenMenuIndex(null) // Close any open menus
        }
    }

    const handleNext = () => {
        if (pagination?.nextPageUrl) {
            setCurrentPage(prev => prev + 1)
            setOpenMenuIndex(null) // Close any open menus
        }
    }

    // 1️⃣ handleUploadClick - accept id and attach it to the input
    const handleUploadClick = (id) => {
        // Reset file input to allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.dataset.reportId = id; // Store id temporarily on input element
        }
        fileInputRef.current?.click();
        setOpenMenuIndex(null);
    };

    // 2️⃣ handleFileChange - read id directly from the input dataset
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const reportId = e.target.dataset.reportId; // Retrieve id

        if (!file) return;

        const allowedTypes = ['.pdf', '.doc', '.docx', '.jpeg', '.png', '.jpg'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

        if (!allowedTypes.includes(fileExtension)) {
            toast.error("Please select a PDF, DOC, or DOCX file");
            return;
        }

        // if (file.size > 5 * 1024 * 1024) {
        //     toast.error("File size must be less than 5MB");
        //     return;
        // }

        setFileReport(file);

        // ✅ Upload with correct ID
        if (reportId) {
            uploadReport(reportId, file);
        }
    };


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

    console.log(openViewModal, "openViewModal", selectedReport, "selectedReport")


    return (
        <div className='flex flex-col gap-[57px]'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <p className='text-DARK-300 text-[30px] font-jost leading-[38px] font-semibold'>Report Management</p>
                    <p className='text-GREY-500 font-jost text-base leading-6'>Manage Reports here</p>
                </div>
            </div>

            <div className='w-full bg-white rounded-[15px] py-[30px] px-6 flex flex-col gap-[15px]'>
                {/* Search Section */}
                <div className='bg-GREY-50 p-5 rounded-lg flex items-center gap-3'>
                    <div className='flex flex-col gap-1.5'>
                        <p className='text-GREY-300 font-jost text-sm '>Search for Reports</p>
                        <div className='w-full md:w-[586px] flex items-center border border-[#E4E7EC] bg-[#fff] rounded-lg h-[36px]'>
                            <div className='bg-[#fff] h-full rounded-tl-lg rounded-bl-lg flex items-center p-2'>
                                <IoSearch className='w-4 h-4 text-[#00000066]' />
                            </div>
                            <input
                                name='search'
                                value={search}
                                className='w-full bg-[#fff] font-jost h-full rounded-tr-lg rounded-br-lg p-2 outline-none'
                                placeholder='Search by subject, type, or region...'
                                onChange={(e) => handleSearch(e.target.value)}
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
                    accept=".pdf,.doc,.docx"
                />

                {/* Table */}
                <div className='overflow-x-auto rounded-xl shadow'>
                    <table className='w-full border-collapse'>
                        <thead>
                            <tr className='bg-NEUTRAL-200'>
                                <th className='p-4 text-left'><input type='checkbox' /></th>
                                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Date</th>
                                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Title</th>
                                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Type</th>
                                {/* <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Description</th> */}
                                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Region</th>
                                <th className='p-4 text-left text-sm font-jost font-semibold text-DARK-500'>Status</th>
                                <th className='p-4 text-left text-sm font-jost text-DARK-500'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportsLoading ? (
                                <tr>
                                    <td colSpan="8" className='p-4 text-center text-GREY-200 font-jost'>
                                        Loading Data...
                                    </td>
                                </tr>
                            ) : filteredReports?.length > 0 ? filteredReports?.map((item) => {
                                const { text, bgColor, textColor } = getStatusColor(item.status)
                                const isMenuOpen = openMenuIndex === item.id
                                const isUploading = actionLoading.type === 'upload' && actionLoading.id === item.id
                                const isMarkingDone = actionLoading.type === 'mark-done' && actionLoading.id === item.id

                                return (
                                    <tr key={item.id} className={item.id % 2 === 0 ? 'bg-white' : 'bg-GREY-50'}>
                                        <td className='p-4'><input type='checkbox' /></td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-[#101928] font-jost capitalize">
                                            <div className='flex flex-col'>
                                                <p>{new Date(item.created_at).toLocaleDateString()}</p>
                                                <p className="text-GREY-500 text-xs">{new Date(item.created_at).toLocaleTimeString()}</p>
                                            </div>
                                        </td>
                                        <td className='p-4 text-sm capitalize font-jost text-DARK-500 max-w-[200px] truncate' title={item.subject}>
                                            {item.subject}
                                        </td>
                                        <td className='p-4 text-sm capitalize font-jost text-DARK-500'>{item.report_type}</td>
                                        <td className='p-4 text-sm font-jost text-DARK-500'>{item.region}</td>
                                        <td className='p-4 font-jost text-DARK-500'>
                                            <span className={`inline-flex px-2 py-1 text-sm capitalize font-jost rounded-full ${bgColor} ${textColor}`}>
                                                {text}
                                            </span>
                                        </td>
                                        <td className='p-4'>
                                            <div className="flex relative menu-wrapper">
                                                <img
                                                    src={Kebab}
                                                    alt="Actions menu"
                                                    className="cursor-pointer hover:opacity-70 transition-opacity"
                                                    onClick={() => setOpenMenuIndex(isMenuOpen ? null : item.id)}
                                                />
                                                {isMenuOpen && (
                                                    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[180px]">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedReport(item);
                                                                setOpenMarkDoneModal(true);
                                                                setOpenMenuIndex(null);
                                                            }}
                                                            className="font-jost hover:bg-GREY-50 w-full text-left px-4 py-3 text-sm text-DARK-500 transition-colors"
                                                            disabled={isMarkingDone}
                                                        >
                                                            {isMarkingDone ? "Updating..." : "Mark as Done"}
                                                        </button>
                                                        <button
                                                            className="font-jost hover:bg-GREY-50 w-full text-left px-4 py-3 text-sm text-DARK-500 transition-colors"
                                                            onClick={() => handleUploadClick(item.id)}
                                                            disabled={isUploading}
                                                        >
                                                            {/* {isUploading ? "Uploading..." : "Upload Report"} */}
                                                            {isUploading ? (
                                                                <div className="flex items-center gap-2">
                                                                    <span className="animate-spin border-2 border-t-transparent border-blue-500 rounded-full w-4 h-4"></span>
                                                                    Uploading...
                                                                </div>
                                                                ) : "Upload Report"}

                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedReport(item);
                                                                setOpenViewModal(true);
                                                                setOpenMenuIndex(null);
                                                            }}
                                                            className="font-jost hover:bg-GREY-50 w-full text-left px-4 py-3 text-sm text-DARK-500 transition-colors"
                                                        >
                                                            View Details
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                        </td>
                                    </tr>
                                )
                            }) : (
                                <tr>
                                    <td colSpan="8" className='p-8 text-center text-GREY-400 font-jost'>
                                        <div className="flex flex-col items-center gap-2">
                                            <IoSearch className="w-12 h-12 text-GREY-300" />
                                            <p className="text-lg">No reports found</p>
                                            <p className="text-sm">Try adjusting your search criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {!reportsLoading && filteredReports?.length > 0 && (
                        <div className='flex justify-between items-center p-4 mt-4 border-t border-GREY-100'>
                            <button
                                className={`flex items-center gap-3 ${!pagination?.prevPageUrl ? 'opacity-50 cursor-not-allowed' : 'hover:text-DARK-300 cursor-pointer'}`}
                                onClick={handlePrevious}
                                disabled={!pagination?.prevPageUrl}
                            >
                                <FaArrowLeft className='w-4 h-4' />
                                <p className='font-jost'>Previous</p>
                            </button>

                            <div className="flex items-center gap-2">
                                <span className='px-3 py-1 bg-GREY-100 text-white rounded-lg font-jost text-sm'>
                                    Page {currentPage}
                                    {pagination?.totalPages && ` of ${pagination.totalPages}`}
                                </span>
                            </div>

                            <button
                                className={`flex items-center gap-3 ${!pagination?.nextPageUrl ? 'opacity-50 cursor-not-allowed' : 'hover:text-DARK-300 cursor-pointer'}`}
                                onClick={handleNext}
                                disabled={!pagination?.nextPageUrl}
                            >
                                <p className='font-jost'>Next</p>
                                <FaArrowRight className='w-4 h-4' />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mark as Done Confirmation Modal */}
            {openMarkDoneModal && selectedReport && (
                <div
                    className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4"
                    style={{ opacity: 1 }}
                >
                    <div className="bg-white shadow rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-jost font-semibold text-DARK-300 mb-4">
                            Confirm Action
                        </h3>
                        <p className="text-GREY-500 font-jost mb-6">
                            Are you sure you want to mark this report as done? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setOpenMarkDoneModal(false)
                                    setSelectedReport(null)
                                }}
                                className="px-4 py-2 cursor-pointer text-GREY-500 font-jost hover:bg-GREY-50 rounded transition-colors"
                                disabled={actionLoading.type === 'mark-done'}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => updateStatusToDone(selectedReport.id)}
                                className="px-4 py-2 bg-ORANGE-100 cursor-pointer text-white font-jost rounded hover:bg-ORANGE-100 transition-colors disabled:opacity-50"
                                disabled={actionLoading.type === 'mark-done'}
                            >
                                {actionLoading.type === 'mark-done' ? 'Updating...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ModalPop isOpen={openViewModal}>
                <DetailsModal
                    handleClose={() => setOpenViewModal(false)}
                    selectedReport={selectedReport}
                    setSelectedReport={setSelectedReport}
                />
            </ModalPop>

        </div>
    )
}

export default ReportManagement