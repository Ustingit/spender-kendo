using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpenderBackBone.Data.Entities.Users
{
	public class User
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public string Name { get; set; }

		[Required]
		public string SurName { get; set; }

		[Range(1, 120)]
		[Required]
		public int Age { get; set; }
	}
}
