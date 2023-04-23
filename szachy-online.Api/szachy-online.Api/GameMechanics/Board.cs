using System.Drawing;

namespace szachy_online.Api.GameMechanics
{
    public class Board
    {
        public List<Piece> Pieces { get; set; }
        public Board()
        {
            Pieces = new List<Piece>();
        }
        public void AddPiece(Piece piece)
        {
            Pieces.Add(piece);
        }
        public void DefaultPosition()
        {
            Board board = new Board();
            Piece whitePawn = new Piece('p', true, new Coords('a','2'));
            Piece blackPawn = new Piece('p', false, new Coords('a','2'));
            board.AddPiece(whitePawn);
            board.AddPiece(blackPawn);
        }

    }
}
