using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace szachy_online.Api.Migrations
{
    /// <inheritdoc />
    public partial class gamesFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "MachineID",
                table: "Games",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.UpdateData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("2ace6dc4-7fea-46b3-90f4-1839341a86af"),
                column: "DateCreated",
                value: new DateTime(2023, 6, 11, 15, 14, 52, 213, DateTimeKind.Local).AddTicks(6368));

            migrationBuilder.UpdateData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("3264ff97-928e-4eff-be63-69f21d204067"),
                column: "DateCreated",
                value: new DateTime(2023, 6, 11, 15, 14, 52, 213, DateTimeKind.Local).AddTicks(6360));

            migrationBuilder.UpdateData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("958e78fb-5e6b-4822-9f04-8a4a19d15257"),
                column: "DateCreated",
                value: new DateTime(2023, 6, 11, 15, 14, 52, 213, DateTimeKind.Local).AddTicks(6373));

            migrationBuilder.CreateIndex(
                name: "IX_Games_MachineID",
                table: "Games",
                column: "MachineID");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Machines_MachineID",
                table: "Games",
                column: "MachineID",
                principalTable: "Machines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Machines_MachineID",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_MachineID",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "MachineID",
                table: "Games");

            migrationBuilder.UpdateData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("2ace6dc4-7fea-46b3-90f4-1839341a86af"),
                column: "DateCreated",
                value: new DateTime(2023, 6, 10, 15, 48, 51, 393, DateTimeKind.Local).AddTicks(1565));

            migrationBuilder.UpdateData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("3264ff97-928e-4eff-be63-69f21d204067"),
                column: "DateCreated",
                value: new DateTime(2023, 6, 10, 15, 48, 51, 393, DateTimeKind.Local).AddTicks(1560));

            migrationBuilder.UpdateData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("958e78fb-5e6b-4822-9f04-8a4a19d15257"),
                column: "DateCreated",
                value: new DateTime(2023, 6, 10, 15, 48, 51, 393, DateTimeKind.Local).AddTicks(1568));
        }
    }
}
