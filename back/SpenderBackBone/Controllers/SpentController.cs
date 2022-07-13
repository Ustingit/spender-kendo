﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SpenderBackBone.Data.Dtos;
using SpenderBackBone.Data.Entities;
using SpenderBackBone.Data.Entities.Spends;
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
			var items = (await _context.Spends.Include(x => x.Type).Include(x => x.SubType).ToListAsync()).Select(x => new SpentViewModel()
			{
                Id = x.Id,
                Amount = x.Amount,
                Date = x.Date,
                IsChanged = false,
                IsFrequent = false,
                SubTypeName = x.SubType?.Name ?? string.Empty,
                UserId = x.UserId,
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
		public async Task<SpentViewModel> Create(SpentViewModel newSpent)
		{
			var maxExistId = await _context.Spends.MaxAsync(x => x.Id);
			var test = (await _context.Spends.OrderByDescending(x => x.Id).Take(1).FirstOrDefaultAsync())?.Id ?? 0;

            var obj = new Spent()
            {
                Id = maxExistId + 1,
                Date = newSpent.Date,
                UserId = newSpent.UserId,
                Comment = newSpent.Comment,
                Amount = newSpent.Amount,
                TypeId = newSpent.TypeId,
                SubTypeId = newSpent.SubType,
				Currency = CurrencyHelper.GetCurrencyBySign(newSpent.CurrencySign),
				Direction = (Direction) newSpent.Direction
            };

            await _context.Spends.AddAsync(obj);
            await _context.SaveChangesAsync();

            return newSpent;
		}

		[Route("edit")]
		[HttpPost]
		public async Task<IActionResult> Edit(SpentViewModel spentToEdit)
		{
			var spent = await _context.Spends.FirstOrDefaultAsync(x => x.Id == spentToEdit.Id);

			if (spent == null)
			{
				return NotFound(spentToEdit.Id);
			}

			spent.Amount = spentToEdit.Amount;
			spent.TypeId = spentToEdit.TypeId;
			spent.SubTypeId = spentToEdit.SubType;       
			spent.Date = spentToEdit.Date;
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
