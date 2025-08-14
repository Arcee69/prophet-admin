import React from 'react'

const Buttons = ({className, text, action, textColor }) => {
  return (
    <button 
        type='button'
        onClick={action} 
        className={`${className} rounded-[8px] cursor-pointer w-[243px] p-2 flex items-center justify-center`}
    >
        <p className={`${textColor} font-jost font-medium text-base leading-6`}>{text}</p>
    </button>
  )
}

export default Buttons