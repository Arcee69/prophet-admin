import React from 'react'
import { MdClose } from 'react-icons/md'

const DetailsModal = ({ handleClose, selectedReport, setSelectedReport }) => {
    return (
        <div className='bg-[#fff] w-[600px] h-[400px] flex flex-col gap-4 overflow-y-scroll  mt-[100px] rounded-lg p-4'>
            <div className='flex items-center justify-between'>
                <p className='font-medium font-jost  text-[24px] text-[#000]'>Report Info</p>
                <button className="flex justify-center items-center" onClick={() => { handleClose(), setSelectedReport(null) }}>
                    <MdClose className='w-5 h-5 ' />
                </button>
            </div>
            <div className='flex flex-col'>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-jost font-semibold capitalize text-DARK-300">
                        Report Details: {selectedReport.subject}
                    </h3>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-sm text-GREY-500">Type</p>
                        <p className="font-jost">{selectedReport.report_type}</p>
                    </div>
                    <div>
                        <p className="text-sm text-GREY-500">Region</p>
                        <p className="font-jost">{selectedReport.region}</p>
                    </div>
                    <div>
                        <p className="text-sm text-GREY-500">Status</p>
                        <p className="font-jost capitalize">{selectedReport.status || 'Pending'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-GREY-500">Request</p>
                        <p className="font-jost whitespace-pre-wrap">{selectedReport.request || 'Not Available'}</p>
                    </div>
                </div>
                <div className='flex items-center  mt-5 justify-center'>
                    <button
                        onClick={() => { handleClose(), setSelectedReport(null) }}
                        className='flex bg-ORANGE-100 p-2 rounded-lg items-center justify-center gap-1.5 cursor-pointer w-[100px] h-[40px]'
                    >
                        <p className='text-[#fff] text-base font-lato text-center'>{"Close"}</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailsModal