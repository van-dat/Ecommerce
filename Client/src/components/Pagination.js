import React, { useState, useEffect } from 'react'
import UseNagination from './hook/UseNagination'
import PagiItem from './PagiItem'
import icons from '../ultils/icon'
import clsx from 'clsx'


const { MdKeyboardArrowLeft ,MdKeyboardArrowRight } = icons
const Pagination = ({ totalPage, setPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setPage(currentPage)
    }, [currentPage]);
    const pagination = UseNagination(totalPage, currentPage)
 

    return (
        <div className='flex items-center gap-2'>
            <button type='button' disabled = {currentPage == 1 ? true : false } className={clsx('p-1 rounded-full  ', currentPage == 1 ? 'text-[#ddd]' : 'hover:bg-header')}>
                <MdKeyboardArrowLeft size={23} />
            </button>
            {pagination?.map(el => (
                <PagiItem key={el} currentPage={currentPage} setCurrentPage={setCurrentPage}>
                    {el}
                </PagiItem>
            ))}
            <button type='button' className='p-1 rounded-full hover:bg-header'>
                <MdKeyboardArrowRight size={23} />
            </button>
        </div>
    )
}

export default Pagination
