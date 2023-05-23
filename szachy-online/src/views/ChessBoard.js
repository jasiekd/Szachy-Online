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
  const [moveHistory, setMoveHistory] = useState([]);


  useEffect(() => {
    if(location.state) {
      const gameCopy = { ...game };
      gameCopy.load_pgn(location.state.content);
      setGame(gameCopy);
      fileReadSuccessAlert();
      const stringDoPrzerobienia = location.state.content;
      const elementy = stringDoPrzerobienia.trim().split('. '&&' ');
      const tempMoveHistory = [];
      let temp = {};

      elementy.map((item,index )=> {
   
        if (index % 3 === 0) {
          item=item.replace(/\./g, '');
          temp.move =parseInt(item);
        } else if (index % 3 === 1) { 
          temp.white = item;
        } else if (index % 3 === 2) {
          temp.black = item;
          tempMoveHistory.push(temp);
          temp = {};
        }
    })
    
    setMoveHistory(tempMoveHistory);
    }
  }, [location]);

  const [game, setGame] = useState(new Chess());
 
  function makeAMove(move) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over()) {
      console.log('przegrana');
      return;
    } 
    if (game.in_draw()) {
      console.log('remis');

      return;
    } 
    if (possibleMoves.length === 0) {
      console.log('koniec ruchów');

      return;
    } 
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
    return true;
  }
  function pawnMoves(){
    const array=game.history();
    const twoLastElements ={move:moveHistory.length+1,white: array[array.length-2],black: array[array.length-1]};
    const array2=[...moveHistory,twoLastElements];
    setMoveHistory(array2);
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
                      <p className="column">{single.move}.</p>
                      <p className="column">{single.white}</p>
                      <p className="column">{single.black}</p>
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