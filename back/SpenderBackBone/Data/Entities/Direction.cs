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
		public static IdTextPair[] GetPairedDirections(Direction selected = Direction.Outcome)
		{
			return new IdTextPair[]
			{
				//TODO: translations here
				new IdTextPair() { Id = (int)Direction.Outcome, Name = "Расход", Selected = selected == Direction.Outcome },
				new IdTextPair() { Id = (int)Direction.Income, Name = "Доход", Selected = selected == Direction.Outcome }
			};
		}
	}
}
