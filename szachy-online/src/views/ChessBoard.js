
import React, { startTransition, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Image,Rect } from 'react-konva';
import horse from '../img/horse.png';
import pawn from '../img/pawn.png';
import useImage from 'use-image';
import '../styles/ChessBoard.css';
function generateFields() {
    const chessBoard = [];
    let field={};
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        let fill;
        if(y%2===0){
          if(x%2===0){
            fill="white";
          }else{
            fill="black";
          }
        }else{
          if(x%2===1){
            fill="white";
          }else{
            fill="black";
          }
        }
        field = {
          idx: x.toString(),
          idy: y.toString(),
          x: x*100,
          y: y*100,
          fill:fill,

        };
        chessBoard.push(field);
      }
      
    }
    return chessBoard;
}
function generatePawns(){
  const pawns = [];
  
  for (let y = 0; y < 8; y++) {
    console.log(y);
    var imageObj = new window.Image();
    imageObj.src = horse;
    let pawn ={
      id:y,
      x:10,
      y:10,
      img:imageObj,
    }
    pawns.push(pawn);
  }
  return pawns;

}

  const FIELDS_INITIAL_STATE = generateFields();
  const PAWNS_INITIAL_STATE = generatePawns();
function ChessBoard() {
  
    const [fields, setFields] = React.useState(FIELDS_INITIAL_STATE);
    const [pawns, setPawns] = React.useState(PAWNS_INITIAL_STATE);
 
    const handleDragStart = (e) => {
      const id = e.target.id();
      setPawns(
        pawns.map((pawn) => {
          return {
            ...pawn,
            isDragging: pawn.id === id,
          };
        })
      );
    };
    const handleDragEnd = (e) => {
      setPawns(
        pawns.map((pawn) => {
          return {
            ...pawn,
            isDragging: false,
          };
        })
      );
    };
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer >
          {fields.map((field,key) => (
            <Rect
            
              key={key}
              id={field.id}
              x={field.x}
              y={field.y}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              opacity={0.8}
              fill={field.fill}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              width={100}
              height={100}
            />
          ))}
           {pawns.map((pawn,key) => (
           <Image
              key={key}
              image={pawn.img}
              width={80}
              height={90}
              x={pawn.x}
              y={pawn.y}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
         /> 
          ))}
    
        </Layer>
      </Stage>
    );
}
export default ChessBoard;


