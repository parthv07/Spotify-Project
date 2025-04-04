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
                element: <Right />,
                children: [
                    {
                        index: true,
                        element: <Playlists />,
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
