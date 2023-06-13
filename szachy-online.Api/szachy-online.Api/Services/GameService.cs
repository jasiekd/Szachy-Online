using Newtonsoft.Json;
using pax.chess;
using System.Drawing;
using szachy_online.Api.Data;

namespace szachy_online.Api.Services
{
    public class GameService
    {

        public GameService()
        {

        }

        public async Task<int> EvaluatePosition(Game game)
        {
            int score = 0;

            // Ocena na podstawie wartości figur
            score += await EvaluatePieceValues(game);

            //Ocena na podstawie pozycji figur
            foreach (var tmp in game.State.Pieces)
            {
                score += await GetPiecePositionScore(tmp);
            }

            return score;
        }

        private async Task<int> EvaluatePieceValues(Game game)
        {
            int whiteScore = 0;
            int blackScore = 0;

            // Przejdź przez wszystkie figury na planszy i zsumuj wartości figur dla białego i czarnego gracza
            foreach (var test in game.State.Pieces)
            {
                if (!test.IsBlack)
                {
                    whiteScore += await GetPieceValue(test.Type);
                }
                else
                {
                    blackScore += await GetPieceValue(test.Type);
                }
            }

            // Zwróć różnicę między wartościami figur białego i czarnego gracza
            return whiteScore - blackScore;
        }

        private async Task<int> GetPieceValue(PieceType piece)
        {
            // Przykładowe przypisanie wartości do figur
            switch (piece)
            {
                case PieceType.Pawn:
                    return 10;
                case PieceType.Knight:
                case PieceType.Bishop:
                    return 30;
                case PieceType.Rook:
                    return 50;
                case PieceType.Queen:
                    return 90;
                default:
                    return 0;
            }
        }
        private async Task<int> GetPiecePositionScore(Piece piece)
        {
            switch (piece.Type)
            {
                case PieceType.Pawn:
                    return await GetPawnPositionScore(piece);
                case PieceType.Knight:
                    return await GetKnightPositionScore(piece);
                case PieceType.Bishop:
                    return await GetBishopPositionScore(piece);
                case PieceType.Rook:
                    return await GetRookPositionScore(piece);
                case PieceType.Queen:
                    return await GetQueenPositionScore(piece);
                case PieceType.King:
                    return await GetKingPositionScore(piece);
                default:
                    return 0;
            }
        }

        private async Task<int> GetPawnPositionScore(Piece piece)
        {
            int score = 0;

            // Oceny dla pionków w różnych pozycjach planszy
            switch (piece.Position.Y)
            {
                case 1:
                    score += 5; // Pionek na drugim wierszu
                    break;
                case 6:
                    score -= 5; // Pionek na siódmym wierszu
                    break;
                default:
                    if (piece.IsBlack)
                        score -= 6; // Pionek czarny na innej pozycji
                    else
                        score += 6; // Pionek biały na innej pozycji
                    break;
            }
            return score;
        }

        private async Task<int> GetKnightPositionScore(Piece knight)
        {
            int score = 0;

            // Oceny dla skoczków w różnych pozycjach planszy
            // Preferencje dla centralnych pozycji
            int[,] knightPositionScores = {
        {
          -10, -5, -5, -5, -5, -5, -5, -10
        },
        {
          -5,
          0,
          0,
          0,
          0,
          0,
          0,
          -5
        },
        {
          -5,
          0,
          5,
          5,
          5,
          5,
          0,
          -5
        },
        {
          -5,
          0,
          5,
          10,
          10,
          5,
          0,
          -5
        },
        {
          -5,
          0,
          5,
          10,
          10,
          5,
          0,
          -5
        },
        {
          -5,
          0,
          5,
          5,
          5,
          5,
          0,
          -5
        },
        {
          -5,
          0,
          0,
          0,
          0,
          0,
          0,
          -5
        },
        {
          -10,
          -5,
          -5,
          -5,
          -5,
          -5,
          -5,
          -10
        }
      };

            // Przydzielanie oceny na podstawie pozycji planszy
            int x = knight.Position.X;
            int y = knight.Position.Y;
            if (knight.IsBlack)
            {
                // Dla czarnej figury używamy ocen z odwróconymi znakami
                score -= knightPositionScores[x, y];
            }
            else
            {
                // Dla białej figury używamy ocen bez zmiany
                score += knightPositionScores[x, y];
            }

            return score;
        }

        private async Task<int> GetBishopPositionScore(Piece bishop)
        {
            int score = 0;

            // Oceny dla gońców w różnych pozycjach planszy
            // Preferencje dla otwartych diagonalnych linii
            int[,] bishopPositionScores = {
        {
          -5, -5, -5, -5, -5, -5, -5, -5
        },
        {
          -5,
          0,
          0,
          0,
          0,
          0,
          0,
          -5
        },
        {
          -5,
          0,
          5,
          5,
          5,
          5,
          0,
          -5
        },
        {
          -5,
          0,
          5,
          10,
          10,
          5,
          0,
          -5
        },
        {
          -5,
          0,
          5,
          10,
          10,
          5,
          0,
          -5
        },
        {
          -5,
          0,
          5,
          5,
          5,
          5,
          0,
          -5
        },
        {
          -5,
          0,
          0,
          0,
          0,
          0,
          0,
          -5
        },
        {
          -5,
          -5,
          -5,
          -5,
          -5,
          -5,
          -5,
          -5
        }
      };

            // Przydzielanie oceny na podstawie pozycji planszy
            int x = bishop.Position.X;
            int y = bishop.Position.Y;
            if (bishop.IsBlack)
            {
                // Dla czarnej figury używamy ocen z odwróconymi znakami
                score -= bishopPositionScores[x, y];
            }
            else
            {
                // Dla białej figury używamy ocen bez zmiany
                score += bishopPositionScores[x, y];
            }

            return score;
        }

        private async Task<int> GetRookPositionScore(Piece rook)
        {
            int score = 0;

            // Oceny dla wież w różnych pozycjach planszy
            // Preferencje dla pionowych i poziomych linii
            if (!rook.IsBlack)
            {
                int[,] rookPositionScores = {
          {
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          },
          {
            5,
            10,
            10,
            10,
            10,
            10,
            10,
            5
          },
          {
            -5,
            0,
            0,
            0,
            0,
            0,
            0,
            -5
          },
          {
            -5,
            0,
            0,
            0,
            0,
            0,
            0,
            -5
          },
          {
            -5,
            0,
            0,
            0,
            0,
            0,
            0,
            -5
          },
          {
            -5,
            0,
            0,
            0,
            0,
            0,
            0,
            -5
          },
          {
            -5,
            0,
            0,
            0,
            0,
            0,
            0,
            -5
          },
          {
            0,
            0,
            0,
            5,
            5,
            0,
            0,
            0
          }
        };
                // Przydzielanie oceny na podstawie pozycji planszy
                int x = rook.Position.X;
                int y = rook.Position.Y;
                score += rookPositionScores[x, y];
            }
            else
            {
                int[,] rookPositionScores = {
          {
            0,
            0,
            0,
            5,
            5,
            0,
            0,
            0
          },
          {
            -5,
            0,
            0,
            0,
            0,
            0,
            0,
            -5
          },
          {
            -5,
            0,
            0,
            0,
            0,
            0,
            0,
            -5
          },
          {
            -5,
            0,
            0,
            0,
            0,
            0,
            0,
            -5
          },
          {
            -5,
            0,
            0,
            0,
            0,
            0,
            0,
            -5
          },
          {
            -5,
            0,
            0,
            0,
            0,
            0,
            0,
            -5
          },
          {
            5,
            10,
            10,
            10,
            10,
            10,
            10,
            5
          },
          {
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          }
        };
                // Przydzielanie oceny na podstawie pozycji planszy
                int x = rook.Position.X;
                int y = rook.Position.Y;
                score -= rookPositionScores[x, y];
            }

            return score;
        }

        private async Task<int> GetQueenPositionScore(Piece queen)
        {
            int score = 0;

            // Oceny dla królowej w różnych pozycjach planszy
            // Preferencje dla centralnych pozycji

            int[,] queenPositionScores = {
        {
          -20, -10, -10, -5, -5, -10, -10, -20
        },
        {
          -10,
          0,
          0,
          0,
          0,
          0,
          0,
          -10
        },
        {
          -10,
          0,
          5,
          5,
          5,
          5,
          0,
          -10
        },
        {
          -5,
          0,
          5,
          5,
          5,
          5,
          0,
          -5
        },
        {
          -5,
          0,
          5,
          5,
          5,
          5,
          0,
          -5
        },
        {
          -10,
          5,
          5,
          5,
          5,
          5,
          0,
          -10
        },
        {
          -10,
          0,
          5,
          0,
          0,
          0,
          0,
          -10
        },
        {
          -20,
          -10,
          -10,
          -5,
          -5,
          -10,
          -10,
          -20
        }
      };
            // Przydzielanie oceny na podstawie pozycji planszy
            int x = queen.Position.X;
            int y = queen.Position.Y;
            if (queen.IsBlack)
            {
                // Dla czarnej figury używamy ocen z odwróconymi znakami
                score -= queenPositionScores[x, y];
            }
            else
            {
                // Dla białej figury używamy ocen bez zmiany
                score += queenPositionScores[x, y];
            }

            return score;
        }

        private async Task<int> GetKingPositionScore(Piece king)
        {
            int score = 0;

            // Oceny dla króla w różnych pozycjach planszy
            // Preferencje dla bezpiecznych pozycji i roszad
            int[,] kingPositionScores = {
        {
          20,
          30,
          10,
          0,
          0,
          10,
          30,
          20
        },
        {
          20,
          20,
          0,
          0,
          0,
          0,
          20,
          20
        },
        {
          -10,
          -20,
          -20,
          -20,
          -20,
          -20,
          -20,
          -10
        },
        {
          -20,
          -30,
          -30,
          -40,
          -40,
          -30,
          -30,
          -20
        },
        {
          -20,
          -30,
          -30,
          -40,
          -40,
          -30,
          -30,
          -20
        },
        {
          -10,
          -20,
          -20,
          -20,
          -20,
          -20,
          -20,
          -10
        },
        {
          20,
          20,
          0,
          0,
          0,
          0,
          20,
          20
        },
        {
          20,
          30,
          10,
          0,
          0,
          10,
          30,
          20
        }
      };

            // Przydzielanie oceny na podstawie pozycji planszy
            int x = king.Position.X;
            int y = king.Position.Y;
            if (king.IsBlack)
            {
                // Dla czarnej figury używamy ocen z odwróconymi znakami
                score -= kingPositionScores[x, y];
            }
            else
            {
                // Dla białej figury używamy ocen bez zmiany
                score += kingPositionScores[x, y];
            }

            return score;
        }

        public async Task<int> MinMax(int depth, bool maximizingPlayer, Game game)
        {
            if (depth == 0 || game.State.Info.IsCheckMate)
            {
                return await EvaluatePosition(game);
            }

            if (maximizingPlayer)
            {
                int maxEval = int.MinValue;
                foreach (var test in game.State.Pieces.ToList())
                {

                    foreach (var test2 in game.State.ValidPositions(test).ToList())
                    {
                        Game clonedGame = new Game(game);
                        if (clonedGame.State.Info.IsCheck)
                        {
                            clonedGame.Move(test, test2.X, test2.Y);
                            if (!clonedGame.State.Info.IsCheck)
                            {
                                int eval = await MinMax(depth - 1, false, clonedGame);
                                maxEval = Math.Max(maxEval, eval);
                            }
                        }
                        else
                        {
                            var clonedPiece = clonedGame.State.Pieces.ToList().Find(x => x == test);
                            clonedGame.Move(test, test2.X, test2.Y);
                            if (clonedPiece.Position.Equals(test2))
                            {
                                int eval = await MinMax(depth - 1, false, clonedGame);
                                maxEval = Math.Max(maxEval, eval);
                            }
                        }
                    };

                }
                return maxEval;
            }
            else
            {
                int minEval = int.MaxValue;

                foreach (var test in game.State.Pieces.ToList())
                {

                    foreach (var test2 in game.State.ValidPositions(test).ToList())
                    {
                        Game clonedGame = new Game(game);
                        if (clonedGame.State.Info.IsCheck)
                        {
                            clonedGame.Move(test, test2.X, test2.Y);
                            if (!clonedGame.State.Info.IsCheck)
                            {
                                int eval = await MinMax(depth - 1, true, clonedGame);
                                minEval = Math.Min(minEval, eval);
                            }
                        }
                        else
                        {
                            var clonedPiece = clonedGame.State.Pieces.ToList().Find(x => x == test);
                            clonedGame.Move(test, test2.X, test2.Y);
                            if (clonedPiece.Position.Equals(test2))
                            {
                                if (!clonedGame.State.Info.IsCheck)
                                {
                                    int eval = await MinMax(depth - 1, true, clonedGame);
                                    minEval = Math.Min(minEval, eval);
                                }
                            }

                        }
                    };

                }
                return minEval;
            }
        }

        public async Task<string> FindBestMove(int depth, Game game)
        {
            string bestMove = null;
            string move;

            if (!game.State.Info.BlackToMove)
            {
                int maxEval = int.MinValue;

                foreach (var test in game.State.Pieces.ToList())
                {
                    foreach (var test2 in game.State.ValidPositions(test).ToList())
                    {
                        Game clonedGame = new Game(game);
                        if (clonedGame.State.Info.IsCheck)
                        {
                            clonedGame.Move(test, test2.X, test2.Y);
                            if (!clonedGame.State.Info.IsCheck)
                            {
                                move = clonedGame.State.CurrentMove.PgnMove;
                                int eval = await MinMax(depth - 1, false, clonedGame);
                                if (eval > maxEval)
                                {
                                    maxEval = eval;
                                    bestMove = move;
                                }
                            }
                        }
                        else
                        {
                            var clonedPiece = clonedGame.State.Pieces.ToList().Find(x => x == test);
                            clonedGame.Move(test, test2.X, test2.Y);
                            if (clonedPiece.Position.Equals(test2))
                            {
                                if (!clonedGame.State.Info.IsCheck)
                                {
                                    move = clonedGame.State.CurrentMove.PgnMove;
                                    int eval = await MinMax(depth - 1, false, clonedGame);
                                    if (eval > maxEval)
                                    {
                                        maxEval = eval;
                                        bestMove = move;
                                    }
                                }
                            }
                        }
                    };
                }
            }
            else
            {
                int maxEval = int.MaxValue;

                foreach (var test in game.State.Pieces.ToList())
                {
                    foreach (var test2 in game.State.ValidPositions(test).ToList())
                    {
                        Game clonedGame = new Game(game);
                        if (clonedGame.State.Info.IsCheck)
                        {
                            clonedGame.Move(test, test2.X, test2.Y);
                            if (!clonedGame.State.Info.IsCheck)
                            {
                                move = clonedGame.State.CurrentMove.PgnMove;
                                int eval = await MinMax(depth - 1, true, clonedGame);
                                if (eval < maxEval)
                                {
                                    maxEval = eval;
                                    bestMove = move;
                                }
                            }
                        }
                        else
                        {
                            var clonedPiece = clonedGame.State.Pieces.ToList().Find(x => x == test);
                            clonedGame.Move(test, test2.X, test2.Y);
                            if (clonedPiece.Position.Equals(test2))
                            {
                                if (!clonedGame.State.Info.IsCheck)
                                {
                                    move = clonedGame.State.CurrentMove.PgnMove;
                                    int eval = await MinMax(depth - 1, true, clonedGame);
                                    if (eval < maxEval)
                                    {
                                        maxEval = eval;
                                        bestMove = move;
                                    }
                                }
                            }
                        }
                    };
                }
            }
            return bestMove;
        }
        public async Task<string> GetBestMove(string pgn, string level)
        {
            Game game = new Game();
            if (pgn != null)
            {
                game = Pgn.MapString(pgn);
            }
            int depth = 0;
            if (level == "One")
            {
                depth = 1;
            }
            else if (level == "Two")
            {
                depth = 2;
            }

            return await FindBestMove(depth, game);
        }

        public async Task<string> GetRandomMove(string pgn)
        {
            Game game = new Game();
            if (pgn != null)
            {
                game = Pgn.MapString(pgn);
            }
            List<string> listOfAvailableMoves = new List<string>();

            foreach (var test in game.State.Pieces.ToList())
            {

                foreach (var test2 in game.State.ValidPositions(test).ToList())
                {
                    Game clonedGame = new Game(game);
                    if (clonedGame.State.Info.IsCheck)
                    {
                        clonedGame.Move(test, test2.X, test2.Y);
                        if (!clonedGame.State.Info.IsCheck)
                        {
                            listOfAvailableMoves.Add(clonedGame.State.CurrentMove.PgnMove);
                        }
                    }
                    else
                    {
                        var clonedPiece = clonedGame.State.Pieces.ToList().Find(x => x == test);
                        clonedGame.Move(test, test2.X, test2.Y);
                        if (clonedPiece.Position.Equals(test2))
                        {
                            if (!clonedGame.State.Info.IsCheck)
                            {
                                listOfAvailableMoves.Add(clonedGame.State.CurrentMove.PgnMove);
                            }
                        }
                    }
                };

            }
            Random random = new Random();
            return listOfAvailableMoves.ElementAt(random.Next(listOfAvailableMoves.Count));
        }
    }
}