import React, { useState, useEffect } from 'react'
import UseNagination from './hook/UseNagination'
import PagiItem from './PagiItem'
import icons from '../ultils/icon'
import clsx from 'clsx'


const { MdKeyboardArrowLeft, MdKeyboardArrowRight } = icons
const Pagination = ({ totalPage, setPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const pagination = UseNagination(totalPage, currentPage,)
    useEffect(() => {
        setPage(currentPage)
    }, [currentPage]);

    return (
        <div className='flex items-center gap-2'>
            <button type='button' disabled={currentPage == 1 ? true : false} className={clsx('p-1   flex items-center justify-center  ', currentPage == 1 ? 'text-[#ddd] cursor-not-allowed' : 'hover:bg-gray-300 rounded-lg')}>
                <MdKeyboardArrowLeft size={26} />
            </button>
            {pagination?.map(el => (
                <PagiItem key={el} currentPage={currentPage} setCurrentPage={setCurrentPage}>
                    {el}
                </PagiItem>
            ))}
            <button type='button' className='p-1  hover:bg-gray-300 rounded-lg flex items-center justify-center'>
                <MdKeyboardArrowRight size={26} />
            </button>
        </div>
    )
}

export default Pagination
