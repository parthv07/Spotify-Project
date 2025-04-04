import React from 'react'
import { useTrack } from './TrackContext'
import { Link, useParams } from 'react-router-dom';
import { VscVerifiedFilled } from "react-icons/vsc";
import { useState, useEffect, useRef } from "react";
import { useMusicP } from './MusicpContext';
import { MdOutlineAddCircleOutline } from "react-icons/md";
import logo from "./assets/Spotify Logo/Primary_Logo_Green_CMYK.svg";

const Tracklist = () => {
    const { tracks, trackList, setTrack, setlistType, setAlbumId, playcardclicked, setplaycardclicked, bgColor, setBgColor } = useTrack();
    const imgRef = useRef(null);
    const { isPlaying, setIsPlaying, player, addToQueue } = useMusicP();
    const [imageUrl, setImageUrl] = useState(null);
    const { type, id } = useParams();

    useEffect(() => {
        if (playcardclicked && trackList.length !== 0 && Object.keys(tracks).length > 0) {
            if (!isPlaying) {
                setIsPlaying(true)
            }
            let song = trackList[0];
            setTrack(song);
            setplaycardclicked(false);
        }
    }, [playcardclicked, trackList]);


    const handleplay = (item) => {
        setTrack(item)
        if (!isPlaying) {
            setIsPlaying(true)
        }
    }
    const handleAddToQueue = (item) => {
        addToQueue(item.uri);
    }
    useEffect(() => {
        if (type && id) {
            setlistType(type);
            setAlbumId(id);
        }
    }, [type, id]);
    useEffect(() => {
        if (trackList.length !== 0) {
            const image = tracks?.images?.length > 0 && tracks.images[1] ? tracks?.images[1]?.url : tracks?.images[0]?.url;
            setImageUrl(image);
        }
    }, [trackList]);
    useEffect(() => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const getDominantColor = () => {
            if (!imgRef.current) return;

            canvas.width = imgRef.current.naturalWidth || imgRef.current.width;
            canvas.height = imgRef.current.naturalHeight || imgRef.current.height;

            ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                let r = 0, g = 0, b = 0, count = 0;

                for (let i = 0; i < imageData.length; i += 4) {
                    r += imageData[i];
                    g += imageData[i + 1];
                    b += imageData[i + 2];
                    count++;
                }

                r = Math.floor(r / count);
                g = Math.floor(g / count);
                b = Math.floor(b / count);

                setBgColor(`rgb(${r}, ${g}, ${b})`);
            } catch (error) {
                console.error("CORS issue detected:", error);
                // Fallback color
                setBgColor("#1f1f1f");
            }
        };

        if (imgRef.current?.complete) {
            getDominantColor();
        } else if (imgRef.current) {
            imgRef.current.onload = getDominantColor;
            imgRef.current.onerror = () => {
                console.error("Failed to load image (likely CORS issue)");
                setBgColor("#1f1f1f"); // Fallback color
            };
        }
    }, [imageUrl]);

    return (
        trackList.length !== 0 && Object.keys(tracks).length > 0 && player && (
            <div className='w-full' >
                {tracks && tracks.type === 'artist' && (
                    <div>
                        <div className='' style={{ backgroundImage: `linear-gradient(to bottom, ${bgColor}, #121212)` }}>
                            <div className="flex max-sm:flex-col gap-6 p-6">
                                {tracks.images.length > 0 && <img ref={imgRef}
                                    src={imageUrl || logo}
                                    alt={tracks.name}
                                    crossOrigin="anonymous"
                                    className="w-[232px] h-[232px] rounded-full object-cover object-center shadow-[0_4px_60px_rgba(0,0,0,0.5)]"
                                />}
                                <div className='flex flex-col justify-end'>
                                    <div className='flex gap-2 items-center'> <VscVerifiedFilled fill='#4cb3ff' stroke='#fff' className='h-7 w-7' />
                                        <p className="text-sm text-white ">Verified &nbsp;
                                            {typeof tracks.type === 'string'
                                                ? tracks.type.charAt(0).toUpperCase() + tracks.type.slice(1)
                                                : tracks.type}
                                        </p></div>
                                    <a className="text-7xl text-white leading-tight">{tracks.name}</a>
                                    <p className='text-white'>{tracks.followers.total} followers</p>
                                </div>
                            </div>
                            <div className='p-6 bg-gradient-to-b from-[#0000000f] to-[#121212]'>
                                <div className='py-6 grid grid-cols-2 '>
                                    <p className='text-2xl text-white'>Popular</p>
                                    <div>
                                        <p className='max-sm:hidden'>Album</p>
                                        <p className='text-right'>Duration</p></div>
                                </div>
                            </div>
                        </div>
                        <div className='px-6 max-md:px-2 '>
                            {trackList.map((item, index) => (
                                <div onClick={() => handleplay(item)} key={item.id} className='grid grid-cols-2 max-sm:flex max-sm:justify-between p-3 rounded-md hover:bg-[#2a2a2a] cursor-pointer group/ancestor'>
                                    <div className='flex items-center'>
                                        <p className='p-2'>{index + 1}</p>
                                        <img className='object-cover mx-3' height={40} width={40} src={item.album.images[2].url || logo} alt="" />
                                        <div>
                                            <p className='line-clamp-1 text-ellipsis'>{item.name}</p>
                                            <p className='line-clamp-1 text-ellipsis'>
                                                {item.artists.map((item, index, array) => (
                                                    <Link className='hover:underline text-sm hover:text-white ' key={index} to=''>
                                                        {item.name}{index < array.length - 1 ? ',' : ''}
                                                    </Link>
                                                ))}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <p className='line-clamp-2 text-ellipsis w-[50%] max-sm:hidden'>{item.album.name}</p>
                                        <div onClick={(e) => { e.stopPropagation(), handleAddToQueue(item) }} className="relative group/parent flex items-center opacity-0 pointer-events-none group-hover/ancestor:opacity-100 group-hover/ancestor:pointer-events-auto  max-sm:hidden">
                                            <MdOutlineAddCircleOutline className="h-5 w-5 cursor-pointer" />
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover/parent:opacity-100 hover:pointer-events-auto bg-[#1ed760] text-white text-xs px-2 py-1 rounded transition duration-200 whitespace-nowrap">
                                                Add to queue
                                            </span>
                                        </div>
                                        <div className='flex justify-end items-center max-sm:px-1.5'>
                                            <p>{`${Math.floor(item.duration_ms / 60000)}:${(`0${Math.floor((item.duration_ms % 60000) / 1000)}`).slice(-2)}`}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {tracks && tracks.type === 'album' && (
                    <div>
                        <div style={{ backgroundImage: `linear-gradient(to bottom, ${bgColor}, #121212)` }}>
                            <div className="flex max-sm:flex-col gap-6 p-6">
                                {tracks.images.length > 0 && <img ref={imgRef}
                                    src={imageUrl || logo}
                                    alt={tracks.name}
                                    crossOrigin="anonymous"
                                    className="w-[232px] h-[232px] rounded-md object-cover object-center shadow-[0_4px_60px_rgba(0,0,0,0.5)]"
                                />}
                                <div className='flex flex-col justify-end'>
                                    <div className='flex gap-2 items-center'> <VscVerifiedFilled fill='#4cb3ff' stroke='#fff' className='h-7 w-7' />
                                        <p className="text-sm text-white ">Verified &nbsp;
                                            {typeof tracks.type === 'string'
                                                ? tracks.type.charAt(0).toUpperCase() + tracks.type.slice(1)
                                                : tracks.type}
                                        </p></div>
                                    <a className="text-[50px] max-sm:text-[30px] text-white leading-tight">{tracks.name}</a>
                                    <p className='text-white text-sm'>{tracks.label}</p>
                                    <p className='text-white text-sm'>{tracks.copyrights ? tracks.copyrights[0].text : ''}</p>
                                </div>
                            </div>
                            <div className='p-6 bg-gradient-to-b from-[#00000024] to-[#121212] '>
                                <div className='py-6 grid grid-cols-2 '>
                                    <p className='text-2xl text-white'>Popular</p>
                                    <div>
                                        <p className='max-sm:hidden'>Album</p>
                                        <p className='text-right'>Duration</p></div>
                                </div>
                            </div>
                        </div>
                        <div className='px-6 max-sm:px-2'>
                            {trackList.map((item, index) => (
                                <div onClick={() => handleplay(item)} key={item.id} className='grid grid-cols-2 max-sm:flex max-sm:justify-between p-3 max-sm:p-1 rounded-md hover:bg-[#2a2a2a] cursor-pointer group/ancestor'>
                                    <div className='flex items-center'>
                                        <p className='p-2'>{index + 1}</p>
                                        <img className='object-cover mx-3' height={40} width={40} src={imageUrl || logo} alt="" />
                                        <div className='max-sm:w-[110px]'>
                                            <p className='line-clamp-1 text-ellipsis'>{item.name}</p>
                                            <p className='line-clamp-1 text-ellipsis '>
                                                {item.artists.map((item, index, array) => (
                                                    <Link className='hover:underline text-sm hover:text-white ' key={index} to=''>
                                                        {item.name}{index < array.length - 1 ? ',' : ''}
                                                    </Link>
                                                ))}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <p className='line-clamp-2 text-ellipsis w-[50%] max-sm:hidden'>{tracks.name}</p>
                                        <div onClick={(e) => { e.stopPropagation(), handleAddToQueue(item) }} className="relative group/parent flex items-center opacity-0 pointer-events-none group-hover/ancestor:opacity-100 group-hover/ancestor:pointer-events-auto max-sm:hidden">
                                            <MdOutlineAddCircleOutline className="h-5 w-5 cursor-pointer" />
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover/parent:opacity-100 hover:pointer-events-auto bg-[#1ed760] text-white text-xs px-2 py-1 rounded transition duration-200 whitespace-nowrap">
                                                Add to queue
                                            </span>
                                        </div>
                                        <div className='flex justify-end items-center'>
                                            <p>{`${Math.floor(item.duration_ms / 60000)}:${(`0${Math.floor((item.duration_ms % 60000) / 1000)}`).slice(-2)}`}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>)}
                {tracks && tracks.type === 'playlist' && (
                    <div>
                        <div className="flex gap-6 p-6">
                            {tracks.images.length > 0 && <img ref={imgRef}
                                src={imageUrl || logo}
                                alt={tracks.name}
                                crossOrigin="anonymous"
                                className="w-[232px] h-[232px] rounded-md object-cover object-center shadow-[0_4px_60px_rgba(0,0,0,0.5)]"
                            />}
                            <div className='flex flex-col justify-end'>
                                <div className='flex gap-2 items-center'> <VscVerifiedFilled fill='#4cb3ff' stroke='#fff' className='h-7 w-7' />
                                    <p className="text-sm text-white ">Verified &nbsp;
                                        {typeof tracks.type === 'string'
                                            ? tracks.type.charAt(0).toUpperCase() + tracks.type.slice(1)
                                            : tracks.type}
                                    </p></div>
                                <a className="text-[50px] text-white leading-tight">{tracks.name}</a>
                                <p className='text-white text-sm'>{tracks.description}</p>
                                <p className='text-white text-sm'>{tracks.owner.display_name}</p>
                            </div>
                        </div>
                        <div className='p-6 bg-gradient-to-b from-[#00000024] to-[#121212] '>
                            <div className='py-6 grid grid-cols-2 '>
                                <p className='text-2xl text-white'>Popular</p>
                                <div>
                                    <p className='max-sm:hidden'>Album</p>
                                    <p className='text-right'>Duration</p></div>
                            </div>
                            {trackList.map((item, index) => (
                                <div onClick={() => handleplay(item.track)} key={index + 1} className='grid grid-cols-2 max-sm:grid-cols-[2.5fr_1fr] p-3 rounded-md hover:bg-[#2a2a2a] cursor-pointer group/ancestor'>
                                    <div className='flex items-center'>
                                        <p className='p-2'>{index + 1}</p>
                                        <img className='object-cover mx-3' height={40} width={40} src={imageUrl || logo} alt="" />
                                        <div className=''>
                                            <p className='line-clamp-1 text-ellipsis'>{item.track.name}</p>
                                            <p className='line-clamp-1 text-ellipsis'>
                                                {item.track.artists.map((item, index, array) => (
                                                    <Link className='hover:underline text-sm hover:text-white ' key={index} to=''>
                                                        {item.name}{index < array.length - 1 ? ',' : ''}
                                                    </Link>
                                                ))}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <p className='line-clamp-2 text-ellipsis w-[50%] max-sm:hidden'>{item.track.album.name}</p>
                                        <div onClick={(e) => { e.stopPropagation(), handleAddToQueue(item) }} className="relative group/parent flex items-center opacity-0 pointer-events-none group-hover/ancestor:opacity-100 group-hover/ancestor:pointer-events-auto">
                                            <MdOutlineAddCircleOutline className="h-5 w-5 cursor-pointer" />
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover/parent:opacity-100 hover:pointer-events-auto bg-[#1ed760] text-white text-xs px-2 py-1 rounded transition duration-200 whitespace-nowrap">
                                                Add to queue
                                            </span>
                                        </div>
                                        <div className='flex justify-end items-center'>
                                            <p>{`${Math.floor(item.track.duration_ms / 60000)}:${(`0${Math.floor((item.track.duration_ms % 60000) / 1000)}`).slice(-2)}`}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>)}
                {tracks && tracks.type === 'show' && (
                    <div>
                        <div className="flex gap-6 p-6">
                            {tracks.images.length > 0 && <img ref={imgRef}
                                src={imageUrl || logo}
                                alt={tracks.name}
                                crossOrigin="anonymous"
                                className="w-[232px] h-[232px] rounded-md object-cover object-center shadow-[0_4px_60px_rgba(0,0,0,0.5)]"
                            />}
                            <div className='flex flex-col justify-end'>
                                <div className='flex gap-2 items-center'> <VscVerifiedFilled fill='#4cb3ff' stroke='#fff' className='h-7 w-7' />
                                    <p className="text-sm text-white ">Verified &nbsp;
                                        {typeof tracks.type === 'string'
                                            ? tracks.type.charAt(0).toUpperCase() + tracks.type.slice(1)
                                            : tracks.type}
                                    </p></div>
                                <a className="text-[50px] text-white line-clamp-2 overflow-ellipsis leading-tight">{tracks.name}</a>
                                <p className='text-white text-sm line-clamp-4 overflow-ellipsis'>{tracks.description}</p>
                                <p className='text-white text-sm my-1'>Publisher {tracks.publisher}</p>
                            </div>
                        </div>
                        <div className='p-6 bg-gradient-to-b from-[#00000024] to-[#121212] '>
                            <div className='py-6 grid grid-cols-2 '>
                                <p className='text-2xl text-white'>Popular</p>
                                <div>
                                    <p className='text-right'>Duration</p></div>
                            </div>
                            {trackList.filter(item => item).map((item, index) => (
                                <div onClick={() => handleplay(item)} key={index + 1} className='grid grid-cols-2 p-3 rounded-md hover:bg-[#2a2a2a] cursor-pointer group/ancestor'>
                                    <div className='flex items-center'>
                                        <p className='p-2'>{index + 1}</p>
                                        <img className='object-cover mx-3' height={72} width={72} src={item.images.length > 0 && item.images[1].url || imageUrl || logo} alt="" />
                                        <div>
                                            <p className='line-clamp-1 text-ellipsis'>{item.name}</p>
                                            <p className='line-clamp-2 text-ellipsis'>{item.description}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-end w-[100%]'>
                                        <div className='flex justify-between w-[50%]'>
                                            <div onClick={(e) => { e.stopPropagation(), handleAddToQueue(item) }} className="relative group/parent flex items-center opacity-0 pointer-events-none group-hover/ancestor:opacity-100 group-hover/ancestor:pointer-events-auto">
                                                <MdOutlineAddCircleOutline className="h-5 w-5 cursor-pointer" />
                                                <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover/parent:opacity-100 hover:pointer-events-auto bg-[#1ed760] text-white text-xs px-2 py-1 rounded transition duration-200 whitespace-nowrap">
                                                    Add to queue
                                                </span>
                                            </div>
                                            <p className=''>{`${Math.floor(item.duration_ms / 60000)}:${(`0${Math.floor((item.duration_ms % 60000) / 1000)}`).slice(-2)}`}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>)}
            </div>)
    )
}

export default Tracklist