using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpenderBackBone.Data.Entities;
using SpenderBackBone.Data.Entities.Spends;
using SpenderBackBone.Data.Entities.Types;
using SpenderBackBone.Data.Entities.Users;

namespace SpenderBackBone.SpenderContext
{
	public class SpendContext : DbContext
	{
		public DbSet<User> Users { get; set; } = null!;

		public DbSet<SpendType> Types { get; set; } = null!;

		public DbSet<SpendSubType> SubTypes { get; set; } = null!;

		public DbSet<Spent> Spends { get; set; } = null!;

		public SpendContext()
		{
			//Database.EnsureDeleted();
			Database.EnsureCreated();
        }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			base.OnConfiguring(optionsBuilder);

			optionsBuilder.UseSqlServer(@"Server=.\SQLExpress;;Database=spendsV2;Trusted_Connection=Yes;");
		}

		//seed only
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			var user = new User() { Age = 21, Name = "Yuryi", SurName = "Grigorian", Id = 1, DefaultCurrency = Currency.Zloty, TelegramId = "@visioner" };
			modelBuilder.Entity<User>().HasData(user);

			var food = new SpendType() {Name = "food", Id = 1, Direction = Direction.Outcome };
            var transport = new SpendType() { Name = "transport", Id = 2, Direction = Direction.Outcome };
            var health = new SpendType() { Name = "health", Id = 3, Direction = Direction.Outcome };
            var debtReturn = new SpendType() { Name = "debt returns", Id = 4, Direction = Direction.Income };

            var types = new List<SpendType>()
            {
	            food,
	            transport,
	            health,
	            debtReturn
            };

            modelBuilder.Entity<SpendType>().HasData(types);

            var groceryST = new SpendSubType() { Name = "grocery", ParentTypeId = food.Id, Id = 1 };
            var pills = new SpendSubType() { Name = "pills", ParentTypeId = health.Id, Id = 2 };
            var stomatology = new SpendSubType() { Name = "stomatology", ParentTypeId = health.Id, Id = 3 };

            var sts = new List<SpendSubType>() { groceryST, pills, stomatology };

            modelBuilder.Entity<SpendSubType>().HasData(sts);

			var initialSpends = new List<Spent>()
			{
            new Spent() {
                Amount = 167.15M,
                UserId = user.Id,
                TypeId = food.Id,
                SubTypeId = groceryST.Id,
                Date = DateTime.Now.AddDays(-3),
                Id = 1,
                Currency = user.DefaultCurrency,
                Comment = "что-то борщим с вкусняшками",
                Direction = Direction.Outcome
             },
            new Spent() {
                Amount = 267.35M,
                UserId = user.Id,
                TypeId = food.Id,
                SubTypeId = groceryST.Id,
                Date = DateTime.Now.AddDays(-3),
                Id = 2,
                Currency = user.DefaultCurrency,
                Direction = Direction.Outcome
             },
             new Spent() {
                Amount = 12.30M,
                UserId = user.Id,
                TypeId = transport.Id,
                SubType = null,
                Date = DateTime.Now.AddDays(-1),
                Id = 3,
                Currency = user.DefaultCurrency,
                Direction = Direction.Outcome
             },
             new Spent() {
                Amount = 12,
                UserId = user.Id,
                TypeId = health.Id,
                SubTypeId = pills.Id,
                Date = DateTime.Now,
                Id = 4,
                Currency = user.DefaultCurrency,
             },
             new Spent() {
                Amount = 620,
                UserId = user.Id,
                TypeId = health.Id,
                SubTypeId = stomatology.Id,
                Date = DateTime.Now,
                Id = 5,
                Currency = user.DefaultCurrency,
                Direction = Direction.Outcome
             },
             new Spent()
             {
                 Amount = 200,
                 UserId = user.Id,
                 TypeId = debtReturn.Id,
                 Date = DateTime.Now.AddDays(-10),
                 Id = 6,
                 Currency = user.DefaultCurrency,
                 Direction = debtReturn.Direction
             }
			};

			modelBuilder.Entity<Spent>().HasData(initialSpends);
		}
	}
}
