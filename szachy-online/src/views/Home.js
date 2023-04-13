import '../styles/Home.css';
import '../App.css';
import pawn from '../img/pawn.png';
function Home() {
  return (
    <div className="App">
      <nav className="app-nav">
            <div>
                <img src="" alt=""/>
            </div>
            
            <button className="nav-btn">
                <img src="" alt=""/>
                <p>Graj</p>
            </button>
            <button className="nav-btn">
                <img src="" alt=""/>
                <p>Pliki</p>
            </button>
            <button className="nav-btn">
                <img src="" alt=""/>
                <p>Znajomi</p>
            </button>
            <button className="nav-btn">
                <img src="" alt=""/>
                <p>Logowanie</p>
            </button>
            <button className="nav-btn">
                <img src="" alt=""/>
                <p>Rejestracja</p>   
            </button>
      </nav>
      <main className="content">
        <div className='chess-piece-info'>
            <div className='piece'>
                <img className='piece-img' src={pawn}/>
            </div>
            <div className='piece-text'>
                <div className='piece-header'>
                    Pionek
                </div>
                <div className='piece-main-text'>
                    Pionek jest jednym z sześciu rodzajów figur i jest uważany za najprostszą z nich. Pionki poruszają się na planszy tylko do przodu, o jedno pole na raz, chyba że znajdują się na swojej początkowej pozycji, wtedy mają możliwość przesunięcia się o dwa pola do przodu.
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
                        Pionek jest jednym z sześciu rodzajów figur i jest uważany za najprostszą z nich. Pionki poruszają się na planszy tylko do przodu, o jedno pole na raz, chyba że znajdują się na swojej początkowej pozycji, wtedy mają możliwość przesunięcia się o dwa pola do przodu.
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
                    Pionek jest jednym z sześciu rodzajów figur i jest uważany za najprostszą z nich. Pionki poruszają się na planszy tylko do przodu, o jedno pole na raz, chyba że znajdują się na swojej początkowej pozycji, wtedy mają możliwość przesunięcia się o dwa pola do przodu.
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
                    Pionek jest jednym z sześciu rodzajów figur i jest uważany za najprostszą z nich. Pionki poruszają się na planszy tylko do przodu, o jedno pole na raz, chyba że znajdują się na swojej początkowej pozycji, wtedy mają możliwość przesunięcia się o dwa pola do przodu.
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
                    Pionek jest jednym z sześciu rodzajów figur i jest uważany za najprostszą z nich. Pionki poruszają się na planszy tylko do przodu, o jedno pole na raz, chyba że znajdują się na swojej początkowej pozycji, wtedy mają możliwość przesunięcia się o dwa pola do przodu.
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
                    Pionek jest jednym z sześciu rodzajów figur i jest uważany za najprostszą z nich. Pionki poruszają się na planszy tylko do przodu, o jedno pole na raz, chyba że znajdują się na swojej początkowej pozycji, wtedy mają możliwość przesunięcia się o dwa pola do przodu.
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}

export default Home;
