using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace szachy_online.Api.GameMechanics
{
    public class Piece
    {
        public Coords Pos { get; set; }
        public bool Team { get; set; }
        public char Type { get; set; }
        public bool HasMoved { get; set; }
        public bool Exists { get; set; }
        public bool IsClicked { get; set; }

        public Piece(char type, bool team, Coords pos)
        {
            this.Pos = pos;
            this.Team = team;
            this.Type = type;
            HasMoved = false;
            Exists = true;
            IsClicked = false;
        }
        public Piece(char type, bool team, Coords pos, bool possibleEnPassant, bool hasMoved)
        {
            this.Pos = pos;
            this.Team = team;
            this.Type = type;
            this.HasMoved = hasMoved;
            Exists = true;
            IsClicked = false;
        }
        public Piece()
        { }
    }
}
