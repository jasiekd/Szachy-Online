import { useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect } from "react";
import '../styles/ChessBoard.css';
import Header from './Header.js';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export default function ChessBoard({sendPlayerMove,setChessHubOnGame,getPlayerMove,setRefToGame,getInfoAboutGame,receiveMoveAlert,lastEnemyMove}) {
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
  //game.move("d4")
 // game.move("e5")
 
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
    console.log(game.turn());
    if((localStorage.uid === gameInfo.blackID && game.turn() === 'w')||
      (localStorage.uid === gameInfo.whiteID && game.turn() === 'b')){
        return false;
      }
    
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    if(move){
      console.log("wykonano: ");
      console.log(move)
      sendPlayerMove(move.san);
    }
    return true;
  }
  function pawnMoves(){
    const array=game.history();
    const twoLastElements ={move:moveHistory.length+1,white: array[array.length-2],black: array[array.length-1]};
    const array2=[...moveHistory,twoLastElements];
    setMoveHistory(array2);
    console.log(game.history());
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
      getInfoAboutGame().then((r)=>{
        setGameInfo(r);
        
        if(r.blackID === localStorage.uid){
          setOrientation("black");
        }
      })
    }
  },[])

  useEffect(()=>{
    

    const gameCopy = {...game};
    console.log("tura: "+gameCopy.turn())
    console.log(gameCopy.moves());
    if(gameCopy.move(lastEnemyMove)===null)
    {
      //gameCopy.remove(lastEnemyMove);
      //game.move(lastEnemyMove);
      console.log("mamy problem");
    }
    pawnMoves()
    setGame(gameCopy);
    

  },[lastEnemyMove])
  return (
    <div className="App">
      <Header/>
      <main className="content">
        <div className="content-row">
          <div className="first-section">
            <div className="user-nickname">
              <p>{gameInfo?gameInfo.blackNickname:null}</p>
            </div>
            <div className="chess-board">
              <Chessboard  position={game.fen()} onPieceDrop={onDrop} boardOrientation={orientation}/>
            </div>
            <div className="user-nickname">
              <p>{gameInfo?gameInfo.whiteNickname:null}</p>
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