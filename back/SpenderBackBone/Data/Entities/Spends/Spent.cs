using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using SpenderBackBone.Data.Entities.Types;
using SpenderBackBone.Data.Entities.Users;

namespace SpenderBackBone.Data.Entities.Spends
{
	public class Spent
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public decimal Amount { get; set; }

		[Required]
		public int UserId { get; set; }

		public User User { get; set; }

		[Required]
		public int TypeId { get; set; }

		public SpendType Type { get; set; }

		public int? SubTypeId { get; set; }

		public SpendSubType SubType { get; set; }

		[Required]
		public DateTime Date { get; set; }

		public string Comment { get; set; }
	}
}
