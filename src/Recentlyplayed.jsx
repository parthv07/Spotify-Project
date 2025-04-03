import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Ensure your AuthContext provides the token
import { useTrack } from "./TrackContext";
import { useMusicP } from "./MusicpContext";

const RecentlyPlayedTracks = () => {
    const { token } = useAuth();
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setTrack, track } = useTrack();
    const { isPlaying, setIsPlaying } = useMusicP();

    const fetchRecentlyPlayed = async () => {
        try {
            const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setTracks(response.data.items);
        } catch (error) {
            console.error("Error fetching recently played tracks:", error);
            setError("Failed to load recently played tracks.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!token) return;
        fetchRecentlyPlayed();
    }, [token, track]);
    const handleplay = (item) => {
        setTrack(item)
        if (!isPlaying) {
            setIsPlaying(true)
        }
    }

    return (
        <div className="p-4 bg-[#121212] rounded-lg">
            {loading && <p className="">{token ? "Loading..." : "Sign in to see your recently played tracks."}</p>}
            {error && <p className="text-red-400">{error}</p>}

            {!loading && !error && tracks.length === 0 && (
                <p className="text-gray-400">No recent tracks found.</p>
            )}

            <div className="flex flex-col gap-4">
                {tracks.filter(
                    (track, index, self) =>
                        index === self.findIndex((t) => t.track.id === track.track.id) // Ensure unique track IDs
                ).map(({ track }, index) => (
                    <div key={index} onClick={() => handleplay(track)} className="flex items-center bg-[#1f1f1f] p-3 cursor-pointer rounded-md">
                        <img
                            src={track.album.images[0]?.url || "https://via.placeholder.com/150"}
                            alt={track.name}
                            className="w-12 h-12 rounded-md object-cover"
                        />
                        <div className="ml-3">
                            <p className="text-white text-sm font-medium">{track.name}</p>
                            <p className="text-gray-400 text-xs">{track.artists.map(a => a.name).join(", ")}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyPlayedTracks;
