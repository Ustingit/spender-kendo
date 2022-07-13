using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpenderBackBone.Data.Entities.Types
{
	public class SpendType
	{
		[Key]
		public int Id { get; set; }

		[MinLength(3)]
		[Required]
		public string Name { get; set; }

		[Required]
		public Direction Direction { get; set; }
	}
}
