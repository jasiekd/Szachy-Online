import continueIcon from "../img/right-arrow.png";
import chessHistory from "../img/chessHistory.png";
import { useNavigate } from "react-router-dom";

export default function FileComponent({getStyle,show,hide})
{
    const navigate = useNavigate()
    function fileReader(file){    
   
        var reader = new FileReader();
        
        reader.onload = function(e) {
            var content = reader.result;
            navigate("/chessBoard",{state:{content}});

        }
        
        reader.readAsText(file);    
    }
    return(

        <div className='option' style={getStyle} onMouseOver={show}  onMouseOut={hide}>
        {/* <button  className='nav-btn' >
            <img className="btn-img" src={continueIcon} alt=""/>
            <p className='slide-btn-text'>Wznów gre z pliku</p>
        </button> */}
        <label htmlFor="fileInput"  className='nav-btn'>
        <img className="btn-img" src={continueIcon} alt=""/>
        <p className='slide-btn-text'>Wznów gre z pliku</p>
        </label>
        <input type="file"  id="fileInput" style={{display:'none'}} accept='.pgn' onChange={(event)=>fileReader(event.target.files[0])}/>

        <button className='nav-btn'>
            <img className="btn-img" src={chessHistory} alt=""/>
            <p className='slide-btn-text'>Historia rozgrywki z pliku</p>
        </button>
        </div>

    )
}