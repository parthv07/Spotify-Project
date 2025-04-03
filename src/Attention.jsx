import React, { use, useEffect } from 'react'
import { IoMdLogIn } from "react-icons/io";
import { useAuth } from "./AuthContext";
import { useConn } from './ConnContext';

const Attention = () => {
    const { token } = useAuth();
    const { isOffline } = useConn();
    if (!isOffline && token) return null;
    return (
        <div >
            {isOffline && <div className='flex flex-col items-center justify-center h-[365px] text-white'>
                <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="80"
                    height="80"
                    fill="currentColor"
                >
                    <path d="M14.86 1.589a1 1 0 0 1 .366 1.366L4.204 22.045a1 1 0 1 1-1.732-1l1.74-3.013A7 7 0 0 1 7.764 5h3.97l1.758-3.045a1 1 0 0 1 1.367-.366zm-4.28 5.41H7.766A5 5 0 0 0 5.21 16.3L10.58 7zm10.582-5.41a1 1 0 0 1 .366 1.366l-1.74 3.013A7 7 0 0 1 16.236 19h-3.97l-1.758 3.045a1 1 0 1 1-1.733-1l11.022-19.09a1 1 0 0 1 1.366-.366zm-7.743 15.41h2.816a5 5 0 0 0 2.554-9.3l-5.37 9.3z"></path>
                </svg>
                <h1 className="text-5xl font-bold my-6">You're offline</h1>
                <p className="text-md mt-2 text-center">
                    Make sure you're online. Spotify works best with an internet connection.
                </p>
            </div>}
            {!isOffline && !token && <div className='flex flex-col items-center justify-center h-[365px] text-white'>
                <IoMdLogIn size={80} />
                <h1 className="text-5xl font-bold my-6 text-center">Sign up <br className=' min-[480px]:hidden' /> Or Log in!</h1>
                <p className="text-md mt-2"> Please sign up or log in to continue. </p>
            </div>}
        </div>
    )
}

export default Attention