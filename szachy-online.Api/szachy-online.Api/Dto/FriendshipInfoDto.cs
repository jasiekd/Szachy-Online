using MessagePack;

namespace szachy_online.Api.Dto
{
    public class FriendshipInfoDto
    {
        
        public long FriendshipId { get; set; }
        public Guid UserId1 { get; set; }
        public string User1Name { get; set; }
        public string User1Surname { get; set; }
        public string User1Nickname { get; set; }
        public Guid UserId2 { get; set; }
        public string User2Name { get; set; }
        public string User2Surname { get; set; }
        public string User2Nickname { get; set; }
        public DateTime DateModified { get; set; }
    }
}
