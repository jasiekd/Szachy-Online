using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace szachy_online.Api.Entities
{
    public class GameEntity
    {
        [Key]
        public Guid GameID { get; set; }
        [Required]
        public Guid WhitePlayer { get; set; }
        [Required]
        public Guid BlackPlayer { get; set; }
        public string? Winner { get; set; }
        public string? PGN { get; set; }
        [Required]
        public DateTime DateStarted { get; set; }= DateTime.Now;

    }
}
