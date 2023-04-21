import React from "react";
import Home from "../views/Home";
import ChessBoard from "../views/ChessBoard";
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
]);

export default router;