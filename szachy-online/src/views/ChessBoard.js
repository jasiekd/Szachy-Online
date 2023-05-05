import { useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect } from "react";
import '../styles/ChessBoard.css';
import Header from './Header.js';

export default function ChessBoard() {
  const [game, setGame] = useState(new Chess());
  useEffect(()=>{

  },[])
  function makeAMove(move) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare, targetSquare) {
    
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    //game.move({ from: 'g7', to: 'g6' })
    // illegal move
    if (move === null) return false;
    setTimeout(makeRandomMove, 200);
    console.log(game.pgn());
    return true;
  }

  return (
    <div className="App">
      <Header/>
      <div className="chess-board">
        <Chessboard  position={game.fen()} onPieceDrop={onDrop} />
      </div>
    </div>
  );
}