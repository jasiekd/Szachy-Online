using Microsoft.EntityFrameworkCore;
using szachy_online.Api.Entities;
using szachy_online.Api.Migrations;

namespace szachy_online.Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<AccountEntity> Accounts { get; set; }
        public DbSet<FriendsEntity> Friends { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FriendsEntity>()
                .HasOne(f => f.User1)
                .WithMany()
                .HasForeignKey(f => f.User1ID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FriendsEntity>()
                .HasOne(f => f.User2)
                .WithMany()
                .HasForeignKey(f => f.User2ID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
