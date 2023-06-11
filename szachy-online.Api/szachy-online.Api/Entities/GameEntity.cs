using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace szachy_online.Api.Entities
{
    public class GameEntity
    {
        [Key]
        public Guid GameID { get; set; }
        public Guid WhitePlayerID { get; set; }
        public virtual AccountEntity? WhitePlayer { get; set; }
        public Guid BlackPlayerID { get; set; }
        public virtual AccountEntity? BlackPlayer { get; set; }
        public string? Winner { get; set; }
        public string? PGN { get; set; }
        [Required]
        public DateTime DateStarted { get; set; }= DateTime.Now;

    }
}
