import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        if (token) {
            // Fetch Artists
            axios.get("https://api.spotify.com/v1/artists?ids=1wRPtKGflJrBx9BmLsSwlU%2C4YRxDV8wJFPHPTeXepOstw%2C1mYsTxnqsietFxj1OgoGbG%2C1mBydYMVBECdDmMfE2sEUO%2C6Mv8GjQa7LKUGCAqa9qqdb%2C2oSONSC9zQ4UonDKnLqksx", {
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
                setArtists(response.data.artists);
            }).catch((error) => console.error("Error fetching artists:", error));

            // Fetch Albums
            axios.get("https://api.spotify.com/v1/albums?ids=2yYfIOq25JQWvUQ9AR172D%2C0Rkv5iqjF2uenfL0OVB8hg%2C2Lxoc72vRTGdQfMvj7Ovi1%2C5KF4xCxDD8ip003hoatFT9%2C7KIwUrSiA0gc9WlI7AYIfZ%2C75SlrAXlLbJN9LYJwlTJh6&market=IN", {
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
                setAlbums(response.data.albums);
            }).catch((error) => console.error("Error fetching albums:", error));

            // Fetch Playlists
            (async () => {
                try {
                    const albums1 = "https://api.spotify.com/v1/artists/4YRxDV8wJFPHPTeXepOstw/albums?market=IN&limit=4";
                    const albums2 = "https://api.spotify.com/v1/artists/0oOet2f43PA68X5RxKobEy/albums?market=IN&limit=2";

                    const [albumsResponse, albumsResponse2] = await Promise.all([
                        axios.get(albums1, { headers: { Authorization: `Bearer ${token}` } }),
                        axios.get(albums2, { headers: { Authorization: `Bearer ${token}` } }),
                    ]);

                    const mergedData = [...albumsResponse.data.items, ...albumsResponse2.data.items];
                    setPlaylists(mergedData);
                } catch (error) {
                    console.error("Error fetching albums:", error);
                }
            })();

            // Fetch New Releases
            axios.get("https://api.spotify.com/v1/browse/new-releases?country=IN&limit=6", {
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
                setNewReleases(response.data.albums.items);
            }).catch((error) => console.error("Error fetching new releases:", error));
        }
    }, [token]);

    return <PlaylistContext.Provider value={{ artists, setArtists, albums, setAlbums, playlists, setPlaylists, newReleases, setNewReleases }}>{children}</PlaylistContext.Provider>;
};

export const usePlaylist = () => useContext(PlaylistContext);