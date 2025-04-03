import React from 'react'
import Footer from './Footer'
import { useAuth } from "./AuthContext";
import { useConn } from './ConnContext';
import Attention from './Attention';
import { Outlet } from 'react-router-dom';
 
const Right = () => {
    const { token } = useAuth();
    const { isOffline } = useConn();

    return (
        <div className='bg-[#121212] mx-2 mb-2 rounded-md h-full w-full overflow-y-scroll scrollbar-none '>
            <main className='w-full'>
                {!isOffline && token ? <Outlet /> : <Attention />}
            </main>
            <Footer />
        </div>
    )
}

export default Right