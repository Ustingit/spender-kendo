using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SpenderBackBone.Data.Dtos;
using SpenderBackBone.Data.Entities;
using SpenderBackBone.Data.Entities.Spends;

namespace SpenderBackBone.Extensions
{
	public static class SpentExtension
	{
		public static SpentViewModel AsViewModel(this Spent spent)
		{
			return new SpentViewModel()
			{
				Id = spent.Id,
				Amount = spent.Amount,
				TypeId = spent.TypeId,
				SubType = spent.SubTypeId,
				Date = spent.Date,
				Direction = (int) spent.Direction,
				Comment = spent.Comment,
				CurrencySign = spent.Currency.GetSign(),
				TypeName = spent.Type?.Name,
				SubTypeName = spent.SubType?.Name,
				IsChanged = false,
				IsFrequent = false
			};
		}
	}
}
