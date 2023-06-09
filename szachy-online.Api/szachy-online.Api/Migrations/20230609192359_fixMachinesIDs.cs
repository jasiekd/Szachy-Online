using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace szachy_online.Api.Migrations
{
    /// <inheritdoc />
    public partial class fixMachinesIDs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BlackId",
                table: "Games",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WhiteId",
                table: "Games",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("2ace6dc4-7fea-46b3-90f4-1839341a86af"),
                column: "DateCreated",
                value: new DateTime(2023, 6, 9, 21, 23, 59, 614, DateTimeKind.Local).AddTicks(6989));

            migrationBuilder.UpdateData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("3264ff97-928e-4eff-be63-69f21d204067"),
                column: "DateCreated",
                value: new DateTime(2023, 6, 9, 21, 23, 59, 614, DateTimeKind.Local).AddTicks(6984));

            migrationBuilder.UpdateData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("958e78fb-5e6b-4822-9f04-8a4a19d15257"),
                column: "DateCreated",
                value: new DateTime(2023, 6, 9, 21, 23, 59, 614, DateTimeKind.Local).AddTicks(6992));

            migrationBuilder.CreateIndex(
                name: "IX_Games_BlackId",
                table: "Games",
                column: "BlackId");

            migrationBuilder.CreateIndex(
                name: "IX_Games_WhiteId",
                table: "Games",
                column: "WhiteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Accounts_BlackId",
                table: "Games",
                column: "BlackId",
                principalTable: "Accounts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Accounts_WhiteId",
                table: "Games",
                column: "WhiteId",
                principalTable: "Accounts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Accounts_BlackId",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Games_Accounts_WhiteId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_BlackId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_WhiteId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "BlackId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "WhiteId",
                table: "Games");

            migrationBuilder.UpdateData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("2ace6dc4-7fea-46b3-90f4-1839341a86af"),
                column: "DateCreated",
                value: new DateTime(2023, 5, 27, 16, 59, 45, 477, DateTimeKind.Local).AddTicks(6059));

            migrationBuilder.UpdateData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("3264ff97-928e-4eff-be63-69f21d204067"),
                column: "DateCreated",
                value: new DateTime(2023, 5, 27, 16, 59, 45, 477, DateTimeKind.Local).AddTicks(6053));

            migrationBuilder.UpdateData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("958e78fb-5e6b-4822-9f04-8a4a19d15257"),
                column: "DateCreated",
                value: new DateTime(2023, 5, 27, 16, 59, 45, 477, DateTimeKind.Local).AddTicks(6062));
        }
    }
}
