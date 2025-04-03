import React, { useEffect } from 'react'
import { useMusicP } from './MusicpContext'
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';

const Queuedlist = () => {
    const { showQueue, queue, setShowQueue } = useMusicP();
    useEffect(() => {

    }, [queue]);

    return (
        showQueue && Object.keys(queue).length !== 0 &&
        <div className='p-4 flex flex-col gap-8 w-[22vw] max-lg:w-screen bg-black rounded-md max-lg:h-full'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg text-white'>Queue</h1>
                <RxCross2 className='cursor-pointer h-5 w-5 hover:!fill-white hover:scale-120' onClick={() => {setShowQueue(false)}} />
            </div>
            {queue?.currently_playing !== null ? <div className='flex flex-col gap-1.5'>
                <h1 className='text-white'>Now Playing</h1>
                <div className='flex gap-2 p-2 hover:bg-[#1f1f1f] cursor-pointer'>
                    <img height={48} width={48} src={queue?.currently_playing?.album.images[0].url} alt="" />
                    <div>
                        <h4 className='line-clamp-1 overflow-ellipsis'>{queue?.currently_playing?.name}</h4>
                        <p className='line-clamp-1 overflow-ellipsis'>
                            {queue?.currently_playing?.artists.map((artist, index, array) => {
                                return (
                                    <Link className='hover:underline text-sm hover:text-white' key={index} to=''>
                                        {artist.name}{index < array.length - 1 ? ',' : ''}
                                    </Link>)
                            })}
                        </p>
                    </div>
                </div>
            </div> : <div className='w-full text-center'>Nothing Here!</div>}
            {queue?.queue?.filter((item) => item.id !== queue?.currently_playing.id).length > 0 && <div className='flex flex-col gap-1.5'>
                <div className='flex justify-between'>
                    <h1 className='text-white'>Next in queue</h1>
                </div>
                <div className='flex flex-col gap-1 overflow-auto max-h-[200px] max-lg:max-h-[27%]'>
                    {queue?.queue?.filter((item) => item.id !== queue?.currently_playing.id).map((item, index) => {
                        return (
                            <div key={index} className='flex gap-2 p-2 hover:bg-[#1f1f1f] cursor-pointer'>
                                <img height={48} width={48} src={item.album.images[0].url} alt="" />
                                <div>
                                    <h4 className='line-clamp-1 overflow-ellipsis'>{item.name}</h4>
                                    <p className='line-clamp-1 overflow-ellipsis'>
                                        {item.artists.map((artist, index, array) => {
                                            return (
                                                <Link className='hover:underline text-sm hover:text-white' key={index} to=''>
                                                    {artist.name}{index < array.length - 1 ? ',' : ''}
                                                </Link>
                                            )
                                        })}
                                    </p>
                                </div>
                            </div>)
                    })}
                </div>
            </div>}
        </div>
    )
}

export default Queuedlist