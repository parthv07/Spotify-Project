import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Left from './Left'
import Signup from './Signupbar'
import { useAuth } from "./AuthContext";
import Player from './MusicPlayer'
import Disclaimer from './Disclaimer'
import { Outlet } from 'react-router-dom';
import Queuedlist from './Queuedlist'
import Navbarphone from './Navbarphone';
import { useMusicP } from './MusicpContext';
import LoginDisclaimer from "./LoginDisclaimer";


const Home = () => {
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const { token } = useAuth();
    const { setShowQueue, showQueue } = useMusicP();
    const [opensrch, setopensrch] = useState(false);
    const [loginclicked, setloginclicked] = useState(false);


    useEffect(() => {
        setTimeout(() => setShowDisclaimer(true), 800);
        const updateHeight = () => {
            const navbar = document.getElementById("navbar");
            const foot = document.getElementById("foot");
            const homebar = document.getElementById("homebar"); ``
            if (navbar && foot && homebar) {
                document.documentElement.style.setProperty("--navbar-height", `${navbar.offsetHeight}px`);
                document.documentElement.style.setProperty("--foot-height", `${foot.offsetHeight}px`);
                document.documentElement.style.setProperty("--homebar-height", `${homebar.offsetHeight}px`);
            }
        };
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);
    const handleclose = () => {
        setShowDisclaimer(false);
        setTimeout(() => {
            setShowDisclaimer(null);
        }, 800);
    }
    const handlequeue = () => {
        setShowQueue(!showQueue)
    }
    return (
        <div>
            <div className='bg-black p-2'>
                <Navbar opensrch={opensrch} setloginclicked={setloginclicked} />
                <div className='flex h-[calc(100vh-148px)] max-lg:h-[calc(100vh-var(--navbar-height)-16px-var(--foot-height)-var(--homebar-height))]'>
                    <Left />
                    <Outlet />
                </div>
                <div id='foot'>
                    {token ? (
                        <div className='relative h-full overflow-hidden '>
                            <div className=''> <Player /></div>
                            {showDisclaimer !== null && (
                                <div className={`absolute h-full w-full bottom-0 z-10 transition-all duration-800 ease-in-out ${showDisclaimer ? "translate-y-0" : "translate-y-[100%]"}`}>
                                    {<Disclaimer handleclose={handleclose} />}
                                </div>)}
                            {showQueue && <div className={`fixed bottom-21 z-[60]  max-lg:h-[calc(100vh-var(--homebar-height))] right-10 max-lg:top-0 max-lg:left-0 transition-all duration-1000 ease-in-out `}><Queuedlist /></div>}
                        </div>) : (<Signup />)}
                </div>
                <div id='homebar' className='min-[1024px]:hidden '><Navbarphone handlequeue={handlequeue} showQueue={showQueue} setopensrch={setopensrch}  /></div>
            </div>
            {loginclicked && <LoginDisclaimer setloginclicked={setloginclicked} />}
        </div>
    )
}
export default Home