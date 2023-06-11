using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace szachy_online.Api.Migrations
{
    /// <inheritdoc />
    public partial class final : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Login = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Password = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Nickname = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                });

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

            migrationBuilder.CreateTable(
                name: "Friends",
                columns: table => new
                {
                    FriendshipID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    User1ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User2ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friends", x => x.FriendshipID);
                    table.ForeignKey(
                        name: "FK_Friends_Accounts_User1ID",
                        column: x => x.User1ID,
                        principalTable: "Accounts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Friends_Accounts_User2ID",
                        column: x => x.User2ID,
                        principalTable: "Accounts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    GameID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    WhitePlayerID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BlackPlayerID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Winner = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PGN = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateStarted = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.GameID);
                    table.ForeignKey(
                        name: "FK_Games_Accounts_BlackPlayerID",
                        column: x => x.BlackPlayerID,
                        principalTable: "Accounts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Games_Accounts_WhitePlayerID",
                        column: x => x.WhitePlayerID,
                        principalTable: "Accounts",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "DateCreated", "Email", "Login", "Name", "Nickname", "Password", "Surname" },
                values: new object[,]
                {
                    { new Guid("2ace6dc4-7fea-46b3-90f4-1839341a86af"), new DateTime(2023, 6, 11, 15, 36, 8, 221, DateTimeKind.Local).AddTicks(8476), null, null, null, "Lora", null, null },
                    { new Guid("3264ff97-928e-4eff-be63-69f21d204067"), new DateTime(2023, 6, 11, 15, 36, 8, 221, DateTimeKind.Local).AddTicks(8471), null, null, null, "Stephan", null, null },
                    { new Guid("958e78fb-5e6b-4822-9f04-8a4a19d15257"), new DateTime(2023, 6, 11, 15, 36, 8, 221, DateTimeKind.Local).AddTicks(8509), null, null, null, "Brandon", null, null }
                });

            migrationBuilder.InsertData(
                table: "Machines",
                columns: new[] { "Id", "DateCreated", "Level", "Nickname" },
                values: new object[,]
                {
                    { new Guid("2ace6dc4-7fea-46b3-90f4-1839341a86af"), new DateTime(2023, 6, 11, 15, 36, 8, 221, DateTimeKind.Local).AddTicks(8654), "Two", "Lora" },
                    { new Guid("3264ff97-928e-4eff-be63-69f21d204067"), new DateTime(2023, 6, 11, 15, 36, 8, 221, DateTimeKind.Local).AddTicks(8651), "One", "Stephan" },
                    { new Guid("958e78fb-5e6b-4822-9f04-8a4a19d15257"), new DateTime(2023, 6, 11, 15, 36, 8, 221, DateTimeKind.Local).AddTicks(8657), "Random", "Brandon" }
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

            migrationBuilder.CreateIndex(
                name: "IX_Friends_User1ID",
                table: "Friends",
                column: "User1ID");

            migrationBuilder.CreateIndex(
                name: "IX_Friends_User2ID",
                table: "Friends",
                column: "User2ID");

            migrationBuilder.CreateIndex(
                name: "IX_Games_BlackPlayerID",
                table: "Games",
                column: "BlackPlayerID");

            migrationBuilder.CreateIndex(
                name: "IX_Games_WhitePlayerID",
                table: "Games",
                column: "WhitePlayerID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Friends");

            migrationBuilder.DropTable(
                name: "Games");

            migrationBuilder.DropTable(
                name: "Machines");

            migrationBuilder.DropTable(
                name: "Openings");

            migrationBuilder.DropTable(
                name: "Tips");

            migrationBuilder.DropTable(
                name: "Accounts");
        }
    }
}
