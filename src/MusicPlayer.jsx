import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useTrack } from "./TrackContext";
import { useAuth } from "./AuthContext";
import { MdPause, MdPlayArrow, MdRepeat, MdShuffle, MdSkipNext, MdSkipPrevious, } from "react-icons/md";
import { BiVolumeFull, BiVolumeLow, BiVolumeMute } from "react-icons/bi";
import { useMusicP } from "./MusicpContext";
import fallbackimg from "./assets/Spotify Logo/Primary_Logo_Green_CMYK.svg";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";

const Player = () => {
    const { token } = useAuth();
    const { track, setTrack, bgColor } = useTrack();
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [vol, setVol] = useState(1);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);
    const playerInitialized = useRef(false);
    const [isHovered, setIsHovered] = useState(false);
    const [volHovered, setvolHovered] = useState(false);
    const { player, setPlayer, isPlaying, setIsPlaying, getUserQueue, setShowQueue, setQueue, showQueue, togglePlayPause } = useMusicP();
    const [prevbtnpressed, setprevbtnpressed] = useState(false);
    const [nextbtnpressed, setnextbtnpressed] = useState(false);
    const trackRef = useRef(null);
    const previousTrack = useRef(null);
    const [smartphoneplayer, setSmartphonePlayer] = useState(false);

    const handlequeue = async () => {
        let queuelist = await getUserQueue();
        await setQueue(queuelist);
    }
    const fetchCurrentTrack = async () => {
        try {
            const res = await axios.get(
                `https://api.spotify.com/v1/me/player`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data?.item) {
                await setTrack(res.data.item);
                setTimeout(() => {
                    handlequeue();
                }, 2000);
            }
        } catch (error) {
            console.error("Failed to fetch current track:", error);
        }
    };

    useEffect(() => {
        // Load Spotify Player SDK
        const loadSpotifyScript = () => {
            if (!window.Spotify) {
                const script = document.createElement('script');
                script.src = 'https://sdk.scdn.co/spotify-player.js';
                script.async = true;
                window.onSpotifyWebPlaybackSDKReady = initializePlayer;
                document.body.appendChild(script);
            } else {
                initializePlayer();
            }
        };

        // Initialize Spotify Web Playback SDK
        const initializePlayer = () => {
            if (playerInitialized.current || !token || !window.Spotify) return;
            playerInitialized.current = true; // ✅ Mark as initialized
            if (!player) {
                const newPlayer = new window.Spotify.Player({
                    name: "Spotify Clone",
                    getOAuthToken: (cb) => cb(token),
                    volume: vol,
                    enableP2P: false, // Optional: Improves playback stability
                });

                newPlayer.addListener("ready", async ({ device_id }) => {
                    console.log("Ready with Device ID", device_id);
                    try {
                        await axios.put(
                            `https://api.spotify.com/v1/me/player`,
                            { device_ids: [device_id], play: false },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        console.log("Playback transferred to the browser");
                        fetchCurrentTrack();
                    } catch (error) {
                        console.error("Failed to transfer playback:", error);
                    }
                });

                newPlayer.addListener("player_state_changed", (state) => {
                    if (!state) return;
                    setIsPlaying(!state.paused);
                    setProgress(state.position);
                    setDuration(state.duration);
                    const current_track = state.track_window.current_track;
                    const previous_track = state.track_window.previous_tracks[0];
                    if (!trackRef.current || current_track.id !== trackRef.current.id) {
                        trackRef.current = current_track; // Update ref value
                        if (previous_track && previous_track.id !== previousTrack.current?.id) {
                            previousTrack.current = previous_track;
                        }
                        setTrack(current_track); // Update state
                    }
                });
                newPlayer.addListener("initialization_error", ({ message }) => {
                    console.error("Initialization error:", message);
                });

                newPlayer.addListener("authentication_error", ({ message }) => {
                    console.error("Authentication error:", message);
                });

                newPlayer.connect();
                setPlayer(newPlayer);
            }
        };
        loadSpotifyScript();
        // Cleanup to avoid memory leaks
        return () => {
            if (player) {
                player.disconnect();
            }
        };
    }, [token]); // Removed player, track, and playTrack from dependencies


    // Handle Seek
    const handleSeekChange = (e) => {
        setProgress(Number(e.target.value)); // Update state on drag
    };

    const handleSeekRelease = async () => {
        try {
            await axios.put(
                `https://api.spotify.com/v1/me/player/seek?position_ms=${progress}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Failed to seek:", error);
        }
    };

    // Handle Volume Change Independently
    const handleVolume = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVol(newVolume);
        if (player) {
            player.setVolume(newVolume);
        }
    };
    const skipNext = async () => {
        try {
            await axios.post(`https://api.spotify.com/v1/me/player/next`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Failed to skip next:", error);
        }
    };

    // Skip to previous track
    const skipPrevious = async () => {
        try {
            await axios.post(`https://api.spotify.com/v1/me/player/previous`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Failed to skip previous:", error);
        }
    };

    // Toggle shuffle
    const toggleShuffle = async () => {
        try {
            await axios.put(
                `https://api.spotify.com/v1/me/player/shuffle?state=${!isShuffling}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setIsShuffling(!isShuffling);
        } catch (error) {
            console.error("Failed to toggle shuffle:", error);
        }
    };

    // Toggle repeat
    const toggleRepeat = async () => {
        try {
            const newState = isRepeating ? "off" : "track";
            await axios.put(
                `https://api.spotify.com/v1/me/player/repeat?state=${newState}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setIsRepeating(!isRepeating);
        } catch (error) {
            console.error("Failed to toggle repeat:", error);
        }
    };
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 1000, duration)); // Update progress every second
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPlaying, duration]);

    const handleopenclose = () => {
        setSmartphonePlayer(!smartphoneplayer)
    }
    return (
        <div className="relative">
            <div className="grid grid-cols-3 items-center p-2 rounded-xl text-[#fff] box-border max-lg:hidden">
                <div className="track-info flex ">
                    <img className="w-[50px] h-[50px] rounded-lg object-cover object-center m-1" src={track?.album?.images[0]?.url || fallbackimg} alt={track?.name} />
                    <p className="text-sm flex items-center ">{track?.name} - {track?.artists?.map(artist => artist.name).join(", ")}</p>
                </div>
                <div className="flex flex-col justify-evenly h-full">
                    <div className="flex justify-center items-center gap-4">
                        <MdShuffle className="h-5 w-5 cursor-pointer" onClick={toggleShuffle} fill={isShuffling ? "#1DB954" : "#FFF"} />
                        <MdSkipPrevious className="h-7 w-7 cursor-pointer" onMouseDown={() => { setprevbtnpressed(true) }} onMouseUp={() => { setprevbtnpressed(false), skipPrevious() }} fill={prevbtnpressed ? "#1DB954" : "#FFF"} />
                        <div className="bg-white rounded-full p-1 cursor-pointer">
                            {isPlaying ? <MdPause className="h-7 w-7" fill="black" onClick={togglePlayPause} /> : <MdPlayArrow className="h-7 w-7" fill="black" onClick={togglePlayPause} />}</div>
                        <MdSkipNext className="h-7 w-7 cursor-pointer" onMouseDown={() => { setnextbtnpressed(true) }} onMouseUp={() => { setnextbtnpressed(false), skipNext() }} fill={nextbtnpressed ? "#1DB954" : "#FFF"} />
                        <MdRepeat className="h-5 w-5 cursor-pointer" onClick={toggleRepeat} fill={isRepeating ? "#1DB954" : "#FFF"} />
                    </div>
                    <div className="flex w-full items-center gap-2">
                        <p className="text-xs">{`${Math.floor(progress / 60000)}:${(`0${Math.floor((progress % 60000) / 1000)}`).slice(-2)}`}</p>
                        <input className="w-full h-1 bg-[#1f1f1f] rounded-lg appearance-none cursor-pointer 
        [&::-webkit-slider-thumb]:opacity-0 hover:[&::-webkit-slider-thumb]:opacity-100 
        [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 
        hover:[&::-webkit-slider-thumb]:h-3 hover:[&::-webkit-slider-thumb]:w-3
        [&::-webkit-slider-thumb]:-translate-y-1/3"
                            type="range"
                            min="0"
                            max={duration}
                            value={progress}
                            onChange={handleSeekChange}
                            onMouseUp={handleSeekRelease}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{
                                background: `linear-gradient(to right, ${isHovered ? '#1db954' : '#fff'
                                    } ${progress / duration * 100}%, #555 ${progress / duration * 100}%)`
                            }}
                        />
                        <p className="text-xs">{`${Math.floor(track?.duration_ms / 60000)}:${(`0${Math.floor((track?.duration_ms % 60000) / 1000)}`).slice(-2)}`}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 justify-end">
                    <HiOutlineQueueList onClick={() => { handlequeue(), setShowQueue(!showQueue) }} className="h-5 w-5 cursor-pointer hover:stroke-white" />
                    <div className="flex items-center gap-1 justify-center " >
                        <button onMouseDown={() => { if (vol !== 0) { player.setVolume(0); } else { player.setVolume(1); } }}
                            onMouseUp={vol !== 0 ? () => setVol(0) : () => setVol(1)} className="cursor-pointer" >
                            {vol === 0
                                ? <BiVolumeMute className="h-5 w-5" />
                                : vol > 0 && vol < 0.25
                                    ? <BiVolumeLow className="h-5 w-5" />
                                    : <BiVolumeFull className="h-5 w-5" />
                            }
                        </button>
                        <input className="h-1 bg-[#1f1f1f] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:opacity-0 hover:[&::-webkit-slider-thumb]:opacity-100 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 hover:[&::-webkit-slider-thumb]:h-3 hover:[&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:-translate-y-1/3"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={vol}
                            onChange={handleVolume}
                            style={{
                                background: `linear-gradient(to right, ${volHovered ? '#1db954' : '#fff'
                                    } ${vol * 100}%, #555 ${vol * 100}%)`
                            }}
                            onMouseEnter={() => setvolHovered(true)}
                            onMouseLeave={() => setvolHovered(false)}
                        />
                    </div>
                </div>
            </div>
            {!smartphoneplayer &&
                <div onClick={handleopenclose} className=" w-full flex justify-between items-center p-2 min-lg:hidden" style={{ backgroundColor: bgColor }} >
                    <div className="track-info flex gap-2 ">
                        <img className="w-[50px] h-[50px] rounded-lg object-cover object-center m-1" src={track?.album?.images[0]?.url || fallbackimg} alt={track?.name} />
                        <p className="text-sm flex items-center ">{track?.name}</p>
                    </div>
                    <div className="p-1 cursor-pointer">
                        {isPlaying ? <MdPause className="h-7 w-7" fill="white" onClick={(e) => { e.stopPropagation(), togglePlayPause() }} /> : <MdPlayArrow className="h-7 w-7" fill="white" onClick={(e) => { e.stopPropagation(), togglePlayPause() }} />}</div>
                </div>}
            {smartphoneplayer &&
                <div id="smartphoneplayer"
                    className={`fixed z-50 top-0 left-0 w-full h-full flex flex-col justify-between p-3 lg:hidden`} style={{ backgroundColor: bgColor}} >
                    <div className='flex items-center gap-3 p-3'>
                        <IoIosArrowDown onClick={handleopenclose} className="h-8 w-8" />
                        <p className="line-clamp-1 overflow-ellipsis">{track?.album?.name}</p>
                    </div>
                    <div className="flex justify-center"><img className="w-[300px] h-[300px] rounded-lg object-cover object-center m-1" src={track?.album?.images[0]?.url || fallbackimg} alt={track?.name} /></div>
                    <div className="text-start px-3">
                        <p className="text-sm ">{track?.name}</p>
                        <p>{track?.artists?.map(artist => artist.name).join(", ")}</p>
                    </div>
                    <div>
                        <div className="flex w-full items-center gap-2 px-3">
                            <p className="text-xs">{`${Math.floor(progress / 60000)}:${(`0${Math.floor((progress % 60000) / 1000)}`).slice(-2)}`}</p>
                            <input className="w-full h-1 bg-[#1f1f1f] rounded-lg appearance-none cursor-pointer 
        [&::-webkit-slider-thumb]:opacity-0 hover:[&::-webkit-slider-thumb]:opacity-100 
        [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 
        hover:[&::-webkit-slider-thumb]:h-3 hover:[&::-webkit-slider-thumb]:w-3
        [&::-webkit-slider-thumb]:-translate-y-1/3"
                                type="range"
                                min="0"
                                max={duration}
                                value={progress}
                                onChange={handleSeekChange}
                                onMouseUp={handleSeekRelease}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                style={{
                                    background: `linear-gradient(to right, ${isHovered ? '#1db954' : '#fff'
                                        } ${progress / duration * 100}%, #555 ${progress / duration * 100}%)`
                                }}
                            />
                            <p className="text-xs">{`${Math.floor(track?.duration_ms / 60000)}:${(`0${Math.floor((track?.duration_ms % 60000) / 1000)}`).slice(-2)}`}</p>
                        </div>

                    </div>
                    <div><div className="flex justify-center items-center gap-5 scale-145 mb-10">
                        <MdShuffle className="h-5 w-5 cursor-pointer" onClick={toggleShuffle} fill={isShuffling ? "#1DB954" : "#FFF"} />
                        <MdSkipPrevious className="h-7 w-7 cursor-pointer" onMouseDown={() => { setprevbtnpressed(true) }} onMouseUp={() => { setprevbtnpressed(false), skipPrevious() }} fill={prevbtnpressed ? "#1DB954" : "#FFF"} />
                        <div className="bg-white rounded-full p-1 cursor-pointer">
                            {isPlaying ? <MdPause className="h-7 w-7" fill="black" onClick={togglePlayPause} /> : <MdPlayArrow className="h-7 w-7" fill="black" onClick={togglePlayPause} />}</div>
                        <MdSkipNext className="h-7 w-7 cursor-pointer" onMouseDown={() => { setnextbtnpressed(true) }} onMouseUp={() => { setnextbtnpressed(false), skipNext() }} fill={nextbtnpressed ? "#1DB954" : "#FFF"} />
                        <MdRepeat className="h-5 w-5 cursor-pointer" onClick={toggleRepeat} fill={isRepeating ? "#1DB954" : "#FFF"} />
                    </div></div>
                </div>}
        </div>
    );
};

export default Player;