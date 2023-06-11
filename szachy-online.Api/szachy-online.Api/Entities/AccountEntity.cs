using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace szachy_online.Api.Entities
{
    public class AccountEntity: BaseDbItem
    {
        [StringLength(50)]
        public string? Name { get; set; }

        [StringLength(50)]
        public string? Surname { get; set; }

        [StringLength(100)]
        public string? Email { get; set; }

        [StringLength(50)]
        public string? Login { get; set; }

        [StringLength(50)]
        public string? Password { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.Now;
        public string? Nickname { get; set; }
    }
}
