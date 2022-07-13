using System;
using Newtonsoft.Json;
using SpenderBackBone.Data.Entities;

namespace SpenderBackBone.Data.Dtos
{
	public class SpentViewModel
	{
        [JsonProperty("id")]
		public int Id { get; set; }

        [JsonProperty("amount")]
		public decimal Amount { get; set; }
        
        [JsonProperty("user")]
		public int UserId { get; set; }

        [JsonProperty("type")]
		public int TypeId { get; set; }

        [JsonProperty("typeName")]
		public string TypeName { get; set; }

        [JsonProperty("subType")]
		public int? SubType { get; set; }

        [JsonProperty("subTypeName")]
		public string SubTypeName { get; set; }

        [JsonProperty("date")]
        public DateTime Date { get; set; }

        [JsonProperty("isChanged")]
        public bool IsChanged { get; set; }

        [JsonProperty("isFrequent")]
        public bool IsFrequent { get; set; }

        [JsonProperty("comment")]
        public string Comment { get; set; }

        [JsonProperty("currencySign")]
        public string CurrencySign { get; set; }

        [JsonProperty("direction")]
        public int Direction { get; set; }
	}
}
