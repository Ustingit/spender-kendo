using SpenderBackBone.Data.Dtos;

namespace SpenderBackBone.Data.Entities
{
	public enum Direction
	{
		Outcome = 0,
		Income = 1
	}

	public static class DirectionHelper
	{
		public static IdTextPair[] GetPairedDirections()
		{
			return new IdTextPair[]
			{
				//TODO: translations here
				new IdTextPair() { Id = (int)Direction.Outcome, Name = "Расход" },
				new IdTextPair() { Id = (int)Direction.Income, Name = "Доход" }
			};
		}
	}
}
