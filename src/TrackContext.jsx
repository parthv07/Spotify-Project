import { createContext, use, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const TrackContext = createContext();


export const TrackProvider = ({ children }) => {
    const [track, setTrack] = useState(null);
    const [trackList, setTrackList] = useState([]);
    const [tracks, setTracks] = useState({});
    const { token } = useAuth();
    const [listType, setlistType] = useState("");
    const [AlbumId, setAlbumId] = useState("");
    const [playcardclicked, setplaycardclicked] = useState(false);
    const [bgColor, setBgColor] = useState("#121212");

    const getTracks = async (gttrackid) => {
        if (!token) return;
        try {
            let link = ""
            if (listType === "artist") {
                link = `https://api.spotify.com/v1/artists/${gttrackid}/top-tracks?market=IN`
            }
            if (listType === "album") {
                link = `https://api.spotify.com/v1/albums/${gttrackid}/tracks?offset=0&limit=50&market=IN&locale=en-US,en;q%3D0.9`
            }
            if (listType === "playlist") {
                link = `https://api.spotify.com/v1/playlists/${gttrackid}/tracks`
            }
            if (listType === "show") {
                link = `https://api.spotify.com/v1/shows/${gttrackid}/episodes`
            }
            const response = await axios.get(link, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Returns the data to handle it later
        } catch (error) {
            console.error("Failed to fetch tracks:", error);
        }
    };
    useEffect(() => {
        if (Object.keys(tracks).length !== 0) {
            const handlePlay = async (tracks) => {
                if (tracks.type === "album") {
                    const data = await getTracks(tracks.id);
                    setTrackList(data.items);
                }
                if (tracks.type === "artist") {
                    const data = await getTracks(tracks.id);
                    setTrackList(data.tracks);
                }
                if (tracks.type === "playlist") {
                    const data = await getTracks(tracks.id);
                    setTrackList(data.items);
                }
                if (tracks.type === "show") {
                    const data = await getTracks(tracks.id);
                    setTrackList(data.items);
                }
            };
            handlePlay(tracks);
        }
    }, [tracks]);

    useEffect(() => {
        if (AlbumId) {
            const handlealbumid = async (albumid) => {
                let linkk = ''
                if (listType === "album") {
                    linkk = `https://api.spotify.com/v1/albums/${albumid}?market=IN&locale=en-US%2Cen%3Bq%3D0.9`
                }
                if (listType === "artist") {
                    linkk = `https://api.spotify.com/v1/artists/${albumid}?locale=en-US%2Cen%3Bq%3D0.9`
                }
                if (listType === "playlist") {
                    linkk = `https://api.spotify.com/v1/playlists/${albumid}`
                }
                if (listType === "show") {
                    linkk = `https://api.spotify.com/v1/shows/${albumid}`
                }
                const response = await axios.get(linkk, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTracks(response.data);
            };
            handlealbumid(AlbumId);
        }
    }, [AlbumId]);


    return (
        <TrackContext.Provider value={{ track, setTrack, tracks, setTracks, getTracks, setTrackList, trackList, listType, setlistType, AlbumId, setAlbumId, playcardclicked, setplaycardclicked,bgColor, setBgColor }}>
            {children}
        </TrackContext.Provider>
    );
};

export const useTrack = () => useContext(TrackContext);
