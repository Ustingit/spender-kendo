using System;

namespace SpenderBackBone.Data.Entities
{
	public enum Currency
	{
		Zloty = 0,
		Dollar = 1,
		Euro = 2,
		BelarusRuble = 4,
		RussianRuble = 8,
		Other = 1024
	}

	public static class CurrencyExtensions
	{
		public static string GetSign(this Currency currency)
		{
			switch (currency)
			{
				case Currency.Zloty:
					return "zł";
				case Currency.Dollar:
					return "$";
				case Currency.Euro:
					return "€";
				case Currency.BelarusRuble:
					return "Br";
				case Currency.RussianRuble:
					return "₽";
				case Currency.Other:
					return "UNKNOWN";
				default:
					throw new ArgumentException($"There is no known sign for {nameof(currency)}: {currency}.");
			}
		}
	}
}
