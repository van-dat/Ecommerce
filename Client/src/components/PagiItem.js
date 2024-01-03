import React from 'react'
import { clsx } from 'clsx'
import icons from '../ultils/icon'


const PagiItem = ({ children, setCurrentPage, currentPage }) => {
    const handlePage = (e) => {
        setCurrentPage(e)
        console.log(e)
    }
    console.log(children)

    return (
        <>
            
            <div onClick={() => handlePage(children)} className={clsx(' flex  rounded-full hover:bg-header ', !Number(children) && 'items-end p-3 ', Number(children) && 'p-1 items-center px-3 cursor-pointer active:border', currentPage === children && 'bg-blue-400 ')}>
                {children}
            </div>
            
        </>

    )
}

export default PagiItem
