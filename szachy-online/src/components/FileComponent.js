import continueIcon from "../img/right-arrow.png";
import chessHistory from "../img/chessHistory.png";

export default function FileComponent({getStyle,show,hide})
{
    return(
        <div className='option' style={getStyle} onMouseOver={show}  onMouseOut={hide}>
            <button className='nav-btn'>
                <img className="btn-img" src={continueIcon} alt=""/>
                <p className='slide-btn-text'>Wznów gre z pliku</p>
            </button>
            <button className='nav-btn'>
                <img className="btn-img" src={chessHistory} alt=""/>
                <p className='slide-btn-text'>Historia rozgrywki z pliku</p>
            </button>
        </div>
    )
}