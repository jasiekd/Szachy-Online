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

  const [moves,setMoves]=useState([]);
  const [moveCounter,setMoveCounter]=useState(0);

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
      let pgnMove='';

      const tempPgnMoves=[];
      elementy.map((item,index )=> {
   
        if (index % 3 === 0) {
          pgnMove+=item+' ';
          
          item=item.replace(/\./g, '');
          temp.move =parseInt(item);
        } else if (index % 3 === 1) { 
          pgnMove+=item+' ';
          tempPgnMoves.push(pgnMove);

          temp.white = item;
        } else if (index % 3 === 2) {
          pgnMove+=item+' ';
          tempPgnMoves.push(pgnMove);

          temp.black = item;
          tempMoveHistory.push(temp);
          temp = {};
        }
    })
    
    setMoves(tempPgnMoves);
    setMoveHistory(tempMoveHistory);
    setMoveCounter(tempMoveHistory.length*2);
    }
  }, [location]);

  const [game, setGame] = useState(new Chess());
 
  

  function undoMove(){
    console.log(moveCounter);
    if(moveCounter==0) return;

    setMoveCounter(moveCounter-1);
    const gameCopy = { ...game };
    console.log(gameCopy.pgn());

    // setMoves([...moves,gameCopy.fen()]);
    const result = gameCopy.undo();
    console.log(gameCopy.pgn());

    setGame(gameCopy);
    return result;
  }
  function redoMove(){
    if(moveCounter==moves.length) return;

    setMoveCounter(moveCounter+1);

    const gameCopy = { ...game };
    const result = gameCopy.load_pgn(moves[moveCounter]);
    setGame(gameCopy);
    return result;
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
  function onDrop(sourceSquare, targetSquare) {
    return false;
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
              <Chessboard  position={game.fen()} onPieceDrop={onDrop}/>
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
              {/* <button className='nav-btn text-center' onClick={fileWriter}>
                <p className='btn-text'>Zapisz rozgrywkę</p>
              </button> */}
              <button className='second-section-btn text-center' onClick={undoMove}>
                <p className='btn-text'>back</p>
                </button>
            <button className='second-section-btn text-center' onClick={redoMove}>
                <p className='btn-text'>next</p>
                </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}