import { useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect } from "react";
import '../styles/ChessBoard.css';
import Header from './Header.js';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import winnerIcon from "../img/winner.png";

export default function ChessBoardComputer({setWinner,startGameWithComputer,sendPlayerMoveComputer,getInfoAboutGame,setChessHubOnGame,lastEnemyMove}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [moveHistory, setMoveHistory] = useState([]);
  const [orientation,setOrientation] = useState("white");
  const [gameInfo,setGameInfo] = useState(null);
  const [playerNicks,setPlayerNicks] = useState({
    black: "",
    white: ""
  })
  useEffect(() => {
    setMoveHistory([]);
  },[]);
  useEffect(() => {
    if(location.state && location.state.content) {
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

  



  function onDrop(sourceSquare, targetSquare) {
    if((localStorage.uid === gameInfo.blackID && game.turn() === 'w')||
      (localStorage.uid === gameInfo.whiteID && game.turn() === 'b')){
        return false;
      }
    
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    if(move){
      sendPlayerMoveComputer(move.san).then(()=>{
        checkEndGame();
      });
    }
    return true;
  }
  function pawnMoves(){
    const array=game.history();
    if(array.length===0) return;
    let array2=[];

    for (let i = 0; i < array.length; i += 2) {
      if (i + 1 < array.length) {
        const pair = { white: array[i], black: array[i + 1] };
        array2.push(pair);
      }
    }

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
  
  useEffect(()=>{
    if(localStorage.gameIdComputer && localStorage.pgnComputer && location.state && location.state.color)
    {
        game.load_pgn(localStorage.pgnComputer);
        if(location.state.color === "BlackPlayer")
            setOrientation("black")
        else if(location.state.color === "WhitePlayer")
            setOrientation("white")
        setChessHubOnGame().then(r=>{
            startGameWithComputer(localStorage.gameIdComputer)
            getInfoAboutGame(localStorage.gameIdComputer).then((r)=>{
                setGameInfo(r)
            })
        });
        
    }else{
        navigate("/home");
    }
  },[])
  useEffect(()=>{
    

    const gameCopy = {...game};
    // console.log("tura: "+gameCopy.turn())
    // console.log(gameCopy.moves());
    if(gameCopy.move(lastEnemyMove)===null)
    {
      if(lastEnemyMove)
      {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Błąd rozgrywki',
          background: "#20201E",
          showConfirmButton: true,
          allowOutsideClick: false
        })
        setWinner("Draw");
         console.log("mamy problem: "+lastEnemyMove);
      }
      
    }
    pawnMoves();
    console.log('a');
    setGame(gameCopy);
    checkEndGame()

  },[lastEnemyMove])
  

  const checkEndGame = (turn) =>{
    var imageElement = document.createElement('img');
    imageElement.src = winnerIcon;
    imageElement.style.width = '100%';
    imageElement.style.height = '90%';
    const possibleMoves = game.moves();
    if (game.game_over()) {
      console.log(game.turn());
      if(game.turn()==="b")
      {
        setWinner(localStorage.gameIdComputer,"White")
      }
      else{
        setWinner(localStorage.gameIdComputer,"Black")
      }
      Swal.fire({
          position: 'center',
          color:'white',
          html: imageElement.outerHTML+('<p>Wygrał gracz '+game.turn()==="b"?gameInfo.whiteNickname:gameInfo.blackNickname+'</p>'),
          background: "#20201E",
          showConfirmButton: true,
          allowOutsideClick: false
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
          allowOutsideClick: false
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
          allowOutsideClick: false
      })
      return;
    } 
  }
  return (
    <div className="App">
      <Header/>
      <main className="content">
        <div className="content-row">
          <div className="first-section">
            <div className="user-nickname">
              <p> {orientation === 'black' && (gameInfo ? gameInfo.whiteNickname : null)}
                  {orientation === 'white' && (gameInfo ? gameInfo.blackNickname : null)}
              </p>
            </div>
            <div className="chess-board">
              <Chessboard  position={game.fen()} onPieceDrop={onDrop} boardOrientation={orientation}/>
            </div>
            <div className="user-nickname">
              <p> 
                {orientation === 'black' && (gameInfo ? gameInfo.blackNickname : null)}
                {orientation === 'white' && (gameInfo ? gameInfo.whiteNickname : null)}
              </p>
            </div>
          </div>
          <div className="second-section">
            <div className="second-section-header">
                <p>Ruchy pionków:</p>
                <div className="move-pawn-row">
                  <p className="column">lp.</p>
                  <p className="column">{gameInfo?gameInfo.whiteNickname:null}</p>
                  <p className="column">{gameInfo?gameInfo.blackNickname:null}</p>
                </div>
            </div>
            <div className="second-section-main">
                {
                 moveHistory && moveHistory.map((single,index)=>(
                    <div className="move-pawn-row" key={index}>
                      <p className="column">{index+1}.</p>
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