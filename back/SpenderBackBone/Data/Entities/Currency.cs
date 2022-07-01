using System;

namespace SpenderBackBone.Data.Entities
{
	public enum Currency
	{
		Zloty = 2,
		Dollar = 4,
		Euro = 8,
		BelarusRuble = 16,
		RussianRuble = 32
	}

	public static class CurrencyHelper
	{
		public static Currency GetCurrencyBySign(string currencySign)
		{
			switch (currencySign)
			{
				case "zł":
					return Currency.Zloty;
				case "$":
					return Currency.Dollar;
				case "€":
					return Currency.Euro;
				case "Br":
					return Currency.BelarusRuble;
				case "₽":
					return Currency.RussianRuble;
				default:
					throw new ArgumentException($"There is no known currency for {nameof(currencySign)}: {currencySign}.");
			}
		}
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
				default:
					throw new ArgumentException($"There is no known sign for {nameof(currency)}: {currency}.");
			}
		}
	}
}
