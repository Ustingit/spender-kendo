using Newtonsoft.Json;

namespace SpenderBackBone.Data.Dtos
{
	public class TypesSubtypesDto
	{
		[JsonProperty("types")]
		public TypeIdTextPair[] Types { get; set; }

		[JsonProperty("subTypes")]
		public IdTextPair[] SubTypes { get; set; }

		[JsonProperty("directions")]
		public IdTextPair[] Directions { get; set; }

		[JsonProperty("defaultType")]
		public int DefaultType { get; set; }

		[JsonProperty("defaultSubType")]
		public int? DefaultSubType { get; set; }

		[JsonProperty("defaultDirection")]
		public int DefaultDirection { get; set; }
	}
}
