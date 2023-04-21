using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace szachy_online.Api.Entities
{
    public class UserEntity: BaseDbItem
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string Surname { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(50)]
        public string Login { get; set; }

        [Required]
        [StringLength(50)]
        public string Password { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.Now;
    }
}
