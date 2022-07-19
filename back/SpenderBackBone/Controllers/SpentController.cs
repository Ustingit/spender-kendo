using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SpenderBackBone.Data.Dtos;
using SpenderBackBone.Data.Entities;
using SpenderBackBone.Data.Entities.Spends;
using SpenderBackBone.Extensions;
using SpenderBackBone.SpenderContext;

namespace SpenderBackBone.Controllers
{
	//[Authorize]
	[ApiController]
	[Route("[controller]")]
	public class SpentController : ControllerBase
	{
		private readonly ILogger<SpentController> _logger;
		private readonly SpendContext _context;

		public SpentController(ILogger<SpentController> logger)
		{
			_logger = logger;
			_context = new SpendContext();
		}

        [Route("get")]
        [HttpGet]
		public async Task<IEnumerable<SpentViewModel>> Get()
		{
			var test = await _context.Spends.Where(x => (new Direction[] { Direction.Income, Direction.Outcome }).Contains(x.Direction)).ToArrayAsync();

			var items = (await _context.Spends.Include(x => x.Type).Include(x => x.SubType).ToListAsync()).Select(x => new SpentViewModel()
			{
                Id = x.Id,
                Amount = x.Amount,
                Date = x.Date,
                IsChanged = false,
                IsFrequent = false,
                SubTypeName = x.SubType?.Name ?? string.Empty,
                UserId = x.UserId,
				TypeId = x.TypeId,
                TypeName = x.Type.Name,
                SubType = x.SubTypeId,
                Comment = x.Comment,
                CurrencySign = x.Currency.GetSign(),
				Direction = (int)x.Direction
			});

			return items;
		}

        [Route("create")]
        [HttpPost]
		public async Task<SpentViewModel> Create([FromBody]SpentViewModel newSpent)
		{
			var obj = new Spent()
            {
                Date = DateTime.ParseExact(newSpent.RawDate, "d", CultureInfo.InvariantCulture),
				UserId = 1,
                Comment = newSpent.Comment,
                Amount = newSpent.Amount,
                TypeId = 1,
                SubTypeId = 1,
				Currency = CurrencyHelper.GetCurrencyBySign(newSpent.CurrencySign),
				Direction = (Direction) newSpent.Direction
            };

            await _context.Spends.AddAsync(obj);
            await _context.SaveChangesAsync();

			return (await _context.Spends.Include(x => x.Type).Include(x => x.SubType)
				.FirstOrDefaultAsync(x => x.Id == obj.Id)).AsViewModel();
		}

		[Route("edit")]
		[HttpPost]
		public async Task<IActionResult> Edit([FromBody] SpentViewModel spentToEdit)
		{
			var spent = await _context.Spends.FirstOrDefaultAsync(x => x.Id == spentToEdit.Id);

			if (spent == null)
			{
				return NotFound(spentToEdit.Id);
			}

			spent.Amount = spentToEdit.Amount;
			spent.TypeId = spentToEdit.TypeId;
			spent.SubTypeId = spentToEdit.SubType;       
			spent.Date = DateTime.ParseExact(spentToEdit.RawDate, "d", CultureInfo.InvariantCulture);
			spent.Comment = spentToEdit.Comment;
			spent.Currency = CurrencyHelper.GetCurrencyBySign(spentToEdit.CurrencySign);
			spent.Direction = (Direction) spentToEdit.Direction;

			_context.Entry(spent).State = EntityState.Modified;
			await _context.SaveChangesAsync();

			return Ok(spent);
        }

		[Route("delete")]
		[HttpPost]
		public async Task<IActionResult> Delete(Entity entity)
		{
			var spent = await _context.Spends.FirstOrDefaultAsync(x => x.Id == entity.ID);

			if (spent == null)
			{
				return NotFound(entity.ID);
			}

			_context.Spends.Remove(spent);
			await _context.SaveChangesAsync();

			return Ok(entity.ID);
		}
    }
}
