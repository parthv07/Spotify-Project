import React from 'react'
import { Hlbtn } from './small components/Components'
import { Link } from "react-router-dom";

const Signupbar = () => {
    return (
        <div className='flex max-md:flex-col justify-between items-center bg-[linear-gradient(90deg,#af2896,#509bf5)] mt-2 max-sm:mt-0 py-2.5 px-4'>
            <div  >
                <h4 className='text-[#fff] font-normal text-[14px] max-md:hidden'>Preview of Spotify</h4>
                <p className='text-[#fff] font-light text-[16px] max-md:text-center'>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
            </div>
            <Hlbtn className='text-nowrap max-md:hidden' btnvalue="Sign up free" />
        </div>
    )
}

export default Signupbar