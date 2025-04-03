import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.jsx";
import Searchresults from "./Searchresults.jsx";
import Tracklist from "./Tracklist.jsx";
import Right from "./Right.jsx";
import Playlists from "./Playlists.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "",
                element: <Right />, // Right becomes the parent route
                children: [
                    {
                        index: true, // Default child route
                        element: <Playlists />, // Renders Playlists by default
                    },
                    {
                        path: "search/:srchquery",
                        element: <Searchresults />,
                    },
                    {
                        path: ":type/:id",
                        element: <Tracklist />,
                    },
                ],
            },
        ],
    },
]);

export default function AppRoutes() {
    return <RouterProvider router={router} />;
}
