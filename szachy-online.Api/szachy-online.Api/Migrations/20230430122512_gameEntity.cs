using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace szachy_online.Api.Migrations
{
    /// <inheritdoc />
    public partial class gameEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    GameID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    WhitePlayer = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BlackPlayer = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Winner = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PGN = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateStarted = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.GameID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Games");
        }
    }
}
