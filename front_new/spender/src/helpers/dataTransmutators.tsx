import * as _ from "lodash";

export function groupDataByDateAsString<DataType>(rawData: DataType[], groupingField: keyof DataType) : _.Dictionary<DataType[]> {
    console.log('was: ', rawData);
    console.log('key: ', groupingField);
    var result = _.groupBy(rawData, x => x[groupingField]);
    console.log('now: ', result);

    return result;
}