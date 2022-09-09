using System;

namespace SpenderBackBone.Helpers
{
	public static class DateHelper
	{
		public static DateTime GetStartOfTheCurrentMonth()
		{
			var now = DateTime.Now;

			return new DateTime(now.Year, now.Month, 1);
		}

		public static DateTime GetEndOfTheCurrentMonth()
		{
			return GetStartOfTheCurrentMonth().AddMonths(1).AddTicks(-1);
		}
	}
}
