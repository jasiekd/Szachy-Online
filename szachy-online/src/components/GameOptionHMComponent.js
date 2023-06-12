import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeInput } from "./ThemeInput";
import { useEffect, useState } from "react";
import FriendController from "../controllers/FriendController";
import GameController from "../controllers/GameController";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

export default function GameOptionHMComponent({getStyle,hide,createGameWithComputer,createConnectToInvHub,getOpenings}){
    const navigate = useNavigate();
    const [selectedFriendId,setSelectedFriendId] = useState(null);
    const [isButtonActive,setIsButtonActive] = useState(true);
    const [level,setLevel] = useState("Random");
    const [color,setColor] = useState("WhitePlayer");
    const [opening,setOpening] = useState(null);

    const conect = () =>{
        createConnectToInvHub();
        
    }
    const [openingsList,setOpeningList] = useState([]);
      /*  {
          id: 1,
          name: "Obrona Sycylijska - Wariant smoczy",
          description: "Otwarcie szachowe rozpoczynające się posunięciami:\r\n\r\ne4 c5\r\nDebiut ten jest najpopularniejszą i dającą najlepsze efekty odpowiedzią na pierwszy ruch białych 1. e4. Statystycznie skuteczniejszym otwarciem dla białych jest 1. d4, gdyż obrona (sycylijska) przed 1. e4 ma wysoki wskaźnik skuteczności. W czasopiśmie „New in Chess” (w roczniku wydanym w roku 2000) podano, że w grach z jego bazy danych białe wygrały 56,1% partii (z 296 200), zaczynając od 1. d4, a przy rozpoczęciu od 1. e4 było to 54,1% partii (z 349 855), głównie dzięki obronie sycylijskiej (52,3% wygranych przez białe ze 145 996 rozgrywek).",
          pgn: "1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6"
        }]);*/
    useEffect(()=>{
        
       getOpenings().then(r=>{
        console.log(r);
            setOpeningList(r);
        })
    },[])
    const onSelecOpening = (value) =>{
        setIsButtonActive(false);
        setOpening(value)
    }
    return(
        <>
        <div className="option game-options" style={getStyle} >
        
        <div>Ustawienia rozgrywki Online Człowiek-Maszyna</div>
       
            
        <div style={{width:"50rem",display:"flex"}}>  
            <FormControl >
            <FormLabel style={{color:"white",fontSize:"2rem"}}>Poziom trudności</FormLabel>
            <RadioGroup
                row
                style={{width:"100%",gap:"10rem"}}
                defaultValue={"Random"}
                onChange={(event,value)=>setLevel(value)}
            >
                <FormControlLabel value="Random" control={<Radio style={{color:"white"}} />} label="losowy" />
                <FormControlLabel value="One" control={<Radio style={{color:"white"}}/>} label="łatwy" />
                <FormControlLabel value="Two" control={<Radio style={{color:"white"}}/>} label="trudny" />

            </RadioGroup>
            </FormControl>
        </div>   
        <div style={{width:"50rem",display:"flex"}}>   
            <FormControl >
            <FormLabel style={{color:"white",fontSize:"2rem"}}>Kolor pionków</FormLabel>
            <RadioGroup
                row
                style={{width:"100%",gap:"10rem"}}
                defaultValue={"WhitePlayer"}
                onChange={(event,value)=>setColor(value)}
            >
                <FormControlLabel value="WhitePlayer" control={<Radio style={{color:"white"}}/>} label="Białe" />
                <FormControlLabel value="BlackPlayer" control={<Radio style={{color:"white"}}/>} label="Czarne" />
                <FormControlLabel value="Random" control={<Radio style={{color:"white"}}/>} label="Losowe" />

            </RadioGroup>
            </FormControl>
        </div>
        <div style={{width:"50rem",display:"flex"}}>   
            <FormControl >
            <FormLabel style={{color:"white",fontSize:"2rem"}}>Rozpoczęcie</FormLabel>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                disableClearable
                options={openingsList}
                getOptionLabel={(option)=>option.name}
                sx={{width:"50rem"}}
                renderInput={(params) => <ThemeInput {...params}/>}
                onChange={(event,value) => onSelecOpening(value)}
                />
            </FormControl>
        </div>
        <div>
            <div style={{display:"flex",gap:"10rem"}}>
                <button className='option-btn' onClick={()=>createGameWithComputer(level,color,opening.id)} disabled={isButtonActive}>Rozpocznij</button>
                <button className='option-btn'>Anuluj</button>
            </div>
            
        </div>
    
    
</div>

    </>
    )
}