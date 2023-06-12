import React from "react";
import Home from "../views/Home";
import ChessBoard from "../views/ChessBoard";
import ViewHistory from "../views/ViewHistory";
import TurnbasedGameplay from "../views/TurnbasedGameplay";
import {
    createBrowserRouter,
} from "react-router-dom";
import GameController from "../controllers/GameController";
import ChessBoardComputer from "../views/ChessBoardComputer";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GameController><Home/></GameController>,
    },
    {
        path: "/home",
        element: <GameController><Home/></GameController>,
    },
    {
        path: "/chessBoard",
        element: <GameController><ChessBoard /></GameController>,
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
    ,
    {
        path: "/chessBoardComputer",
        element: <GameController><ChessBoardComputer /></GameController>,
    }
    ,
]);

export default router;