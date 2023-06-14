import { useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect } from "react";
import '../styles/ChessBoard.css';
import Header from './Header.js';
import { Navigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import winnerIcon from "../img/winner.png";

export default function ChessBoard() {
  const location = useLocation();
  const navigate = useNavigate()
  const [orientation,setOrientation] = useState('white');
  const [moveHistory, setMoveHistory] = useState([]);

  const [nickname,setNickname] = useState("");
  const [nicknameSecondPlayer,setNicknameSecondPlayer] = useState("");
  const [turn,setTurn]= useState('Tura białych');

  useEffect(() => {
    if(!location.state){
        navigate("/");
    }
    if(location.state.nick) {
        setNickname(location.state.nick);
        setTurn("Tura gracza "+location.state.nick);
    }
    if(location.state.secondNick) setNicknameSecondPlayer(location.state.secondNick);


    
    if(location.state.content) {
      const gameCopy = { ...game };
      gameCopy.load_pgn(location.state.content);
      setGame(gameCopy);
      fileReadSuccessAlert();
      let stringDoPrzerobienia = location.state.content;
      if(stringDoPrzerobienia.match(/\.[^\s.]/g)){
        stringDoPrzerobienia = stringDoPrzerobienia.replace(/\./g, '. ');
      }
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

  

  

  function onDrop(sourceSquare, targetSquare) {
    
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    let winner;
    if(game.turn()==='w'){
        game.turn('b');
        // setTurn("Tura białych");
        winner=nicknameSecondPlayer;
        setTurn("Tura gracza "+ nickname);

    }
    else{
    game.turn('w');
    // setTurn("Tura czarnych");
    winner=nickname;
    setTurn("Tura gracza "+ nicknameSecondPlayer);

    }

    // illegal move
    if (move === null) return false;

    if(orientation === "white"){
      setOrientation("black");
    }else{
      setOrientation("white");
    }
    var imageElement = document.createElement('img');
    imageElement.src = winnerIcon;
    imageElement.style.width = '100%';
    imageElement.style.height = '90%';
    const possibleMoves = game.moves();
    
    if (game.game_over()) {
        Swal.fire({
            position: 'center',
            color:'white',
            html: imageElement.outerHTML+('<p>Wygrał gracz '+winner+'</p>'),
            background: "#20201E",
            showConfirmButton: true,
    
        })
        return;
      } 
      if (game.in_draw()) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Remis',
            color:'white',
            background: "#20201E",
            showConfirmButton: true,
        })
        return;
      } 
      if (possibleMoves.length === 0) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Koniec ruchów',
            color:'white',
            background: "#20201E",
            showConfirmButton: true,
        })
        return;
      } 




    if(game.turn()==='w')  pawnMoves();
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

        <div className="turn-information-section">
            <p>{turn}</p>
        </div>
        <div className="content-row">
          <div className="first-section">
            
            <div className="user-nickname">
              <p>{nicknameSecondPlayer}</p>
            </div>
            <div className="chess-board">
              {/* <Chessboard  position={game.fen()} onPieceDrop={onDrop} boardOrientation={orientation}/> */}
              <Chessboard  position={game.fen()} onPieceDrop={onDrop}/>
            </div>
            <div className="user-nickname">
              <p>{nickname}</p>
            </div>
          </div>
          <div className="second-section">
            <div className="second-section-header">
                <p>Ruchy pionków:</p>
                <div className="move-pawn-row">
                  <p className="column">lp.</p>
                  <p className="column">{nickname}</p>
                  <p className="column">{nicknameSecondPlayer}</p>
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