import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { useTrack } from "./TrackContext";

const MusicpContext = createContext();
export const MusicProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState(null);
    const [showQueue, setShowQueue] = useState(false);
    const [queue, setQueue] = useState([]);
    const { token } = useAuth();
    const { track } = useTrack();

    const handlequeue = async () => {
        let queuelist = await getUserQueue();
        setQueue(queuelist);
    }
    // Centralized function to play a track
    const playTrack = async (trackk) => {
        if (!token) return;
        try {
            await axios.put(
                `https://api.spotify.com/v1/me/player/play`,
                { uris: [trackk.uri] },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Failed to play track:", error);
        }
    };

    useEffect(() => {
        if (player && isPlaying && Object.keys(track).length !== 0) {
            playTrack(track);
        }
        if (showQueue && player && isPlaying) {
            setTimeout(() => {
                handlequeue();
            }, 2000);
        }
    }, [track])
    const addToQueue = async (trackUri) => {
        try {
            await axios.post(
                `https://api.spotify.com/v1/me/player/queue?uri=${encodeURIComponent(trackUri)}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Failed to add track to queue:", error);
        }
        if (showQueue && player && isPlaying) {
            setTimeout(() => {
                handlequeue();
            }, 2000);
        }
    };
    const getUserQueue = async () => {
        try {
            const response = await axios.get("https://api.spotify.com/v1/me/player/queue", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // { currently_playing, queue }
        } catch (error) {
            console.error("Error fetching queue:", error.response?.data || error.message);
        }
    };
    const togglePlayPause = async () => {
        try {
            if (isPlaying) {
                await axios.put(
                    `https://api.spotify.com/v1/me/player/pause`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.put(
                    `https://api.spotify.com/v1/me/player/play`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            setIsPlaying(!isPlaying);
        } catch (error) {
            console.error("Failed to toggle play/pause:", error);
        }
    };
    return <MusicpContext.Provider value={{ isPlaying, setIsPlaying, player, setPlayer, playTrack, addToQueue, getUserQueue, showQueue, setShowQueue, queue, setQueue,togglePlayPause }}>
        {children}
    </MusicpContext.Provider>;
};

export const useMusicP = () => useContext(MusicpContext);
