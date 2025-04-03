import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "https://spotify-project-vert.vercel.app/";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SCOPES = [
    "user-read-private", "user-read-email",
    "user-library-read", "user-top-read",
    "playlist-read-private", "playlist-read-collaborative",
    "user-follow-read", "user-read-recently-played",
    "user-read-currently-playing", "user-read-playback-state",
    "user-modify-playback-state", "streaming"
];

// Create Auth Context
const AuthContext = createContext();

// Utility function to generate a random string
const generateRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
        .map((x) => characters[x % characters.length])
        .join("");
};

// PKCE: Generate Code Challenge from Code Verifier
const generateCodeChallenge = async (codeVerifier) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

// Provider Component
export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["spotify_token", "spotify_refresh_token", "token_expiry"]);
    const [token, setToken] = useState(cookies.spotify_token || "");
    const [refreshToken, setRefreshToken] = useState(cookies.spotify_refresh_token || "");
    const [user, setUser] = useState(null);

    // Function to initiate login using PKCE
    const login = async () => {
        const codeVerifier = generateRandomString(128);
        const codeChallenge = await generateCodeChallenge(codeVerifier);

        sessionStorage.setItem("code_verifier", codeVerifier);

        const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(" "))}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

        window.location.href = loginUrl;
    };

    // Function to exchange code for access token
    const exchangeCodeForToken = async (code) => {
        const codeVerifier = sessionStorage.getItem("code_verifier");

        try {
            const response = await axios.post(TOKEN_ENDPOINT, new URLSearchParams({
                client_id: CLIENT_ID,
                grant_type: "authorization_code",
                code: code,
                redirect_uri: REDIRECT_URI,
                code_verifier: codeVerifier,
            }), {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });

            const { access_token, refresh_token, expires_in } = response.data;
            const expiryTime = Date.now() + expires_in * 1000;

            setToken(access_token);
            setRefreshToken(refresh_token);

            // Store tokens in cookies with expiry
            setCookie("spotify_token", access_token, { path: "/", expires: new Date(expiryTime) });
            setCookie("spotify_refresh_token", refresh_token, { path: "/" });
            setCookie("token_expiry", expiryTime, { path: "/" });

            getUserProfile(access_token);

            // Set auto-refresh
            scheduleTokenRefresh(expires_in);
        } catch (error) {
            console.error("Error exchanging code for token:", error);
        }
    };

    // Function to refresh access token
    const refreshAccessToken = async () => {
        if (!cookies.spotify_refresh_token) return;

        try {
            const response = await axios.post(TOKEN_ENDPOINT, new URLSearchParams({
                client_id: CLIENT_ID,
                grant_type: "refresh_token",
                refresh_token: cookies.spotify_refresh_token,
            }), {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });

            const { access_token, expires_in } = response.data;
            const expiryTime = Date.now() + expires_in * 1000;

            setToken(access_token);
            setCookie("spotify_token", access_token, { path: "/", expires: new Date(expiryTime) });
            setCookie("token_expiry", expiryTime, { path: "/" });

            // Schedule next refresh
            scheduleTokenRefresh(expires_in);
        } catch (error) {
            console.error("Error refreshing access token:", error);
        }
    };

    // Schedule token refresh
    const scheduleTokenRefresh = (expiresIn) => {
        setTimeout(refreshAccessToken, (expiresIn - 60) * 1000);
    };

    // Fetch user profile
    const getUserProfile = async (accessToken) => {
        try {
            const response = await axios.get("https://api.spotify.com/v1/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    // Handle redirect and token exchange
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            exchangeCodeForToken(code);
            window.history.replaceState({}, null, window.location.pathname); // Clean URL
        } else if (cookies.spotify_token) {
            setToken(cookies.spotify_token);
            getUserProfile(cookies.spotify_token);

            const expiryTime = cookies.token_expiry ? parseInt(cookies.token_expiry) : 0;
            const remainingTime = expiryTime - Date.now();

            if (remainingTime > 0) {
                scheduleTokenRefresh(remainingTime / 1000);
            } else {
                refreshAccessToken();
            }
        }
    }, []);

    // Logout function
    const logout = () => {
        setToken("");
        setRefreshToken("");
        removeCookie("spotify_token");
        removeCookie("spotify_refresh_token");
        removeCookie("token_expiry");
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);