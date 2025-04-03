import React from 'react'

const Disclaimer = ({ handleclose }) => {

    return (
        <div className='disclaimer bg-[#eee] text-[black] text-sm flex justify-between items-center py-4 px-3 sm:px-8 sm:py-4 '>
            <div className='text-[black] w-[57%] line-clamp-2 max-[1300px]:w-[90%] font-light overflow-ellipsis'>We and <a href="https://www.spotify.com/legal/cookies-vendor-list/">our partners</a> use cookies to personalize your experience, to show you ads based on your interests, and for measurement and analytics purposes. By using our website and services, you agree to our use of cookies as described in our
                <a href="https://www.spotify.com/legal/cookies-policy/"> Cookie Policy.</a>
            </div>
            <button onClick={() => handleclose()}> <img typeof='svg' className='w-[16px] h-[16px] cursor-pointer' src="https://cdn.cookielaw.org/logos/static/ot_close.svg" alt="" /></button>
        </div>
    )
}

export default Disclaimer