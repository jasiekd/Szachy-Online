using Microsoft.EntityFrameworkCore;
using System.Globalization;
using szachy_online.Api.Entities;


namespace szachy_online.Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<AccountEntity> Accounts { get; set; }
        public DbSet<FriendsEntity> Friends { get; set; }
        public DbSet<GameEntity> Games { get; set; }
        public DbSet<MachineEntity> Machines { get; set; }
        public DbSet<OpeningEntity> Openings { get; set; }
        public DbSet<TipEntity> Tips { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FriendsEntity>()
                .HasOne(f => f.User1)
                .WithMany()
                .HasForeignKey(f => f.User1ID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<FriendsEntity>()
                .HasOne(f => f.User2)
                .WithMany()
                .HasForeignKey(f => f.User2ID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<GameEntity>()
                .HasOne(f => f.BlackPlayer)
                .WithMany()
                .HasForeignKey(f => f.BlackPlayerID)
                .OnDelete(DeleteBehavior.NoAction);
            
            modelBuilder.Entity<GameEntity>()
                .HasOne(f => f.WhitePlayer)
                .WithMany()
                .HasForeignKey(f => f.WhitePlayerID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<AccountEntity>().HasData(
                new AccountEntity
                {
                    Id = Guid.Parse("3264FF97-928E-4EFF-BE63-69F21D204067"),
                    Nickname = "Stephan",
                    DateCreated = DateTime.Now,

                },
                new AccountEntity
                {
                    Id = Guid.Parse("2ACE6DC4-7FEA-46B3-90F4-1839341A86AF"),
                    Nickname = "Lora",
                    DateCreated = DateTime.Now,

                },
                new AccountEntity
                {
                    Id = Guid.Parse("958E78FB-5E6B-4822-9F04-8A4A19D15257"),
                    Nickname = "Brandon",
                    DateCreated = DateTime.Now,
                }
                );
            modelBuilder.Entity<MachineEntity>().HasData(
                new MachineEntity
                {
                    Id = Guid.Parse("3264FF97-928E-4EFF-BE63-69F21D204067"),
                    Nickname = "Stephan",
                    DateCreated = DateTime.Now,
                    Level = "One",
                },
                new MachineEntity
                {
                    Id = Guid.Parse("2ACE6DC4-7FEA-46B3-90F4-1839341A86AF"),
                    Nickname = "Lora",
                    DateCreated = DateTime.Now,
                    Level = "Two",
                },
                new MachineEntity
                {
                    Id = Guid.Parse("958E78FB-5E6B-4822-9F04-8A4A19D15257"),
                    Nickname = "Brandon",
                    DateCreated = DateTime.Now,
                    Level = "Random",
                }
                );
            modelBuilder.Entity<OpeningEntity>().HasData(
                new OpeningEntity
                {
                    Id = 1,
                    Name = "Obrona Sycylijska - Wariant smoczy",
                    Description = "Otwarcie szachowe rozpoczynające się posunięciami:\r\n\r\ne4 c5\r\nDebiut ten jest najpopularniejszą i dającą najlepsze efekty odpowiedzią na pierwszy ruch białych 1. e4. Statystycznie skuteczniejszym otwarciem dla białych jest 1. d4, gdyż obrona (sycylijska) przed 1. e4 ma wysoki wskaźnik skuteczności. W czasopiśmie „New in Chess” (w roczniku wydanym w roku 2000) podano, że w grach z jego bazy danych białe wygrały 56,1% partii (z 296 200), zaczynając od 1. d4, a przy rozpoczęciu od 1. e4 było to 54,1% partii (z 349 855), głównie dzięki obronie sycylijskiej (52,3% wygranych przez białe ze 145 996 rozgrywek).",
                    PGN = "1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6",
                },
                new OpeningEntity
                {
                    Id = 2,
                    Name = "Obrona Skandynawska - Wariant Miesesa",
                    Description = "Otwarcie szachowe charakteryzujące się posunięciami:\r\n\r\n1.e4 d5\r\\r\nJest to debiut półotwarty. W klasyfikacji encyklopedii otwarć szachowych jest oznaczony kodem ECO B01.\r\n\r\nObronę skandynawską zastosowano w najstarszej znanej partii szachów europejskich, rozegranej około 1475 r. w Walencji. W 1497 r. jej opis znalazł się w książce Luisa Luceny. W XIX wieku analizował ją Carl Jänisch. Dużą popularność zyskała na przełomie XIX i XX wieku. Swoją nazwę zawdzięcza pracom szwedzkich szachistów Ludwiga i Gustafa Collijnów. W 1918 roku monografię otwarcia opublikował Jacques Mieses, który często stosował ten debiut w turniejach i znacząco przyczynił się do rozwoju jego teorii.\r\n\r\nW późniejszych latach obrona skandynawska była rzadko stosowana przez czołowych szachistów świata. W 1979 r. w Montrealu Bent Larsen skutecznie zastosował ten debiut w wygranej partii z mistrzem świata, Anatolijem Karpowem[1] (była to jedyna porażka Karpowa w tym turnieju)[2]. W 1995 r. obrona skandynawska pojawiła się w meczu o mistrzostwa świata. Viswanathan Anand uzyskał po debiucie dobrą pozycję przeciwko Garriemu Kasparowowi, jednak partię przegrał[3].",
                    PGN = "1.e4 d5 2.ed5 Qxd5 3.Sc3 Qa5 4.d4 Nf6 5.Nf3 Bf5"
                },
                new OpeningEntity
                {
                    Id = 3,
                    Name = "Obrona Polska",
                    Description = "Otwarcie szachowe oznaczone kodem A40 ECO rzadko stosowane debiut zamknięty, wprowadzone do praktyki turniejowej przez Aleksandra Wagnera w roku 1913 i charakteryzujące się posunięciami:\r\n\r\n1.d4 b5\r\nIdea tego otwarcia polega na:\r\n\r\nrozwinięciu hetmańskiego gońca czarnych na pole b7, skąd, wzdłuż przekątnej a8-h1 oddziałuje on na skrzydło królewskie białych, a przede wszystkim kontroluje ważny punkt e4.\r\ndzięki obecności piona na polu b5 czarne mogą walczyć o przewagę przestrzeni na skrzydle hetmańskim.\r\nobrana przez czarne strategia nie narzuca zwykle forsownych rozwiązań w początkowej fazie gry, ewentualna erudycja przeciwnika traci na znaczeniu.",
                    PGN = "1.d4 b5 2.e4 Bb7 3.Bd3 Nf6"
                }
                );

            modelBuilder.Entity<TipEntity>().HasData(
                new TipEntity
                {
                    Id = 1,
                    Description = "Zachowaj równowagę między atakiem a obroną: Wskazówka ta sugeruje, że ważne jest, aby skupić się zarówno na atakowaniu figury przeciwnika, jak i na ochronie swoich własnych. Unikaj zbytniego poświęcania swoich sił na atak, kosztem osłabienia swojej pozycji.",
                },
                new TipEntity
                {
                    Id = 2,
                    Description = "Pamiętaj o wartości figur: W tej wskazówce wartości figur są ustalone tak, że pion jest wart 1 punkt, skoczek i goniec - 3 punkty, wieża - 5 punktów, a hetman - 9 punktów. Utrzymuj świadomość względnych wartości figur i staraj się nie tracić na zbędnych wymianach.",
                },
                new TipEntity
                {
                    Id = 3,
                    Description = "Planuj z góry: Zawsze warto mieć jasny plan i strategię, zanim zaczniesz podejmować konkretne posunięcia. Staraj się przewidzieć reakcje przeciwnika i opracuj odpowiednie plany, aby zwiększyć swoje szanse na sukces.",
                },
                new TipEntity
                {
                    Id = 4,
                    Description = "Utrzymuj kontrolę nad centrum: Centrum planszy jest strategicznie ważne w szachach. Postaraj się kontrolować pola centralne swoimi pionami i figurami, co pozwoli ci na większą swobodę ruchów i łatwiejsze przeprowadzenie ataku.",
                },
                new TipEntity
                {
                    Id = 5,
                    Description = "Zawsze sprawdzaj możliwe zagrożenia: Przed wykonaniem ruchu zawsze sprawdź, czy nie narażasz swojego króla na szach lub czy nie zostajesz zmuszony do utraty materiału. Bądź czujny i staraj się przewidzieć potencjalne zagrożenia.",
                },
                new TipEntity
                {
                    Id = 6,
                    Description = "Praktykuj taktykę szachową: Skup się na doskonaleniu umiejętności taktycznych, takich jak kombinacje, motywy szachowe i pułapki. Regularne rozwiązywanie zadań taktycznych pomoże w rozwoju twojego spostrzegawczości i umiejętności znajdowania najlepszych ruchów.",
                },
                new TipEntity
                {
                    Id = 7,
                    Description = "Baw się i ucz się od swoich partii: Nie zapomnij czerpać radości z gry w szachy! Po zakończeniu partii analizuj swoje posunięcia, poszukuj błędów i próbuj wyciągać wnioski. Każda partia jest szansą do nauki i rozwoju jako szachista.",
                });

        }
    }
}
