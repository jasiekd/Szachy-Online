import { useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect } from "react";
import '../styles/ChessBoard.css';
import Header from './Header.js';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import winnerIcon from "../img/winner.png";
import loseIcon from "../img/lose.png"
import GameController from "../controllers/GameController";
import GiveUpGame from "../components/GiveUpGame";

export default function ChessBoard({setWinner,sendPlayerMove,setChessHubOnGame,getPlayerMove,setRefToGame,getInfoAboutGame,receiveMoveAlert,lastEnemyMove}) {
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

    //pawnMoves();

  }

  function onDrop(sourceSquare, targetSquare) {
    // console.log(game.turn());
    if((localStorage.uid === gameInfo.blackID && game.turn() === 'w')||
      (localStorage.uid === gameInfo.whiteID && game.turn() === 'b')){
        return false;
      }
    
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    checkEndGame();
    if(move){
      // console.log("wykonano: ");
      // console.log(move)
      sendPlayerMove(move.san);
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

    if(localStorage.getItem("gameId")===null)
    {
      navigate("/home");
    }else{
      setChessHubOnGame();
      setRefToGame(game);
      getInfoAboutGame(localStorage.gameId).then((r)=>{
        setGameInfo(r);
        
        if(r.blackID === localStorage.uid){
          setOrientation("black");
        }
      })
    }
  },[])

  useEffect(()=>{
    

    const gameCopy = {...game};
    // console.log("tura: "+gameCopy.turn())
    // console.log(gameCopy.moves());
    if(gameCopy.move(lastEnemyMove)===null)
    {
      //gameCopy.remove(lastEnemyMove);
      //game.move(lastEnemyMove);
      // console.log("mamy problem");
    }
   // checkEndGame();
    pawnMoves();
  //  checkEndGame();
    setGame(gameCopy);
    checkEndGame();

  },[lastEnemyMove])

  const checkEndGame = (turn) =>{
    var imageElement = document.createElement('img');

    imageElement.style.width = '100%';
    imageElement.style.height = '90%';
    const possibleMoves = game.moves();
   
    if (game.in_checkmate()) {
      debugger
      if(game.turn() === "b" && gameInfo.whiteID === localStorage.uid)
      {
        imageElement.src = winnerIcon;
      }
      else if(game.turn() === "w" && gameInfo.blackID === localStorage.uid){
        imageElement.src = winnerIcon;
      }
      else{
        imageElement.src = loseIcon;
      }
      if(game.turn()==="b")
      {
        
        setWinner(localStorage.gameId,"White")
        Swal.fire({
          position: 'center',
          color:'white',
          html: imageElement.outerHTML+('<p>Wygrał gracz '+gameInfo.whiteNickname+'</p>'),
          background: "#20201E",
          showConfirmButton: true,
          allowOutsideClick: false
        })
      }
      else{
        
        setWinner(localStorage.gameId,"Black")
        Swal.fire({
          position: 'center',
          color:'white',
          html: imageElement.outerHTML+('<p>Wygrał gracz '+gameInfo.blackNickname+'</p>'),
          background: "#20201E",
          showConfirmButton: true,
          allowOutsideClick: false
        })
      }
      
      return;
    } 
    if (game.in_draw()) {
      setWinner(localStorage.gameId,"Draw")
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
      setWinner(localStorage.gameId,"Draw")
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

  const [openGiveUp,setOpenGiveUp] = useState(false);
  const handleCloseGiveUp = () =>{
    setOpenGiveUp(!openGiveUp)
  }
  return (
    <div className="App">
      <Header/>
      <GameController>
        <GiveUpGame open={openGiveUp} handleClose={handleCloseGiveUp} gameId={localStorage.gameId}/>
      </GameController>
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
            <button className="option-btn friends-btn-reject" style={{width:"100%"}} onClick={()=>setOpenGiveUp(true)}>Poddaj się</button>
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