import * as _ from "lodash";

export function groupDataByDateAsString<DataType>(rawData: DataType[], groupingField: keyof DataType) : _.Dictionary<DataType[]> {
    return _.groupBy(rawData, x => x[groupingField]);
}