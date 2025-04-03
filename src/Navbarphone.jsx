import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import { GoHome } from "react-icons/go";
import { HiOutlineQueueList } from 'react-icons/hi2';
import { IoWarningOutline } from 'react-icons/io5';
import { PiQueueBold } from 'react-icons/pi';
import { Link } from "react-router-dom";

const Navbarphone = ({ handlequeue, setopensrch }) => {
    return (
        <div className=''>
            <div className='bg-black w-full grid grid-cols-4 justify-center align-center pt-2.5 pb-2'>
                <Link to="/"><div onClick={(e) => { setopensrch(false) }} className='flex flex-col justify-between items-center'><GoHome className='h-6 w-6' /> <span className='text-sm' >Home</span></div></Link>
                <div onClick={() => setopensrch(true)} className='flex flex-col justify-between items-center'><FiSearch className='h-6 w-6' /> <span className='text-sm'>Search</span></div>
                <div onClick={handlequeue} className='flex flex-col justify-between items-center'><HiOutlineQueueList className='h-6 w-6' /> <span className='text-sm'>Queue</span></div>
                <div className='flex flex-col justify-between items-center relative '><PiQueueBold className='h-6 w-6 opacity-25' /><span className='text-sm text-[#ffffff33]'>Playlists</span>
                    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-transparent'><IoWarningOutline className='h-7 w-7 fill-red-900 stroke-red-900' /></div></div>
            </div>
        </div>
    )
}
export default Navbarphone