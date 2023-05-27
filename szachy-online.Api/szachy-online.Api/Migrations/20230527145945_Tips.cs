using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace szachy_online.Api.Migrations
{
    /// <inheritdoc />
    public partial class Tips : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("37979414-d6ae-4746-8150-8f269b697a0e"));

            migrationBuilder.DeleteData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("d18840d1-9ca3-4fcd-aa78-5a21618521c1"));

            migrationBuilder.DeleteData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("da6a73a3-98f4-4cda-ac42-85126087c6a0"));

            migrationBuilder.CreateTable(
                name: "Tips",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tips", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Machines",
                columns: new[] { "Id", "DateCreated", "Level", "Nickname" },
                values: new object[,]
                {
                    { new Guid("2ace6dc4-7fea-46b3-90f4-1839341a86af"), new DateTime(2023, 5, 27, 16, 59, 45, 477, DateTimeKind.Local).AddTicks(6059), "Two", "Lora" },
                    { new Guid("3264ff97-928e-4eff-be63-69f21d204067"), new DateTime(2023, 5, 27, 16, 59, 45, 477, DateTimeKind.Local).AddTicks(6053), "One", "Stephan" },
                    { new Guid("958e78fb-5e6b-4822-9f04-8a4a19d15257"), new DateTime(2023, 5, 27, 16, 59, 45, 477, DateTimeKind.Local).AddTicks(6062), "Random", "Brandon" }
                });

            migrationBuilder.InsertData(
                table: "Tips",
                columns: new[] { "Id", "Description" },
                values: new object[,]
                {
                    { 1, "Zachowaj równowagę między atakiem a obroną: Wskazówka ta sugeruje, że ważne jest, aby skupić się zarówno na atakowaniu figury przeciwnika, jak i na ochronie swoich własnych. Unikaj zbytniego poświęcania swoich sił na atak, kosztem osłabienia swojej pozycji." },
                    { 2, "Pamiętaj o wartości figur: W tej wskazówce wartości figur są ustalone tak, że pion jest wart 1 punkt, skoczek i goniec - 3 punkty, wieża - 5 punktów, a hetman - 9 punktów. Utrzymuj świadomość względnych wartości figur i staraj się nie tracić na zbędnych wymianach." },
                    { 3, "Planuj z góry: Zawsze warto mieć jasny plan i strategię, zanim zaczniesz podejmować konkretne posunięcia. Staraj się przewidzieć reakcje przeciwnika i opracuj odpowiednie plany, aby zwiększyć swoje szanse na sukces." },
                    { 4, "Utrzymuj kontrolę nad centrum: Centrum planszy jest strategicznie ważne w szachach. Postaraj się kontrolować pola centralne swoimi pionami i figurami, co pozwoli ci na większą swobodę ruchów i łatwiejsze przeprowadzenie ataku." },
                    { 5, "Zawsze sprawdzaj możliwe zagrożenia: Przed wykonaniem ruchu zawsze sprawdź, czy nie narażasz swojego króla na szach lub czy nie zostajesz zmuszony do utraty materiału. Bądź czujny i staraj się przewidzieć potencjalne zagrożenia." },
                    { 6, "Praktykuj taktykę szachową: Skup się na doskonaleniu umiejętności taktycznych, takich jak kombinacje, motywy szachowe i pułapki. Regularne rozwiązywanie zadań taktycznych pomoże w rozwoju twojego spostrzegawczości i umiejętności znajdowania najlepszych ruchów." },
                    { 7, "Baw się i ucz się od swoich partii: Nie zapomnij czerpać radości z gry w szachy! Po zakończeniu partii analizuj swoje posunięcia, poszukuj błędów i próbuj wyciągać wnioski. Każda partia jest szansą do nauki i rozwoju jako szachista." }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tips");

            migrationBuilder.DeleteData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("2ace6dc4-7fea-46b3-90f4-1839341a86af"));

            migrationBuilder.DeleteData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("3264ff97-928e-4eff-be63-69f21d204067"));

            migrationBuilder.DeleteData(
                table: "Machines",
                keyColumn: "Id",
                keyValue: new Guid("958e78fb-5e6b-4822-9f04-8a4a19d15257"));

            migrationBuilder.InsertData(
                table: "Machines",
                columns: new[] { "Id", "DateCreated", "Level", "Nickname" },
                values: new object[,]
                {
                    { new Guid("37979414-d6ae-4746-8150-8f269b697a0e"), new DateTime(2023, 5, 27, 16, 31, 26, 928, DateTimeKind.Local).AddTicks(9966), "Random", "Brandon" },
                    { new Guid("d18840d1-9ca3-4fcd-aa78-5a21618521c1"), new DateTime(2023, 5, 27, 16, 31, 26, 928, DateTimeKind.Local).AddTicks(9957), "One", "Stephan" },
                    { new Guid("da6a73a3-98f4-4cda-ac42-85126087c6a0"), new DateTime(2023, 5, 27, 16, 31, 26, 928, DateTimeKind.Local).AddTicks(9962), "Two", "Lora" }
                });
        }
    }
}
