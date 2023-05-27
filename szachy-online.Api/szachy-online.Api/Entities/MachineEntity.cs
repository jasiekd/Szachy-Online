using System.ComponentModel.DataAnnotations;

namespace szachy_online.Api.Entities
{
    public class MachineEntity: BaseDbItem
    {
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public string Nickname { get; set; }
        public string Level { get; set; }
    }
}
