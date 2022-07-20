using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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

		public TypesController()
		{
			_context = new SpendContext();
		}

		[Route("getCombinedTypes")]
		[HttpGet]
		public async Task<TypesSubtypesDto> GetCombinedTypesSubtypes()
		{
			return new TypesSubtypesDto()
			{
				Directions = DirectionHelper.GetPairedDirections(),
				Types = (await _context.Types.ToListAsync()).Select(x => new TypeIdTextPair(x)).ToArray(),
				SubTypes = (await _context.SubTypes.ToListAsync()).Select(x => new IdTextPair()
				{
					Id = x.Id,
					Name = x.Name,
					Parent = x.ParentTypeId
				}).ToArray()
			};
		}
	}
}
