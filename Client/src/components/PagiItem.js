import React from 'react'
import { clsx } from 'clsx'
import icons from '../ultils/icon'


const PagiItem = ({ children, setCurrentPage, currentPage }) => {
    const handlePage = (e) => {
        setCurrentPage(e)
        console.log(e)
    }


    return (
        <>
            
            <div onClick={() => handlePage(children)} className={clsx(' flex  justify-center items-center  rounded-lg text-md font-bold   ', !Number(children) && 'items-end p-3 ', Number(children) && 'p-1 items-center px-3 cursor-pointer active:border', currentPage === children ? ' border-blue-500 border text-blue-500 ':'hover:bg-gray-400')}>
                {children}
            </div>
            
        </>

    )
}

export default PagiItem
