using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace szachy_online.Api.Migrations
{
    /// <inheritdoc />
    public partial class Machines_And_Openings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Machines",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Nickname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Level = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Machines", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Openings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PGN = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Openings", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Machines",
                columns: new[] { "Id", "DateCreated", "Level", "Nickname" },
                values: new object[,]
                {
                    { new Guid("37979414-d6ae-4746-8150-8f269b697a0e"), new DateTime(2023, 5, 27, 16, 31, 26, 928, DateTimeKind.Local).AddTicks(9966), "Random", "Brandon" },
                    { new Guid("d18840d1-9ca3-4fcd-aa78-5a21618521c1"), new DateTime(2023, 5, 27, 16, 31, 26, 928, DateTimeKind.Local).AddTicks(9957), "One", "Stephan" },
                    { new Guid("da6a73a3-98f4-4cda-ac42-85126087c6a0"), new DateTime(2023, 5, 27, 16, 31, 26, 928, DateTimeKind.Local).AddTicks(9962), "Two", "Lora" }
                });

            migrationBuilder.InsertData(
                table: "Openings",
                columns: new[] { "Id", "Description", "Name", "PGN" },
                values: new object[,]
                {
                    { 1, "Otwarcie szachowe rozpoczynające się posunięciami:\r\n\r\ne4 c5\r\nDebiut ten jest najpopularniejszą i dającą najlepsze efekty odpowiedzią na pierwszy ruch białych 1. e4. Statystycznie skuteczniejszym otwarciem dla białych jest 1. d4, gdyż obrona (sycylijska) przed 1. e4 ma wysoki wskaźnik skuteczności. W czasopiśmie „New in Chess” (w roczniku wydanym w roku 2000) podano, że w grach z jego bazy danych białe wygrały 56,1% partii (z 296 200), zaczynając od 1. d4, a przy rozpoczęciu od 1. e4 było to 54,1% partii (z 349 855), głównie dzięki obronie sycylijskiej (52,3% wygranych przez białe ze 145 996 rozgrywek).", "Obrona Sycylijska - Wariant smoczy", "1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6" },
                    { 2, "Otwarcie szachowe charakteryzujące się posunięciami:\r\n\r\n1.e4 d5\r\\r\nJest to debiut półotwarty. W klasyfikacji encyklopedii otwarć szachowych jest oznaczony kodem ECO B01.\r\n\r\nObronę skandynawską zastosowano w najstarszej znanej partii szachów europejskich, rozegranej około 1475 r. w Walencji. W 1497 r. jej opis znalazł się w książce Luisa Luceny. W XIX wieku analizował ją Carl Jänisch. Dużą popularność zyskała na przełomie XIX i XX wieku. Swoją nazwę zawdzięcza pracom szwedzkich szachistów Ludwiga i Gustafa Collijnów. W 1918 roku monografię otwarcia opublikował Jacques Mieses, który często stosował ten debiut w turniejach i znacząco przyczynił się do rozwoju jego teorii.\r\n\r\nW późniejszych latach obrona skandynawska była rzadko stosowana przez czołowych szachistów świata. W 1979 r. w Montrealu Bent Larsen skutecznie zastosował ten debiut w wygranej partii z mistrzem świata, Anatolijem Karpowem[1] (była to jedyna porażka Karpowa w tym turnieju)[2]. W 1995 r. obrona skandynawska pojawiła się w meczu o mistrzostwa świata. Viswanathan Anand uzyskał po debiucie dobrą pozycję przeciwko Garriemu Kasparowowi, jednak partię przegrał[3].", "Obrona Skandynawska - Wariant Miesesa", "1.e4 d5 2.ed5 Qxd5 3.Sc3 Qa5 4.d4 Nf6 5.Nf3 Bf5" },
                    { 3, "Otwarcie szachowe oznaczone kodem A40 ECO rzadko stosowane debiut zamknięty, wprowadzone do praktyki turniejowej przez Aleksandra Wagnera w roku 1913 i charakteryzujące się posunięciami:\r\n\r\n1.d4 b5\r\nIdea tego otwarcia polega na:\r\n\r\nrozwinięciu hetmańskiego gońca czarnych na pole b7, skąd, wzdłuż przekątnej a8-h1 oddziałuje on na skrzydło królewskie białych, a przede wszystkim kontroluje ważny punkt e4.\r\ndzięki obecności piona na polu b5 czarne mogą walczyć o przewagę przestrzeni na skrzydle hetmańskim.\r\nobrana przez czarne strategia nie narzuca zwykle forsownych rozwiązań w początkowej fazie gry, ewentualna erudycja przeciwnika traci na znaczeniu.", "Obrona Polska", "1.d4 b5 2.e4 Bb7 3.Bd3 Nf6" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Machines");

            migrationBuilder.DropTable(
                name: "Openings");
        }
    }
}
