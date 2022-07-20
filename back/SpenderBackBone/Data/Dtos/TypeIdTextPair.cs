using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SpenderBackBone.Data.Entities;
using SpenderBackBone.Data.Entities.Types;

namespace SpenderBackBone.Data.Dtos
{
	public class TypeIdTextPair : IdTextPair
	{
		public TypeIdTextPair()
		{
		}

		public TypeIdTextPair(SpendType type)
		{
			Id = type.Id;
			Name = type.Name;
			Direction = type.Direction;
		}

		[JsonProperty("direction")]
		public Direction Direction { get; set; }
	}
}
