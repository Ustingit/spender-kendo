using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SpenderBackBone.Data.Dtos;
using SpenderBackBone.SpenderContext;

namespace SpenderBackBone.Controllers
{
	//[Authorize]
	[ApiController]
	[Route("[controller]")]
	public class SpentController : ControllerBase
	{
		private static readonly List<SpentViewModel> Spents = new List<SpentViewModel>()
		{
            new SpentViewModel() {
                Id = 1,
                Amount = 167.15M,
                UserId = 1,
                TypeId = 3,
                TypeName = "food",
                SubType = 12,
                SubTypeName = "grocery",
                Date = DateTime.Now.AddDays(-3),
                IsChanged = false,
                IsFrequent = true
             },
            new SpentViewModel() {
                Id = 2,
                Amount = 267.35M,
                UserId = 1,
                TypeId = 3,
                TypeName = "food",
                SubType = 12,
                SubTypeName = "grocery",
                Date = DateTime.Now.AddDays(-3),
                IsChanged = false,
                IsFrequent = false
             },
             new SpentViewModel() {
                Id = 3,
                Amount = 12.30M,
                UserId = 1,
                TypeId = 2,
                TypeName = "transport",
                SubType = null,
                SubTypeName = "",
                Date = DateTime.Now.AddDays(-1),
                IsChanged = false,
                IsFrequent = true
             },
             new SpentViewModel() {
                Id = 4,
                Amount = 12,
                UserId = 1,
                TypeId = 4,
                TypeName = "health",
                SubType = 16,
                SubTypeName = "pills",
                Date = DateTime.Now,
                IsChanged = false,
                IsFrequent = false
             },
             new SpentViewModel() {
                Id = 5,
                Amount = 620,
                UserId = 1,
                TypeId = 4,
                TypeName = "health",
                SubType = 15,
                SubTypeName = "stomatology",
                Date = DateTime.Now,
                IsChanged = false,
                IsFrequent = false
             }
        };

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
                SubType = x.SubTypeId
			});

			return items;
		}

        [Route("create")]
        [HttpPost]
		public async Task<SpentViewModel> Create(SpentViewModel newSpent)
		{
			var maxExistId = Spents.Max(x => x.Id);

			newSpent.Id = maxExistId + 1;
            Spents.Add(newSpent);

            return newSpent;
		}

		[Route("edit")]
		[HttpPost]
		public async Task<IActionResult> Edit(SpentViewModel spentToEdit)
		{
			var spent = Spents.FirstOrDefault(x => x.Id == spentToEdit.Id);

			if (spent == null)
			{
				return NotFound(spentToEdit.Id);
			}

			spent.Amount = spentToEdit.Amount;
			spent.TypeId = spentToEdit.TypeId;
			spent.SubType = spentToEdit.SubType;       
			spent.Date = spentToEdit.Date;

			return Ok(spent);
        }

		[Route("delete")]
		[HttpPost]
		public async Task<IActionResult> Delete(int id)
		{
			var spent = Spents.FirstOrDefault(x => x.Id == id);

			if (spent == null)
			{
				return NotFound(id);
			}

			Spents.Remove(spent);

			return Ok(id);
		}
    }
}
