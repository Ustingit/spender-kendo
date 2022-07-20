using System;
using Newtonsoft.Json;

namespace SpenderBackBone.Data.Dtos
{
	public class IdTextPair
	{
		public IdTextPair()
		{
		}

		[JsonProperty("id")]
		public int Id { get; set; }

		[JsonProperty("name")]
		public string Name { get; set; }

		[JsonProperty("parent")]
		public int? Parent { get; set; }

		[JsonIgnore]
		public bool HasParent => Parent.HasValue;
	}
}
