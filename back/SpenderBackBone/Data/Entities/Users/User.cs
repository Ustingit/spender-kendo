using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SpenderBackBone.Data.Entities.Users
{
	public class User
	{
		public User()
		{
		}

		public static User GetPolak(string name, string surname, int age, string phone = null)
		{
			return new User()
			{
				Name = name,
				SurName = surname,
				Age = age,
				Phone = phone ?? string.Empty,
				DefaultCurrency = Currency.Zloty
			};
		}

		[Key]
		public int Id { get; set; }

		[Required]
		public string Name { get; set; }

		[Required]
		public string SurName { get; set; }

		[Range(1, 120)]
		[Required]
		public int Age { get; set; }

		public string Phone { get; set; }

		[RegularExpression(@"^@", ErrorMessage = "The Option must start with @ sign")]
		public string TelegramId { get; set; }

		[Required]
		public Currency DefaultCurrency { get; set; }
	}
}
