using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpenderBackBone.Data.Entities.Rates
{
	public class Rate
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public Currency Currency { get; set; }

		[Required]
		public DateTime Date { get; set; }

		[Required]
		public decimal Ratio { get; set; }
	}
}
