import React, { useState } from 'react'
import { useAuth } from './AuthContext'

const Hamburgermenu = ({setloginclicked}) => {
    const [color] = useState("black");
    const { token, logout, user, login } = useAuth();
    return (
        <div style={{ backgroundColor: color }} className=' flex flex-col gap-10 w-screen h-screen bg-black px-10 py-14'>
            {token ? <div className='flex flex-col gap-5 items-start'>
                <div className=" text-2xl text-white font-bold">
                    {user?.display_name}
                </div>
                <button onClick={logout} className=" text-[#fff] cursor-pointer text-nowrap"> Log out</button>
            </div> :
                <div className='flex flex-col gap-5 items-start '>
                    <button onClick={() => { setloginclicked(true) }} className='text-xl text-white cursor-pointer'>Log in</button>
                    <button className='text-xl text-white cursor-pointer'>Sign up</button>
                </div>}
            <div className='border border-white w-4'></div>
            <div className='flex flex-col gap-5'>
                <span><a className='text-md text-white' href="">Premium</a></span>
                <span><a className='text-md text-white' href="">Support</a></span>
                <span><a className='text-md text-white' href="">Download</a></span>
                <a href="">
                    <span className=" text-md text-white text-nowrap">Install App</span>
                </a>
            </div>
        </div>
    )
}
export default Hamburgermenu