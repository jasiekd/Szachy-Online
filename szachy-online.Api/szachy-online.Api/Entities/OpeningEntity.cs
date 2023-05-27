using System.ComponentModel.DataAnnotations;

namespace szachy_online.Api.Entities
{
    public class OpeningEntity 
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PGN { get; set; }

    }
}
