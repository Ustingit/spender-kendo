export default class GroupedData<KeyType, DataType>{
    constructor(key: KeyType, data: DataType[]) {
        this.key = key,
        this.data = data
    }

    key: KeyType;
    data: DataType[];
}