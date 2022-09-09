export default class StatisticsDto {
    constructor(totalYearIncomes: number, totalYearOutcomes: number, totalMonthIncomes: number, totalMonthOutcomes: number, monthlyBalance: number, yearBalance: number) {
        this.totalYearIncomes = totalYearIncomes;
        this.totalYearOutcomes = totalYearOutcomes;
        this.totalMonthIncomes = totalMonthIncomes;
        this.totalMonthOutcomes = totalMonthOutcomes;
        this.monthlyBalance = monthlyBalance;
        this.yearBalance = yearBalance;
    }

    totalYearIncomes: number; 
    totalYearOutcomes: number;
    totalMonthIncomes: number;
    totalMonthOutcomes: number;
    monthlyBalance: number;
    yearBalance: number;
}