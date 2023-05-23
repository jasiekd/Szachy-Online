import React from "react";
import Home from "../views/Home";
import ChessBoard from "../views/ChessBoard";
import ViewHistory from "../views/ViewHistory";
import TurnbasedGameplay from "../views/TurnbasedGameplay";
import {
    createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/chessBoard",
        element: <ChessBoard />,
    }
    ,
    {
        path: "/viewHistory",
        element: <ViewHistory />,
    }
    ,
    {
        path: "/turnbasedGameplay",
        element: <TurnbasedGameplay />,
    }
]);

export default router;