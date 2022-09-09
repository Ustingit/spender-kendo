using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpenderBackBone.Data.Dtos;
using SpenderBackBone.Data.Entities;
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

			return new TypesSubtypesDto()
			{
				Directions = DirectionHelper.GetPairedDirections(),
				Types = types,
				SubTypes = subTypes,
				DefaultDirection = _defaultDirection,
				DefaultType = defaultType,
				DefaultSubType = defaultSubType
			};
		}
	}
}
