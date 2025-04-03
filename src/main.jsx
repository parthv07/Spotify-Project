import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./AuthContext";
import { SearchProvider } from "./SearchContext.jsx";
import { PlaylistProvider } from "./PlaylistContext";
import { TrackProvider } from "./TrackContext";
import { ConnProvider } from './ConnContext.jsx';
import { MusicProvider } from './MusicpContext.jsx';
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ConnProvider>
    <CookiesProvider>
    <AuthProvider>
      <SearchProvider>
        <PlaylistProvider>
          <TrackProvider>
            <MusicProvider>
              <App />
            </MusicProvider>
          </TrackProvider>
        </PlaylistProvider>
      </SearchProvider>
    </AuthProvider>
    </CookiesProvider>
  </ConnProvider>
  // </StrictMode>,
)