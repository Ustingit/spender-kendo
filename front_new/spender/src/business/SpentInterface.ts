export default interface ISpent {
    id:'number',
    amount: 'number',
    user: 'number',
    type: 'number',
    typeName: 'string',
    subType: 'number',
    subTypeName: 'string',
    date: 'Date',
    isChanged: 'boolean',
    isFrequent: 'boolean',
	comment: 'string',
	currencySign: 'string',
    direction: 'number'
}