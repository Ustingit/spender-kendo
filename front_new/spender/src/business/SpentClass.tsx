import ISpent from "./SpentInterface";

export default class SpentClass implements ISpent {
    constructor(id: number, amount: number, userId: number, typeId: number, typeName: string, subType: number, subTypeName: string, date: Date, isChanged: boolean, 
        isFrequent: boolean, comment: string, currencySign: string, direction: number, rawDate: string) {
            this.id = id;
            this.amount = amount;
            this.userId = userId;
            this.typeId = typeId;
            this.typeName = typeName;
            this.subType = subType;
            this.subTypeName = subTypeName;
            this.date = date;
            this.isChanged = isChanged;
            this.isFrequent = isFrequent;
            this.comment = comment;
            this.currencySign = currencySign;
            this.direction = direction;
            this.rawDate = rawDate;
    }

    id: number;
    amount: number;
    userId: number;
    typeId: number;
    typeName: string;
    subType: number;
    subTypeName: string;
    date: Date;
    isChanged: boolean;
    isFrequent: boolean;
    comment: string;
    currencySign: string;
    direction: number;
    rawDate: string;
}