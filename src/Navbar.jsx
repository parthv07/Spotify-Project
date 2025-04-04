import { MdDownloading } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Hlbtn } from "./small components/Components";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { useSearch } from "./SearchContext";
import { useConn } from './ConnContext';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import fulllogo from "./assets/Spotify Logo/Full_Logo_White_CMYK.svg"
import logo from "./assets/Spotify Logo/Primary_Logo_White_CMYK.svg"
import Hamburgermenu from "./Hamburgermenu";
import { GoHome } from "react-icons/go";

const Navbar = ({ opensrch }) => {
    const navigate = useNavigate();
    const { srchquery } = useParams();
    const { token, logout, user, login } = useAuth();
    const { query, setQuery, searchResult } = useSearch();
    const { isOffline } = useConn();
    const [isOpen, setIsOpen] = useState(false);
    const [isHome, setIsHome] = useState(false);

    useEffect(() => {
        if (window.location.pathname === "/") {
            setIsHome(true);
        }
        else {
            setIsHome(false);
        }
    }, [window.location.pathname]);
    useEffect(() => {
        if (!srchquery) return;
        if (srchquery) {
            setQuery(srchquery);
        }
    }, [srchquery]);
    useEffect(() => {
        if (Object.keys(searchResult).length !== 0) {
            navigate(`/search/${query}`);
        }
    }, [searchResult]);
    return (
        <nav id="navbar" className="flex items-center justify-between bg-black text-white px-2 pb-2">
            <div className="lg:flex items-center gap-2.5 hidden">
                <img className="size-9 mx-4" src={logo} alt="logo" />
                <div className="flex items-center justify-center rounded-full bg-[#1f1f1f] p-2.5 size-12 ">
                    <button onClick={() => navigate("/")}>
                        <GoHome className={`${isHome ? "fill-white" : ""} w-7 h-7`} />
                    </button>
                </div>
                <div className="relative hidden sm:block cursor-pointer">
                    <input id="search" value={query}
                        onChange={(e) => setQuery(e.target.value)} type="text" placeholder="What do you want to play?" className="bg-[#1f1f1f] text-[#fff]  px-4 py-2 rounded-full pl-13 h-12 min-w-[270px] min-[1300px]:min-w-[400px] min-[1300px]:pr-24 " />
                    <label htmlFor="search">
                        <FiSearch className="size-10 px-2 absolute left-1.5 top-1/2 transform -translate-y-1/2 text-[#fff]" /></label>
                    {query &&
                        <RxCross1 onClick={() => setQuery("")} className="z-10 absolute right-6 top-1/2 transform -translate-y-1/2 size-6 cursor-pointer " />}
                </div>
            </div>
            <div className="lg:flex items-center gap-6 text-sm hidden">
                {isOffline && (<div className="p-2 bg-[#2e77d0] rounded-full">
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="#fff"
                    >
                        <path d="M14.86 1.589a1 1 0 0 1 .366 1.366L4.204 22.045a1 1 0 1 1-1.732-1l1.74-3.013A7 7 0 0 1 7.764 5h3.97l1.758-3.045a1 1 0 0 1 1.367-.366zm-4.28 5.41H7.766A5 5 0 0 0 5.21 16.3L10.58 7zm10.582-5.41a1 1 0 0 1 .366 1.366l-1.74 3.013A7 7 0 0 1 16.236 19h-3.97l-1.758 3.045a1 1 0 1 1-1.733-1l11.022-19.09a1 1 0 0 1 1.366-.366zm-7.743 15.41h2.816a5 5 0 0 0 2.554-9.3l-5.37 9.3z"></path>
                    </svg></div>)}
                <div className="flex items-center gap-3 border-r px-5 py-1 text-[16px] ">
                    <a className="hover:scale-103 hover:text-white" href="#">Premium</a>
                    <a className="hover:scale-103 hover:text-white" href="#">Support</a>
                    <a className="hover:scale-103 hover:text-white" href="#">Download</a>
                </div>
                <a href="#" className="hover:scale-103 flex items-center gap-1 m-2.5 group">
                    <MdDownloading className="size-5 group-hover:fill-white" />
                    <span className="text-nowrap group-hover:text-white">Install App</span>
                </a>
                {token ? <div className="flex items-center gap-4">
                    <div className="bg-[#1f1f1f] p-2 rounded-full hover:scale-105">
                        <div className="bg-[#19e68c] rounded-full text-black w-8 h-8 flex items-center justify-center text-md font-bold">
                            {user?.display_name[0]}
                        </div>
                    </div>
                    <button onClick={logout} className="bg-[#1f1f1f] text-[#fff] px-6 py-3 rounded-full cursor-pointer text-nowrap hover:scale-105"> Log out</button>
                </div>
                    : <div className="flex items-center gap-4">
                        <Link to="/signup" className="text-nowrap hover:scale-105 hover:text-white">Sign up</Link>
                        <div className="hover:scale-105" onClick={() => login()}>
                            <Hlbtn btnvalue="Log in" className="text-nowrap" />
                        </div>
                    </div>
                }
                <div className="w-[8vw] h-full hidden min-[1300px]:block"></div>
            </div>
            {!opensrch ? <div className="relative w-full lg:hidden">
                <div className=" flex items-center justify-between w-full p-2">
                    <img onClick={() => navigate("/")} src={fulllogo} className="h-8" alt="" />
                    <div className="flex items-center gap-2">
                        <Hlbtn btnvalue="Open App" className="text-nowrap px-4 py-0.5 text-sm h-7 block max-[319px]:hidden" />
                        <div onClick={() => setIsOpen(!isOpen)}>{isOpen ? <RxCross2 fill="white" className="h-7 w-7 relative z-50" /> : <TiThMenu fill="white" className="h-7 w-7 relative z-50" />}</div>
                    </div>
                </div>
                <div className={` fixed top-0 z-40 opacity-0 transition-all duration-800 ease-in-out ${isOpen ? "left-0 opacity-100" : "translate-x-[100%]"
                    }`}> <Hamburgermenu /></div>
            </div> : <div className="relative cursor-pointer m-auto w-[90%]">
                <input id="search" value={query}
                    onChange={(e) => setQuery(e.target.value)} type="text" placeholder="What do you want to play?" className="bg-[#1f1f1f] text-[#fff]  px-4 py-2 rounded-full pl-13 h-12 pr-20 w-full" />
                <label htmlFor="search">
                    <FiSearch className="size-10 px-2 absolute left-1.5 top-1/2 transform -translate-y-1/2 text-[#fff]" /></label>
                {query &&
                    <RxCross1 onClick={() => setQuery("")} className="z-10 absolute right-6 top-1/2 transform -translate-y-1/2 size-6 cursor-pointer " />}
            </div>}
        </nav>
    );
};

export default Navbar;