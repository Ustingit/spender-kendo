export default interface ISpent {
    id: number,
    amount: number,
    userId: number,
    typeId: number,
    typeName: string,
    subType: number | null,
    subTypeName: string,
    date: Date,
    isChanged: boolean,
    isFrequent: boolean,
	comment: string,
	currencySign: string,
    direction: number,
    rawDate: string
}