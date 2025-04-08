
# 🎧 Spotify Clone

A sleek and functional frontend-only Spotify clone built using **React**, **Vite**, **Tailwind CSS**, and the **Spotify Web API**. Browse playlists, search tracks, and enjoy a responsive music experience on desktop, tablet, and smartphone.

---

## 🚀 Live Demo

🔗 [Check out the live site on Vercel](https://spotify-project-vert.vercel.app/)

---

## 📸 Screenshots

### 📍 Home Page

| Desktop | Tablet | Smartphone |
|--------|--------|------------|
| ![Home Desktop](./public/Screenshots/Home%20Desktop%20View.png) | ![Home Tablet](./public/Screenshots/Home%20Tablet%20View.png) | ![Home Smartphone](./public/Screenshots/Home%20Smartphone%20View.png) |

---

### 🔍 Search Results Page

| Desktop | Tablet | Smartphone |
|--------|--------|------------|
| ![Search Desktop](./public/Screenshots/SearchResults%20Desktop%20View.png) | ![Search Tablet](./public/Screenshots/SearchResults%20Tablet%20View.png) | ![Search Smartphone](./public/Screenshots/SearchResults%20Smartphone%20View.png) |

---

### 🎧 Music Player View (Smartphone & Tablet)

| Device | Preview |
|-------|---------|
| 📱 Smartphone & Tablet | ![Music Player Smartphone & Tablet View](./public/Screenshots/MusicPlayer%20Smartphone%20&%20Tablet%20View.png) |


---

### 🏠 Home View with Queue & Recently Played Open

| Description | Preview |
|-------------|---------|
| 🪟 Shows Recently Played & Queue List Window | ![Home Showing Recently Played & Queuelist Window](./public/Screenshots/Home%20%20Showing%20Recentlyplayed%20&%20Queuelist%20window%20open.png) |

---

## ✨ Features

- 🔐 OAuth-based Spotify Authentication
- 🖼️ Dynamic Color Palette extraction using Canvas API
- 📱 Fully responsive UI (Mobile, Tablet & Desktop)
- 🎵 Embedded Spotify Web Playback SDK for seamless music playing
- 🧠 Context-based global state management
- 🧭 Clean routing with React Router
- ⚙️ Modern stack using Vite + Tailwind CSS

---

## 🧑‍💻 Tech Stack

- **React.js**
- **Vite**
- **Tailwind CSS**
- **Spotify Web API**
- **Spotify Web Playback SDK**
- **Canvas API**
- **React Context API**
- **Axios**

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/parthv07/Spotify-Project.git
cd Spotify-Project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` file

```bash
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
```

> You can get the Spotify client ID from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)

---

### 4. Run the App

```bash
npm run dev
```

Visit `http://localhost:port` to see your app in action!

---

## 🗃️ Folder Structure

```
Spotify-Project/
│
├── public/
├── src/
│   ├── assets/
│   │   └── Spotify Logo/
│   ├── small components/
│   ├── contexts/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── ...
├── .env
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

### 🚧 Upcoming Improvements / Under Development

- 🔧 **Playlist Section** – create, share, and add tracks to user's own playlist  
- 🔧 **Dynamic Theme System** – based on track dominant colors  
- 🔧 **Optimize Music Player for Landscape Mode** – especially for smartphones and tablets  
- 🔧 **Add Loaders / Skeleton Transitions** – to prevent layout shifts and improve page load experience  
- 🔧 **Track Sharing Feature** – enable users to share tracks easily  
- 🔧 **Performance Optimization** – use `defer`, lazy loading, and best practices for speed  
- 🔧 **Refactor Conditional Rendering** – reduce repetitive logic and unnecessary re-renders  
- 🔧 **Add-to-Queue on Mobile & Tablet** – currently works on desktop, needs responsive integration  
- 🔧 **Handle Ghost Clicks / Multiple Rapid Clicks** – prevent duplicate actions or UI glitches  
- 🔧 **Keyboard Event Listeners** – listen for keyboard shortcuts (e.g., play/pause, next, prev)  
- 🔧 **Use `::before` / `::after` for Dividers** – instead of `border-left` or `border-right`  
- 🔧 **Use HTML Entity Code for Symbols** – e.g., `&copy;` for copyright  
- 🔧 **Semantic HTML Structure** – ensure tag flow matches actual UI sequence  
- 🔧 **Programmatic Input Focus** – use JS to focus input fields on nearby label clicks  
- 🔧 **Use Inline SVGs** – replace `<img>` with direct SVGs for better control and styling  
- 🔧 **Consistent Spacing in Layouts** – if one element in a row/column has `margin`, others should too (avoid mixing with `padding`)  
- 🔧 **Set Cookies for Disclaimer** – remember consent to avoid showing disclaimer again  
- 🔧 **Improve Accessibility with `title` & `aria-label`** – when using `line-clamp` and `text-overflow: ellipsis`, show full info on hover and ensure screen reader support  
- 🔧 **Theme Support (Light / Dark / System)** – allow users to switch or auto-detect preferred color scheme  
---

## 📬 Contact

Feel free to reach out or connect:

- 📧 Email: [vashaniparth07.dev@gmail.com](mailto:vashaniparth07.dev@gmail.com)
- 💻 GitHub: [@parthv07](https://github.com/parthv07)
---

> Built with 💚 by Parth Vashani