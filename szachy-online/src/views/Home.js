import '../styles/Home.css';
import '../App.css';
import pawn from '../img/pawn.png';
import king from '../img/king.png';
import queen from '../img/queen.png';
import bishop from '../img/bishop.png';
import horse from '../img/horse.png';
import rook from '../img/rook.png';
import imgLogo from '../img/logo.png';
import imgChess from '../img/chess.png';
import imgFile from '../img/file.png';
import imgFriends from '../img/friends.png';
import imgLogin from '../img/login.png';
import imgRegister from '../img/register.png';
import React, { useState } from "react";
import onlineHumanHuman from "../img/occ.png";
import onlineHumanComputer from "../img/ocm.png";
import localHumanHuman from "../img/tcc.png";
function Home() {
    const [getGameStyle, setGameStyle] = useState({width:"0rem"});
    const showGameOptions=() =>{
        setGameStyle({width:"25rem"});
    }
    const hideGameOptions=() =>{
        setGameStyle({width:"0rem"});
    }

    const [getFileStyle, setFileStyle] = useState({width:"0rem", backgroundColor: "blue"});
    const showFileOptions=() =>{
        setFileStyle({width:"15rem", backgroundColor: "blue"});
    }
    const hideFileOptions=() =>{
        setFileStyle({width:"0rem", backgroundColor: "blue"});
    }
  return (
    <div className="App">
      <nav className="app-nav">
            <div className="logo">
                <img className="img-logo" src={imgLogo} alt=""/>
            </div>
            
            <button className="nav-btn" onMouseOver={showGameOptions} onMouseOut={hideGameOptions}>
                <img className="btn-img" src={imgChess} alt=""/>
                <p>Graj</p>
            </button>
            <button className="nav-btn" onMouseOver={showFileOptions} onMouseOut={hideFileOptions}>
                <img className="btn-img" src={imgFile} alt=""/>
                <p>Pliki</p>
            </button>
            <button className="nav-btn">
                <img className="btn-img" src={imgFriends} alt=""/>
                <p>Znajomi</p>
            </button>
            <button className="nav-btn">
                <img className="btn-img" src={imgLogin} alt=""/>
                <p>Logowanie</p>
            </button>
            <button className="nav-btn">
                <img className="btn-img" src={imgRegister} alt=""/>
                <p>Rejestracja</p>   
            </button>
      </nav>
      <div className='option' style={getGameStyle} onMouseOver={showGameOptions}  onMouseOut={hideGameOptions}>
            <button className='nav-btn'>
                <img className="btn-img" src={onlineHumanHuman} alt=""/>
                <p className='slide-btn-text'>Online Człowiek - Człowiek</p>
            </button>
            <button className='nav-btn'>
                <img className="btn-img" src={localHumanHuman} alt=""/>
                <p className='slide-btn-text'>Turowo Człowiek - Człowiek</p>
            </button>
            <button className='nav-btn'>
                <img className="btn-img" src={onlineHumanComputer} alt=""/>
                <p className='slide-btn-text'>Online Człowiek - Maszyna</p>
            </button>
      </div>
      <div className='option' style={getFileStyle} onMouseOver={showFileOptions}  onMouseOut={hideFileOptions}>
            
      </div>
      <main className="content">
        <div className='chess-piece-info'>
            <div className='piece'>
                <img className='piece-img' src={king}/>
            </div>
            <div className='piece-text'>
                <div className='piece-header'>
                    Król
                </div>
                <div className='piece-main-text'>
                    Król w szachach jest jednym z najważniejszych pionków na planszy, ponieważ jego utrata kończy grę. Król może poruszać się o jedno pole w dowolnym kierunku - w górę, w dół, na boki i na skos. Ma również specjalny ruch nazywany roszadą, który pozwala na zamianę pozycji króla i wieży, jeśli oba pionki nie poruszały się wcześniej i nie ma żadnych innych pionków między nimi. Król może również brać udział w szachowaniu i matowaniu przeciwnika. Jego możliwości są ograniczone, ale jego utrata decyduje o wyniku gry.
                </div>
            </div>
        </div>
        <div className='chess-piece-info'>
            <div className='piece'>
                    <img className='piece-img' src={queen}/>
                </div>
                <div className='piece-text'>
                    <div className='piece-header'>
                        Hetman
                    </div>
                    <div className='piece-main-text'>
                        Hetman w szachach jest jednym z najpotężniejszych pionków na planszy. Może poruszać się o dowolną liczbę pól w każdym kierunku - w pionie, poziomie i na skos. Dzięki temu, hetman może kontrolować duże obszary planszy i wykonywać skuteczne ataki na przeciwnika. Hetman może również brać udział w szachowaniu i matowaniu przeciwnika. Jego możliwości są bardzo duże, co czyni go cennym pionkiem w grze.
                    </div>
                </div>
        </div>
        <div className='chess-piece-info'>
            <div className='piece'>
                <img className='piece-img' src={bishop}/>
            </div>
            <div className='piece-text'>
                <div className='piece-header'>
                    Goniec
                </div>
                <div className='piece-main-text'>
                Goniec w szachach jest figurą, który porusza się po skosie. Może przesunąć się o dowolną liczbę pól na skosie, zarówno w górę, jak i w dół planszy. Dzięki temu, goniec może kontrolować duże obszary planszy i wykonywać ataki na przeciwnika. Goniec nie może poruszać się po polach innych kolorów, co ogranicza jego możliwości w poruszaniu się po planszy. Goniec może również brać udział w szachowaniu i matowaniu przeciwnika.
                </div>
            </div>
            
        </div>
        <div className='chess-piece-info'>
            <div className='piece'>
                <img className='piece-img' src={horse}/>
            </div>
            <div className='piece-text'>
                <div className='piece-header'>
                    Skoczek
                </div>
                <div className='piece-main-text'>
                    Skoczek w szachach jest pionkiem, który porusza się w kształcie litery "L" - dwie pola na bok i jedno pole w górę lub w dół planszy lub dwie pola w górę lub w dół i jedno pole na bok planszy. Skoczek może przeskakiwać nad innymi pionkami, co daje mu dużą swobodę ruchu na planszy. Skoczek może również brać udział w szachowaniu i matowaniu przeciwnika. Jego możliwości są stosunkowo ograniczone, ale może być bardzo przydatny w strategii gry.
                </div>
            </div>
        </div>
        <div className='chess-piece-info'>
            <div className='piece'>
                <img className='piece-img' src={rook}/>
            </div>
            <div className='piece-text'>
                <div className='piece-header'>
                    Wieża
                </div>
                <div className='piece-main-text'>
                    Wieża w szachach jest figurą, który porusza się w linii prostej, w pionie lub poziomie planszy, o dowolną liczbę pól. Dzięki temu, wieża może kontrolować duże obszary planszy i atakować przeciwnika. Wieża nie może poruszać się po skosie, co ogranicza jej możliwości ruchu na planszy. Wieża może również brać udział w szachowaniu i matowaniu przeciwnika. Jej możliwości ruchu i ataku sprawiają, że jest to ważny pionek w strategii gry.
                </div>
            </div>
        </div>
        <div className='chess-piece-info'>
            <div className='piece'>
                <img className='piece-img' src={pawn}/>
            </div>
            <div className='piece-text'>
                <div className='piece-header'>
                    Pionek
                </div>
                <div className='piece-main-text'>
                    Pionek w szachach porusza się o jedno pole w kierunku przeciwnika, czyli w górę planszy dla białych i w dół dla czarnych. Pionek może również przeskoczyć nad jednym polem, jeśli jest to jego pierwszy ruch. Pionek może atakować przeciwnika tylko po skosie. Jeśli pionek dotrze na ostatni rząd planszy, to może zostać zamieniony na dowolny inny pionek, z wyjątkiem króla. Pionek może również brać udział w szachowaniu i matowaniu przeciwnika, ale jego możliwości ruchu są stosunkowo ograniczone. Pionki są bardzo ważnym elementem gry, ponieważ mogą być wykorzystane jako tarcza ochronna dla innych pionków lub jako narzędzie do blokowania ruchów przeciwnika.
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}

export default Home;
