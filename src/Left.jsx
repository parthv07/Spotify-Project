import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { Hlbtn } from './small components/Components';
import { PiGlobeBold, PiQueueBold } from "react-icons/pi";
import { GiAnticlockwiseRotation } from 'react-icons/gi';
import RecentlyPlayedTracks from './Recentlyplayed';
import { useAuth } from './AuthContext';
import { IoIosArrowBack } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';

const Left = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isrecentlyOpen, setIsrecentlyOpen] = useState(false);
    const { token } = useAuth();
    const [openleft, setOpenleft] = useState(false);

    const handleclose = (v) => {
        setOpenleft(v);
    }

    return (
        openleft ?
            <aside className={`h-full lg:w-[35%] bg-[#121212] rounded-md mb-2 min-w-[300px] overflow-auto scrollbar-none '}`}>
                <div className='  flex flex-col '>
                    <div onClick={() => handleclose(false)} className='flex items-center justify-between'>
                        <div className='flex flex-nowrap gap-3 p-7'>
                            <svg fill='#b3b3b3' data-encore-id="icon" role="img" aria-hidden="true" height={24} width={24} viewBox="0 0 24 24">
                                <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
                            </svg>
                            <span>Your Library</span>
                        </div>
                        <div className='m-7'><IoIosArrowBack className='h-6 w-6' /></div>
                    </div>
                    <div className='relative'>
                        {/* Clickable Header */}
                        <div className={`flex justify-between items-center mx-3 py-5 px-4 cursor-pointer opacity-25 ${!isOpen ? "hover:bg-[#1f1f1f]" : ""} rounded-md`}
                            onClick={() => setIsOpen(!isOpen)}>
                            <div className='flex flex-nowrap gap-3'>
                                <PiQueueBold className={`h-6 w-6 ${isOpen ? "fill-white" : ""}`} />
                                <span className={isOpen ? "text-white" : ""}>Playlists</span>
                            </div>
                            <FaPlus className={`p-3 size-10 transition-transform duration-300 ${isOpen ? "rotate-45 fill-white" : ""}`} />
                        </div>

                        {/* Collapsible Content with Slide Effect */}

                        <div className={`overflow-y-auto transition-all duration-300 ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                            {token ? <div className='playlist-create p-2 flex flex-col gap-3.5'>
                                <div className='bg-[#1f1f1f] px-5 py-4 flex flex-col gap-5 rounded-md my-1.5'>
                                    <div className='flex flex-col gap-1'>
                                        <h4 className='text-[#fff]'>Create your first playlist</h4>
                                        <p className='text-[#fff] text-[14px]'>It's easy, we'll help you</p>
                                    </div>
                                    <span>
                                        <Hlbtn btnvalue="Create playlist" className='px-5 py-0.5 text-sm h-8 hover:scale-105' />
                                    </span>
                                </div>
                                <div className='bg-[#1f1f1f] px-5 py-4 flex flex-col gap-5 rounded-md my-1.5'>
                                    <div className='flex flex-col gap-1'>
                                        <h4 className='text-[#fff]'>Let's find some podcasts to follow</h4>
                                        <p className='text-[#fff] text-[14px]'>We'll keep you updated on new episodes</p>
                                    </div>
                                    <span>
                                        <Hlbtn btnvalue="Browse podcasts" className='px-5 py-0.5 text-sm h-8 hover:scale-105' />
                                    </span>
                                </div>
                            </div> : <p className="p-6">Sign in to see your recently played tracks.</p>}
                        </div>
                        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-transparent'><IoWarningOutline className='h-7 w-7 fill-red-900 stroke-red-900' /></div>


                    </div>
                    <div className=''>
                        {/* Clickable Header */}
                        <div className={`flex justify-between items-center mx-3 py-5 px-4 cursor-pointer ${!isrecentlyOpen ? "hover:bg-[#1f1f1f]" : ""} rounded-md `}
                            onClick={() => setIsrecentlyOpen(!isrecentlyOpen)}>
                            <div className='flex flex-nowrap gap-3'>
                                <GiAnticlockwiseRotation className={`h-6 w-6 ${isrecentlyOpen ? "fill-white" : ""}`} />
                                <span className={isrecentlyOpen ? "text-white" : ""}>Recently played</span>
                            </div>
                            <FaPlus className={`p-3 size-10 transition-transform duration-300 ${isrecentlyOpen ? "rotate-45 fill-white" : ""}`} />
                        </div>

                        {/* Collapsible Content with Slide Effect */}
                        <div className={`overflow-y-auto transition-all duration-300 ${isrecentlyOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className='playlist-create p-2 flex flex-col gap-3.5'>
                                <RecentlyPlayedTracks />
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className='flex flex-col gap-2 my-8 pl-6 pr-10'>
                        <div className='flex flex-wrap gap-4 text-[11px] '>
                            <a href="#">Legal</a>
                            <a href="#">Safety&PrivacyCenter</a>
                            <a href="#">PrivacyPolicy</a>
                            <a href="#">Cookies</a>
                            <a href="#">AboutAds</a>
                            <a href="#">Accessibility</a>
                        </div>
                        <h6><a className='text-[12px] text-[#fff] hover:underline' href="#">Cookies</a></h6>
                    </div>
                </div>
                <div className='px-6 mb-8 '>
                    <button className='flex flex-nowrap justify-center items-center border border-[#b3b3b3] py-1 px-3 rounded-full hover:scale-105 hover:border-[#fff]'>
                        <PiGlobeBold className='size-5 fill-[#fff]' />
                        <span className='text-[14px] text-[#fff]'>&nbsp;English</span>
                    </button>
                </div>
            </aside >
            :
            !openleft && <aside onClick={() => handleclose(true)} className='bg-[#121212] rounded-md mb-2 px-4 sm:px-7 h-full'>
                <div className='my-7'>
                    <svg fill='#b3b3b3' data-encore-id="icon" role="img" aria-hidden="true" height={24} width={24} viewBox="0 0 24 24">
                        <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
                    </svg></div>
                <div className='my-14'>
                    <PiQueueBold className='h-6 w-6' />
                </div>
                <div className='my-14'>
                    <GiAnticlockwiseRotation className='h-6 w-6' />
                </div>
            </aside>
    )
}
export default Left