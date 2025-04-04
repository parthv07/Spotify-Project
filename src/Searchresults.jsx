import React from 'react'
import { useSearch } from './SearchContext';
import { Link } from 'react-router-dom';
import { RiPlayLargeFill } from 'react-icons/ri';
import { useTrack } from './TrackContext';
import { useState } from 'react';
import { useMusicP } from './MusicpContext';
import { useAuth } from './AuthContext';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import logo from "./assets/Spotify Logo/Primary_Logo_Green_CMYK.svg";
const Searchresults = () => {
    const { token } = useAuth();
    const { setTrack, setplaycardclicked } = useTrack();
    const { searchResult } = useSearch();
    const [filter, setfilter] = useState("All");
    const { isPlaying, setIsPlaying, addToQueue } = useMusicP();
    const categories = ["All", "Songs", "Artists", "Playlists", "Albums", "Podcasts & Shows"];
    const navigate = useNavigate();
    const handleFilter = (category) => {
        if (category === "All") {
            setfilter("All");
        } else if (category === "Songs") {
            setfilter("Songs");
        } else if (category === "Artists") {
            setfilter("Artists");
        } else if (category === "Playlists") {
            setfilter("Playlists");
        } else if (category === "Albums") {
            setfilter("Albums");
        } else if (category === "Podcasts & Shows") {
            setfilter("Podcasts & Shows");
        }
    };
    const handlePlay = (track) => {
        setTrack(track);
        if (!isPlaying) {
            setIsPlaying(true)
        }
    };

    const handleAddToQueue = (item) => {
        addToQueue(item.uri);
    }

    return (
        Object.keys(searchResult).length > 0 && token && (<div className='mx-6 max-[580px]:mx-1 flex flex-col gap-10'>
            <div className='py-3 flex gap-3 overflow-scroll scrollbar-none'>
                {categories.map((category, index) => (
                    <button onClick={() => handleFilter(category)}
                        key={category}
                        className={`px-3 py-1 rounded-full cursor-pointer text-nowrap ${filter !== category && "hover:bg-[#2a2a2a]"} ${filter === category
                            ? "bg-white text-black"
                            : "bg-[#1f1f1f] text-[#fff]"
                            }`}>
                        {category}
                    </button>
                ))}
            </div>
            {["All"].includes(filter) && <div className='lg:flex my-6 gap-3.5 '>
                <div className='min-w-[40%]'>
                    <h1 className='text-2xl'>Top Result</h1>
                    <div className='bg-[#181818] p-5 my-3 rounded-xl relative group/ancestor group cursor-pointer'>
                        <img height={92} width={92} src={searchResult.tracks.items[0].album.images[1].url || logo} alt="" />
                        <p className='text-3xl mt-8'>{searchResult.tracks.items[0].album.name}</p>
                        <button onClick={() => { handlePlay(searchResult.tracks.items[0]) }} className="bg-[#1ed760] p-3 absolute right-4 bottom-19 rounded-full opacity-0 pointer-events-none transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer"><RiPlayLargeFill fill="black" className="h-6 w-6" /></button>
                        <div className=''>
                            <span>Song </span>
                            {searchResult.tracks.items[0].artists.map((item, index, array) => (
                                <Link className='hover:underline hover:text-white' key={index} to=''>
                                    {item.name}{index < array.length - 1 ? ',' : ''}
                                </Link>
                            ))}
                        </div>
                        <div className='absolute right-30 bottom-4'>
                            <div onClick={(e) => { e.stopPropagation(), handleAddToQueue(item) }} className="relative group/parent flex items-center opacity-0 pointer-events-none group-hover/ancestor:opacity-100 group-hover/ancestor:pointer-events-auto">
                                <MdOutlineAddCircleOutline className="h-5 w-5 cursor-pointer" />
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover/parent:opacity-100 hover:pointer-events-auto bg-[#1ed760] text-white text-xs px-2 py-1 rounded transition duration-200 whitespace-nowrap">
                                    Add to queue
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:w-[80%]'>
                    <h1 className='text-2xl max-sm:mx-4'>Songs</h1>
                    {searchResult.tracks.items.slice(1, 5).map((item) => (
                        <div key={item.id} onClick={() => { handlePlay(item) }} className='flex justify-between py-3 lg:p-3 rounded-2xl hover:bg-[#2a2a2a] group/ancestor cursor-pointer '>
                            <div className='flex'>
                                <img className='object-cover mx-3' height={40} width={40} src={item.album.images[2]?.url || logo} alt="" />
                                <div>
                                    <p className='line-clamp-1'>{item.album.name}</p>
                                    <div className='line-clamp-1'>{item.artists.map((item, index, array) => (
                                        <Link className='hover:underline text-sm hover:text-white' key={index} to=''>
                                            {item.name}{index < array.length - 1 ? ',' : ''}
                                        </Link>
                                    ))}</div>
                                </div>
                            </div>
                            <div className='flex items-center w-[25%] justify-between max-lg:justify-end'>
                                <div onClick={(e) => { e.stopPropagation(), handleAddToQueue(item) }} className="relative group/parent flex items-center opacity-0 pointer-events-none group-hover/ancestor:opacity-100 group-hover/ancestor:pointer-events-auto max-lg:hidden">
                                    <MdOutlineAddCircleOutline className="h-5 w-5 cursor-pointer max-lg:hidden" />
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover/parent:opacity-100 hover:pointer-events-auto bg-[#1ed760] text-white text-xs px-2 py-1 rounded transition duration-200 whitespace-nowrap">
                                        Add to queue
                                    </span>
                                </div>
                                <div className='text-center '>
                                    <p>{`${Math.floor(item.duration_ms / 60000)}:${(`0${Math.floor((item.duration_ms % 60000) / 1000)}`).slice(-2)}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            {filter === "Songs" && <div className=''>
                <div className='flex justify-between lg:px-3 border-b items-center '>
                    <div className='flex items-center'>
                        <p className='p-2'>#</p>
                        <p className='mx-3'>Title</p>
                    </div>
                    <div className='my-auto px-3'>
                        <svg
                            role="img"
                            aria-hidden="true"
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                            <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
                        </svg>
                    </div>
                </div>
                {searchResult.tracks.items.map((item, index) => (
                    <div key={item.id} onClick={() => { handlePlay(item) }} className='flex justify-between py-3 lg:p-3 rounded-2xl hover:bg-[#2a2a2a] cursor-pointer group/ancestor'>
                        <div className='flex items-center'>
                            <p className='p-2'>{index + 1}</p>
                            <img className='object-cover mx-3' height={40} width={40} src={item.album.images[2].url || logo} alt="" />
                            <div>
                                <p className='line-clamp-1'>{item.album.name}</p>
                                <div className='line-clamp-1'>{item.artists.map((item, index, array) => (
                                    <Link className='hover:underline text-sm hover:text-white' key={index} to=''>
                                        {item.name}{index < array.length - 1 ? ',' : ''}
                                    </Link>
                                ))}</div>
                            </div>
                        </div>
                        <div className='flex items-center w-[20%] justify-between'>
                            <div onClick={(e) => { e.stopPropagation(), handleAddToQueue(item) }} className="relative group/parent flex items-center opacity-0 pointer-events-none group-hover/ancestor:opacity-100 group-hover/ancestor:pointer-events-auto">
                                <MdOutlineAddCircleOutline className="h-5 w-5 cursor-pointer" />
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover/parent:opacity-100 hover:pointer-events-auto bg-[#1ed760] text-white text-xs px-2 py-1 rounded transition duration-200 whitespace-nowrap">
                                    Add to queue
                                </span>
                            </div>
                            <div className='text-center'>
                                <p>{`${Math.floor(item.duration_ms / 60000)}:${(`0${Math.floor((item.duration_ms % 60000) / 1000)}`).slice(-2)}`}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>}
            {["All", "Artists"].includes(filter) &&
                <div className="w-full ">
                    {filter === "All" && <div className="flex justify-between items-baseline mx-4 ">
                        <h1 className="text-2xl font-bold text-white">Artists</h1>
                    </div>}
                    <div className="flex w-full lg:flex-wrap max-lg:overflow-scroll scrollbar-none ">
                        {searchResult?.artists.items.slice(0, 10).map((artist) => (
                            <div key={artist.id} className='relative group' >
                                <Link className='' to={`/${artist.type}/${artist.id}`}>
                                    <div className=" text-white p-3 flex flex-col justify-evenly w-[175px] cursor-pointer hover:bg-[#1f1f1f] rounded-md">
                                        <img
                                            src={artist.images.length > 0 ? artist.images[2].url : logo}
                                            alt={artist.name}
                                            className="w-[154px] h-[154px] rounded-full object-cover object-center"
                                        />
                                        <span className="text-[16px]">{artist.name}</span>
                                        <p className="text-sm">{typeof artist.type === 'string' ? artist.type.charAt(0).toUpperCase() + artist.type.slice(1) : artist.type}</p>
                                    </div>
                                </Link>
                                <button onClick={() => { setplaycardclicked(true), navigate(`/${artist.type}/${artist.id}`) }} className="bg-[#1ed760] p-3 absolute right-4 bottom-19 rounded-full opacity-0 pointer-events-none transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer"><RiPlayLargeFill fill="black" className="h-6 w-6" /></button>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {["All", "Playlists"].includes(filter) &&
                <div className="w-full ">
                    {filter === "All" && <div className="flex justify-between items-baseline mx-4 ">
                        <h1 className="text-2xl font-bold text-white">Playlists</h1>
                    </div>}
                    <div className="flex w-full lg:flex-wrap max-lg:overflow-scroll scrollbar-none ">
                        {searchResult?.playlists.items.filter((playlist) => playlist).slice(0, 10).map((playlist) => (
                            Object.keys(playlist).length > 0 ? (
                                <div key={playlist.id} className='relative group' >
                                    <Link className='' to={`/${playlist.type}/${playlist.id}`}><div className=" text-white p-3 flex flex-col justify-between w-[175px] cursor-pointer hover:bg-[#1f1f1f] rounded-md">
                                        <img
                                            src={playlist.images.length > 0 ? playlist.images[0].url : logo}
                                            alt={playlist.name}
                                            className="w-[154px] h-[154px] rounded-md object-cover object-center"
                                        />
                                        <span className="text-[16px] line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">{playlist.name}</span>
                                        <p className="text-sm line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">{playlist.description}</p>
                                    </div></Link>
                                    <button onClick={() => { setplaycardclicked(true), navigate(`/${playlist.type}/${playlist.id}`) }} className="bg-[#1ed760] p-3 absolute right-4 bottom-19 rounded-full opacity-0 pointer-events-none transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer"><RiPlayLargeFill fill="black" className="h-6 w-6" /></button>
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>
            }
            {["All", "Albums"].includes(filter) &&
                <div className="w-full ">
                    {filter === "All" && <div className="flex justify-between items-baseline mx-4">
                        <h1 className="text-2xl font-bold text-white">Albums</h1>
                    </div>}
                    <div className="flex  w-full lg:flex-wrap max-lg:overflow-scroll scrollbar-none">
                        {searchResult?.albums.items.slice(0, 10).map((album) => (
                            <div key={album.id} className='relative group' >
                                <Link className='' to={`/${album.type}/${album.id}`}>
                                    <div className=" text-white p-3 flex flex-col justify-between w-[175px] cursor-pointer hover:bg-[#1f1f1f] rounded-md">
                                        <img
                                            src={album.images.length > 0 ? album.images[1].url : logo}
                                            alt={album.name}
                                            className="w-[154px] h-[154px] rounded-md object-cover object-center"
                                        />
                                        <span className="text-[16px] line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">{album.name}</span>
                                        <p className="text-sm line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">Released: {album.release_date}</p>
                                    </div>
                                </Link>
                                <button onClick={() => { setplaycardclicked(true), navigate(`/${album.type}/${album.id}`) }} className="bg-[#1ed760] p-3 absolute right-4 bottom-19 rounded-full opacity-0 pointer-events-none transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer"><RiPlayLargeFill fill="black" className="h-6 w-6" /></button>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {["All", "Podcasts & Shows"].includes(filter) &&
                <div className='flex flex-col gap-15 w-full '>
                    <div className="w-full">
                        <div className="flex justify-between items-baseline m-4">
                            <h1 className="text-2xl font-bold text-white">Podcasts & Shows</h1>
                        </div>
                        <div className="flex w-full lg:flex-wrap max-lg:overflow-scroll scrollbar-none">
                            {searchResult?.shows.items.slice(0, 10).map((show) => (
                                <div key={show.id} className='relative group' >
                                    <Link className='' to={`/${show.type}/${show.id}`}>
                                        <div className=" text-white p-3 flex flex-col justify-between w-[175px] cursor-pointer hover:bg-[#1f1f1f] rounded-md">
                                            <img
                                                src={show.images.length > 0 ? show.images[1].url : logo}
                                                alt={show.name}
                                                className="w-[154px] h-[154px] rounded-md object-cover object-center"
                                            />
                                            <span className="text-[16px] line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">{show.name}</span>
                                            <p className="text-sm line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">{show.publisher}</p>
                                        </div>
                                    </Link>
                                    <button onClick={() => { setplaycardclicked(true), navigate(`/${show.type}/${show.id}`) }} className="bg-[#1ed760] p-3 absolute right-4 bottom-19 rounded-full opacity-0 pointer-events-none transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer"><RiPlayLargeFill fill="black" className="h-6 w-6" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full ">
                        <div className="flex justify-between items-baseline mx-4 ">
                            <h1 className="text-2xl font-bold text-white">Episodes</h1>
                        </div>
                        <div className='flex w-full lg:flex-wrap max-lg:overflow-scroll scrollbar-none'>
                            {searchResult?.episodes.items.slice(0, 9).map((episode) => (
                                <div onClick={() => handlePlay(episode)} className='flex p-4 gap-6 cursor-pointer hover:bg-[#ffffff24] relative group' key={episode.id}>
                                    <div className='w-[175px]'><img
                                        src={episode.images.length > 0 ? episode.images[1].url : logo}
                                        alt={episode.name}
                                        className="w-[154px] h-[154px] rounded-md object-cover object-center"
                                    /></div>
                                    <div>
                                        <p className="text-[16px] line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">{episode.name}</p>
                                        <p className="text-sm line-clamp-2 text-ellipsis overflow-hidden max-w-[154px]">Released: {episode.release_date}</p>
                                        <p>{`${Math.floor(episode.duration_ms / 60000)}:${(`0${Math.floor((episode.duration_ms % 60000) / 1000)}`).slice(-2)}`}</p>
                                    </div>
                                    <button className="bg-[#1ed760] p-3 absolute right-4 bottom-4 rounded-full opacity-0 pointer-events-none transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer"><RiPlayLargeFill fill="black" className="h-6 w-6" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>)
    )
}

export default Searchresults