using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace szachy_online.Api.Migrations
{
    /// <inheritdoc />
    public partial class friends : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Friends",
                columns: table => new
                {
                    FriendshipID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    User1ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User2ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friends", x => x.FriendshipID);
                    table.ForeignKey(
                        name: "FK_Friends_Accounts_User1ID",
                        column: x => x.User1ID,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Friends_Accounts_User2ID",
                        column: x => x.User2ID,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Friends_User1ID",
                table: "Friends",
                column: "User1ID");

            migrationBuilder.CreateIndex(
                name: "IX_Friends_User2ID",
                table: "Friends",
                column: "User2ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Friends");
        }
    }
}
