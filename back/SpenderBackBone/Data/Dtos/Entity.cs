using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SpenderBackBone.Data.Dtos
{
	public class Entity
	{
		[JsonProperty("id")]
		public int ID { get; set; }
	}
}
