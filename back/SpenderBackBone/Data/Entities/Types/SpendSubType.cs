using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SpenderBackBone.Data.Entities.Types
{
	public class SpendSubType
	{
		[Key]
		public int Id { get; set; }

		[MinLength(3)]
		[Required]
		public string Name { get; set; }

		[Required]
		public int ParentTypeId { get; set; }

		public SpendType ParentType { get; set; }
	}
}
