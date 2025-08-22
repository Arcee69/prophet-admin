import React from 'react'
import { CgSpinner } from 'react-icons/cg'

const Buttons = ({className, text, action, textColor, loading }) => {
  return (
    <button 
        type='button'
        onClick={action} 
        className={`${className} rounded-[8px] cursor-pointer w-[243px] p-2 flex items-center justify-center`}
    >
        <p className={`${textColor} font-jost font-medium text-base leading-6`}>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : text}</p>
    </button>
  )
}

export default Buttons