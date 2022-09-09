using System;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpenderBackBone.Data.Dtos;
using SpenderBackBone.Data.Entities;
using SpenderBackBone.Data.Entities.Spends.Statistics;
using SpenderBackBone.Helpers;
using SpenderBackBone.SpenderContext;

namespace SpenderBackBone.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class TypesController : ControllerBase
	{
		private readonly SpendContext _context;
		private static readonly int _defaultDirection = (int) Direction.Outcome;

		public TypesController()
		{
			_context = new SpendContext();
		}

		[Route("getCombinedTypes")]
		[HttpGet]
		public async Task<TypesSubtypesDto> GetCombinedTypesSubtypes()
		{
			var indexes = (typesIndex: 0, subTypesIndex: 0);
			var types = (await _context.Types.ToListAsync())
				.Select(x => new TypeIdTextPair(x, indexes.typesIndex++ == 0)).ToArray();
			var subTypes = (await _context.SubTypes.ToListAsync()).Select(x => new IdTextPair()
			{
				Id = x.Id,
				Name = x.Name,
				Parent = x.ParentTypeId,
				Selected = indexes.subTypesIndex++ == 0
			}).ToArray();
			var defaultType = types.FirstOrDefault(x => x.Direction == Direction.Outcome)!.Id;
			var defaultSubType = subTypes.FirstOrDefault(x => x.Parent == defaultType)?.Id;
			var statistics = await GetStatistic();

			return new TypesSubtypesDto()
			{
				Directions = DirectionHelper.GetPairedDirections(),
				Types = types,
				SubTypes = subTypes,
				DefaultDirection = _defaultDirection,
				DefaultType = defaultType,
				DefaultSubType = defaultSubType,
				Statistics = statistics
			};
		}

		private async Task<StatisticsDto> GetStatistic()
		{
			var startDate = DateHelper.GetStartOfTheCurrentMonth();
			var endDate = DateHelper.GetEndOfTheCurrentMonth();

			var totalIncome = await _context.Spends.Where(x => x.Direction == Direction.Income).SumAsync(x => x.Amount);
			var totalOutcome = await _context.Spends.Where(x => x.Direction == Direction.Outcome).SumAsync(x => x.Amount);

			var monthSpends = await _context.Spends.Where(x => x.Date >= startDate && x.Date >= endDate).ToListAsync();
			var monthIncomes = monthSpends.Where(x => x.Direction == Direction.Income).Sum(x => x.Amount);
			var monthOutcomes = monthSpends.Where(x => x.Direction == Direction.Outcome).Sum(x => x.Amount);

			return new StatisticsDto()
			{
				TotalYearIncomes = totalIncome,
				TotalYearOutcomes = totalOutcome,
				TotalMonthIncomes = monthIncomes,
				TotalMonthOutcomes = monthOutcomes,
				MonthlyBalance = monthIncomes - monthOutcomes,
				YearBalance = totalIncome - totalOutcome
			};
		}
	}
}
