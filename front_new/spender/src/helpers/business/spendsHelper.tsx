import ISpent from "../../business/SpentInterface"

export const updateSpend = function (itemToUpdate: ISpent, itemWithNewValues: ISpent) : ISpent {
    itemToUpdate.amount = itemWithNewValues.amount;
    itemToUpdate.typeId = itemWithNewValues.typeId;
    itemToUpdate.subType = itemWithNewValues.subType;
    itemToUpdate.date = itemWithNewValues.date;
    itemToUpdate.isFrequent = itemWithNewValues.isFrequent;
    itemToUpdate.comment = itemWithNewValues.comment;
    itemToUpdate.currencySign = itemWithNewValues.currencySign;
    itemToUpdate.direction = itemWithNewValues.direction;
    
    return itemToUpdate;
}