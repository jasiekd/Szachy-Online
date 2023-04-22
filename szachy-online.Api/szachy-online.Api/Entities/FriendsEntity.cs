using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace szachy_online.Api.Entities
{
    public enum StatusFriendship
    {
        Pending,
        Accept
    }
    public class FriendsEntity
    {
        [Key]
        public long FriendshipID { get; set; }

        [ForeignKey("User1")]
        public Guid User1ID { get; set; }
        public virtual AccountEntity User1 { get; set; }

        [ForeignKey("User2")]
        public Guid User2ID { get; set; }
        public virtual AccountEntity User2 { get; set; }
        public string Status { get; set; } = StatusFriendship.Pending.ToString();
    }
}
