import React, { useState } from 'react'
import { IoWarningOutline } from 'react-icons/io5'
import { FaRegCopy } from "react-icons/fa6";
import { Hlbtn } from "./small components/Components";
import { useAuth } from './AuthContext';
import { RxCross2 } from 'react-icons/rx';

const LoginDisclaimer = ({ setloginclicked }) => {
    const { login } = useAuth();
    const [copiedemail, setCopiedemail] = useState(false);
    const [copiedpassword, setCopiedpassword] = useState(false);
    const email = "spotifyproject.dev07@gmail.com";
    const password = "spotify@123";

    const handleCopy = (value) => {
        navigator.clipboard.writeText(value);
        value === email ? setCopiedemail(true) : setCopiedpassword(true);
        setTimeout(() => { value === email ? setCopiedemail(false) : setCopiedpassword(false) }, 2000);
    };

    return (
        <div className='fixed top-0 left-0 z-[100] w-full h-screen bg-[#000000c2] flex justify-center '>
            <div className='flex items-center h-full lg:w-[50%] max-lg:px-3 py-10'>
                <div className='bg-[#121212] rounded-md lg:p-8 max-lg:p-4 flex flex-col gap-3 max-[1800px]:h-full : overflow-auto scrollbar-none relative'>
                    <button onClick={() => { setloginclicked(false) }} className=' p-1 cursor-pointer absolute top-4 right-4 '><RxCross2 className='h-7 w-7' /> </button>
                    <div className='w-full'>
                        <IoWarningOutline className='h-10 w-10 m-auto fill-red-900 stroke-red-900' />
                    </div>
                    <div className="text-sm space-y-2">
                        <p className="text-[16px] text-red-700">
                            Note: You can login into this web app using your own spotify account, all the features like ( play, pause, skip, shuffle, repeat, recently played, Queuelist ) in this web app are fully functional For Spotify Premium users only.
                        </p>
                        <p className="font-semibold text-white">Why Some ( user specific )Features may not work, as this web app uses spotify's official web api for authentication as well as getting songs data:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Web Playback SDK is limited to Spotify Premium users only.( which restricts play, pause, skip etc player actions )</li>
                            <li>Access to full track streaming requires a Premium subscription.</li>
                            <li>Spotify API restricts certain user data ( like recently played tracks, getting queue ) for free users.</li>
                            <li>These limitations are due to licensing and Spotify's developer policy.</li>
                        </ul>
                        <p className="mt-4 text-white bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-lg px-4 py-2 tracking-wider">
                            👉 For a quick demo or a full tour of the website, feel free to <a href="mailto:vashaniparth07.dev@gmail.com" className="text-[#1DB954] underline">contact me</a>.
                        </p>
                        <p className='text-white'> Note: If you still wish to login for with a free account you can still fetch alums, playlist, search for songs etc. Or for educational purposes or just a quick tour of the website you can sign up in the process further or you can login with the credentials below.</p>
                    </div>
                    <p className='text-white text-[16px]'>Please copy the credentials below and paste it in the login form further after clicking the login button</p>
                    <div className='min-[1350px]:grid grid-cols-2 gap-3 w-full'>
                        <div className=''>
                            <label htmlFor="email">Email</label>
                            <div name='email' className='border border-white p-2.5 rounded-md flex gap-4 justify-between items-center '><span className='overflow-hidden max-[350px]:w-[165px] max-[380px]:w-[210px]'>{email}</span> { copiedemail ? <p className='text-xs'>copied!</p>: <button onClick={() => handleCopy(email)} className='cursor-pointer'><FaRegCopy className=' hover:fill-white' /></button>}</div>
                        </div>
                        <div className=''>
                            <label htmlFor="password">Password</label>
                            <div name='password' className='border border-white p-2.5 rounded-md flex gap-4 justify-between items-center '><span>{password}</span>{ copiedpassword ? <p className='text-xs'>copied!</p>: <button onClick={() => handleCopy(password)} className='cursor-pointer'><FaRegCopy className=' hover:fill-white' /></button>}</div>
                        </div>
                    </div>
                    <div onClick={() => login()} className='w-full text-center'> <Hlbtn className='bg-green-400 min-w-[40%] hover:bg-white' btnvalue="Log in" /></div>
                </div>
            </div>
        </div>
    )
}

export default LoginDisclaimer