import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const SearchContext = createContext();


export const SearchProvider = ({ children }) => {
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        if (!query.trim()) {
            return;
        }
        const delayDebounce = setTimeout(async () => {
            try {
                const response = await axios.get(
                    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album%2Cplaylist%2Cartist%2Ctrack%2Cshow%2Cepisode%2Caudiobook&market=IN`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setSearchResult(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        }, 1000); // Debounce delay (1000ms)

        return () => clearTimeout(delayDebounce);
    }, [query, token]);

    return (
        <SearchContext.Provider value={{ query, setQuery, searchResult, setSearchResult }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
