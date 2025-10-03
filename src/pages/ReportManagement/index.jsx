import React, { useState, useEffect } from 'react'
import { BiExport } from 'react-icons/bi'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { IoSearch } from 'react-icons/io5'

const ReportManagement = () => {
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const pagination = ""

    const report = []

    // Filter users based on search, status, and category
    const filteredReports = report?.filter(sub =>
        sub.user_id.toLowerCase().includes(search.toLowerCase()) &&
        (status === "" || sub.is_active === status) &&
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
    }, [search])


    // const exportExcel = () => {
    //     const worksheet = XLSX.utils.json_to_sheet(report);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    //     XLSX.writeFile(workbook, `Report_${Date.now()}.xlsx`);
    //   };


    return (
        <div className='flex flex-col gap-[57px]'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <p className='text-DARK-300 text-[30px] font-jost leading-[38px] font-semibold'>Report Management</p>
                    <p className='text-GREY-500 font-jost text-base leading-6'>Manage Reports here</p>
                </div>
                {/* <button
                    type='button'
                    className='w-[160px] p-4 rounded flex items-center justify-center gap-2 cursor-pointer bg-DARK-100'
                    onClick={exportExcel}
                >
                    <p className='text-white font-jost leading-[100%] text-[20px]'>Export</p>
                    <BiExport className='mt-[1.5px] w-5 h-5 text-white' />
                </button> */}
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
                                <th className='p-4 text-left text-sm font-jost text-DARK-500'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className='p-4 text-center text-GREY-200 font-jost'>
                                        Loading Data...
                                    </td>
                                </tr>
                            ) : filteredReports?.length > 0 ? filteredReports?.map((sub, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-GREY-50'}>
                                    <td className='p-4'><input type='checkbox' /></td>
                                    <td className='p-4'>
                                        <div className='flex flex-col gap-1'>
                                            <p className='text-sm font-jost text-DARK-500'>{sub.user_id.slice(0, 10)}</p>
                                            <p className='text-[10px] font-jost text-DARK-500'>{sub.email}</p>
                                        </div>
                                    </td>
                                    <td className='p-4 text-sm font-jost text-DARK-500'>{sub.subscription_plan.name}</td>
                                    <td className='p-4 text-sm font-jost text-DARK-500'>{sub.type === 'monthly' ? sub.subscription_plan.monthly_amount : sub.subscription_plan.annual_amount}</td>
                              
                                    <td className='p-4'>
                                        <span className={`${sub.is_active ? "bg-GREEN-50 text-GREEN-700" : "bg-red-100 text-red-500 "} text-xs font-medium px-2.5 py-2 rounded-lg`}>{sub.status ? "Active" : "Expired"}</span>
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
                                                            setOpenMenuIndex(null);
                                                        }}
                                                        className='font-jost text-green-400'
                                                    >
                                                        Update Status
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className='p-4'>
                                        <button className={`text-xs font-medium px-2.5 py-2 rounded-lg`}>
                                            Upload Report
                                        </button>
                                    </td>
                                </tr>
                            )) : (
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
                        // disabled={!pagination?.nextPageUrl}
                        >
                            <p className='text-GREY-200 font-jost'>Next</p>
                            <FaArrowRight className='w-4 h-4 mt-[1px] text-GREY-200' />
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ReportManagement