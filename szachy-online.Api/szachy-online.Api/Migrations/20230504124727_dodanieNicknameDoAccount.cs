using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace szachy_online.Api.Migrations
{
    /// <inheritdoc />
    public partial class dodanieNicknameDoAccount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Nickname",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nickname",
                table: "Accounts");
        }
    }
}
