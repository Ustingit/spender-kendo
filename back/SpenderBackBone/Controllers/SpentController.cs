using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SpenderBackBone.Data.Dtos;

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

		public SpentController(ILogger<SpentController> logger)
		{
			_logger = logger;
		}

        [Route("get")]
        [HttpGet]
		public IEnumerable<SpentViewModel> Get()
		{
			return Spents;
		}
	}
}
