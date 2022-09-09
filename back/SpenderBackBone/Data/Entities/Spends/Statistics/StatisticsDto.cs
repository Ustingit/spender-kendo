using Newtonsoft.Json;

namespace SpenderBackBone.Data.Entities.Spends.Statistics
{
	public class StatisticsDto
	{
		[JsonProperty("totalYearIncomes")]
		public decimal TotalYearIncomes { get; set; }

		[JsonProperty("totalYearOutcomes")]
		public decimal TotalYearOutcomes { get; set; }

		[JsonProperty("totalMonthIncomes")]
		public decimal TotalMonthIncomes { get; set; }

		[JsonProperty("totalMonthOutcomes")]
		public decimal TotalMonthOutcomes { get; set; }

		[JsonProperty("monthlyBalance")]
		public decimal MonthlyBalance { get; set; }

		[JsonProperty("yearBalance")]
		public decimal YearBalance { get; set; }
	}
}
