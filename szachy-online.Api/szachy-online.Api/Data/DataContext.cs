using Microsoft.EntityFrameworkCore;
using szachy_online.Api.Entities;

namespace szachy_online.Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<AccountEntity> Accounts { get; set; }
    }
}
