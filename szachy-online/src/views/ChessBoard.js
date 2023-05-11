import { useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect } from "react";
import '../styles/ChessBoard.css';
import Header from './Header.js';
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

export default function ChessBoard() {
  const location = useLocation();
  useEffect(() => {
    if(location.state) {
      const gameCopy = { ...game };
      gameCopy.load_pgn(location.state.content);
      setGame(gameCopy);
      fileReadSuccessAlert();
    }
  }, [location]);

  const [game, setGame] = useState(new Chess());
  const [moveHistory, setMoveHistory] = useState([]);
 
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
    pawnMoves();

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
  function pawnMoves(){
    const array=game.history();
    const twoLastElements =[array[array.length-2],array[array.length-1]];
    const array2=[...moveHistory,twoLastElements];
    setMoveHistory(array2);
  }
  const fileReadSuccessAlert = () =>{
    Swal.fire({
        icon: 'success',
        background: "#20201E",
        color: "white",
        width: "50rem",
        html:"<div><div style='font-size:2rem; font-weight:800;'>Odczytano rozgrywkę z pliku</div></div>",
        timer:1000,
        showConfirmButton: false,
      })
  }
   const fileWriterWarningAlert = () =>{
    Swal.fire({
        icon: 'warning',
        background: "#20201E",
        color: "white",
        width: "50rem",
        html:"<div><div style='font-size:2rem; font-weight:800;'>Aby zapisać rozgrywkę wykonaj ruch</div></div>",
        showConfirmButton: false,
      })
  }
  const fileWriterSuccessAlert = () =>{
    Swal.fire({
        icon: 'success',
        background: "#20201E",
        color: "white",
        width: "50rem",
        html:"<div><div style='font-size:2rem; font-weight:800;'>Zapisano rozgrywkę do pliku</div></div>",
        showConfirmButton: false,
      })
  }
  function fileWriter(){
    
    if(game.pgn()===''){
      fileWriterWarningAlert();
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([game.pgn()], {type: 'text/plain'});
    
    element.href = URL.createObjectURL(file);
    element.download = "rozgrywka.pgn";
    document.body.appendChild(element);
    element.click();
    fileWriterSuccessAlert();
  }
  return (
    <div className="App">
      <Header/>
      <main className="content">
        <div className="content-row">
          <div className="first-section">
            <div className="user-nickname">
              <p>Makrol</p>
            </div>
            <div className="chess-board">
              <Chessboard  position={game.fen()} onPieceDrop={onDrop} />
            </div>
            <div className="user-nickname">
              <p>Zetux</p>
            </div>
          </div>
          <div className="second-section">
            <div className="second-section-header">
                <p>Ruchy pionków:</p>
                <div className="move-pawn-row">
                  <p className="column">lp.</p>
                  <p className="column">Zetux</p>
                  <p className="column">Makrol</p>
                </div>
            </div>
            <div className="second-section-main">
                {
                  moveHistory.map((single,index)=>(
 
                    <div className="move-pawn-row" key={index}>
                      <p className="column">{index+1}.</p>
                      <p className="column">{single[0]}</p>
                      <p className="column">{single[1]}</p>
                    </div>
                  ))
                
                }
              
           </div>
            <div className="second-section-footer">          
              <button className='nav-btn text-center' onClick={fileWriter}>
                <p className='btn-text'>Zapisz rozgrywkę</p>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}