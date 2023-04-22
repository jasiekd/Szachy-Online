using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace szachy_online.Api.Entities
{
    public abstract class BaseDbItem
    {
        [Key]
        public Guid Id { get; set; }
    }
}
