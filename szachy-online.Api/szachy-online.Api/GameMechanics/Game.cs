namespace szachy_online.Api.GameMechanics
{
    public class Game
    {
        public Board board = new Board();
        public Game()
        {
            board.DefaultPosition();
        }
    }
}
