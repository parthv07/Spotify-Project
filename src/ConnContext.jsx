import { createContext, useContext, useState , useEffect } from "react";

const ConnContext = createContext();

export const ConnProvider = ({ children }) => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    useEffect(() => {
        const handleOffline = () => setIsOffline(true);
        const handleOnline = () => setIsOffline(false);

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    return <ConnContext.Provider value={{ isOffline }}>{children}</ConnContext.Provider>;
};

export const useConn = () => useContext(ConnContext);